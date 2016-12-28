var requestAnimationFrame;

function exoroInit(cxt, canvas, drawCallback, logicCallback){
  /*Begin Initializing*/
  function init(){
    requestAnimationFrame  = window.requestAnimationFrame ||
                             window.mozRequestAnimationFrame ||
                             window.webkitRequestAnimationFrame ||
                             window.msRequestAnimationFrame;

   canvas.oncontextmenu = function() {
        return false;  
   } 

  }init();
  function loop(){
    cxt.clearRect(0,0,canvas.width,canvas.height);
    draw();
    logic();
    requestAnimationFrame(loop);
  }loop();
  /*End Initialization*/

  function draw(){
    drawCallback();
  }
  function logic(){
    logicCallback();
  }
}