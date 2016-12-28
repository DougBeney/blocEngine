var collision = {
	intersects: function(Rect1, Rect2){
		var w1 =  Rect1.w;
		var h1 =  Rect1.h;
		var x1 =  Rect1.x;
		var y1 =  Rect1.y;

		var w2 =  Rect2.w;
		var h2 =  Rect2.h;
		var x2 =  Rect2.x;
		var y2 =  Rect2.y;

		if(x1+w1 >= x2 && x1 <= x2+w2){
			if(y1+h1 >= y2 && y1 <= y2+h2){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

};