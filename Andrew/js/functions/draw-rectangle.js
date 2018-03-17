class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord, event) {
        this.contextDraft.fillStyle = fillColor;
        this.contextReal.fillStyle = fillColor;
        this.contextDraft.strokestyle = currentColor;
        this.contextReal.strokestyle = currentColor;
        this.contextReal.lineWidth = brushSize;
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

        //For Square
        if (shifting) {
            if (coord[1] - this.origY < 0) {
                this.contextDraft.fillRect(this.origX, this.origY, coord[0] - this.origX, -Math.abs(coord[0] - this.origX));
            }
            else {
                this.contextDraft.fillRect(this.origX, this.origY, coord[0] - this.origX, Math.abs(coord[0] - this.origX));
            }
        }
        //For Rectangle
        else {
            this.contextDraft.fillRect(this.origX, this.origY, coord[0] - this.origX, coord[1] - this.origY)
        }
    }

    onMouseMove() { }

    onMouseUp(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        //For Square
        if (shifting) {
            console.log('shift')
            if (coord[1] - this.origY < 0) {
                this.contextReal.fillRect(this.origX, this.origY, coord[0] - this.origX, -Math.abs(coord[0] - this.origX));
            }
            else {
                this.contextReal.fillRect(this.origX, this.origY, coord[0] - this.origX, Math.abs(coord[0] - this.origX));
            }
        }
        //For Rectangle
        else {
            this.contextReal.fillRect(this.origX, this.origY, coord[0] - this.origX, coord[1] - this.origY)
        }
    }
    onMouseLeave() { }
    onMouseEnter() { }
    onClick() { }
}
