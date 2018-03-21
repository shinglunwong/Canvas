class DrawingBrush2 extends PaintFunction {
    constructor(contextReal) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.img = new Image();
        this.img.src = 'assets/images/brush2.png';
        this.lastPoint;
        this.contextDraft.lineJoin = this.contextDraft.lineCap = 'round';
        this.contextReal.lineJoin = this.contextReal.lineCap = 'round';
        this.imgd;
        this.newImg;
        this.brushPath = [];
    }

    distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
    imagedata_to_image(imagedata) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = imagedata.width;
        canvas.height = imagedata.height;
        ctx.putImageData(imagedata, 0, 0);
        var image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }
    changeColor() {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this.img, 0, 0);
        this.imgd = ctx.getImageData(0, 0, this.img.width, this.img.height);
        for (var i = 0; i < this.imgd.data.length; i += 4) {
            this.imgd.data[i] = 255;
            this.imgd.data[i + 1] = 50;
            this.imgd.data[i + 2] = 255;
        }
        this.newImg = this.imagedata_to_image(this.imgd);
    }

    onMouseDown(coord, event) {
        this.changeColor();
        this.lastPoint = { x: coord[0], y: coord[1] };
        this.brushPath = [coord[0], coord[1]];
    }

    onDragging(coord, event) {
        var currentPoint = { x: coord[0], y: coord[1] };
        var dist = this.distanceBetween(this.lastPoint, currentPoint);
        var angle = this.angleBetween(this.lastPoint, currentPoint);

        for (var i = 0; i < dist; i++) {
            var x = this.lastPoint.x + (Math.sin(angle) * i) - 25;
            var y = this.lastPoint.y + (Math.cos(angle) * i) - 25;
            this.contextReal.drawImage(this.newImg, x, y);
        }

        this.lastPoint = currentPoint;
    }

    onMouseMove() { }
    onMouseUp() {
        saveMove();
    }
    onMouseLeave() { }
    onMouseEnter() { }
}