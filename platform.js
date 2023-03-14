import Vector from "./vector.js";

var canvas = document.querySelector('canvas');

var drawingSurface = canvas.getContext('2d');


function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
}

export default class Platform {
    constructor(x, y, w, h) {
        this.position = new Vector(x, y);
        this.width = w;
        this.height = h;
    }

    update() {
        this.display();
        //this.refresh();
    }

    display() {
        drawingSurface.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}