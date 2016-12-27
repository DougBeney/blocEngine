var width = 1280, height = 720, cxt, canvas; 

window.onload = function(){
  
  init();
    
  
  function draw(){
    

    world.render(cxt);
    inventory.render(cxt);
  }

  function logic(){
    

    world.logic();
    inventory.logic();
  }
  
   function init(){ 
    canvas = $('.gamescreen')[0];
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    cxt = canvas.getContext('2d');
    exoroInit(cxt, canvas, draw, logic);
    
    world.init(true);
    inventory.init();
  }

}

