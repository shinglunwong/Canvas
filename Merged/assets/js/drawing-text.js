class DrawingText extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.height = null;
        this.width = null;
        this.typing = false;
        $('.text-panel').fadeIn(220);
    }

    onMouseDown(coord, event) {
        if (!typing) {
            styleSet();
            this.contextDraft.strokeStyle = 'black';
            this.contextReal.strokeStyle = 'transparent';
            this.contextDraft.lineWidth = 5;
            this.contextDraft.fillStyle = 'transparent';
            this.contextReal.fillStyle = 'transparent';
            this.contextReal.font = `${sizeFont}px ${familyFont}`
            this.contextReal.textAlign = "center";
            this.contextReal.textBaseline = "middle";
            this.origX = coord[0];
            this.origY = coord[1];
        }
    }
    onDragging(coord, event) {
        if (!typing) {
            this.draw(coord, event, this.contextDraft)
        }
    }

    onMouseMove() { }

    onMouseUp(coord) {
        if (!typing) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            typing = true;
            this.textInput(coord);
            resetPosition();
        }
    }
    onMouseLeave() { }
    onMouseEnter() { }
    onKeydown() { }

    draw(coord, event, context) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.beginPath();
        this.width = coord[0] - this.origX;

        //For Square
        if (shifting) {
            if (coord[1] - this.origY < 0) {
                this.height = -Math.abs(coord[0] - this.origX);
            }

            else {
                this.height = Math.abs(coord[0] - this.origX);
            }
        }
        //For Rectangle
        else {
            this.width = coord[0] - this.origX;
            this.height = coord[1] - this.origY;
        }
        context.rect(this.origX, this.origY, this.width, this.height);
        context.closePath();
        context.stroke();
        context.fill();
    }
    textInput(coordInput) {

        //Update variables to shift origX and origY to top-left corner
        this.width = Math.abs(this.width);
        this.height = Math.abs(this.height);

        if (coordInput[0] - this.origX < 0) {
            this.origX -= this.width;
        }
        if (coordInput[1] - this.origY < 0) {
            this.origY -= this.height;
        }

        var x = this.origX + this.width / 2 -1;
        var y = this.origY + this.height / 2 ;
        var width = this.width;

        var textReal = this.contextReal;

        $('#canvas').append(`<form class='textInputForm' style=" top:${this.origY}px; left:${this.origX}px;">
                <input class='textInput' style='height:${this.height + 1}px; width:${this.width + 1}px;' type="text" placeholder='Input text here'>
            </form>`);
        $('.textInput').focus();
        
        $('.textInput').css({fontSize: `${sizeFont}px`, fontFamily: familyFont, color: currentColor, transform: `rotate(${textAngle}deg)`})

        $('#canvas').on('mouseenter','.textInput', function() {
            $('.cursors').hide()
        })
        $('#canvas').on('mouseleave','.textInput', function() {
            $('.cursors').show()
        })
        
        $('#canvas').on('submit', '.textInputForm', function (e) {
            textReal.font = `${sizeFont}px ${familyFont}`
            var angle = textAngle;
            e.preventDefault();
            textReal.fillStyle = currentColor;

            var message = $('.textInput').val();
            textReal.translate(x, y)
            textReal.rotate((Math.PI / 180) * angle);
            textReal.fillText(message, 0, 0);
            textReal.translate(-x - canvas.width / 2, -y - canvas.height / 2)
            textReal.setTransform(1, 0, 0, 1, 0, 0);

            $('#canvas').off('submit', '.textInputForm')
            $('.textInputForm').remove()
            $('.cursors').show()
            typing = false;

            saveMove();
        })
    }
}