Template.LanguageT.helpers( {
	language : 	function() {
		return i18n( "language" );
	}
} );

Template.LanguageT.events( {
	"click #language" : function() {
		switchLanguage();
	}
});