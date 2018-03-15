class lineTool extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }
    onMouseDown(coord, event) {
        this.contextReal.fillStyle = currentColor;
        this.origX = coord[0];
        this.origY = coord[1];
    }

    onDragging(coord, event) {
        this.contextDraft.fillStyle = currentColor;
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.fillRect(this.origX, this.origY, coord[0] - this.origX, coord[1] - this.origY)
    }



let canvas = document.getElementById('canvasDraft');
let context = canvas.msGetInputContext('2d');
let dragging = false;



function drawLine(ctx, start, end) {
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
}
drawLine(ctx1, [0, 0], [100, 300]);
drawLine(ctx1, [100, 300], [400, 400]);
drawLine(ctx1, [400, 400], [0, 0]);






$('#canvasDraft').mousedown(function (e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
})