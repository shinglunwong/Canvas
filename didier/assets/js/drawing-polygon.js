class DrawingPolygon extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.origX = [];
        this.origY = [];
    }
    
    onMouseDown(coord,event){
        this.contextReal.fillStyle = currentColor;
        this.origX.push(coord[0]);
        this.origY.push(coord[1]);
    }
    onDragging(coord,event){
        if(this.origX.length==2) {  // triangle
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX[0],this.origY[0]);
            this.contextDraft.lineTo(this.origX[1],this.origY[1]);
            this.contextDraft.lineTo(coord[0],coord[1]);
            this.contextDraft.stroke();
            this.contextDraft.fill();
        }
    }

    onMouseMove(){}
    onMouseUp(coord){
        if(this.origX.length==1) {  // 1 line
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.origX[0],this.origY[0]);
            this.contextDraft.lineTo(coord[0],coord[1]);
            this.contextDraft.stroke();
        }
        
    }
    onMouseLeave(){}
    onMouseEnter(){}
}