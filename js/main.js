var width = 1280, height = 720, cxt, canvas; 

window.onload = function(){
  
  init();
    

  
  function draw(){
    world.render(cxt);
  }

  function logic(){
    world.logic();

  }
  
   function init(){
    world.init();
    world.addBlock(blockTypes.ground, 0,12);
    world.addBlock(blockTypes.ground, -40,13);
    world.addBlock(blockTypes.ground, -80,12);
    world.addBlock(blockTypes.ground, 40,12);
    world.addBlock(blockTypes.ground, 80,14);
    world.addBlock(blockTypes.ground, 120,13);
    world.addBlock(blockTypes.ground, 160,12);
    world.addBlock(blockTypes.ground, 200,13);

    world.addBlock(blockTypes.house, 10,7);
    
     
    canvas = $('.gamescreen')[0];
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    cxt = canvas.getContext('2d');

    exoroInit(cxt, canvas, draw, logic);
  }

}

