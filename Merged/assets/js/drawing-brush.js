class DrawingBrush extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
        $('.brush-panel').fadeIn(220);
        $('.shape-panel').hide();
    }

    onMouseDown(coord, event) {
        styleSet();
        this.context.beginPath();
        this.context.lineWidth = currentStrokeSize / 2;
        this.context.strokeStyle = currentColor;
        this.context.moveTo(coord[0], coord[1]);
        this.draw(coord[0], coord[1]);
    }
    onDragging(coord, event) {
        this.draw(coord[0], coord[1]);
    }

    onMouseMove() { }
    onMouseUp() {
        saveMove();
    }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(x, y) {
        this.context.lineTo(x, y);
        this.context.moveTo(x, y);
        this.context.closePath();
        this.context.stroke();
    }
}


// For eraser
class DrawingEraser extends DrawingBrush {
    constructor(contextReal) {
        super();
        this.context = contextReal;
        $('.brush-panel').hide();
    }
    onMouseDown(coord, event) {
        styleSet();
        this.context.strokeStyle = 'white';
        this.context.beginPath();
    }
}

class DrawingBrush1 extends DrawingBrush {
    constructor(contextReal) {
        super();
        this.context = contextReal;
    }
    onMouseDown(coord, event) {
        styleSet();
        this.context.lineWidth = currentStrokeSize / 2;
        this.context.strokeStyle = currentColor;
        this.context.shadowBlur = currentStrokeSize / 2;
        this.context.shadowColor = currentColor;
        this.context.beginPath();
    }
    onMouseUp(){
        this.context.shadowBlur = 0;
    }
}
