export default class Movement {
    constructor() {
        this.up = 'w';
        this.down = 's';
        this.left = 'a'; 
        this.right = 'd';
        this.space = ' ';

        this.UP = false;
        this.DOWN = false;
        this.LEFT = false;
        this.RIGHT = false;
        this.JUMP = false;

        this.fired = false;
    }


    keyDown = window.addEventListener('keypress', e => {
        switch ((e.key).toLowerCase()) {
            case this.up:
                this.UP = true;
                break;
            case this.down:
                this.DOWN = true;
                break;
            case this.left:
                this.LEFT = true; 
                break;
            case this.right:
                this.RIGHT = true;
                break;
        
            default:
                break;
        }
    })

    keyUp = window.addEventListener('keyup', e => {
        switch ((e.key).toLowerCase()) {
            case this.up:
                this.UP = false;
                break;
            case this.down:
                this.DOWN = false;
                break;
            case this.left:
                this.LEFT = false;
                break;
            case this.right:
                this.RIGHT = false;
                break;
        
            default:
                break;
        }
    })

    jumpEvent = window.addEventListener('keypress', e => {
        switch(e.key) {
            case this.space:
                if(!(this.fired)) {
                    this.JUMP = true;
                    this.fired = true;
                }
                break;

            default:
                break;
        }
    })

    noJumpEvent = window.addEventListener('keyup', e => {
        switch (e.key) {
            case this.space:
                this.JUMP = false;
                this.fired = false
                break;
        
            default:
                break;
        }
    })

    checkUp() {
        if(this.UP && !(this.DOWN)) {
            return true;
        }
        else {
            return false;
        }
    }

    checkDown() {
        if(this.DOWN && !(this.UP)) {
           return true; 
        }
        else {
            return false;
        }
    }

    checkLeft() {
        if(this.LEFT && !(this.RIGHT)) {
            return true;
        }
        else {
            return false;
        }
    }

    checkRight() {
        if(this.RIGHT && !(this.LEFT)) {
            return true;
        }
        else {
            return false;
        }
    }

    bothX() {
        if(this.LEFT && this.RIGHT) {
            return true;
        }
        return false;
    }

    noMoveX() {
        if(!(this.LEFT) && !(this.RIGHT)) {
            return true;
        }
        else {
            return false;
        }
    }

    noMoveY() {
        if(!(this.UP) && !(this.DOWN) && !(this.JUMP)) {
            return true;
        }
        else {
            return false;
        }
    }
}