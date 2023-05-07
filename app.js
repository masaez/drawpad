let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let brushSize = 5; // default brush size
let brushColor = "black"; // default brush color
let isDrawing = false; // flag to track if the mouse is being clicked and dragged
let lines = []; // array to store line data for undo

function draw(event) {
    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;

    if (!isDrawing) {
        // exit if the mouse isn't being clicked and dragged
        return;
    }

    context.lineTo(x, y);
    context.lineWidth = brushSize * 2;
    context.strokeStyle = brushColor;
    context.stroke();
    context.beginPath();
    context.arc(x, y, brushSize, 0, 2 * Math.PI);
    context.fillStyle = brushColor;
    context.fill();
    context.beginPath();
    context.moveTo(x, y);
}

function changeBrushSize(size) {
    brushSize = size;
}

function changeBrushColor(color) {
    brushColor = color;
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - document.querySelector("p").clientHeight;

canvas.addEventListener("mousedown", function (event) {
    isDrawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    lines.push(context.getImageData(0, 0, canvas.width, canvas.height)); // add the current canvas data to the lines array for undo
    console.log({ lines });
});

canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", function () {
    isDrawing = false;
    context.beginPath();
});

document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        // undo the latest line
        if (lines.length > 0) {
            context.putImageData(lines[lines.length - 1], 0, 0); // restore the previous canvas data
            lines.pop(); // remove the current canvas data from the lines array
        }
    } else {
        switch (event.key) {
            case "1":
                changeBrushSize(1);
                break;
            case "2":
                changeBrushSize(3);
                break;
            case "3":
                changeBrushSize(5);
                break;
            case "4":
                changeBrushSize(7);
                break;
            case "5":
                changeBrushSize(9);
                break;
            case "r":
                changeBrushColor("red");
                break;
            case "g":
                changeBrushColor("green");
                break;
            case "b":
                changeBrushColor("blue");
                break;
            case "y":
                changeBrushColor("yellow");
                break;
            case "k":
                changeBrushColor("black");
                break;
            case "p":
                changeBrushColor("purple");
                break;
            default:
                break;
        }
    }
});
