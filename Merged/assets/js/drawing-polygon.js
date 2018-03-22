class DrawingPolygon extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.angles = 100;
        this.x = [];
        this.y = [];
        this.drawingX = '';
        this.drawingY = '';
        $('.shape-panel').fadeIn(220);
    }
    onClick(coord, event) {
        styleSet();
        this.contextReal.lineWidth =  this.contextReal.lineWidth/2;

        // End polygon
        if (coord[0] < this.x[0] + 20 && coord[0] > this.x[0] - 20 && coord[1] < this.y[0] + 20 && coord[1] > this.y[0] - 20 && this.x.length > 0) {
            this.draw(this.contextReal);
            this.x = [];
            this.y = [];
        }
        else {
            this.x.push(coord[0]);
            this.y.push(coord[1]);

            if (this.x.length < this.angles) {
                this.draw(this.contextDraft);
            }
            else if (this.x.length == this.angles) {
                this.draw(this.contextReal);
            }
        }
        saveMove();
    }

    onMouseMove(coord, event) {
        if (this.x.length > 0) {
            this.drawingX = coord[0];
            this.drawingY = coord[1];

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
        if (context == this.contextDraft) {
            contextDraft.strokeStyle = 'black';
            contextDraft.lineWidth = 2;
            this.contextDraft.fillStyle = 'transparent';
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.x[0] - 10, this.y[0] - 10);
            this.contextDraft.lineTo(this.x[0] + 10, this.y[0] - 10);
            this.contextDraft.lineTo(this.x[0] + 10, this.y[0] + 10);
            this.contextDraft.lineTo(this.x[0] - 10, this.y[0] + 10);
            this.contextDraft.closePath();
            this.contextDraft.stroke();
            contextDraft.strokeStyle = currentStrokeColor;
            contextDraft.lineWidth = currentStrokeSize/2;
        }

        context.beginPath();
        context.moveTo(this.x[0], this.y[0]);
        for (var i = 1; i < this.x.length; i++) {
            context.lineTo(this.x[i], this.y[i]);
        }
        if (this.drawingX != '') {
            context.lineTo(this.drawingX, this.drawingY);
            this.drawingX = '';
            this.drawingY = '';
        }
        context.closePath();
        if (context == this.contextReal) {
            context.fill();
        }
        context.closePath();
        context.stroke();
    }
}