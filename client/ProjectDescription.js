Template.ProjectDescriptionT.events( {
  "click #example" : function( a, b, c ) {
    $(".search-query")
      .val( i18n("projectDescription.ex") )
      .submit();
  }
} );