let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let currentColor;
let shifting = false;
let leftCanvas = false;
let typing = false;
contextReal.imageSmoothingEnabled = true;
contextDraft.imageSmoothingEnabled = true;

$('#canvas').on('contextmenu', '#canvas-draft', function (e) {
    e.preventDefault();
})

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
$(window).on('mouseup', function (e) {
    if (leftCanvas) {
        leftCanvas = false;
        currentFunction.clearDraft();
    }
})
$('#canvas-draft').mousedown(function (e) {
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onMouseDown([mouseX, mouseY], e);
    dragging = true;

});

$('#canvas-draft').mousemove(function (e) {
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    if (dragging) {
        currentFunction.onDragging([mouseX, mouseY], e);
    } else {
        currentFunction.onMouseMove([mouseX, mouseY], e);
    }
});

$('#canvas-draft').mouseup(function (e) {
    dragging = false;
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onMouseUp([mouseX, mouseY], e);
});

$('#canvas-draft').mouseleave(function (e) {
    if (dragging) {
        leftCanvas = true;
    }
    dragging = false;
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onMouseLeave([mouseX, mouseY], e);
});

$('#canvas-draft').mouseenter(function (e) {
    if (leftCanvas) {
        dragging = true;
        leftCanvas = false;
    }
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onMouseEnter([mouseX, mouseY], e);
});
$('#canvas-draft').click(function (e) {
    let mouseX = e.offsetX - this.offsetLeft;
    let mouseY = e.offsetY - this.offsetTop;
    currentFunction.onClick([mouseX, mouseY], e);
})

class PaintFunction {
    constructor() {
        this.clearDraft();
    }
    onMouseDown() { }
    onDragging() { }
    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }
    onClick() { }
    onKeydown() { }
    clearDraft() {
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        contextDraft.closePath();
    }
}

$('body').on('mousedown', function (e) {
    if (typing) {
        if ($(e.target).parents('.text-panel').length > 0 || $(e.target).hasClass('textInput') || $(e.target).parents('.change-stroke-size').length > 0 || $(e.target).hasClass('change-stroke-size'))  {
            console.log('no problem')
            return
        }
        else {
            $('#canvas').off('submit', '.textInputForm')
            $('.textInputForm').remove();
            typing = false;
        }
    }
})