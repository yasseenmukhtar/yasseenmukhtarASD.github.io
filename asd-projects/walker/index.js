$(document).ready(runProgram);

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const WALKER_WIDTH = $("#walker").width();
  const BOARD_HEIGHT = $("#board").height();
  const WALKER_HEIGHT = $("#walker").height();
  const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,

    A: 65,
    D: 68,
    W: 87,
    S: 83,
  };

  // Game Item Objects
  var walker = {
    xPos: 0,
    yPos: 0,
    speedX: 0,
    speedY: 0,
    width: $("#walker").width(),
    height: $("#walker").height(),
  };

  var walker2 = {
    xPos: BOARD_WIDTH - WALKER_WIDTH,
    yPos: BOARD_HEIGHT - WALKER_HEIGHT,
    speedX: 0,
    speedY: 0,
    width: $("#walker2").width(),
    height: $("#walker2").height(),
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    wallCollision();
    handleCollision();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
    if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }

    if (event.which === KEY.A) {
      walker2.speedX = -5;
    }
    if (event.which === KEY.D) {
      walker2.speedX = 5;
    }
    if (event.which === KEY.W) {
      walker2.speedY = -5;
    }
    if (event.which === KEY.S) {
      walker2.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }

    if (event.which === KEY.DOWN || event.which === KEY.UP) {
      walker.speedY = 0;
    }

    if (event.which === KEY.A || event.which === KEY.D) {
      walker2.speedX = 0;
    }

    if (event.which === KEY.S || event.which === KEY.W) {
      walker2.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function wallCollision() {
    if (walker.xPos > BOARD_WIDTH - WALKER_WIDTH || walker.xPos < 0) {
      walker.xPos -= walker.speedX;
    }
    if (walker.yPos < 0 || walker.yPos > BOARD_HEIGHT - WALKER_HEIGHT) {
      walker.yPos -= walker.speedY;
    }

    if (walker2.xPos > BOARD_WIDTH - WALKER_WIDTH || walker2.xPos < 0) {
      walker2.xPos -= walker2.speedX;
    }
    if (walker2.yPos < 0 || walker2.yPos > BOARD_HEIGHT - WALKER_HEIGHT) {
      walker2.yPos -= walker2.speedY;
    }
  }

  function repositionGameItem() {
    walker.xPos += walker.speedX;
    walker.yPos += walker.speedY;

    walker2.xPos += walker2.speedX;
    walker2.yPos += walker2.speedY;
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.xPos);
    $("#walker").css("top", walker.yPos);

    $("#walker2").css("left", walker2.xPos);
    $("#walker2").css("top", walker2.yPos);
  }

  function doCollide(obj1, obj2) {
    // TODO: calculate and store the remaining
    // sides of the obj1
    obj1.leftX = obj1.xPos;
    obj1.topY = obj1.yPos;
    obj1.rightX = obj1.xPos + obj1.width;
    obj1.bottomY = obj1.yPos + obj1.height;
    // TODO: Do the same for obj2
    obj2.leftX = obj2.xPos;
    obj2.topY = obj2.yPos;
    obj2.rightX = obj2.xPos + obj2.width;
    obj2.bottomY = obj2.yPos + obj2.height;
    // TODO: Return true if they are overlapping, false otherwise

    if (
      obj2.rightX > obj1.leftX &&
      obj2.leftX < obj1.rightX &&
      obj2.bottomY > obj1.topY &&
      obj2.topY < obj1.bottomY
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleCollision() {
    if (doCollide(walker, walker2)) {
      changeColor();
      walker.xPos = 200;
    }
  }
  function changeColor() {
    //store current color of each walker
    var walkerColor = $("#walker").css("background-color");
    var walkerColor2 = $("#walker2").css("background-color");
    //switch colors
    $("#walker").css("background-color", walkerColor2);
    $("#walker2").css("background-color", walkerColor);
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
