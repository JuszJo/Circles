import Ball from "./ball.js";
import Platform from "./platform.js";

var canvas = document.querySelector('canvas');

var width = 800;
var height = 600;

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

var drawingSurface = canvas.getContext('2d');

var cam = Object.create(camera);

var fps = 60;
var elapsed = 0;
var lastTime = 0;

var platforms = [];

var ball = new Ball(width / 2, height - 10, 10, 5);
var platform = new Platform(50, 550, 300, 20);
var platform2 = new Platform(300, 450, 300, 20);
var platform3 = new Platform(500, 350, 300, 20);
var platform4 = new Platform(50, 250, 300, 20);
var platform5 = new Platform(350, 150, 300, 20);
var platform6 = new Platform(50, 50, 300, 20);

platforms.push(platform, platform2, platform3, platform4, platform5, platform6)

window.requestAnimationFrame(update);

function update(time) {
    var delta = time - lastTime;
    elapsed += delta;
    lastTime = time;

    if(Math.ceil(elapsed) >= 1000 / fps) {
        drawingSurface.clearRect(0, 0, width, height);
        display();
        elapsed = 0;
    }

    window.requestAnimationFrame(update);
}

function display() {
    ball.update();
    for(const values of platforms) {
        values.update()
        platformCollision(ball, values);
        camera.drawCamera(ball, values);
    }


}

/*function generateBalls(amount) {
    var arr = [];
    
    for(let i = 0; i < amount; ++i) {
        var randomRadius = Math.floor(Math.random() * 20 + 1);
        var randomX = Math.floor(Math.random() * 400);
        var randomy = Math.floor(Math.random() * 400);
        var ball = new Ball(randomX, randomy, randomRadius, 20);
        arr.push(ball);
    }

    return arr;
}

function resolveCollision(object1, object2) {
    var velocityDiff = new Vector().subStatic(object1.velocity, object2.velocity);
    velocityDiff = velocityDiff.mag()

    var positionDiff = new Vector().subStatic(object1.position, object2.position);
    positionDiff = positionDiff.mag();

    var angle = -Math.atan2(object1.position.y - object2.position.y, object1.position.x - object2.position.x);
}

function checkCollisionObjects(object1, object2) {
    var distance = new Vector().subStatic(object1.position, object2.position);
    var distanceMag = distance.mag();
    var combinedRadius = object1.radius + object2.radius

    if(distanceMag < combinedRadius) {
        var overlap = combinedRadius - distanceMag;

        var distanceNormalX = distance.x / distanceMag;
        var distanceNormalY = distance.y / distanceMag;

        object1.position.x += overlap * distanceNormalX;
        object1.position.y += overlap * distanceNormalY;

        object2.velocity.x *= -1;

        var s = {};

        s.vx = distance.y;
        s.vy = -distance.x;

        s.lx = s.vy;
        s.ly = -s.vx;

        s.mag = Math.sqrt(s.vx * s.vx + s.vy * s.vy);

        s.unitX = s.vx / s.mag;
        s.unitY = s.vy / s.mag;

        var dp1 = object1.velocity.x * s.unitX + object1.velocity.y * s.unitY;

        var p1Vx = dp1 * s.unitX;
        var p1Vy = dp1 * s.unitY;

        var dp2 = object1.velocity.x * (s.lx / s.mag) + object1.velocity.y * (s.ly / s.mag);

        var p2Vx = dp2 * (s.lx / s.mag);
        var p2Vy = dp2 * (s.ly / s.mag);

        p2Vx *= -1;
        p2Vy *= -1;

        object1.velocity.x = p1Vx + p2Vx;
        object1.velocity.y = p1Vy + p2Vy;
    }
}

var ballArray = generateBalls(20);

/*drawingSurface.font = "20px Arial";
drawingSurface.textBaseline = "top";
drawingSurface.fillText('Hello', 0, 0);*/