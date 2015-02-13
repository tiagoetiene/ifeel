Template.BackgroundT.helpers( {
	background : function() {
		var image = Session.get("Image");
		if( _.isUndefined( image ) )
			return;
		var medium = ( _.isEqual( image.type, "photo" ) ) ? ":medium" : "";
		return "background : url(" + image.url + medium + ") no-repeat; background-size:cover;";
	}
} );