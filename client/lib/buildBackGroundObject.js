buildBackgroundObject = function( tweet ) {
	var entities = tweet.entities;
  if( _.isUndefined( entities ) == false &&
  	  _.isUndefined( entities.media ) == false ) {

		//
		// Searching for one valid media object
		//
		var data = entities.media;
		for( var i = 0; i < data.length; ++i ) {
			var datum = data[ i ];
  		if( _.has( datum, "media_url_https" ) ) {
  			var obj = { 
        	url : datum[ "media_url_https" ], 
        	text : tweet.text,
        	created_at : tweet.created_at,
        	screen_name : tweet.user.screen_name,
        	id_str : tweet.id_str,
        	type : "photo"
    		};
      	return obj;
      }
		}
  }

  return { 
  	url : getBannerPictureURL( tweet ) , 
  	text : tweet.text,
  	created_at : tweet.created_at,
  	screen_name : tweet.user.screen_name,
  	id_str : tweet.id_str,
  	type : "banner"
	}
}