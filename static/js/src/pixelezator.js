
var img = new Image();
var speed = 10;
var pixelSize = 3;
//img.src = 'http://upload.wikimedia.org/wikipedia/commons/f/f0/Pixelart-tv-iso.png';
//img.src = 'http://media.moddb.com/images/members/1/872/871467/ao_3.1.png';
img.src = 'http://png-5.findicons.com/files/icons/632/space_invaders/256/spaceship.png'
var canvas = $('#c')[0]
var ctxsrc = canvas.getContext("2d");
var example = $('#a')[0]
var exampleCtx = example.getContext("2d")
var scaledCanvas = $('#b')[0];
var ctx = scaledCanvas.getContext("2d");
ctx.webkitImageSmoothingEnabled = 
    ctx.mozImageSmoothingEnabled = false;

var canvasWidth = example.width/pixelSize;


img.onload = function () { 
    var draw = function(){
        example.width = example.width;
        canvas.width = canvasWidth;
        canvas.height = canvasWidth;
        scaledCanvas.width = scaledCanvas.width;
    
        var ang = (new Date()).valueOf()*0.0001 * speed % (Math.PI*2)
        var sin = Math.sin(ang);
        var cos = Math.cos(ang);
        
        exampleCtx.translate(128, 128);
        exampleCtx.transform(cos, sin, -sin, cos, 0, 0);
        exampleCtx.drawImage(img, -128, -128);
        
        ctxsrc.translate(canvasWidth*0.5,canvasWidth*0.5);
        ctxsrc.transform(cos, sin, -sin, cos, 0, 0);        

        ctxsrc.drawImage(img, -0.5*canvasWidth, -0.5*canvasWidth, canvasWidth, canvasWidth);
        //ctxsrc.reset();
        ctx.scale(pixelSize, pixelSize);
        ctx.fillStyle = ctx.createPattern(canvas, 'repeat');
        ctx.fillRect(0, 0, canvasWidth, canvasWidth);
    };

    setInterval(draw, 30);
};
