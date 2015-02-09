feelings = new Mongo.Collection( "feelings" );

if (Meteor.isClient) {

  function now() { return +(new Date()); }
  function rand() { return Math.round( Math.random() * 1000000 ); }

  Session.setDefault( "WordList", [] );

  Template.AddWordT.events( {
    'submit form' : function( evt, template ) {
      evt.preventDefault();

      var wordList = Session.get( "WordList" );
      var newWord = template.find(".search-query").value;
      if( _.contains( wordList, newWord.toLowerCase() ) == false ) {
        wordList.push( newWord.toLowerCase() );
        Session.set( "WordList", wordList );
      }
    }
  } );

  function rebuildPlot() {

    d3.select("#demo").selectAll("#vs").remove();
    d3.select("#demo").append("div").attr("id", "vs");

    var wordList = Session.get( "WordList" );
    var modelArray = [];
    var strataArray = [];
    _.each( wordList, function( word ) {
      modelArray.push( { label : word } );
      strataArray.push( [ { initValue : 10, label : word } ] );
    } ); 

    if( _.isEmpty( wordList ) )
      return;

    var settings = {
      width:600,
      height:400,
      data:{
            model: modelArray,
            strata: strataArray,
            stream:{
              provider:'tokens',
              refresh:1000,
              now : now()
            },
          },
      sedimentation:{
        token:{
          size:{original:6,minimum:3}
        },
        aggregation:{height:50},
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

    var textNode = d3.select("svg").append("g");
    var textXDelta = settings.width / wordList.length;
    var textX = textXDelta * 0.5;
    var textY = settings.chart.y + 30;

    _.each( wordList, function( word ) {
      textNode    
        .append("g")
        .append("text")
        .attr( "font-size", 15)
        .attr( "text-anchor", "middle")
        .text( word )
        .attr("transform", "translate(" + textX + "," + textY + ")");
      textX += textXDelta;
    } );
    

    Meteor.subscribe( "feelings", wordList, function() {
      feelings.find({}).observeChanges( {
        added : function( id, tweet ) {
          var wordList = Session.get( "WordList" )
          var text = tweet.text.toLowerCase();
          _.each( wordList, function( word, idx ) {
            if( text.indexOf( word ) != -1 ) {
                scene.addToken( { 
                  size : (30 / wordList.length), 
                  category : idx, 
                } );
            }
          } );
        }
      } ) ;
    } );
  } 

  Template.VisualSedimentationT.rendered = function() {
    Tracker.autorun( rebuildPlot );
  };
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
