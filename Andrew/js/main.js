let currentFunction = new DrawingLine(contextReal, contextDraft);
let currentColor = 'black';
let brushSize = 10;
let fillColor = 'black';



$('.draw-line').on('click', function () {
    currentFunction = new DrawingLine(contextReal, contextDraft);
})
$('.line').on('click', function () {
    currentFunction = new lineTool(contextReal, contextDraft);
})
$('.eraser').on('click', function () {
    currentColor = white;
    currentFunction = new Eraser(contextReal, contextDraft);
})
$('.draw-rectangle').on('click', function () {
    currentFunction = new DrawingRectangle(contextReal, contextDraft);
})
$('.polygon').on('click', function () {
    currentFunction = new DrawingPolygon(contextReal, contextDraft);
})
$('.circle').on('click', function () {
    currentFunction = new DrawingCircle(contextReal, contextDraft);
})
$('.text').on('click', function () {
    currentFunction = new TextInput(contextReal, contextDraft);
})

$('.parent').hover(function () {
    $('.parent').mousemove(function (e) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        $('.cursor').css('left', mouseX - brushSize/2);
        $('.cursor').css('top', mouseY - brushSize * 2);
        $('.cursor').css('width', brushSize);
        $('.cursor').css('height', brushSize);
    })
})

$('.colour-picker').children().click(function(e){
    currentColor = $(this).css('background-color');
    fillColor = $(this).css('background-color');
    $('.cursor').css('background-color', currentColor);
})
