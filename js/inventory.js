var inventory_img = new Image();
var inventory_slot_img = new Image();
var show_full_inventory = false;
var current_item = null;

var inventory_slots = [];

var inventory = {

	invslot_size: 100,
	invslot_item_size: 70,
	invslot_margin: 5,

	init: function(){
		inventory_img.src="assets/HUD/inventory.png";
		inventory_slot_img.src="assets/HUD/inventory_slot.png";
	},
	render: function(cxt){

		cxt.imageSmoothingEnabled = false;
		
		if(!world.cinematic_mode){
		//drawing inventory if enabled
		
		if(current_item != null && !show_full_inventory){

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

		if(show_full_inventory){
			var the_x = this.invslot_margin;
			var the_y = height-((this.invslot_size*5)+this.invslot_margin);
			var the_w = this.invslot_size*9;
			var the_h = this.invslot_size*5;

			cxt.drawImage(inventory_img, the_x, the_y, the_w, the_h);

			
			var counter = 0;
			var cur_row = 5;

			inventory_slots = [];

			for (var key in blockTypes){
				if(blockTypes[key] != current_item){
					var the_block = blockTypes[key];
					var block_img = the_block.img;
					var block_width = block_img.width;
					var block_height = block_img.height;
					var block_ratio = block_height/block_width;
					
					if(counter > 8){
						counter = 0;
						cur_row--;
					}
					if(cur_row > 1 ){
						//drawing item in inv slot
						if(block_width >= block_height){
							var the_w = this.invslot_item_size;
							var the_h = (this.invslot_item_size)*block_ratio;
							var the_x = (this.invslot_margin+((this.invslot_size-this.invslot_item_size)/2))+this.invslot_size*counter;
							var the_y = (height-this.invslot_size*cur_row)+((this.invslot_size-the_h)/2)-this.invslot_margin;
							
							inventory_slots.push({
								x: the_x,
								y: the_y,
								w: the_w,
								h: the_h,
								block: the_block,
							});

							cxt.drawImage(block_img, the_x, the_y,the_w,the_h);

						}else{
							var the_w = this.invslot_item_size/block_ratio;
							var the_h = (this.invslot_item_size);
							var the_x = (this.invslot_margin+((this.invslot_size-the_w)/2))+this.invslot_size*counter;
							var the_y = (height-this.invslot_size*cur_row)+((this.invslot_size-the_h)/2)-this.invslot_margin;

							inventory_slots.push({
								x: the_x,
								y: the_y,
								w: the_w,
								h: the_h,
								block: the_block,
							});

							cxt.drawImage(block_img, the_x, the_y,the_w,the_h);
						}
					}else{
						break;
					}	
				counter++;
				}

			}

		}

		//drawing inv slot
		var the_x = this.invslot_margin;
		var the_y = height-(this.invslot_size+this.invslot_margin);
		var the_w = this.invslot_size;
		var the_h = this.invslot_size;

		cxt.drawImage(inventory_slot_img, the_x, the_y, the_w, the_h);		
		
		
		if(current_item != null){
			var block_img = current_item.img;
			var block_width = block_img.width;
			var block_height = block_img.height;
			var block_ratio = block_height/block_width;
			

			//drawing item in inv slot
			if(block_width >= block_height){
				var the_w = this.invslot_item_size;
				var the_h = (this.invslot_item_size)*block_ratio;
				var the_x = this.invslot_margin+((this.invslot_size-this.invslot_item_size)/2);
				var the_y = (height-this.invslot_size)+((this.invslot_size-the_h)/2)-this.invslot_margin;

				cxt.drawImage(block_img, the_x, the_y,the_w,the_h);

			}else{
				var the_w = this.invslot_item_size/block_ratio;
				var the_h = (this.invslot_item_size);
				var the_x = this.invslot_margin+((this.invslot_size-the_w)/2);
				var the_y = (height-this.invslot_size)+((this.invslot_size-the_h)/2)-this.invslot_margin;

				cxt.drawImage(block_img, the_x, the_y,the_w,the_h);
			}
		}

		}

	},
	logic: function(cxt){

	},
	runEvent: {
		toggleInventory: function(force){
			if(!force){
				show_full_inventory = !show_full_inventory;
			}else{
				if(force == 1){
					show_full_inventory = true;
				}else if(force == 2){
					show_full_inventory = false;
				}
			}
		},
		keyDown: function(e){
			switch(e.keyCode){
				case q_key:
				  inventory.runEvent.toggleInventory();
				  break;
			}
		},
		keyUp: function(e){

		},
		mouseDown: function(e){
			if(show_full_inventory){
			  if(e.button == 0 || e.button == 1){
			  	//left Click
			  	for(var item in inventory_slots){
			  		if(collision.intersects(
			  		{
			  			x: mouseX,
			  			y: mouseY,
			  			w: 1,
			  			h: 1,
			  		},
			  		{
			  			x:inventory_slots[item].x,
			  			y:inventory_slots[item].y,
			  			w:inventory_slots[item].w,
			  			h:inventory_slots[item].h,
			  		}
			  		)){
			  			current_item = inventory_slots[item].block;
			  			break;

			  		}
			  	}

			  }else if(e.button == 2){
			  	//right Click	
			  	e.preventDefault();
			  	if(collision.intersects(
			  	{x: mouseX, y: mouseY, w: 1, h: 1,},
			  	{x:inventory.invslot_margin, y:height-inventory.invslot_margin-inventory.invslot_size, w:inventory.invslot_size, h:inventory.invslot_size}
			  	)){
			  		current_item = null;
			  	}
			  }
			}
		},
		mouseUp: function(e){

		},
		mouseDrag: function(e){

		}
	}
};