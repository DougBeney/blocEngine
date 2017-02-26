var mouseX, mouseY;
var leftmouse_down = false;
var rightmouse_down = false;

var a_key = 65;
var d_key = 68;
var g_key = 71;
var s_key = 83;
var w_key = 87;
var f_key = 70;
var q_key = 81;
var plus = 187;
var minus = 189;
var tilde = 192;
var escape_key = 27;


$(function(){
	
	document.addEventListener('mousemove', function(e){
		if($('.gamescreen').is(":hover")){

			if(leftmouse_down || rightmouse_down){
				stateManager.runEvent.mouseDrag(e);
			}
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
		  leftmouse_down = true;
		  

		}else if(e.button == 2){
			//right click
			rightmouse_down = true;
		}
		stateManager.runEvent.mouseDown(e);
	});

	document.addEventListener('mouseup', function(e){
		if(e.button == 0 || e.button == 1){
		  //left Click
			leftmouse_down=false;

		}else if(e.button == 2){
			//right click
			rightmouse_down=false;
		}
		stateManager.runEvent.mouseUp(e);
	});

	document.addEventListener('mousedragged', function(e){
		   stateManager.runEvent.mouseDown(e);
	});

	document.addEventListener('keydown', function(e){
		//console.log('key ' + e.keyCode);		
		switch(e.keyCode){
			case f_key:
			  $('header').slideToggle(function(){
			    resize();
			  });
			  break;
			default:
			  //console.log('Key Code - '+e.keyCode);
			  break;
		}
		stateManager.runEvent.keyDown(e);
	});
	document.addEventListener('keyup', function(e){
		stateManager.runEvent.keyUp(e);
	});
});