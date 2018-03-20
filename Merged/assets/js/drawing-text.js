class DrawingText extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.height = null;
        this.width = null;
        this.typing = false;
    }

    onMouseDown(coord, event) {
        if (!this.typing) {
            styleSet();
            this.contextReal.font = "30px Arial";
            this.contextReal.textAlign = "center";
            this.origX = coord[0];
            this.origY = coord[1];
        }
    }
    onDragging(coord, event) {
        if (!this.typing) {
            this.draw(coord, event, this.contextDraft)
        }
    }

    onMouseMove() { }

    onMouseUp(coord) {
        if (!this.typing) {
            this.draw(coord, event, this.contextReal);
            this.typing = true;
            this.textInput(coord);
            resetPosition();
            saveMove();
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

        var x = this.origX + this.width / 2;
        var y = this.origY + this.height / 2 + 15;
        var width = this.width;

        var contextFill = this.contextReal;
        $('#canvas').append(`
            <form class='textInputForm' style=" top:${this.origY}; left:${this.origX};">
                <input class='textInput' style='height:${this.height + 1}; width:${this.width + 1};' type="text" placeholder='Input text here'></input>
            </form>`)
        
        $('#canvas').on('submit', '.textInputForm', function (e) {
            e.preventDefault();
            contextFill.fillStyle = currentStrokeColor;
            var message = $('.textInput').val();
            contextFill.fillText(message, x, y, width)
            $('#canvas').off('submit', '.textInputForm')
            $('.textInputForm').remove()
        })
        
        this.typing = false;
    }
}