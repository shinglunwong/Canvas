class DrawingBrush extends PaintFunction {
    constructor(contextReal) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.brushPath = [];
        $('.brush-panel').fadeIn(220);
    }

    onMouseDown(coord, event) {
        styleSet();
        this.contextDraft.lineWidth = currentStrokeSize / 2;
        this.contextDraft.strokeStyle = currentColor;
        this.contextReal.lineWidth = currentStrokeSize / 2;
        this.contextReal.strokeStyle = currentColor;
        this.contextDraft.beginPath();
        this.contextReal.beginPath();
        this.brushPath[0] = [coord[0], coord[1]];
    }
    onDragging(coord, event) {
        this.brushPath.push([coord[0], coord[1]])
        this.draw(this.contextDraft);
    }

    onMouseMove() { }
    onMouseUp(coord, event) {
        this.draw(this.contextReal);
        this.brushPath = [];
        saveMove();
    }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(context) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.moveTo(this.brushPath[0][0], this.brushPath[0][1]);
        for (var i = 1; i < this.brushPath.length; i++) {
            context.lineTo(this.brushPath[i][0], this.brushPath[i][1]);
        }
        context.stroke();
    }
}


// For eraser
class DrawingEraser extends DrawingBrush {
    constructor(contextReal) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.brushPath = [];
    }
    onMouseDown(coord, event) {
        this.contextDraft.strokeStyle = 'white';
        this.contextReal.strokeStyle = 'white';
        this.contextDraft.beginPath();
        this.contextReal.beginPath();
    }
}

class DrawingBrush1 extends DrawingBrush{
    constructor(contextReal) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.brushPath = [];
    }
    onMouseDown(coord, event) {
        styleSet();
        this.contextDraft.lineWidth = currentStrokeSize / 2;
        this.contextDraft.strokeStyle = currentColor;
        this.contextReal.lineWidth = currentStrokeSize / 2;
        this.contextReal.strokeStyle = currentColor;
        this.contextDraft.shadowBlur =  10;
        this.contextReal.shadowBlur =  10;
        this.contextDraft.shadowColor = currentColor;
        this.contextReal.shadowColor = currentColor;
        this.contextDraft.beginPath();
        this.contextReal.beginPath();
    }
}
