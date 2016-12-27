$(function(){
	var a_key = 65;
	var d_key = 68;
	var s_key = 83;
	var w_key = 87;
	var plus = 187;
	var minus = 189;

	document.addEventListener('keydown', function(e){

		switch(e.keyCode){
			case a_key:
				world.grid.dx = world.grid.speed;
				break;
			case d_key:
				world.grid.dx = -world.grid.speed;
				break;
			case w_key:
				world.grid.dy = world.grid.speed;
				break;
			case s_key:
				world.grid.dy = -world.grid.speed;
				break;
			case plus:
				if(world.grid.blockScale+10 <= 100){
					world.grid.blockScale += 5;
				}
				break;
			case minus:
				if(world.grid.blockScale-10 >= 1){
					world.grid.blockScale -= 5;
				}
				break;
			default:
				console.log('Nothing assigned to key '+e.keyCode);
				break;
		}
	});
	document.addEventListener('keyup', function(e){

		switch(e.keyCode){
			case a_key:
				world.grid.dx = 0;
				break;
			case d_key:
				world.grid.dx = 0;
				break;
			case w_key:
				world.grid.dy = 0;
				break;
			case s_key:
				world.grid.dy = 0;
				break;
			case plus:
				break;
			case minus:
				break;
			default:
				console.log(e.keyCode);
				break;
		}
	});
});