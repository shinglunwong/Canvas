class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.height = null;
        this.width = null;
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
    draw(coord, event, context) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        
        context.beginPath();
        this.width = Math.abs((coord[0] - this.origX) / 2);
        if (context == this.contextReal) {
            console.log('real')
        }
        //For circle
        if (shifting) {
            this.height = Math.abs((coord[0] - this.origX) / 2);
        }

        //For ellipse
        else {
            this.height = Math.abs((coord[1] - this.origY) / 2);
        }
        context.ellipse(this.origX + (coord[0] - this.origX) / 2, this.origY + (coord[1] - this.origY) / 2, this.width, this.height, 0, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        resetPosition();
    }
}
