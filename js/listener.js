var mouseX, mouseY;

$(function(){
	var a_key = 65;
	var d_key = 68;
	var s_key = 83;
	var w_key = 87;
	var q_key = 81;
	var f_key = 70;
	var plus = 187;
	var minus = 189;
	var tilde = 192;
	
	document.addEventListener('mousemove', function(e){

			if($('.gamescreen').is(":hover")){
				var tempx, tempy;
			    if(e.offsetX) {
			        tempx = e.offsetX;
			        tempy = e.offsetY;
			    }
			    else if(e.layerX) {
			        tempx = e.layerX;
			        tempy = e.layerY;
			    }
				
				var curwidth = parseInt($('.gamescreen').css('width'));
				var curheight = parseInt($('.gamescreen').css('height'));
				
				tempx = (tempx/curwidth)*width;
				tempy = (tempy/curheight)*height;

				if(tempx < 0){
					tempx = 0;
				}else if(tempx > width){
					tempx = width;
				}
				if(tempy < 0){
					tempx = 0;
				}else if(tempy > height){
					tempy = height;
				}
				
				mouseX = tempx;
				mouseY = tempy;
			    
		    }
	});
	document.addEventListener('mousedown', function(e){
		    if(e.button == 0 || e.button == 1){
		    	//left Click
		    	inventory.runEvent.handleClick('left');

		    }else if(e.button == 2){
		    	//right Click	
		    	e.preventDefault();
		    	inventory.runEvent.handleClick('right');
				
				if(current_item != null){
					var the_x = Math.round((mouseX+world.grid.offsetX)/world.grid.blockScale)-Math.floor(current_item.width/2);
					var the_y = Math.round((mouseY+world.grid.offsetY)/world.grid.blockScale);
					
			    	world.addBlock(current_item, the_x, the_y);
		    	}
		    }

	});

	document.addEventListener('keydown', function(e){
		
		

		switch(e.keyCode){
			case a_key:
				world.runEvent.move(world.grid.speed, true);
				break;
			case d_key:
				world.runEvent.move(-world.grid.speed, true);
				break;
			case w_key:
				world.runEvent.move(world.grid.speed, false);
				break;
			case s_key:
				world.runEvent.move(-world.grid.speed, false);
				break;
			case q_key:
				inventory.runEvent.toggleInventory();
				break;
			case f_key:
				$('header').slideToggle(function(){
					resize();
				});
				break;
			case plus:
				world.runEvent.zoom(2.5);
				break;
			case minus:
				world.runEvent.zoom(-2.5);
				break;
			case tilde:
				world.cinematic_mode = !world.cinematic_mode;
				inventory.runEvent.toggleInventory(2);
				break;
			default:
				console.log('Nothing assigned to key down '+e.keyCode);
				break;
		}
	});
	document.addEventListener('keyup', function(e){

		switch(e.keyCode){
			case a_key:
				world.runEvent.move(0, true);
				break;
			case d_key:
				world.runEvent.move(0, true);
				break;
			case w_key:
				world.runEvent.move(0, false);
				break;
			case s_key:
				world.runEvent.move(0, false);
				break;
		}
	});
});