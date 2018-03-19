class DrawingBrush extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;            
    }
    
    onMouseDown(coord,event){
        styleSet();
        this.context.lineWidth = currentStrokeSize/2;
        this.context.strokeStyle = currentColor;
        this.context.beginPath();
        this.context.moveTo(coord[0],coord[1]);
        this.draw(coord[0],coord[1]);
    }
    onDragging(coord,event){
        this.draw(coord[0],coord[1]);
    }

    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();    
    }
}


// For eraser
class DrawingEraser extends DrawingBrush{
    constructor(contextReal){
        super();
        this.context = contextReal;
  
    }
    onMouseDown(coord,event){
        this.context.lineWidth = currentStrokeSize/2;
        this.context.strokeStyle = 'white';
        this.context.lineJoin = "round";
        // this.context.lineWidth = currentStrokeSize;
        this.context.beginPath();
    }
}