var collision = {
	intersects: function(Rect1, Rect2){
		var w1 =  Rect1.width;
		var h1 =  Rect1.height;
		var x1 =  Rect1.x;
		var y1 =  Rect1.y;

		var w2 =  Rect2.width;
		var h2 =  Rect2.height;
		var x2 =  Rect2.x;
		var y2 =  Rect2.y;

		return true;
	}

};