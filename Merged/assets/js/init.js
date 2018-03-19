// Set Canvas dimension
$(document).ready(function(){
    $('.canvas-size').submit(function(e) {
        e.preventDefault();
        $('.splash').fadeOut('slow');
        var width = $("#width").val();
        var height = $("#height").val();
        $('#canvas canvas').attr("width",width).attr("height",height);
        $('#canvas, #canvas-grid.grid').css("width",width).css("height",height);        
      })
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

function styleSet () {
    contextDraft.strokeStyle = currentStrokeColor;
    contextReal.strokeStyle = currentStrokeColor;
    contextDraft.lineWidth = currentStrokeSize;
    contextReal.lineWidth = currentStrokeSize;
    contextDraft.fillStyle = currentColor;
    contextReal.fillStyle = currentColor;
    contextDraft.lineJoin = 'miter';
    contextReal.lineJoin = 'miter';
}

function resetPosition (){
    this.width = null;
    this.height = null;
    this.origX = null;
    this.origY = null;
}

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
        $('.cursor').css('left', mouseX);
        $('.cursor').css('top', mouseY);
        $('.cursor').css('width', currentStrokeSize * 0.5);
        $('.cursor').css('height', currentStrokeSize * 0.5);
        $('.cursor').css('backgroundColor', currentColor);
    })
})

// Shortcuts
$('[data-shortcut]').each(function () {
    var element = $(this);
    key = element.data('shortcut');

    $(document).on('keyup', null, String(key), function () {
        if(currentFunction.__proto__.constructor.name!='DrawingText') {    // no shortcut if typing text
            element.trigger('focus').trigger('click');

            if (element.prop('tagName').toLowerCase() === 'a') {
                window.location = element.attr('href');
            }
        }
    });
});

// mobile events
if(isMobile) {
    var mc = new Hammer(document.getElementById('canvas-draft'));
    mc.on("pan panend tap press pressup", function(e) {
        console.log('new event:'+e.type);
        //console.log(e);
        let mouseX = e.center.x-e.target.offsetParent.offsetLeft;
        //console.log('mouseX:'+mouseX);
        let mouseY = e.center.y-e.target.offsetParent.offsetTop;
        //console.log('mouseY:'+mouseY);
        if(e.type=='press' || e.type=='tap') {
            currentFunction.onKeydown(e);
            currentFunction.onClick([mouseX, mouseY], e);
        }
        else if(e.type=='pan') {
            currentFunction.onDragging([mouseX,mouseY],e);
        }
        else if(e.type=='panend' || e.type=='pressup') {
            currentFunction.onMouseUp([mouseX,mouseY],e);
        }
    });
}