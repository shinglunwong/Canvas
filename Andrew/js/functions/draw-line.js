class DrawingLine extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
    }

    onMouseDown(coord, event) {
        this.context.strokeStyle = currentColor;
        this.context.lineJoin = "miter";
        this.context.lineWidth = brushSize;
        this.context.beginPath();
        this.context.moveTo(coord[0], coord[1]);
        this.draw(coord[0], coord[1]);
    }
    onDragging(coord, event) {
        this.draw(coord[0], coord[1]);
    }

    onMouseMove() { }
    onMouseUp(coord, event) {
        this.context.lineTo(coord[0] + brushSize-1, coord[1]);
        this.context.stroke()
        // this.context.fillRect(coord[0], coord[1], brushSize,brushSize)
    }

    onMouseLeave() { }
    onMouseEnter() { }
    onClick() { }

    draw(x, y) {
        this.context.lineTo(x, y);
        this.context.moveTo(x, y);
        this.context.closePath();
        this.context.stroke();
    }
}