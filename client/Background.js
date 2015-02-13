Template.BackgroundT.helpers( {
	background : function() {
		var image = Session.get("Image");
		if( _.isUndefined( image ) )
			return;
		return "background : url(" + image.url + ":medium" + ") no-repeat; background-size:cover;";
	}
} );