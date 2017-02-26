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
		current_item = itemTypes.house;
	},
	pushToInventory: function(inv_item){
		var exists = false;
		var index=0;
		for(var i in inventory_slots){
			if(inventory_slots[i].type != inv_item.type){
				exists=false;
			}else{
				exists=true;
				break;
			}
		}
		if(exists){
			inventory_slots[index].amount += inv_item.amount;
		}else{
			inventory_slots.push({type: inv_item.type, amount: inv_item.amount});
		}

	},
	render: function(cxt){

		cxt.imageSmoothingEnabled = false;
		
		if(!world.cinematic_mode){
		//drawing inventory if enabled

		if(show_full_inventory){
			var the_x = this.invslot_margin;
			var the_y = height-((this.invslot_size*5)+this.invslot_margin);
			var the_w = this.invslot_size*9;
			var the_h = this.invslot_size*5;

			cxt.drawImage(inventory_img, the_x, the_y, the_w, the_h);

			
			var counter = 0;
			var cur_row = 5;


			for (var key in inventory_slots){
				if(inventory_slots[key].type != current_item){
					var the_block = inventory_slots[key].type;
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
							
							inventory_slots[key].rect = {x:the_x, 
															 y: the_y,
															 w: the_w,
															 h: the_h
															};
							cxt.drawImage(block_img, the_x, the_y,the_w,the_h);

						}else{
							var the_w = this.invslot_item_size/block_ratio;
							var the_h = (this.invslot_item_size);
							var the_x = (this.invslot_margin+((this.invslot_size-the_w)/2))+this.invslot_size*counter;
							var the_y = (height-this.invslot_size*cur_row)+((this.invslot_size-the_h)/2)-this.invslot_margin;

							inventory_slots[key].rect = {x:the_x, 
															 y: the_y,
															 w: the_w,
															 h: the_h
															};
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
			  		if(inventory_slots[item].type != current_item){
			  		if(collision.intersects(
			  		{
			  			x: mouseX,
			  			y: mouseY,
			  			w: 1,
			  			h: 1,
			  		},
			  		{
			  			x:inventory_slots[item].rect.x,
			  			y:inventory_slots[item].rect.y,
			  			w:inventory_slots[item].rect.w,
			  			h:inventory_slots[item].rect.h,
			  		}
			  		)){
			  			current_item = inventory_slots[item].type;
			  			break;
			  		}
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