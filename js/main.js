var width = 1280, height = 720, cxt, canvas; 

window.onload = function(){
  
  init();
    

  
  function draw(){
    stateManager.render(cxt);
  }

  function logic(){
    stateManager.logic();
  }
  
   function init(){ 
    canvas = $('.gamescreen')[0];
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    cxt = canvas.getContext('2d');

    stateManager.init()

    exoroInit(cxt, canvas, draw, logic);
    
    }

}

