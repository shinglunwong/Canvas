let currentFunction = new DrawingLine(contextReal, contextDraft);
let currentColor = 'black';

$('.draw-line').on('click', function () {
    currentFunction = new DrawingLine(contextReal, contextDraft);
})
$('.line').on('click', function () {
    currentFunction = new lineTool(contextReal, contextDraft);
})
$('.eraser').on('click', function () {
    currentFunction = new Eraser(contextReal, contextDraft);
})
$('.draw-rectangle').on('click', function () {
    currentFunction = new DrawingRectangle(contextReal, contextDraft);
})

$('.parent').hover(function () {
    $('.parent').mousemove(function (e) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        $('.cursor').css('left', mouseX);
        $('.cursor').css('top', mouseY);
    })
})

$('.colour-picker').children().click(function(e){
    currentColor = $(this).css('background-color');
    $('.cursor').css('background-color', currentColor);
})
