class DrawingCircle extends PaintFunction {
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
        this.width = Math.abs(this.origX - coord[0]);

        //For circle
        if (shifting) {
            this.height = Math.abs(this.origX - coord[0]);
        }

        //For ellipse
        else {
            this.height = Math.abs(this.origY - coord[1]);
        }
        this.contextDraft.ellipse(this.origX, this.origY, this.width, this.height, 0, 0, 2 * Math.PI);
        this.contextDraft.stroke();
        this.contextDraft.fill();
    }
    onMouseMove() { }

    onMouseUp(coord) {

        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height)
        this.contextReal.beginPath();
        this.contextReal.ellipse(this.origX, this.origY, this.width, this.height, 0, 0, 2 * Math.PI);
        this.contextReal.closePath();
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