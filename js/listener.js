$(function(){
	var a_key = 65;
	var d_key = 68;
	var s_key = 83;
	var w_key = 87;
	var q_key = 81;
	var plus = 187;
	var minus = 189;

	document.addEventListener('mousedown', function(e){
		    var mouseX, mouseY;

		    if(e.offsetX) {
		        mouseX = e.offsetX;
		        mouseY = e.offsetY;
		    }
		    else if(e.layerX) {
		        mouseX = e.layerX;
		        mouseY = e.layerY;
		    }
			
			console.log('curwidth ' + cur_game_width);
		    mouseX = (mouseX/cur_game_width)*width;
		    mouseY = (mouseY/cur_game_height)*height;

		    console.log('mousex ' + mouseX + ' mousey ' + mouseY);
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
			case plus:
				world.runEvent.zoom(2.5);
				break;
			case minus:
				world.runEvent.zoom(-2.5);
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