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
        styleSet();
        this.contextDraft.lineWidth = currentStrokeSize/2;
        this.contextReal.lineWidth = currentStrokeSize/2;
        this.contextDraft.strokeStyle = currentColor;
        this.contextReal.strokeStyle = currentColor;
        this.x.push(coord[0]);
        this.y.push(coord[1]);

        if (this.x.length == 1) {
            this.draw(this.contextDraft);
        }
        else if (this.x.length == 2) {
            this.draw(this.contextReal);
            this.x = [];
            this.y = [];
        }
    }

    onMouseMove(coord, event) {
        if (this.x.length == 1) {

            if (shifting) {
                if (Math.abs(coord[0] - this.x[0]) > Math.abs(coord[1] - this.y[0])) {
                    this.drawingX = coord[0];
                    this.drawingY = this.y[0];
                }
                else {
                    this.drawingX = this.x[0];
                    this.drawingY = coord[1];
                }
            }
            else {
                this.drawingX = coord[0];
                this.drawingY = coord[1];
            }
            this.draw(this.contextDraft);
        }
    }
    onMouseDown() { }
    onDragging() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(context) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.beginPath();
        context.moveTo(this.x[0], this.y[0]);
        for (var i = 1; i < this.x.length; i++) {
            context.lineTo(this.x[1], this.y[1]);
        }
        if (this.drawingX != '') {
            context.lineTo(this.drawingX, this.drawingY);
            this.drawingX = '';
            this.drawingY = '';
        }
        context.closePath();
        context.stroke();
    }
}