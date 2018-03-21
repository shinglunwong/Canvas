class DrawingStamp extends PaintFunction{
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        $('.stamp-panel').fadeIn(220); 
    }
    
    onMouseDown(coord, event) {
        this.draw(this.contextReal, coord);
        saveMove();
    }
    onDragging(){}
    onMouseMove(coord, event) {
        this.draw(this.contextDraft, coord);
    }
    onMouseUp() {}
    onMouseLeave(){
        this.clearDraft();
    }
    onMouseEnter(){}
    draw(context, coord){
        this.clearDraft();
        var stamp = document.getElementById('selected-stamp').getElementsByTagName('img')[0];
        context.drawImage(stamp, coord[0]-77, coord[1]-77);
    }
}