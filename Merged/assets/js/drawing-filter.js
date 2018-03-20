class DrawingFilter extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.filters = ['filter1.png', 'filter2.png', 'filter3.png'];
        this.currentFilter = 0;
        this.draw(this.contextDraft);
        this.filterUpdate = false;
        if(!isMobile) {
            $('.filter-desktop').show();
        }
    }
    onPanRight() {
        // apply next filter on draft
        if(!this.filterUpdate) {
            this.currentFilter++;
            this.filterUpdate = true;
        }
    }
    onPanLeft() {
        // apply previous filter on draft
        if(!this.filterUpdate) {
            this.currentFilter--;
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
        console.log('draw filter '+this.currentFilter % this.filters.length);
        this.clearDraft();
        let img = new Image();
        img.src = 'assets/filters/' + this.filters[this.currentFilter % this.filters.length];
        img.onload = function () {
            context.drawImage(img, 0, 0);
        };
    }
}