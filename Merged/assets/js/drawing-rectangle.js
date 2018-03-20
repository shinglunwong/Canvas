class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.clickMode = false;
        this.dragged = false;
    }

    onMouseDown(coord, event) {
        styleSet();
        this.height = null;
        this.width = null;
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
        context.stroke();
        context.fill();
        resetPosition()
    }
}
