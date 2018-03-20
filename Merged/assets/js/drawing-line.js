class DrawingLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.x = [];
        this.y = [];
        this.drawingX = '';
        this.drawingY = '';
    }
    onClick(coord, event) {
    }

    onMouseDown(coord, event) {
        styleSet();
        this.contextDraft.lineWidth = currentStrokeSize / 2;
        this.contextReal.lineWidth = currentStrokeSize / 2;
        this.contextDraft.strokeStyle = currentColor;
        this.contextReal.strokeStyle = currentColor;
        this.x.push(coord[0]);
        this.y.push(coord[1]);
    }
    onDragging(coord, event) {
        if (shifting) {
            if (Math.abs(coord[0] - this.x[0]) > Math.abs(coord[1] - this.y[0])) {
                this.x[1] = coord[0];
                this.y[1] = this.y[0];
            }
            else {
                this.x[1] = this.x[0];
                this.y[1] = coord[1];
            }
        }
        else {
            this.x[1] = coord[0];
            this.y[1] = coord[1];
        }
        this.draw(this.contextDraft);

    }
    onMouseUp(coord, event) {
        this.draw(this.contextReal);
        this.x = [];
        this.y = [];
    }
    onMouseMove() {
    }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(context) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.beginPath();
        context.moveTo(this.x[0], this.y[0]);
        context.lineTo(this.x[1], this.y[1]);
        context.closePath();
        context.stroke();
    }
}