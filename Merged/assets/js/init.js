// Set Canvas dimension
$(document).ready(function () {
    var winWidth = $(window).width() - 100;
    var winHeight = $(window).height() - 120;
    $("#width").attr("value", winWidth);
    $("#height").attr("value", winHeight);
    $('#canvas canvas').attr("width", winWidth).attr("height", winHeight);
    $('.canvas-size').submit(function (e) {
        e.preventDefault();
        $('.splash').fadeOut('slow');
        var width = $("#width").val();
        var height = $("#height").val();
        $('#canvas canvas').attr("width", width).attr("height", height);
        $('#canvas, #canvas-grid.grid').css("width", width).css("height", height);
        contextReal.fillStyle = 'white';
        contextReal.fillRect(0, 0, canvasReal.width, canvasReal.height);
    })
    if (isMobile) {
        $('#canvas:hover + .cursors').hide();
    }

})

// color-picker
currentColor = "rgb(60, 116, 239)";
$("#color-picker").spectrum({
    preferredFormat: "rgb",
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
        $('.textInput').css('color', color);
        console.log('currentColor:' + currentColor);
    }
});

// color-stroke-picker
currentStrokeColor = "rgb(0, 0, 0)";
$("#color-stroke-picker").spectrum({
    preferredFormat: "rgb",
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
    cursorSize();
    changeFontSize();
});
$("#size-slider").slider();
$("#size-slider").on("change", function(slideEvt) {
    //console.log('new size:'+this.value);
    $(".stroke-size").val(parseInt(this.value)).change();
});

$('#selected-sticker').click(function () {
    $('.emoji-grid').toggle();
});

$('.emoji-grid img').click(function () {
    $('#selected-sticker').html($(this).parent().html());
    $('.emoji-grid').toggle();
});

$('.cursor').css('width', currentStrokeSize * 0.5); //defaults
$('.cursor').css('height', currentStrokeSize * 0.5);
$('.cursor-outer').css('width', currentStrokeSize * 0.5 + 10);
$('.cursor-outer').css('height', currentStrokeSize * 0.5 + 10);

function cursorSize() {
    $('.cursor').css('width', currentStrokeSize * 0.5);
    $('.cursor').css('height', currentStrokeSize * 0.5);
    $('.cursor-outer').css('width', currentStrokeSize * 0.5 + 10);
    $('.cursor-outer').css('height', currentStrokeSize * 0.5 + 10);
}

function styleSet() {
    contextDraft.strokeStyle = currentStrokeColor;
    contextReal.strokeStyle = currentStrokeColor;
    contextDraft.lineWidth = currentStrokeSize;
    contextReal.lineWidth = currentStrokeSize;
    contextDraft.fillStyle = currentColor;
    contextReal.fillStyle = currentColor;
    contextDraft.lineJoin = 'miter';
    contextReal.lineJoin = 'miter';
    contextDraft.shadowBlur = 0;
    contextReal.shadowBlur = 0;
}

function resetPosition() {
    this.width = null;
    this.height = null;
    this.origX = null;
    this.origY = null;
}

// tools buttons
$('#tools button').click(function (e) {
    e.preventDefault();
    $('.filter-desktop, .brush-panel, .sticker-panel, .text-panel, .shape-panel').hide();
    if (typeof $(this).attr('id') !== 'undefined') {
        console.log('currentFunction:' + $(this).attr('id'));
        currentFunction = eval('new Drawing' + $(this).attr('id') + '(contextReal,contextDraft);');
        $('#tools button').removeClass('active');
        $(this).toggleClass('active');
    }
});
$('.dropbtn').click(function(e){
    $('.dropdown-content').toggleClass('show');
});
// brush style
$('button.brush-style-2').click(function (e) {
    e.preventDefault();
    currentFunction = new DrawingBrush2(contextReal, contextDraft);
    $('.brush-panel button').removeClass('active'); 
    $(this).addClass('active');
})
$('button.brush-style-1').click(function (e) {
    e.preventDefault();
    currentFunction = new DrawingBrush1(contextReal, contextDraft);
    $('.brush-panel button').removeClass('active'); 
    $(this).addClass('active');
})
$('button.brush-style').click(function (e) {
    e.preventDefault();
    currentFunction = new DrawingBrush(contextReal, contextDraft);
    $('.brush-panel button').removeClass('active'); 
    $(this).addClass('active');
})

// select default tool
$('#Brush').click();
$('button.brush-style').click();

// grid
$('.grid').click(function () {
    $(this).toggleClass('active');
    $('#canvas-grid').toggleClass('grid');
}).click();

// grid
$('.new-project').click(function (e) {
    e.preventDefault();
    if(confirm("Are you sure you want to create a new project? Don't forget to save it ;)")===true) {
        location.reload();
    }
});

// clear
$('.clear').click(function () {
    $('.dropdown-content').removeClass('show');
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

}).click();

// import image
$('input.import-file').click(function (e) {
    e.preventDefault();
    console.log('upload');
    $('input.upload').click();
});
$('input.upload').change(function () {

    var file = document.querySelector('input[type=file]').files[0];
    var url = URL.createObjectURL(file);
    var img = new Image();
    var imgWidth = null;
    var imgHeight = null;
    img.crossOrigin = 'Anonymous';


    img.onload = function () {
        // EXIF.getData(this, function() {
        //     //console.log(EXIF.getAllTags(this));
        //     orientation = EXIF.getTag(this, "Orientation");
        //     console.log('orientation:'+orientation);
        // });
        console.log(this.width);
        console.log(this.height);
        if (this.width > this.height) {
            if (canvasReal.width / (this.width / this.height) > canvasReal.height) {
                imgHeight = canvasReal.height;
                imgWidth = imgHeight * (this.width / this.height);
            } else {
                imgWidth = canvasReal.width
                imgHeight = canvasReal.width * (this.height / this.width);
            }
        } else {
            if (canvasReal.height * (this.width / this.height > canvasReal.width)) {
                imgWidth = canvasReal.width;
                imgHeight = imgWidth * (this.height / this.width);
            } else {
                imgHeight = canvasReal.height;
                imgWidth = canvasReal.height * (this.width / this.height);
            }
        }
        $('#canvas canvas').attr("width", imgWidth).attr("height", imgHeight);
        $('#canvas, #canvas-grid.grid').css("width", imgWidth).css("height", imgHeight);
        contextReal.drawImage(img, 0, 0, imgWidth, imgHeight);
    }
    img.src = url;
    $('.splash').fadeOut('slow');

});

// Custom cursor
$('#canvas').hover(function () {
    $('#canvas').mousemove(function (e) {
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        $('.cursor').css('left', mouseX);
        $('.cursor').css('top', mouseY);
        $('.cursor').css('backgroundColor', currentColor);
        $('.cursor-outer').css('left', mouseX);
        $('.cursor-outer').css('top', mouseY);
    })
})

// Shortcuts
$('[data-shortcut]').each(function () {
    var element = $(this);
    key = element.data('shortcut');

    $(document).on('keyup', null, String(key), function () {
        if (currentFunction.__proto__.constructor.name != 'DrawingText') { // no shortcut if typing text
            element.trigger('focus').trigger('click');

            if (element.prop('tagName').toLowerCase() === 'a') {
                window.location = element.attr('href');
            }
        }
    });
});

// mobile events
if (isMobile) {
    var myElement = document.getElementById('canvas-draft');
    var mc = new Hammer.Manager(myElement);
    // var mc = new Hammer(document.getElementById('canvas-draft'));
    mc.add(new Hammer.Tap({
        event: 'singletap'
    }));
    mc.add(new Hammer.Pan());
    mc.add(new Hammer.Press());
    mc.on("pan panstart panend tap press pressup", function (e) {
    // mc.on("pan panstart panend panright panleft tap press pressup", function (e) {
        // e.stopPropagation();
        // e.preventDefault();
        // e.gesture.stopPropagation();
        // e.gesture.preventDefault();
        console.log('new event:' + e.type);
        //console.log(e);
        let mouseX = e.center.x - e.target.offsetParent.offsetLeft;
        //console.log('mouseX:'+mouseX);
        let mouseY = e.center.y - e.target.offsetParent.offsetTop;
        //console.log('mouseY:'+mouseY);
        if (e.type == 'press' || e.type == 'tap') {
            if (e.type == 'press') {
                shifting = true;
            }
            currentFunction.onKeydown(e);
            currentFunction.onClick([mouseX, mouseY], e);
        } else if (e.type == 'panstart') {
            currentFunction.onKeydown(e);
            currentFunction.onMouseDown([mouseX, mouseY], e);
            dragging = true;
        } else if (e.type == 'pan') {
            currentFunction.onDragging([mouseX, mouseY], e);
        // } else if (e.type == 'panright') {
        //     currentFunction.onPanRight();
        // } else if (e.type == 'panleft') {
        //     currentFunction.onPanLeft();
        } else if (e.type == 'panend' || e.type == 'pressup') {
            dragging = false;
            currentFunction.onMouseUp([mouseX, mouseY], e);
            shifting = false;
        }
    });
}

// Save function
var saveCanvasReal = $('#canvas-real');

$('.save').click(function () {
    console.log('save');
    $('.dropdown-content').removeClass('show');
    var dataURL = saveCanvasReal[0].toDataURL('image/jpeg', 1);
    this.href = dataURL;
})

// Undo function

var drawHistory = [];
var redoList = [];
$('.undo').click(function () {
    if (drawHistory.length == 0) {
        return
    } else if (drawHistory.length == 1) {
        contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    } else {
        var lastStep = new Image();
        lastStep.src = drawHistory[drawHistory.length - 2];
        lastStep.onload = function () {
            contextReal.drawImage(lastStep, 0, 0);
        };
    }
    redoList.push(drawHistory.pop());
})

$('.redo').click(function () {
    if (redoList.length == 0) {
        return
    } else {
        var nextStep = new Image();
        nextStep.src = redoList[redoList.length - 1];
        nextStep.onload = function () {
            contextReal.drawImage(nextStep, 0, 0);
        };
        drawHistory.push(redoList.pop());
    }
})

function saveMove() {
    var lastMove = saveCanvasReal[0].toDataURL('image/png', 1);
    drawHistory.push(lastMove);
    redoList = [];
}
$('.replay').click(function () {
    $('.dropdown-content').removeClass('show');
    replaySteps();
})

function replaySteps() {
    var replayIndex = 0;
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    var replayFunction = setInterval(function () {
        var replay = new Image();
        replay.src = drawHistory[replayIndex];
        replay.onload = function () {
            contextReal.drawImage(replay, 0, 0);
        }
        replayIndex++;
        if (replayIndex == drawHistory.length) {
            clearInterval(replayFunction);
        }
    }, 400)

}

// prev/next filter
$('.previous-filter').click(function () {
    currentFunction.onPanLeft();
    currentFunction.onMouseUp();
});
$('.next-filter').click(function () {
    currentFunction.onPanRight();
    currentFunction.onMouseUp();
});
$('.apply-filter').click(function () {
    shifting = true;
    currentFunction.onClick();
});


//custom font
var sizeFont = 30;
var familyFont = 'Roboto';

var allFonts = [];
var topFonts = [];

function changeFontSize(){
    sizeFont = currentStrokeSize;
    $('.textInput').css('fontSize', `${sizeFont}px`);
    console.log('fontsize: '+ $('.textInput').css('fontSize'))
}

$(function () {
    function getFonts() {
        return $.get(
            'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBHFvkerakVUs2uJ0Uw9a1RNAwRPYqrHew&sort=popularity'
        );
    }
    $.when(getFonts()).then(function (data) {
        allFonts = data.items;


        function getFontsCats(fontType, num) {
            var maxFonts = 0
            for (var i = 0; i < allFonts.length; i++) {
                if (allFonts[i].category == fontType) {
                    topFonts.push(allFonts[i])
                    maxFonts++
                }
                if (maxFonts == num) {
                    return
                }
            }
        }
        getFontsCats('sans-serif', 3);
        getFontsCats('display', 6)
        getFontsCats('handwriting', 6)
        fillFonts()
    })
    $('.select-font').change(function(e){
        var font = $(this).val();
        $('.textInput').css('fontFamily', font);

        familyFont = font;

        if (typing) {
            $('.textInput').focus();
        }
    })
})

function fillFonts() {
    for (i = 0; i < topFonts.length; i++) {
        console.log('fill');
        var font = topFonts[i].family;
        var url = font.replace(/ /g, "+");
        $('head').append(
            `<link href="https://fonts.googleapis.com/css?family=${url}" rel="stylesheet">`);
        $('.select-font').append(`<option style='font-family:"${font}"'>${font}</option>`);
    }
}

//text angle
textAngle = 0;
$('.text-rotate').change(function () {
    if (isNaN($('.text-rotate').val()))
        $('.text-rotate').val(textAngle);
    else
        textAngle = $('.text-rotate').val();
    console.log('textAngle:' + textAngle);

    $('.textInput').css('transform', `rotate(${textAngle}deg)`)
});
$('#text-rotate-more').click(function () {
    $('.text-rotate').val(parseInt($('.text-rotate').val()) + 15).change();
    if ($('.text-rotate').val() > 360) {
        $('.text-rotate').val(parseInt($('.text-rotate').val()) - 360)
    }
});
$('#text-rotate-less').click(function () {
    $('.text-rotate').val(parseInt($('.text-rotate').val()) - 15).change();
    if ($('.text-rotate').val() < 0) {
        $('.text-rotate').val(parseInt($('.text-rotate').val()) + 360)
    }
});