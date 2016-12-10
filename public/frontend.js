var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');
var isDrawing = false;
var socket = io();
var xoffset = canvas.offsetLeft;
var yoffset = canvas.offsetTop;
var lastMousePosition = {};
var mousePosition = {};
var color = 'black';
var thicc = 5;
var canvas_copy = ctx.getImageData(0,30, 1200, 1200);
var historys = [];

drawCircle = function(x,y,color,thicc){
   ctx.strokeStyle = color;
   ctx.lineJoin = 'round';
   ctx.lineWidth = thicc;

   if (x) {
     console.log("inside draw function", x, y);
     ctx.beginPath();
     ctx.moveTo(x.x, x.y);
     ctx.lineTo(y.x, y.y);
     ctx.stroke();
   }
};

drawReplica = function(c){
  console.log(c);
  console.log("You're in replica");
  var newCanvas = document.createElement('canvas');
  var context = newCanvas.getContext('2d');
  newCanvas.width = c.width;
  newCanvas.height = c.height;
  context.drawImage(c, 0, 0);
  return newCanvas;
};


canvas.addEventListener('mousedown', function eventHandler(event) {
  isDrawing = true;
});

canvas.addEventListener('mouseup', function eventHandler(event) {
  isDrawing = false;
  lastMousePosition = {};
});

canvas.addEventListener('mousemove', function eventHandler(event) {
  if(isDrawing){
    
    mousePosition = { "x" : event.offsetX, "y" : event.offsetY};
    drawCircle(lastMousePosition, mousePosition, color, thicc);
    socket.emit('draw', [lastMousePosition, mousePosition, color, thicc]);
    lastMousePosition = mousePosition;
    historys.push({"x" :lastMousePosition, "y": mousePosition,"color": color, "thicc": thicc});
    console.log(historys);
  }
});

$('#redButton').click(function() {
  color = 'red';
  console.log(color);
  console.log('Color should now be red.');
});

$('#blueButton').click(function() {
  color = 'blue';
  console.log(color);
  console.log('Color should now be blue.');
});

$('#greenButton').click(function() {
  color = 'green';
  console.log(color);
  console.log('Color should now be green.');
});

$('#blackButton').click(function() {
  color = 'black';
  console.log(color);
  console.log('Color should now be black.');
});

$('#indigoButton').click(function() {
  color = 'indigo';
  console.log(color);
  console.log('Color should now be indigo.');
});

$('#brownButton').click(function() {
  color = 'saddlebrown';
  console.log(color);
  console.log('Color should now be brown.');
});

$('#orangeButton').click(function() {
  color = 'orange';
  console.log(color);
  console.log('Color should now be orange.');
});

$('#violetButton').click(function() {
  color = 'violet';
  console.log(color);
  console.log('Color should now be violet.');
});

$('#yellowButton').click(function() {
  color = 'yellow';
  console.log(color);
  console.log('Color should now be yellow.');
});

$('#greyButton').click(function() {
  color = 'grey';
  console.log(color);
  console.log('Color should now be grey.');
});

$('#thicc').on('click', function(e){
  thicc = $(this).val();
  console.log(thicc);
});

$('#eraser').click(function() {
  color = 'white';
  thicc = 10;
});


// console.log("the_canvas_copy: ", canvas_copy);
// socket.on("connection", function(){
//   socket.emit('give_canvas', historys);
// })


socket.on('replicate', function(coords) {
  coords.forEach(function(el){
    drawCircle(el[0], el[1], el[2], el[3]);
  });

});

socket.on('coordinates', function(coords) {
  drawCircle(coords[0], coords[1], coords[2], coords[3]);
  console.log(coords[0], coords[1]);
});
