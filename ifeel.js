feelings = new Mongo.Collection( "feelings" );

if (Meteor.isClient) {

  Tracker.autorun( function() { document.title = i18n( "appName" ); } );

  configInternationalization();

  var maxNumberOfContainers = 7;
  var backgroundPhotos = []

  function now() { return +(new Date()); }
  function rand() { return Math.round( Math.random() * 1000000 ); }

  Session.set( "Images", [] );
  Session.setDefault( "WordList", [] );

  Template.AddWordT.events( {
    'submit form' : function( evt, template ) {
      evt.preventDefault();

      var wordList = Session.get( "WordList" );
      var newWords = template.find(".search-query").value.split(/\s+/);
      _.each( newWords, function( newWord ) {
        var word = newWord.replace(",", "").trim();
        if( wordList.length < maxNumberOfContainers ) {
          if( _.contains( wordList, word.toLowerCase() ) == false ) {
            wordList.push( word.toLowerCase() );
            Session.set( "WordList", wordList );
          }  
        }
      } );
    }
  } );

  function buildPlot() {

    d3.select("#demo").selectAll("#vs").remove();
    d3.select("#demo").append("div").attr("id", "vs");

    var modelArray = [];
    var strataArray = [];
    var list = [];

    for(var i = 0; i < maxNumberOfContainers; ++i) {
      list.push( { label : "" } );
    }

    _.each( list, function( word ) {
      strataArray.push( [ { initValue : 10 } ] );
    } ); 


    var divWidth = parseInt( d3.select("#plotDiv").style('width') ) - 30;
    var viewportWidth = divWidth;
    var chartX = 10;
    var chartY = 50;
    var chartWidth = viewportWidth - 2 * chartX;
    var settings = {
      width  : viewportWidth,
      height : 300,
      data:{
            model: list,
            strata: strataArray,
            stream:{
              provider:'none',
              refresh: 10000,
              now : 0
            },
          },
      sedimentation:{
        token:{
          size:{original:20,minimum:3}
        },
        aggregation:{height:180},
        suspension:{
          decay: { power : 1.005 }
        }
      },
      options:{
        layout:false
      },
      chart:{
        x: chartX,
        y: chartY, 
        height : 280,
        width : chartWidth,
        type : "StackedAreaChart",
        wallColor : "rgba(230,230,230,0.5)",
        label : true,
        spacer : 1,
      }
    };

    scene = $("#vs").vs(settings).data('visualSedimentation');  

  } 

  Template.VisualSedimentationT.rendered = function() {
    buildPlot();

    Tracker.autorun( function() {
      observeData();
      updateLegend();
    } );
  };

  

  var backgroundHandler;
  function restartBackgroundLoop() {

    if( _.isUndefined( backgroundHandler ) == false ) {
      clearInterval( backgroundHandler );
    }

    backgroundHandler = setInterval( function() {

      if( _.isEmpty( backgroundPhotos ) ) {
        return;
      } 

      backgroundPhotos = _.shuffle( backgroundPhotos );
      Session.set( "Image", backgroundPhotos.pop() );

    }, 20000 ); 
  }
  restartBackgroundLoop();

  setInterval( function() {
    var array = myPop();
    _.each(array, function( p ) {
      setTimeout( function() { scene.addToken( p ); }, rand() % 5000 );
    } );
  }, 5000 );

  function observeData() {
    var wordList = Session.get( "WordList" );
    Meteor.subscribe( "feelings", wordList, function() {
      feelings.find({}).observeChanges( {
        added : function( id, tweet ) {

          //
          // Twitter API appends RT @screen_name to retweets.
          // We want to ignore those as they are repeated over
          // and over as background
          //
          if( _.isUndefined( tweet.retweeted_status ) == false ) {
            return;
          }

          obj = buildBackgroundObject( tweet );
          if( _.isEqual( obj.type, "photo" ) == true &&
              backgroundPhotos.length < 1000 ) {
              backgroundPhotos.push( obj )  ;
          }

          var wordList = Session.get( "WordList" )
          var text = tweet.text.toLowerCase();
          _.each( wordList, function( word, idx ) {
            if( text.indexOf( word ) != -1 ) {
              myEnqueue( {
                tweet : tweet,
                size : 60 / maxNumberOfContainers, 
                category : idx, 
                callback : {
                  onclick : function( token ) {
                    var obj = buildBackgroundObject( token.myobj.m_userData.tweet );
                    Session.set( "Image", obj );
                    restartBackgroundLoop();
                  },
                  mouseover : function( token ) {
                  }
                }
              } );
            }
          } );
        }
      } ) ;
    } );
  }

  function updateLegend() {

    d3.select("svg").select("#legend").remove();

    var wordList = Session.get( "WordList" );
    var textNode = d3.select("svg").append("g").attr("id", "legend");
    var textXDelta = settings.chart.width / maxNumberOfContainers;
    var textX = settings.chart.x + textXDelta * 0.5;
    var textYA = settings.chart.y - 30;
    var textYB = settings.chart.y - 10;

    _.each( wordList, function( word, idx ) {
      textNode    
        .append("g")
        .append("text")
        .attr( "font-size", 20)
        .attr( "font-family", "HelveticaNeue-Light") 
        .attr( "font-weight", 300)
        .attr( "fill", "white")
        .attr( "text-anchor", "middle")
        .attr( "pointer-events", "all")
        .attr( "cursor", "pointer")
        .text( word )
        .on("click", function( d ) {
          var w = d3.select(this).text().toLowerCase();
          var wordList = Session.get( "WordList" );
          wordList = _.filter( wordList, function( word ) {
            return _.isEqual( word, w ) == false;
          } );
          Session.set( "WordList", wordList );
        } )
        .attr("transform", function() {
          if( idx % 2 == 0 ) {
            return "translate(" + textX + "," + textYA + ")" 
          }
          return "translate(" + textX + "," + textYB + ")" 
        });
      textX += textXDelta;
    } );
  }
 
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    termsCollection = new Mongo.Collection( "commonTerms" );

    Meteor.publish( "feelings", function( words, lang ) {

      var list = "";
      _.each( words, function( word ) { 
        var query = {};
        var modfiers = {};
        var increment = {};
        query[ word ] = { $exists : true } ;

        var cursor = termsCollection.find( query );
        if( cursor.count() == 0 ) {
          var term = {};
          term[ word ] = 1;
          termsCollection.insert( term );
        } else {
          var array = cursor.fetch();
          increment[ word ] = +1;
          modfiers[ "$inc" ] = increment;
          termsCollection.update( { _id : array[ 0 ]._id }, modfiers );  
        }

        list += word + " ";
      } );

      var query = {  
        $text : { 
          $search : list,
          $language : "en"
        }  
      };
      var options = {
        fields : {
          id_str : 1, 
          text : 1,
          created_at : 1,
          "entities.media" : 1,
          "user.id_str" : 1,
          "user.screen_name" : 1,
          "user.profile_image_url_https" : 1,
          "retweeted_status.id_str" : 1
        }
      };
      return feelings.find( query, options );
    } );
  });
}
