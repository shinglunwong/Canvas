class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord, event) {
        styleSet();
        this.height = null;
        this.width = null;
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.beginPath();

        //For Square
        if (shifting) {
            if (coord[1] - this.origY < 0) {
                this.width = coord[0] - this.origX;
                this.height = -Math.abs(coord[0] - this.origX);
            }

            else {
                this.width = coord[0] - this.origX;
                this.height = Math.abs(coord[0] - this.origX);
            }
        }
        //For Rectangle
        else {
            this.width = coord[0] - this.origX;
            this.height = coord[1] - this.origY;
        }
        this.contextDraft.rect(this.origX, this.origY, this.width, this.height);
        this.contextDraft.stroke();
        this.contextDraft.fill();
    }

    onMouseMove() { }

    onMouseUp(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.rect(this.origX, this.origY, this.width, this.height);
        this.contextReal.stroke();
        this.contextReal.fill();
        this.width = null;
        this.height = null;
        this.origX = null;
        this.origY = null;
    }
    onMouseLeave() { }
    onMouseEnter() { }
    onClick() { }
}
