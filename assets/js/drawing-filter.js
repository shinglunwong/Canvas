class DrawingFilter extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        $('.main-function').hide();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.filters = ['filter1.png', 'filter2.png', 'filter3.png', 'filter4.png'];
        this.currentFilter = 0;
        this.draw(this.contextDraft);
        this.filterUpdate = false;
        $('.filter-desktop').fadeIn(220);
    }
    onPanRight() {
        // apply next filter on draft
        if(!this.filterUpdate) {
            this.currentFilter++;
            if(this.currentFilter>=this.filters.length)
                this.currentFilter-=this.filters.length;
            this.filterUpdate = true;
        }
    }
    onPanLeft() {
        // apply previous filter on draft
        if(!this.filterUpdate) {
            this.currentFilter--;
            if(this.currentFilter<0)
                this.currentFilter+=this.filters.length;
            this.filterUpdate = true;
        }
    }
    onClick() {
        if (shifting) {
            this.draw(this.contextReal);
        }
        shifting = false;
    }
    onMouseUp() {
        this.draw(this.contextDraft);
        this.filterUpdate = false;
    }
    draw(context) {
        console.log('draw filter '+this.currentFilter);
        this.clearDraft();
        let img = new Image();
        var imgWidth = null;
        var imgHeight = null;
        img.src = 'assets/filters/' + this.filters[this.currentFilter];
        img.onload = function () {
            if(canvasReal.height > canvasReal.width) {  // filter width ajusted to canvas width
                imgWidth = canvasReal.width;
                imgHeight = canvasReal.width / (this.width / this.height);
            }
            else {
                imgWidth = this.width/2;
                imgHeight = this.height/2;
            }
            context.drawImage(img, 0, 0, imgWidth, imgHeight);
            if(context.canvas.id=='canvas-real') {
                saveMove();
            }
        };
    }
}