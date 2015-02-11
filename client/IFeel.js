// From: http://stackoverflow.com/questions/6707476/how-to-find-if-text-contains-url-string
function replace(text)
    {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return $.trim( text.replace(exp,"").replace(/^RT/, "") ); 
    }

Template.IFeelT.helpers( {
	ifeel : function() {
		var image = Session.get("Image");
		if( _.isUndefined( image ) ) {
			return;
		}
		return replace( image.text );
	},
	ifeeldate : function() {
		var image = Session.get("Image");
		if( _.isUndefined( image ) ) {
			return;
		}
		return moment(image.created_at).format('MMMM Do YYYY, h:mm:ss a'); new Date(  );
	}
} );