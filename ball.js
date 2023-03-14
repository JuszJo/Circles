import Vector from './vector.js'
import Movement from './movement.js';

var canvas = document.querySelector('canvas');

var width = 800;
var height = 600;

var drawingSurface = canvas.getContext('2d');

export default class Ball extends Movement {
    constructor(x, y, radius) {
        super();
        this.radius = radius;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0.2, 0.1);
        this.gravity = new Vector(0, 0.5);
        this.topSpeed = 7;
        this.onGround = true;
        this.canJump = true;
        this.jumpFactor = -10;
        this.wallJumpFactor = -12;
        this.wallJumpFactorX = 15;;
        this.mass = this.radius;
        this.fired = false;
    }

    move() {
        if(this.checkLeft()) {
            this.velocity.x += -this.acceleration.x;
        }
        if(this.checkRight()) {
            this.velocity.x += this.acceleration.x;
        }
        if(this.noMoveX() && this.onGround) {
            this.velocity.x = 0;
        }
    }

    jump() {
        if(this.JUMP && this.onGround && this.canJump) {
            this.JUMP = false;
            this.velocity.y += this.jumpFactor;
            this.onGround = false;
            this.canJump = false;
        }
    }

    wallJump() {
        if(this.JUMP && this.canJump && !(this.onGround)) {
            this.velocity.y = 0;
            this.JUMP = false;
            this.velocity.y += this.wallJumpFactor;
            this.velocity.x += this.wallJumpFactorX;
            this.canJump = false;
        }
    }

    checkCollisionBoundary() {
        if(this.position.x + this.radius >= width) {
            var overlapX = this.position.x + this.radius - width;
            this.position.x -= overlapX;
            this.velocity.x = 0;
            this.canJump = true;
            this.wallJumpFactorX = -15;
        }
        else if(this.position.x - this.radius <= 0) {
            var overlapX = 0;
            this.position.x = overlapX + this.radius;
            this.canJump = true;
            this.wallJumpFactorX = 15;
        }
        if(this.position.y + this.radius >= height) {
            var overlapY = this.position.y + this.radius - height;
            this.position.y -= overlapY;
            this.velocity.y = 0;
            this.onGround = true;
            this.canJump = true;
        }
        else if(this.position.y - this.radius <= 0) {
            var overlapY = 0;
            this.position.y = overlapY + this.radius;
            this.velocity.y = 0;
        }
        if(this.position.x - this.radius > 0 && this.position.x + this.radius < width && !(this.onGround)) {
            this.canJump = false;
        }
        
    }

    update() {
        this.move();
        this.jump();
        this.wallJump();
        this.velocity.limit(this.topSpeed);
        this.velocity.y += this.gravity.y;
        this.position.add(this.velocity);
        this.checkCollisionBoundary();
        this.display();
    }

    display() {
        drawingSurface.beginPath();
        drawingSurface.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        drawingSurface.fill()
        drawingSurface.closePath();
        drawingSurface.font = '20px Arial';
        drawingSurface.textBaseline = 'top'
        drawingSurface.fillText(`VelocityX: ${(this.velocity.x).toFixed(1)} VelocityY: ${(this.velocity.y).toFixed(1)}`, 10, 10)
    }
}