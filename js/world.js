class Block{
  constructor(width,height,texture){
    this.width = width;
    this.height = height;
    var texture_image = new Image();
    texture_image.src = texture;
    this.texture = texture_image;
  }
}


var world = {
  
  background: '#1A98FC',

  grid: {
    blockScale: 50,
    spawn_location: [0, 0],
    offsetX: 0,
    offsetY: 0,
    dx: 0,
    dy: 0,
    speed: 20.3,
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

  init: function(){
    //set spawn
    this.grid.offsetX = this.grid.spawn_location[0]*this.grid.blockScale;
    this.grid.offsetY = this.grid.spawn_location[1]*this.grid.blockScale;
  },

  logic: function(){
    this.grid.offsetX -= this.grid.dx;
    this.grid.offsetY -= this.grid.dy;
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

  }
};