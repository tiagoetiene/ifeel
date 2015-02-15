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
  },
  counter_0 : function() {
  	return Session.get( "Counter 0" );
  },
  counter_1 : function() {
  	return Session.get( "Counter 1" );
  },
  counter_2 : function() {
  	return Session.get( "Counter 2" );
  },
  counter_3 : function() {
  	return Session.get( "Counter 3" );
  },
  counter_4 : function() {
  	return Session.get( "Counter 4" );
  },
  counter_5 : function() {
  	return Session.get( "Counter 5" );
  },
} );