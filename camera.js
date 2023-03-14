var canvas = document.querySelector('canvas');

var width = 800;
var height = 600;

var drawingSurface = canvas.getContext('2d');

var gameWorld = {
    x : 0,
    y : 0,
    w : 800,
    h : 600,
};

var camera = {
    x : 0,
    y : 0,
    w : 800,
    h : 500,

    drawCamera(ball, platform) {
        //cam.y = ball.position.y - cam.h / 2;
        if(ball.position.y - this.h < 0) {
            //platform.position
        }
        platform.position.y += 0.3;
    
        if(platform.position.y > gameWorld.h) {
            platform.position.x = Math.floor(Math.random() * (gameWorld.w - platform.width));
            platform.position.y = -platform.height;
        }

        drawingSurface.strokeRect(this.x, ball.position.y - this.h / 2, this.w, this.h);
    }
};