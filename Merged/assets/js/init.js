$(document).ready(function () {
    setTimeout(function () {
        $('.splash').fadeOut('slow');
    }, 2000)
})

// Declare default tools options
let fontWidth = 16;
let font = '24px sans-serif'

// color-picker
currentColor = "#f00";
$("#color-picker").spectrum({
    color: currentColor,
    showAlpha: true,
    showPalette: true,
    showSelectionPalette: true,
    palette: [
        ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
        ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"]
    ],
    change: function (color) {
        currentColor = color;
        console.log('currentColor:' + currentColor);
    }
});

// color-stroke-picker
currentStrokeColor = "#000";
$("#color-stroke-picker").spectrum({
    color: currentStrokeColor,
    showAlpha: true,
    showPalette: true,
    showSelectionPalette: true,
    palette: [
        ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
        ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"]
    ],
    change: function (color) {
        currentStrokeColor = color;
        console.log('currentStrokeColor:' + currentStrokeColor);
    }
});

// remove arrows from color-pickers
$('.sp-dd').html('');

// stroke-size
currentStrokeSize = $('.stroke-size').val();
$('.stroke-size').change(function () {
    if (isNaN($('.stroke-size').val()))
        $('.stroke-size').val(currentStrokeSize);
    else
        currentStrokeSize = $('.stroke-size').val();
    console.log('currentStrokeSize:' + currentStrokeSize);
});
$('#stroke-size-more').click(function () {
    $('.stroke-size').val(parseInt($('.stroke-size').val()) + 1).change();
});
$('#stroke-size-less').click(function () {
    $('.stroke-size').val(parseInt($('.stroke-size').val()) - 1).change();
});

// tools buttons
$('#tools button').click(function (e) {
    e.preventDefault();
    if (typeof $(this).attr('id') !== 'undefined') {
        console.log('currentFunction:' + $(this).attr('id'));
        currentFunction = eval('new Drawing' + $(this).attr('id') + '(contextReal,contextDraft);');
        $('#tools button').removeClass('active');
        $(this).toggleClass('active');
    }
});

// select default tool
$('#Brush').click();

// grid
$('.grid').click(function () {
    $(this).toggleClass('active');
    $('#canvas-grid').toggleClass('grid');
}).click();

// import image
$('button.import-file').click(function (e) {
    e.preventDefault();
    console.log('upload');
    $('input.upload').click();
});
$('input.upload').change(function () {
    var file = document.querySelector('input[type=file]').files[0];
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
        contextReal.drawImage(img, 0, 0);
    }
    img.src = url;
});

// Custom cursor
$('#canvas').hover(function () {
    $('#canvas').mousemove(function (e) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        $('.cursor').css('left', mouseX - currentStrokeSize / 2);
        $('.cursor').css('top', mouseY - currentStrokeSize);
        $('.cursor').css('width', currentStrokeSize);
        $('.cursor').css('height', currentStrokeSize);
        $('.cursor').css('backgroundColor', currentColor);
    })
})