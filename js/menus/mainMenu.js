var mainMenu = {
	top_margin: 175,
	option_rects: [],

	init: function(){
		this.option_rects.push({name:'play',selected:false,x:20,y:290,w:305,h:60});
		this.option_rects.push({name:'world-editor',selected:false,x:20,y:380,w:705,h:60});
		this.option_rects.push({name:'multiplayer',selected:false,x:20,y:470,w:660,h:60});
	},

	render: function(cxt){
		cxt.imageSmoothingEnabled = false;
		
		//DRAWING DIRT BACKGROUND
		for(var i = 0; i < width/400; i++){
			cxt.drawImage(blockTypes.ground_large.texture, 400*i, 0,400,1000);
		}
		
		//TITLE
		cxt.font = "75px 'Press Start 2P', cursive";
		cxt.fillStyle = 'white';
		cxt.fillText('blocEngine', 20,100+this.top_margin);
		
		//MENU ITEMS
		cxt.font = "50px 'Press Start 2P', cursive";
		if(this.option_rects[0].selected){cxt.fillStyle = 'white';}else{cxt.fillStyle = '#ccc';}
		cxt.fillText('>>Play', 20,170+this.top_margin);
		if(this.option_rects[1].selected){cxt.fillStyle = 'white';}else{cxt.fillStyle = 'yellow';}
		cxt.fillText('>>World-Editor', 20,260+this.top_margin);
		if(this.option_rects[2].selected){cxt.fillStyle = 'white';}else{cxt.fillStyle = '#ccc';}
		cxt.fillText('>>Multiplayer', 20,350+this.top_margin);
		
		//Drawing House
		cxt.drawImage(blockTypes.cat_1x1.texture, 800, 45+this.top_margin,blockTypes.cat_1x1.width*300,blockTypes.cat_1x1.height*300);
		
		

	},
	logic: function(){
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
			  			if(mainMenu.option_rects[i].name == 'play'){

			  			}else if(mainMenu.option_rects[i].name == 'world-editor'){
			  				stateManager.setSequence([world,inventory]);

			  			}else if(mainMenu.option_rects[i].name == 'multiplayer'){

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