Template.ChartT.helpers( {
	VSDisplay : function() {
		return ( Session.get( "DataIsReady" ) == false ) ? "none" : "inline";
	},
	ProgressDisplay : function() {
		return ( Session.get( "DataIsReady" ) == true ) ? "none" : "block";
	},
	dataIsReady : function() {
		return Session.get( "DataIsReady" );
	},
  hasSelectedWords : function() {
    return _.isEmpty( Session.get( "WordList" ) ) == false;
  }
} );