var mainMenu = {
	option_rects: [],

	init: function(){
		
	},

	addMenuItem: function(values){
		this.option_rects.push({name:values.name,
									state: values.state,
									selected:false,
									x:values.x,
									y:values.y,
									w:values.w,
									h:values.h});
	},

	render: function(cxt){
		cxt.imageSmoothingEnabled = false;
		
		//DRAWING DIRT BACKGROUND
		cxt.fillStyle = '#7B5826';
		cxt.fillRect(0,0,width,height);
		
		//TITLE
		cxt.font = "75px 'Press Start 2P', cursive";
		cxt.fillStyle = 'white';
		cxt.fillText(blocEngine.gameName, 20,210);

		//MENU ITEMS
		for(var i in this.option_rects){
			cxt.font = "50px 'Press Start 2P', cursive";
			if(this.option_rects[i].selected){cxt.fillStyle = 'white';}else if(this.option_rects[i].state != null){cxt.fillStyle = 'yellow';}else{cxt.fillStyle = '#ccc'}
			var txtHeight = parseInt(cxt.font);
			cxt.fillText(this.option_rects[i].name, this.option_rects[i].x,this.option_rects[i].y+txtHeight);
		}		

	},
	logic: function(){
		//Sees if moused-over
		for(var i in this.option_rects){
			if(collision.intersects(
			{x:mouseX,y:mouseY,w:1,h:1},
			{x:this.option_rects[i].x,y:this.option_rects[i].y,w:this.option_rects[i].w,h:this.option_rects[i].h}
			)){
				this.option_rects[i].selected=true;
			}else{
				this.option_rects[i].selected=false;
			}
		}
	},
	runEvent: {
		mouseDown: function(e){
			if(e.button == 0 || e.button == 1){
				//left Click

		

			}else if(e.button == 2){
				//right Click 
				
			} 
		}, 
		mouseUp: function(e){
			if(e.button == 0 || e.button == 1){
				//left Click

			  	for(var i in mainMenu.option_rects){
			  		if(collision.intersects(
			  		{x:mouseX,y:mouseY,w:1,h:1},
			  		{x:mainMenu.option_rects[i].x,y:mainMenu.option_rects[i].y,w:mainMenu.option_rects[i].w,h:mainMenu.option_rects[i].h}
			  		)){
			  			if(mainMenu.option_rects[i].state != null){
							stateManager.setSequence(mainMenu.option_rects[i].state);
			  			}
			  		}
			  	}

			}else if(e.button == 2){
				//right Click 
				
			} 
		},
		keyDown: function(e){

		},
		keyUp: function(e){
			
		},
		mouseDrag: function(e){

		}
	}
};