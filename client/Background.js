Template.BackgroundT.helpers( {
	hasLoadedData : function() {
		return false;
	},
	background : function() {
		var image = Session.get("Image");
		if( _.isUndefined( image ) )
			return;

		if( _.isEqual( image.type, "photo" ) ) {
			var medium = ( _.isEqual( image.type, "photo" ) ) ? ":medium" : "";
			return "background : url(" + image.url + medium + ") no-repeat; background-size:cover;";	
		}
		return "background : url(" + image.url.replace("_normal", "") + ") no-repeat; background-size:cover;";	
	}
} );