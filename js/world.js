class Block{
  constructor(width,height,texture){
    this.width = width;
    this.height = height;
    var texture_image = new Image();
    texture_image.src = texture;
    this.texture = texture_image;
  }
}
var default_speed = 20.3;

var world = {
  
  background: '#1A98FC',
  blockDatabase: [],

  cinematic_mode: false,

  lastdrag: 0,

  grid: {
    blockScale: 20,
    spawn_location: [0, 0],
    offsetX: 0,
    offsetY: 0,
    dx: 0,
    dy: 0,
    speed: 0,
  },

  //Block Types

  addBlock: function(blocktype,x,y){
    this.blockDatabase.push({
      blocktype: blocktype,
      x: x,
      y: y
    });
  },

  init: function(){

    this.blockDatabase = [];
    //set spawn
    this.grid.offsetX = this.grid.spawn_location[0]*this.grid.blockScale;
    this.grid.offsetY = this.grid.spawn_location[1]*this.grid.blockScale;

    world.addBlock(blockTypes.ground_large, 0,12);
    world.addBlock(blockTypes.ground_large, -40,13);
    world.addBlock(blockTypes.ground_large, -80,12);
    world.addBlock(blockTypes.ground_large, 40,12);
    world.addBlock(blockTypes.ground_large, 80,14);
    world.addBlock(blockTypes.ground_large, 120,13);
    world.addBlock(blockTypes.ground_large, 160,12);
    world.addBlock(blockTypes.ground_large, 200,13);

    world.addBlock(blockTypes.house, 10,7);
    
  },

  logic: function(){
    this.grid.offsetX -= this.grid.dx;
    this.grid.offsetY -= this.grid.dy;

    if(this.cinematic_mode){
      this.grid.speed = default_speed/5;
    }else{
      if(this.grid.speed != default_speed){
        this.grid.speed = default_speed;
      }
    }
  },
  
  render: function(cxt){

    cxt.imageSmoothingEnabled = false;

    cxt.fillStyle = this.background;
    cxt.fillRect(0,0,width,height);
    
    for(var i = 0; i < this.blockDatabase.length; i++){
      var the_x=this.blockDatabase[i].x, the_y=this.blockDatabase[i].y, the_blocktype=this.blockDatabase[i].blocktype;
      var scale=this.grid.blockScale;

      cxt.drawImage(the_blocktype.texture,the_x*scale-this.grid.offsetX,the_y*scale-this.grid.offsetY,the_blocktype.width*scale,the_blocktype.height*scale);

    }

  },
  runEvent: {
    move: function(direction, moveOnXAxis){
      if(moveOnXAxis){
        world.grid.dx = direction;
      }else{
        world.grid.dy = direction;
      }
    },
    zoom: function(amount){
      if(world.grid.blockScale+amount <= 75 && world.grid.blockScale+amount >= 10){
        world.grid.blockScale += amount;
      }
    },
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
        case plus:
          world.runEvent.zoom(2.5);
          break;
        case minus:
          world.runEvent.zoom(-2.5);
          break;
        case tilde:
          world.cinematic_mode = !world.cinematic_mode;
          inventory.runEvent.toggleInventory(2);
          break;
        case escape_key:
          stateManager.setSequence([mainMenu]);
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
            var block_x = world.blockDatabase[i].x*world.grid.blockScale-world.grid.offsetX;
            var block_y = world.blockDatabase[i].y*world.grid.blockScale-world.grid.offsetY;
            var block_w = world.blockDatabase[i].blocktype.width*world.grid.blockScale;
            var block_h = world.blockDatabase[i].blocktype.height*world.grid.blockScale;
            if(collision.intersects({x:mouseX,y:mouseY,w:1,h:1},
                                    {x: block_x,y:block_y,w:block_w,h:block_h}))
            {
              world.blockDatabase.splice(i,1);
              break;
            }
          }
        }

      }else if(e.button == 2){
          //right Click 
          if(!show_full_inventory && current_item != null){
            var block_in_the_way = false;
            for(var i in world.blockDatabase){
              var block_x = world.blockDatabase[i].x;
              var block_y = world.blockDatabase[i].y;
              var block_w = world.blockDatabase[i].blocktype.width;
              var block_h = world.blockDatabase[i].blocktype.height;

              var the_x = Math.round((mouseX+world.grid.offsetX)/world.grid.blockScale);
              var the_y = Math.round((mouseY+world.grid.offsetY)/world.grid.blockScale);

              if(collision.intersects({x:the_x,y:the_y,w:current_item.width,h:current_item.height},
                                      {x: block_x,y:block_y,w:block_w,h:block_h}))
              {
                block_in_the_way = true;
                break;
              }
            }
            if(!block_in_the_way){
              var the_x = Math.round((mouseX+world.grid.offsetX)/world.grid.blockScale);
              var the_y = Math.round((mouseY+world.grid.offsetY)/world.grid.blockScale);
              
                world.addBlock(current_item, the_x, the_y);
            }
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
           var block_w = world.blockDatabase[i].blocktype.width*world.grid.blockScale;
           var block_h = world.blockDatabase[i].blocktype.height*world.grid.blockScale;
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