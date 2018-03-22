class DrawingSticker extends PaintFunction{
    constructor(contextReal, contextDraft){
        super();
        $('.main-function').hide();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        $('.sticker-panel').fadeIn(220); 
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
        var sticker = document.getElementById('selected-sticker').getElementsByTagName('img')[0];
        context.drawImage(sticker, coord[0]-77, coord[1]-77);
    }
}