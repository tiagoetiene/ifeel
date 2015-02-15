  Template.SearchBoxT.events( {
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
    },
    'click #clear' : function() {
      location.reload();
    }
  } );