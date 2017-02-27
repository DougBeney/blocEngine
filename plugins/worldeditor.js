var worldeditor = {
	init: function(){
		inventory.inventory_slots = [];

		for(var i in itemTypes){
			inventory.pushToInventory({type: itemTypes[i], amount: 1});
		}
	},
	logic: function(){

	},
	render: function(cxt){

		cxt.imageSmoothingEnabled = false;

		if(!world.cinematic_mode){
			//drawing hover item
			if(current_item != null && !show_full_inventory && current_item.item_type == 'block'){

				var the_scale = world.grid.blockScale*world.grid.zoom;

				var the_w = current_item.width*the_scale;
				var the_h = current_item.height*the_scale;
				
				var the_x = Math.round((mouseX+world.grid.offsetX)/the_scale)*the_scale-world.grid.offsetX;
				var the_y = Math.round((mouseY+world.grid.offsetY)/the_scale)*the_scale-world.grid.offsetY;
				
				cxt.save();
				cxt.globalAlpha=0.6;
				cxt.drawImage(current_item.img, 
							the_x, 
							the_y, 
							the_w, 
							the_h);
				cxt.restore();
			}

			
		}
	},
	runEvent: {
		keyDown: function(e){
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
			  case g_key:
			    world.grid.debugGrid=!world.grid.debugGrid;
			    break;
			  case plus:
			    world.runEvent.zoom(0.1);
			    break;
			  case minus:
			    world.runEvent.zoom(-0.1);
			    break;
			  case tilde:
			    world.cinematic_mode = !world.cinematic_mode;
			    inventory.runEvent.toggleInventory(2);
			    break;
			}
		},
		keyUp: function(e){
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
		},
		mouseDown: function(e){

		  if(e.button == 0 || e.button == 1){
		    //left Click
		    if(!show_full_inventory){
		      for(var i in world.blockDatabase){

		        var the_scale = world.grid.blockScale*world.grid.zoom;

		        var mousex = Math.round((mouseX+world.grid.offsetX)/the_scale)*the_scale-world.grid.offsetX;
		        var mousey = Math.round((mouseY+world.grid.offsetY)/the_scale)*the_scale-world.grid.offsetY;

		        var block_x = Math.round(world.blockDatabase[i].x/world.grid.blockScale*the_scale)-world.grid.offsetX;
		        var block_y = Math.round(world.blockDatabase[i].y/world.grid.blockScale*the_scale)-world.grid.offsetY;
		        var block_w = Math.round(world.blockDatabase[i].width*world.grid.zoom);
		        var block_h = Math.round(world.blockDatabase[i].height*world.grid.zoom);

		        if(collision.intersects({x:mousex,y:mousey,w:1,h:1},
		                                {x: block_x-(block_w/2),y:block_y-(block_h/2),w:block_w,h:block_h}))
		        {
		          BP.physics.world.DestroyBody(world.blockDatabase[i].physicsBody.worldBody);
		          world.blockDatabase.splice(i,1);
		          break;
		        }
		      }
		    }

		  }else if(e.button == 2){
		      //right Click 
		      if(!show_full_inventory && current_item != null){
		          
		          var the_scale = world.grid.blockScale*world.grid.zoom;

		          var the_x = Math.round(((mouseX+world.grid.offsetX)/the_scale)*world.grid.blockScale/world.grid.blockScale);
		          var the_y = Math.round(((mouseY+world.grid.offsetY)/the_scale)*world.grid.blockScale/world.grid.blockScale);
		          
		          world.addBlock(new Block(current_item, the_x, the_y));
		        
		      }
		  } 
		},
		mouseDrag: function(e){
		 
		 if(e.button == 0 || e.button == 1){
		   //left Click
		   if(!show_full_inventory){
		     for(var i in world.blockDatabase){
		       var block_x = world.blockDatabase[i].x*world.grid.blockScale-world.grid.offsetX;
		       var block_y = world.blockDatabase[i].y*world.grid.blockScale-world.grid.offsetY;
		       var block_w = world.blockDatabase[i].width*world.grid.blockScale;
		       var block_h = world.blockDatabase[i].height*world.grid.blockScale;
		       if(collision.intersects({x:mouseX,y:mouseY,w:1,h:1},
		                               {x: block_x,y:block_y,w:block_w,h:block_h}))
		       {
		         world.blockDatabase.splice(i,1);
		         break;
		       }
		     }
		   }

		 }

		},
		mouseUp: function(e){

		},
	}
};