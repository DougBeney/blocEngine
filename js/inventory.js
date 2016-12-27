var inventory_img = new Image();
var inventory_slot_img = new Image();
var show_full_inventory = true;
var current_item = null;
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

		//drawing inventory if enabled
		if(show_full_inventory){
			var the_x = this.invslot_margin;
			var the_y = height-((this.invslot_size*5)+this.invslot_margin);
			var the_w = this.invslot_size*9;
			var the_h = this.invslot_size*5;

			cxt.drawImage(inventory_img, the_x, the_y, the_w, the_h);

			
			var counter = 0;
			var cur_row = 5;

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

						cxt.drawImage(block_img, the_x, the_y,the_w,the_h);

					}else{
						var the_w = this.invslot_item_size/block_ratio;
						var the_h = (this.invslot_item_size);
						var the_x = (this.invslot_margin+((this.invslot_size-the_w)/2))+this.invslot_size*counter;
						var the_y = (height-this.invslot_size*cur_row)+((this.invslot_size-the_h)/2)-this.invslot_margin;

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

	},
	logic: function(cxt){

	},
	runEvent: {
		toggleInventory: function(){
			show_full_inventory = !show_full_inventory;
		}
	}
};