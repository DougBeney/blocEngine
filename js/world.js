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
  cinematic_mode: false,

  grid: {
    blockScale: 20,
    spawn_location: [0, 0],
    offsetX: 0,
    offsetY: 0,
    dx: 0,
    dy: 0,
    speed: 0,
  },

  blockDatabase: [],

  //Block Types

  addBlock: function(blocktype,x,y){
    this.blockDatabase.push({
      blocktype: blocktype,
      x: x,
      y: y
    });
  },

  init: function(generateland){
    //set spawn
    this.grid.offsetX = this.grid.spawn_location[0]*this.grid.blockScale;
    this.grid.offsetY = this.grid.spawn_location[1]*this.grid.blockScale;

    if(generateland){
      world.addBlock(blockTypes.ground, 0,12);
      world.addBlock(blockTypes.ground, -40,13);
      world.addBlock(blockTypes.ground, -80,12);
      world.addBlock(blockTypes.ground, 40,12);
      world.addBlock(blockTypes.ground, 80,14);
      world.addBlock(blockTypes.ground, 120,13);
      world.addBlock(blockTypes.ground, 160,12);
      world.addBlock(blockTypes.ground, 200,13);

      world.addBlock(blockTypes.house, 10,7);
    }
    
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

    cxt.fillStyle = this.background;
    cxt.fillRect(0,0,width,height);
    
    for(var i = 0; i < this.blockDatabase.length; i++){
      var the_x=this.blockDatabase[i].x, the_y=this.blockDatabase[i].y, the_blocktype=this.blockDatabase[i].blocktype;
      var scale=this.grid.blockScale;

      cxt.imageSmoothingEnabled = false;

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
    }
  }

  
};