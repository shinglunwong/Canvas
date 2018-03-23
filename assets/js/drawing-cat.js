class DrawingCat extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.startX = '';
        this.startY = '';
    }

    onMouseDown(coord, event) {
        styleSet();
        this.contextReal.webkitImageSmoothingEnabled = false;
        this.contextReal.mozImageSmoothingEnabled = false;
        this.contextReal.imageSmoothingEnabled = false;
        this.contextDraft.webkitImageSmoothingEnabled = false;
        this.contextDraft.mozImageSmoothingEnabled = false;
        this.contextDraft.imageSmoothingEnabled = false;
        this.startX = coord[0];
        this.startY = coord[1];
    }
    onDragging(coord, event) {
        var cat = document.getElementsByClassName('rainbow')[0];
        var drawX = this.startX+currentStrokeSize * 6 * Math.floor((coord[0]-this.startX)/(currentStrokeSize * 6));
        var up_down = (coord[0]-this.startX)/(currentStrokeSize * 6 ) % 2;
        var drawY = this.startY+Math.floor(up_down)*currentStrokeSize * 3 / 2;
        this.contextReal.drawImage(cat, drawX, drawY, currentStrokeSize * 6, currentStrokeSize * 12);
        this.clearDraft();
        var cat = document.getElementsByClassName('cat')[0];
        this.contextDraft.drawImage(cat, coord[0], this.startY, currentStrokeSize * 16, currentStrokeSize * 11);
    }
    onMouseUp(coord, event) {
        this.clearDraft();
        var cat = document.getElementsByClassName('cat')[0];
        this.contextReal.drawImage(cat, coord[0], this.startY, currentStrokeSize * 16, currentStrokeSize * 11);
        saveMove();
    }
    onMouseMove(coord, event) {
        this.clearDraft();
        var cat = document.getElementsByClassName('cat')[0];
        this.contextDraft.drawImage(cat, coord[0], coord[1], currentStrokeSize * 16, currentStrokeSize * 11);
    }
}
