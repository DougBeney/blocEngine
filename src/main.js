var width = 1280, height = 720, cxt, canvas; 

var blocEngine = {
	gameName: 'blocEngine',

	draw: function(){
		stateManager.render(cxt);
	},

	logic: function(){
		stateManager.logic();
	},

	init: function(options){ 
		canvas = $('.gamescreen')[0];
		canvas.width = width;
		canvas.height = height;
		document.body.appendChild(canvas);
		cxt = canvas.getContext('2d');

		stateManager.init(options.initial_state);
		
		if(options.gravity != null){
			world.gravity = options.gravity;
		}
		if(options.gameName != null){
			blocEngine.gameName = options.gameName;
		}

		exoroInit(cxt, canvas, blocEngine.draw, blocEngine.logic);
	}
}