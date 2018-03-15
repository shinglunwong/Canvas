class lineTool extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;

    }
    onMouseDown(coord, event) {
        this.contextDraft.strokeStyle = currentColor;
        this.contextReal.strokeStyle = currentColor;
        this.contextDraft.lineJoin = "round";
        this.contextDraft.lineWidth = 5;
        this.contextReal.lineJoin = "round";
        this.contextReal.lineWidth = 5;
        this.origX = coord[0];
        this.origY = coord[1];
    }

    onDragging(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.origX, this.origY);
        this.contextDraft.lineTo(coord[0], coord[1]);
        this.contextDraft.stroke();
    }
    onMouseMove() {
    }
    onMouseUp(coord, event) { 
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.origX, this.origY);
        this.contextReal.lineTo(coord[0], coord[1]);
        this.contextReal.stroke();}
    onMouseLeave() { }
    onMouseEnter() { }
}