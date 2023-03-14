function axisY(y1, y2) {
    if(Math.min(y1.overlap, y2.overlap) == y1.overlap) return y1;

    return y2;
}

function axisX(x1, x2) {
    if(Math.min(x1.overlap, x2.overlap) == x1.overlap) return x1;

    return x2;
}

function compareAxis(x, y) {
    if(Math.min(x.overlap, y.overlap) == x.overlap) return x.name;

    return y.name;
}

function platformCollision(o1, platform) {
    if(o1.position.y + o1.radius >= platform.position.y && o1.position.y - o1.radius <= platform.position.y + platform.height) {
        if(o1.position.x + o1.radius >= platform.position.x && o1.position.x - o1.radius <= platform.position.x + platform.width) {
            var top = {name : 'top', overlap : Math.abs((o1.position.y + o1.radius) - (platform.position.y))};
            var bottom = {name : 'bottom', overlap : Math.abs((o1.position.y - o1.radius) - (platform.position.y + platform.height))};
            var left = {name : 'left', overlap : Math.abs((o1.position.x + o1.radius) - (platform.position.x))};
            var right = {name : 'right', overlap : Math.abs((o1.position.x - o1.radius) - (platform.position.x + platform.width))};

            var collidedX = axisX(left, right);
            var collidedY = axisY(top, bottom);

            switch (compareAxis(collidedX, collidedY)) {
                case 'top':
                    o1.onGround = true;
                    o1.canJump = true;
                    o1.position.y = o1.position.y - top.overlap;
                    o1.velocity.y = -o1.gravity.y;                
                    break;
                case 'bottom':
                    o1.position.y = o1.position.y + bottom.overlap;
                    o1.velocity.y *= -1;
                    break;
                case 'left':
                    o1.position.x = o1.position.x - left.overlap;
                    o1.velocity.x = 0;
                    break;
                case 'right':
                    o1.position.x = o1.position.x + right.overlap;
                    o1.velocity.x = 0;
                    break;
            
                default:
                    break;
            }
        }
    }    
}