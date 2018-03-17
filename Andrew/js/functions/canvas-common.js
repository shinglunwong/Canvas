const canvasDraft = document.getElementById('canvasDraft');
const contextDraft = canvasDraft.getContext('2d');
const canvasReal = document.getElementById('canvasReal');
const contextReal = canvasReal.getContext('2d');

$('.parent').on('contextmenu', '#canvasDraft', function (e) {
    e.preventDefault();
})
let dragging = false;
let shifting = false;
let leftCanvas = false;

$('.parent').on('mousedown', '#canvasDraft', function (e) {
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onMouseDown([mouseX, mouseY], e)
    dragging = true;
});

$(document).on('keydown', function (e) {
    if (e.which == 16) {
        shifting = true;
    }
    currentFunction.onKeydown(e)
})

$(document).on('keyup', function (e) {
    if (e.which == 16) {
        shifting = false;
    }
})

$(document).on('mousemove', '#canvasDraft', function (e) {
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    if (dragging) {
        currentFunction.onDragging([mouseX, mouseY], e);
    }
    else {
        currentFunction.onMouseMove([mouseX, mouseY], e);
    }
});

$(window).on('mouseup', function (e) {
    if (leftCanvas) {
        leftCanvas = false;
        currentFunction.clearDraft();
    }
})
$('.parent').on('mouseup', '#canvasDraft', function (e) {
    dragging = false;
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onMouseUp([mouseX, mouseY], e);
});

$('.parent').on('mouseleave', '#canvasDraft', function (e) {
    if (dragging) {
        leftCanvas = true;
    }
    dragging = false;
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onMouseLeave([mouseX, mouseY], e);
});

$('.parent').on('mouseenter', '#canvasDraft', function (e) {
    if (leftCanvas) {
        dragging = true;
        leftCanvas = false;
    }
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onMouseEnter([mouseX, mouseY], e);
});

$('.parent').on('click', '#canvasDraft', function (e) {
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onClick([mouseX, mouseY], e);
});


// To prevent undefined functions
class PaintFunction {
    constructor() { }
    onMouseDown() { }
    onDragging() { }
    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }
    onClick() { }
    clearDraft() {
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        contextDraft.closePath();
    }
    onKeydown() { };
}    