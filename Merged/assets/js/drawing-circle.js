class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.clickMode = false;
        this.dragged = false;
    }

    onMouseDown(coord, event) {
        styleSet();
        this.height = null;
        this.width = null;
        if (!this.clickMode) {
            this.origX = coord[0];
            this.origY = coord[1];
        }
        if (this.clickMode) {
            console.log('clickmode off');
            console.log('draw click')
            this.draw(coord, event, this.contextReal);
            this.clickMode = false;
        }
        else {
            if (this.dragged) {
                this.draw(coord, event, this.contextReal);
                this.dragged = false;
                console.log('draw drag');
            }
            else if (this.dragged == false) {
                this.origX = coord[0];
                this.origY = coord[1];
                this.clickMode = true;
                console.log('clickmode on');
            }
        }
    }
    onDragging(coord, event) {
        if (Math.abs(coord[0] - this.origX) > 5 || Math.abs(coord[1] - this.origY) > 5) {
            this.dragged = true;
            this.draw(coord, event, this.contextDraft)
        }
    }
    onMouseMove(coord, event) {
        // if (this.clickMode) {
        this.draw(coord, event, this.contextDraft);
        // }
    }

    onMouseUp(coord, event) {
        if (this.dragged == true) {
        console.log('hi')
        this.draw(coord, event, this.contextReal)
        }
    }

    onMouseLeave() { }
    onMouseEnter() { }
    onClick(coord, event) {
        // if (!isMobile) {

    }

    draw(coord, event, context) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.beginPath();
        this.width = Math.abs((coord[0] - this.origX) / 2);
        if (context == this.contextReal) {
            console.log('real')
        }
        //For circle
        if (shifting) {
            this.height = Math.abs((coord[0] - this.origX) / 2);
        }

        //For ellipse
        else {
            this.height = Math.abs((coord[1] - this.origY) / 2);
        }
        context.ellipse(this.origX + (coord[0] - this.origX) / 2, this.origY + (coord[1] - this.origY) / 2, this.width, this.height, 0, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }
}

