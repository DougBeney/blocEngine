var player = {

	playerIndex:  0,
	movingLeft: false,
	movingRight: false,
	in_air: false,

	max_speed: 15,
	jump_force: -200,
	space_bar_down: false,

	init: function(){
		//Adding dirt
		world.addBlock(new Block(itemTypes.tenbyfive_dirtstonegrass, -5, 9));
		world.addBlock(new Block(itemTypes.tenbyfive_dirtstonegrass, 5, 10));
		world.addBlock(new Block(itemTypes.tenbyfive_ice, 15, 10));
		world.addBlock(new Block(itemTypes.tenbyfive_ice, 25, 10));
		world.addBlock(new Block(itemTypes.tenbyfive_stone, 25, 2));

		//Adding player
		world.addBlock(new Block(itemTypes.player, 10, 5));


		
		for(var i in world.blockDatabase){
			if (world.blockDatabase[i].blocktype.item_type == "player"){
				this.playerIndex = i;
				world.blockDatabase[i].physicsBody.worldBody.SetFixedRotation(true);
				break;
			}
		}
	},

	render: function(cxt){

	},

	logic: function(){
		var the_body = world.blockDatabase[player.playerIndex].physicsBody.worldBody;	

		if(the_body.GetLinearVelocity().y != 0){
			player.in_air = true;
		}else{
			player.in_air = false;
		}

		if(player.space_bar_down && !player.in_air){
			world.runEvent.applyForceY(the_body, player.jump_force);
		}

		if(this.movingLeft){
			world.runEvent.applyForceX(the_body, -player.max_speed);
			var linvel = the_body.GetLinearVelocity();
			if(linvel.x < -player.max_speed){
				linvel.x = -player.max_speed;
				the_body.SetLinearVelocity(linvel);
			}

		}else if(this.movingRight){
			world.runEvent.applyForceX(the_body, player.max_speed);
			var linvel = the_body.GetLinearVelocity();
			if(linvel.x > player.max_speed){
				linvel.x = player.max_speed;
				the_body.SetLinearVelocity(linvel);
			}
		}
	},

	runEvent: {
		mouseDown: function(e){
			
		}, 
		mouseUp: function(e){
			
		},
		keyDown: function(e){
			switch(e.keyCode){
				case d_key:
					if(player.movingLeft){
						player.movingLeft = false;
					}
					player.movingRight=true;
					break;
				case a_key:
					if(player.movingRight){
						player.movingRight = false;
					}
					player.movingLeft = true;
					break;
				case space:
					player.space_bar_down = true;
					break;
			}
		},
		keyUp: function(e){
			switch(e.keyCode){
				case d_key:
					player.movingRight=false;
					break;
				case a_key:
					player.movingLeft = false;
					break;
				case space:
					player.space_bar_down = false;
					break;
			}
		},
		mouseDrag: function(e){

		}
	}
};