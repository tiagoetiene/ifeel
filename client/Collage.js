function tile( url ) {
	if( _.isUndefined( url ) ) {
		return;
	}
	return "background : url(" + url + ") no-repeat; background-size:cover;";	
}

Template.CollageT.helpers( {
	tile0 : function() { return tile( Session.get("Tile0") ); },
	tile1 : function() { return tile( Session.get("Tile1") ); },
	tile2 : function() { return tile( Session.get("Tile2") ); },
	tile3 : function() { return tile( Session.get("Tile3") ); },
} );