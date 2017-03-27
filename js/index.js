/*
 * index.js
 * Put your JavaScript in here
 */

"use strict;"

var canvas;					// canvas is the element
var context;				// context is what we draw in
var insideCanvas = false;	// pointer inside canvas?
var drawScribble = false; 	// drawing or moving?
var currX = 0, currY = 0;	// Where the mouse is
var prevX = 0, prevY = 0;	// Where the mouse was

var inactiveCanvasBorder = "1px solid #c3c3c3";
var activeCanvasBorder   = "1px solid #000000";


/* wait until all phonegap/cordova is loaded then call onDeviceReady*/
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	alert('onDeviceReady');
    function init()
    {
        // Get the canvas and get a 2d drawing context
        canvas = document.getElementById('drawingCanvas');
        context = canvas.getContext('2d');

        // set inital conditions
        clearCanvas();
        setColor('black');
        setLineWidth('1');
    }
}

function clearCanvas()
{
    // The following numeric values are dependent on the size of canvas
    context.clearRect(0,0, 500, 500);
    context.fillText("Copyright 2016, Dan Mazzola & ABOR", 326, 497)
}

function mouseMoved(event)
{
    prevX = currX;
    prevY = currY;
    currX = event.clientX - canvas.offsetLeft;
    currY = event.clientY - canvas.offsetTop;
    document.getElementById("XYCoords").innerHTML =
        "Coordinates: (" + currX + "," + currY + ")";
    drawLine();
}

function mouseLeftCanvas(event)
{
    document.getElementById("XYCoords").innerHTML =
        "Coordinates:";
    document.getElementById("mouseInOut").innerHTML =
        "Outside of Canvas";
    document.body.style.cursor = 'auto';
    document.getElementById("drawingCanvas").style.border =
        inactiveCanvasBorder;
    insideCanvas = false;
}

function mouseEnteredCanvas(event)
{
    document.getElementById("mouseInOut").innerHTML =
        "Inside of Canvas";
    document.body.style.cursor = 'crosshair';
    document.getElementById("drawingCanvas").style.border =
        activeCanvasBorder;
    insideCanvas = true;
}

function startDrawing(mouseEvent)
{
    prevX = event.clientX - canvas.offsetLeft;
    prevY = event.clientY - canvas.offsetTop;
    currX = prevX;
    currY = prevY;

    drawScribble = true;
    document.getElementById("mouseUpDown").innerHTML =
        "Mouse Button Down (drawing mode)";
}

function stopDrawing(mouseEvent)
{
    drawScribble = false;
    document.getElementById("mouseUpDown").innerHTML =
        "Mouse Button Up (moving mode)";
}

function drawLine()
{
    if (insideCanvas && drawScribble) {
		/* if (drawScribble) {  for mobile, insideCanvas will not be true */
        context.beginPath();
        context.moveTo(prevX, prevY);
        context.lineTo(currX, currY);
        context.stroke();
        context.closePath();
    }
}
function setColor(color) {
    switch(color) {
        case "black":
            context.strokeStyle="#000000";
            break;
        case "maroon":
            context.strokeStyle="#8C1D40";
            break;
        case "gold":
            context.strokeStyle="#FFC627";
            break;
    }
    document.getElementById("drawColor").innerHTML =
        "Drawing Color is " + color;
}

function setLineWidth(width) {
    context.lineWidth = width;
    document.getElementById("lineWidth").innerHTML =
        "Drawing Line " + width + " pixles wide";
}



