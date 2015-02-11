var particles = [];
myEnqueue = function( p ) {
	particles.push( p )
	if( particles.length % 50 == 0 ) {
		particles = _.shuffle( particles );
	}
}

myPop = function() {
	var array = [];
	var i = 0;
	while( particles.length > 0 && i++ < 10 ) {
		array.push( particles.pop() );
	}
	return array;
}