var default_speed = 20.3;

var world = {
  
  background: '#1A98FC',
  blockDatabase: [],

  cinematic_mode: false,

  lastdrag: 0,

  gravity: 30,

  grid: {
    blockScale: 30,
    debugGrid: false,
    zoom: 1,
    spawn_location: [0, 0],
    offsetX: 0,
    offsetY: 0,
    dx: 0,
    dy: 0,
    speed: 0
  },

  //Block Types

  addBlock: function(block, x, y){
    this.blockDatabase.push(block);
  },

  init: function(){

    this.blockDatabase = [];
    
    BP.physics.createWorld(world.gravity, 30);

    //set spawn
    this.grid.offsetX = this.grid.spawn_location[0]*this.grid.blockScale;
    this.grid.offsetY = this.grid.spawn_location[1]*this.grid.blockScale;
    
  },

  logic: function(){
    BP.physics.tick();

    for(var i = 0; i < this.blockDatabase.length; i++){
      this.blockDatabase[i].tick();
    }

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
    
    var scale=world.grid.blockScale*world.grid.zoom;

    cxt.imageSmoothingEnabled = false;

    cxt.fillStyle = this.background;
    cxt.fillRect(0,0,width,height);

    for(var i = 0; i < this.blockDatabase.length; i++){

      this.blockDatabase[i].x = this.blockDatabase[i].physicsBody.worldBody.GetPosition().x*BP.physics.SCALE;
      this.blockDatabase[i].y = this.blockDatabase[i].physicsBody.worldBody.GetPosition().y*BP.physics.SCALE;
      
      var the_img = this.blockDatabase[i].blocktype.img;
      var the_x = Math.round(this.blockDatabase[i].x/world.grid.blockScale*scale)-world.grid.offsetX;
      var the_y = Math.round(this.blockDatabase[i].y/world.grid.blockScale*scale)-world.grid.offsetY;
      var the_w = Math.round(this.blockDatabase[i].width*world.grid.zoom);
      var the_h = Math.round(this.blockDatabase[i].height*world.grid.zoom);
      var angle = this.blockDatabase[i].rotation;
      
      cxt.save();
      cxt.translate(the_x, the_y);
      cxt.rotate(angle);
      cxt.translate(-the_x, -the_y);
      
      cxt.drawImage(the_img, 
        (the_x-(the_w/2)), 
        (the_y-(the_h/2)), 
        (the_w), 
        (the_h));

      cxt.restore();
    }
    
    if(world.grid.debugGrid){
      for(var x = 0; x < 200; x++){
        cxt.fillStyle="green";
        cxt.fillRect(x*scale-world.grid.offsetX, 0, 1, 1000);
        for(var y = 0; y < 200; y++){
          cxt.fillStyle="green";
          cxt.fillRect(0,y*scale-world.grid.offsetY, width, 1);
        }
      }
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
    applyForceX: function(body, amount){
      body.ApplyForce(new BP.Vec(amount,0), body.GetWorldCenter());
    },
    applyForceY: function(body, amount){
      body.ApplyForce(new BP.Vec(0,amount), body.GetWorldCenter());
    },
    zoom: function(amount){
      if(world.grid.zoom+amount <= 5 && world.grid.zoom+amount >= .4){
        world.grid.zoom += amount;
      }
    },
    keyDown: function(e){
      
    },
    keyUp: function(e){
      
    },
    mouseDown: function(e){

    },
    mouseDrag: function(e){
    
    },
    mouseUp: function(e){

    },
  }

  
};

class Block{
  constructor(blocktype, x, y){
    this.blocktype = blocktype;
  
    this.dynamic = blocktype.dynamic;
    this.density = blocktype.density;
    this.friction = blocktype.friction;
    this.restitution = blocktype.restitution;
    
    this.currentScale = world.grid.blockScale;

    this.x = x*this.currentScale;
    this.y = y*this.currentScale;
    this.width = blocktype.width*this.currentScale;
    this.height = blocktype.height*this.currentScale;

    this.rotation = 0;


    this.physicsBody = new BPRect({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      
      dynamic: this.blocktype.dynamic,
      density: this.blocktype.density,
      friction: this.blocktype.friction,
      restitution: this.blocktype.restitution,
    });
  }
  tick (){
    this.x = this.physicsBody.worldBody.GetPosition().x*BP.physics.SCALE;
    this.y = this.physicsBody.worldBody.GetPosition().y*BP.physics.SCALE;
    this.rotation = this.physicsBody.worldBody.GetAngle();
  }
}