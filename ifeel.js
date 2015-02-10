feelings = new Mongo.Collection( "feelings" );

if (Meteor.isClient) {

  var maxNumberOfContainers = 8;
  var backgroundPhotos = []

  function now() { return +(new Date()); }
  function rand() { return Math.round( Math.random() * 1000000 ); }

  Session.set( "Images", [] );
  Session.setDefault( "WordList", [] );

  Template.AddWordT.events( {
    'submit form' : function( evt, template ) {
      evt.preventDefault();

      var wordList = Session.get( "WordList" );

      if( wordList.length > maxNumberOfContainers )
        return;

      var newWord = template.find(".search-query").value;
      if( _.contains( wordList, newWord.toLowerCase() ) == false ) {
        wordList.push( newWord.toLowerCase() );
        Session.set( "WordList", wordList );
      }
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

    var settings = {
      width:600,
      height:400,
      data:{
            model: list,
            strata: strataArray,
            stream:{
              provider:'tokens',
              refresh:1000,
              now : now()
            },
          },
      sedimentation:{
        token:{
          size:{original:20,minimum:3}
        },
        aggregation:{height:150},
        suspension:{
          decay: { power : 1.005 }
        }
      },
      options:{
        layout:false
      },
      chart:{
        x: 0,
        y: 50,
        height : 350,
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

  var visited = {};

  var visitedURLs = {}
  setInterval( function() {
    if( _.isEmpty( backgroundPhotos ) ) {
      return;
    }

    backgroundPhotos = _.shuffle( backgroundPhotos );

    console.log( backgroundPhotos );

    do {
      var image = backgroundPhotos.pop();
    } while( _.has( visitedURLs, image.url ) && backgroundPhotos.length > 0 );
    
    visitedURLs[ image.url ] = true;
    Session.set( "Image", image );

  }, 14000 );

  function getBackgroundPhoto( tweet ) {
    var entities = tweet.entities;
    if( _.isUndefined( entities ) ) {
      return;
    }

    if( _.isUndefined( entities.media ) ) {
      return;
    }

    _.each( entities.media, function( datum ) { 
      if( _.has( datum, "media_url" ) && 
          _.isEqual( datum[ "type" ], "photo" ) ) { 
          if( backgroundPhotos.length < 1000 ) {
            console.log( "new photo" );
            backgroundPhotos.push( { 
            url : datum[ "media_url" ], 
            text : tweet.text } );  
          }
      }
    } );
  }

  function observeData() {
    var wordList = Session.get( "WordList" );
    Meteor.subscribe( "feelings", wordList, function() {
      feelings.find({}).observeChanges( {
        added : function( id, tweet ) {

          if( _.has( visited, id._str ) == true )
            return;

          console.log( "new data" );

          getBackgroundPhoto( tweet );

          // console.log( tweet );
          visited[ id._str ] = true;
          var wordList = Session.get( "WordList" )
          var text = tweet.text.toLowerCase();
          _.each( wordList, function( word, idx ) {
            if( text.indexOf( word ) != -1 ) {
                scene.addToken( { 
                  size : 40 / maxNumberOfContainers, 
                  category : idx, 
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
    var textXDelta = settings.width / maxNumberOfContainers;
    var textX = textXDelta * 0.5;
    var textY = settings.chart.y - 30;

    _.each( wordList, function( word ) {
      textNode    
        .append("g")
        .append("text")
        .attr( "font-size", 20)
        .attr( "font-family", "Times")
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
        .attr("transform", "translate(" + textX + "," + textY + ")");
      textX += textXDelta;
    } );
  }

}

if (Meteor.isServer) {
  Meteor.startup(function () {

    Meteor.publish( "feelings", function( words ) {

      var list = "";
      _.each( words, function( word ) { list += word + " " } );
      console.log( "* terms", list );
      var query = {  $text : { $search : list }  };
      var options = { expire : false, created_at : false };
      return feelings.find( query, options );
    } );
    // code to run on server at startup
  });
}
