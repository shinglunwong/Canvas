class DrawingTriangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.pointCount = 0;
    }
    onClick(coord, event) {
        if (this.pointCount == 0) {
            this.contextDraft.strokeStyle = currentColor;
            this.contextReal.strokeStyle = currentColor;
            this.contextReal.lineWidth = 5;
            this.contextReal.fillStyle = '#8ED6FF';
            console.log('click');
            this.x1 = coord[0];
            this.y1 = coord[1];
            this.pointCount++;

            // Draw a dot on first point
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.x1 - 2, this.y1 - 2);
            this.contextDraft.lineTo(this.x1 + 2, this.y1 + 2);
            this.contextDraft.lineTo(this.x1 - 2, this.y1 + 2);
            this.contextDraft.lineTo(this.x1 + 2, this.y1 - 2);
            this.contextDraft.stroke();

            // Draw line to second point
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.x1, this.y1);
        }
        else if (this.pointCount == 1) {
            console.log('click');
            this.x2 = coord[0];
            this.y2 = coord[1];
            this.pointCount++;
            this.contextDraft.lineTo(this.x2, this.y2);
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.stroke();
        }
        else if (this.pointCount == 2) {
            console.log('click');
            this.x3 = coord[0];
            this.y3 = coord[1];
            this.pointCount = 0;
            this.draw([this.x1, this.y1], [this.x2, this.y2], [this.x3, this.y3]);
        }
    }
    onMouseMove() { }
    onMouseDown() { }
    onDragging() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(coord1, coord2, coord3) {
        console.log('draw');
        console.log(coord1);
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.moveTo(coord1[0], coord1[1]);
        this.contextReal.lineTo(coord2[0], coord2[1]);
        this.contextReal.lineTo(coord3[0], coord3[1]);
        this.contextReal.lineTo(coord1[0], coord1[1]);
        this.contextReal.closePath();
        this.contextReal.fill();
        this.contextReal.stroke();
    }
}