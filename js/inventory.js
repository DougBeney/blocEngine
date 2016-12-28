var inventory_img = new Image();
var inventory_slot_img = new Image();
var show_full_inventory = false;
var current_item = blockTypes.wood_ladder;

var inventory_slots = [];

for (var key in blockTypes){
	current_item = blockTypes[key];
	break;
}

var inventory = {

	invslot_size: 100,
	invslot_item_size: 70,
	invslot_margin: 5,

	init: function(){
		inventory_img.src="assets/HUD/inventory.png";
		inventory_slot_img.src="assets/HUD/inventory_slot.png";
	},
	render: function(cxt){
		if(!world.cinematic_mode){
		//drawing inventory if enabled
		
		cxt.save();
		cxt.globalAlpha=0.6;
		
		var the_w = current_item.width;
		var the_h = current_item.height;

		var the_x = Math.round((mouseX+world.grid.offsetX)/world.grid.blockScale)-Math.floor(current_item.width/2);
		var the_y = Math.round((mouseY+world.grid.offsetY)/world.grid.blockScale);

		cxt.drawImage(current_item.texture, the_x*world.grid.blockScale-world.grid.offsetX, the_y*world.grid.blockScale-world.grid.offsetY, current_item.width*world.grid.blockScale, current_item.height*world.grid.blockScale);
		cxt.restore();

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
					var block_img = the_block.texture;
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
			var block_img = current_item.texture;
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
		handleClick: function(button){
			if(show_full_inventory){
				if(button == 'left'){

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

				}else if(button == 'right'){

				}
			}
		}
	}
};