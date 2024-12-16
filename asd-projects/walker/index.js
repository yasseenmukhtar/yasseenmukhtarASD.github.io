/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    
    A: 65,
    W: 87,
    D: 68,
    S: 83,
    C: 67
  
  };

  var walker = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  }

  var walker2 = {
    positionX: 100,
    positionY: 100,
    speedX: 0,
    speedY: 0,
  }
  
  const BOARD_WIDTH = $('#board').width();
  const WALKER_WIDTH = $('#walker').width();
  const BOARD_HEIGHT = $('#board').height();
  const WALKER_HEIGHT = $('#walker').height();
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollisions();
    redrawGameItem();
    
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    if(event.which === KEY.UP){
      walker.speedY = -5
    }
    if(event.which === KEY.RIGHT){
      walker.speedX = 5
    }
    if(event.which === KEY.DOWN){
      walker.speedY = 5
    }
  
    if(event.which === KEY.A){
      walker2.speedX = -5;
    }
    if(event.which === KEY.W){
      walker2.speedY = -5;
    }
    if(event.which === KEY.D){
      walker2.speedX = 5;
    }
    if(event.which === KEY.S){
      walker2.speedX = 5;
    }
  }
  

  function handleKeyUp() {
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
    }
    if(event.which === KEY.UP){
      walker.speedY = 0;
    }
    if(event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
    if(event.which === KEY.DOWN){
      walker.speedY = 0;
    }
    
    if(event.which === KEY.A){
      walker2.speedX = 0;
    }
    if(event.which === KEY.W){
      walker2.speedY = 0;
    }
    if(event.which === KEY.D){
      walker2.speedX = 0;
    }
    if(event.which === KEY.S){
      walker2.speedX = 0;
    }
  
  };
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;

    walker2.positionX += walker2.speedX;
    walker2.positionY += walker2.speedY;
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.positionX)
    $("#walker").css("top", walker.positionY)
  
    $("#walker2").css("left", walker2.positionX)
    $("#walker2").css("top", walker2.positionY)

  }
  
  function wallCollisions() {
    if(walker.positionX > BOARD_WIDTH - WALKER_WIDTH || walker.positionX < 0 ) {
      walker.positionX -= walker.speedX;
    }
    if(walker.positionY < 0 || walker.positionY > BOARD_HEIGHT - WALKER_HEIGHT ){
      walker.positionY -= walker.speedY;
    }
  
  if(walker2.positionX > BOARD_WIDTH - WALKER_WIDTH || walker2.positionX < 0 ) {
      walker2.positionX -= walker2.speedX;
    }
    if(walker2.positionY < 0 || walker2.positionY > BOARD_HEIGHT - WALKER_HEIGHT ){
      walker2.positionY -= walker2.speedY;
    }
  
  
  
  
  
  }
  
  
  
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
