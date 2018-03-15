const canvasDraft = document.getElementById('canvasDraft');
const contextDraft = canvasDraft.getContext('2d');
const canvasReal = document.getElementById('canvasReal');
const contextReal = canvasReal.getContext('2d');

$('.parent').on('contextmenu', '#canvasDraft', function (e) {
    e.preventDefault();
})
let dragging = false;

$('.parent').on('mousedown', '#canvasDraft', function (e) {
    if (e.which == 1) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onMouseDown([mouseX, mouseY], e)
        dragging = true;
    }
});

$('.parent').on('mousemove', '#canvasDraft', function (e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    if (dragging) {
        currentFunction.onDragging([mouseX, mouseY], e);
    }
    currentFunction.onMouseMove([mouseX, mouseY], e);
});

$('.parent').on('mouseup', '#canvasDraft', function (e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseUp([mouseX,mouseY],e);
});

$('.parent').on('mouseleave', '#canvasDraft', function (e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseLeave([mouseX,mouseY],e);
});

$('.parent').on('mouseenter', '#canvasDraft', function (e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseEnter([mouseX,mouseY],e);
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
}    