// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(reddify);
  keepInbounds();
  applyFilterNoBackground(reddify);             // Apply the reddify filter
  applyFilterNoBackground(decreaseBlue);        // Apply the decreaseBlue filter
  applyFilterNoBackground(increaseGreenByBlue); // Apply the increaseGreenByBlue filter
  applySmudge();
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){
  for(var i = 0; i < image.length; i++) {
    for(var j = 0; j < image[i].length; j++) {
      var rgbString = image[i][j];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      //rgbNumbers[GREEN] = 0;
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
    
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function

function applyFilterNoBackground(filterFunction) {
  
  var backgroundColor = rgbStringToArray(image[0][0]);

  
  for(var i = 0; i < image.length; i++) {
    for(var j = 0; j < image[i].length; j++) {
      var rgbString = image[i][j];
      var rgbNumbers = rgbStringToArray(rgbString);

      
      if (!arraysEqual(rgbNumbers, backgroundColor)) {
        
        filterFunction(rgbNumbers);
      }

      // Convert the updated RGB values back to a string and store them
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
    }
  }
}


function arraysEqual(arr1, arr2) {
  return arr1[RED] === arr2[RED] && arr1[GREEN] === arr2[GREEN] && arr1[BLUE] === arr2[BLUE];
}


function applyAndRender() {
  
  applyFilterNoBackground(reddify);
  keepInbounds();
  applyFilterNoBackground(reddify);             
  applyFilterNoBackground(decreaseBlue);        
  applyFilterNoBackground(increaseGreenByBlue); 
  applySmudge();
  // Render the final image
  render($("#display"), image);
}


// TODO 5: Create the keepInBounds function
  function keepInbounds(num){
   return num > 255 ? 255 : num < 0 ? 0 : num; 
  }

// TODO 3: Create reddify function
function reddify(arr){
  arr[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(arr2){
  arr2[BLUE] = keepInbounds(arr2[BLUE] - 50);
}

function increaseGreenByBlue(arr2) {
  arr2[GREEN] = keepInbounds(arr2[GREEN] + arr2[BLUE]); 
}

//The simple challenge (smudge)
function smudge(currentPixel, neighborPixel) {
  
  const smudgeAmount = 0.5; 
  for (let i = 0; i < 3; i++) {
    currentPixel[i] = keepInbounds(currentPixel[i] + (neighborPixel[i] - currentPixel[i]) * smudgeAmount);
  }
}


function applySmudge() {
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[i].length; j++) {
      var currentPixel = rgbStringToArray(image[i][j]);
      
      
      if (j < image[i].length - 1) {
        var rightNeighbor = rgbStringToArray(image[i][j + 1]);
        smudge(currentPixel, rightNeighbor);
      }
      
      
      if (i < image.length - 1) {
        var downNeighbor = rgbStringToArray(image[i + 1][j]);
        smudge(currentPixel, downNeighbor);
      }
      
      
      image[i][j] = rgbArrayToString(currentPixel);
    }
  }
}