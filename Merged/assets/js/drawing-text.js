class DrawingText extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.inputString = '';
    }

    onMouseDown(coord, event) {
        this.contextDraft.fillStyle = currentColor;
        this.contextReal.fillStyle = currentColor;
        this.contextDraft.strokestyle = currentStrokeColor;
        this.contextReal.strokestyle = currentStrokeColor;
        this.contextReal.lineWidth = 1;
        this.contextReal.font = font;
        this.origX = coord[0];
        this.origY = coord[1];
        this.width = '';
        this.height = '';
        this.textEnter = false;
    }
    onDragging(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

        //For Square
        if (shifting) {
            if (coord[1] - this.origY < 0) {
                this.contextDraft.strokeRect(this.origX, this.origY, coord[0] - this.origX, -Math.abs(coord[0] - this.origX));
            }
            else {
                this.contextDraft.strokeRect(this.origX, this.origY, coord[0] - this.origX, Math.abs(coord[0] - this.origX));
            }
        }
        //For Rectangle
        else {
            this.contextDraft.strokeRect(this.origX, this.origY, coord[0] - this.origX, coord[1] - this.origY)
        }
    }

    onMouseMove() { }

    onMouseUp(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        //For Square
        if (shifting) {
            console.log('shift')
            if (coord[1] - this.origY < 0) {
                this.width = coord[0] - this.origX;
                this.height = -Math.abs(coord[0] - this.origX);
            }
            else {
                this.width = coord[0] - this.origX;
                this.height = Math.abs(coord[0] - this.origX);
            }
        }
        //For Rectangle
        else {
            this.width = coord[0] - this.origX;
            this.height = coord[1] - this.origY;
        }

        this.contextReal.strokeRect(this.origX, this.origY, this.width, this.height);
        console.log(this.height);
        console.log(this.width);


        //Update variables to shift origX and origY to top-left corner
        this.width = Math.abs(this.width);
        this.height = Math.abs(this.height);

        if (coord[0] - this.origX < 0) {
            this.origX -= this.width;
        }
        if (coord[1] - this.origY < 0) {
            this.origY -= this.height;
        }
        this.textEnter = true;

    }
    onMouseLeave() { }
    onMouseEnter() { }
    onClick() { }
    onKeydown(e) {
        if (this.textEnter) {
            if (e.which == 8) {
                this.inputString = this.inputString.slice(0, -1);
            }
            else if (e.which != 13) {
                this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
                this.contextReal.font = font;
                this.inputString += String.fromCharCode(e.which);
                this.contextDraft.textAlign = 'center';
                this.contextDraft.fillText(this.inputString, (this.origX + this.width / 2), (this.origY + this.height / 2));
            }
            else {
                this.textEnter = false;
            }

        }
    }
}