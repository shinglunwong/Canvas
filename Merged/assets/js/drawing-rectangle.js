class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.height = null;
        this.width = null;
        $('.shape-panel').fadeIn(220);
    }

    onMouseDown(coord, event) {
        styleSet();
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord, event) {
        this.draw(coord, event, this.contextDraft)
    }

    onMouseMove() {
    }

    onMouseUp(coord, event) {
        this.draw(coord, event, this.contextReal);
        saveMove();
    }
    onMouseLeave() { }
    onMouseEnter() { }

    onClick() {
    }

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
        resetPosition();
    }
}