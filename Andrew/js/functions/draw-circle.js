class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        var draft = this.contextDraft;
    }

    onMouseDown(coord, event) {
        this.contextReal.fillStyle = fillColor;
        this.contextReal.strokestyle = currentColor;
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord, event) {
        this.contextDraft.fillStyle = currentColor;
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.beginPath();
        if (shifting) {
            this.contextDraft.ellipse(this.origX, this.origY, Math.abs(this.origX - coord[0]), Math.abs(this.origX - coord[0]), 0, 0, 2 * Math.PI);
        }
        else {
            this.contextDraft.ellipse(this.origX, this.origY, Math.abs(this.origX - coord[0]), Math.abs(this.origY - coord[1]), 0, 0, 2 * Math.PI);
        }
        this.contextDraft.fill();
    }
    onMouseMove() { }

    onMouseUp(coord) {

        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height)
        this.contextReal.beginPath();

        if (shifting) {
            this.contextReal.ellipse(this.origX, this.origY, Math.abs(this.origX - coord[0]), Math.abs(this.origX - coord[0]), 0, 0, 2 * Math.PI);
        }
        else {
            this.contextReal.ellipse(this.origX, this.origY, Math.abs(this.origX - coord[0]), Math.abs(this.origY - coord[1]), 0, 0, 2 * Math.PI);
        };
        this.origX = 0;
        this.origY = 0;
        this.contextReal.fill();
    }

    onMouseLeave() { }
    onMouseEnter() { }
    onClick() { }
}