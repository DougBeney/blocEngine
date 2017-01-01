var stateManager = {
	current_sequence: [mainMenu],

	init: function(){
		for(var i in this.current_sequence){
			if(stateManager.current_sequence[i]){
				this.current_sequence[i].init();
			}
		}
	},

	render: function(cxt){
		for(var i in this.current_sequence){
			if(stateManager.current_sequence[i]){
				this.current_sequence[i].render(cxt);
			}
		}
	},

	logic: function(){
		for(var i in this.current_sequence){
			if(stateManager.current_sequence[i]){
				this.current_sequence[i].logic();
			}
		}
	},

	setSequence: function(array){
		for(var i in array){
			array[i].init();
		}
		this.current_sequence = array;
	},
	runEvent: {
		mouseDown: function(e){
			for(var i in stateManager.current_sequence){
				if(stateManager.current_sequence[i]){
					stateManager.current_sequence[i].runEvent.mouseDown(e);
				}
			}
		},
		mouseUp: function(e){
			for(var i in stateManager.current_sequence){
				if(stateManager.current_sequence[i]){
					stateManager.current_sequence[i].runEvent.mouseUp(e);
				}
			}
		},
		mouseDrag: function(e){
			for(var i in stateManager.current_sequence){
				if(stateManager.current_sequence[i]){
					stateManager.current_sequence[i].runEvent.mouseDrag(e);
				}
			}
		},
		keyDown: function(e){
			for(var i in stateManager.current_sequence){
				if(stateManager.current_sequence[i]){
					stateManager.current_sequence[i].runEvent.keyDown(e);
				}
			}
		},
		keyUp: function(e){
			for(var i in stateManager.current_sequence){
				if(stateManager.current_sequence[i]){
					stateManager.current_sequence[i].runEvent.keyUp(e);
				}
			}
		}
	}
};