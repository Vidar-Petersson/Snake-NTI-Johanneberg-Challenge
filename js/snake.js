 //Snake class
class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(floor(random(scaledWidth)), floor(random(scaledHeight)));
        this.xdir = 0;
        this.ydir = 0;
    }

    //Sets direction based on input, prevents 180 degree turns
    setDir(x, y) {
        if (!((x*-1) === this.xdir && (y*-1) === this.ydir)) {
            this.xdir = x;
            this.ydir = y;
        }
    }
    
    //Updates the snakes current position by pushing last element to front
    update() {
        let head = this.body[this.body.length-1].copy();
        this.body.shift();
        head.x += this.xdir;
        head.y += this.ydir;
        this.body.push(head);
    }

    //Adds two elements when snake has eaten
    grow() {
        let head = this.body[this.body.length-1].copy();
        this.body.push(head);
    }

    //Check for collision with border, itself and other players
    checkCollision(snakes) {
        let head = this.body[this.body.length-1].copy();
        if (head.x > scaledWidth-1 || head.x < 0 || head.y > scaledHeight-1 || head.y < 0) {
            return true
        }
        for (let i = 0; i < this.body.length-1; i++) {
            let part = this.body[i];
            if (part.x === head.x && part.y === head.y) {
                return true
            }
        }
        for (let s=0; s < snakes.length; s++) {
            if (this.body != snakes[s].body) {
                for (let i=0; i < snakes[s].body.length; i++) {
                    if (head.x === snakes[s].body[i].x && head.y === snakes[s].body[i].y) {
                        return true
                    }
                }
            }   
        }
        return false
    }

    //Check if snake in on top of food, then calls grow
    eat(position) {
        let head = this.body[this.body.length-1].copy();
        if (head.x === position.x && head.y == position.y) {
            this.grow();
            return true;
        } else {
            return false;
        }
    }

    //Draws the snake to canvas
    show(snake) {
        for (let i = 0; i < this.body.length; i++) {
            fill(snake*75);
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }
    }
}

//Food class
class Food {
    constructor() {
        this.position;
    }

    //Spawns food where the snakes aren't
    location(snakes) {
        this.position = createVector(floor(random(scaledWidth)), floor(random(scaledHeight)));
        for (let s=0; s < snakes.length; s++) {
            for (let i=0; i < snakes[s].body.length; i++) {
                if (this.position.x === snakes[s].body[i].x && this.position.y === snakes[s].body[i].y) {
                    this.location(snakes);
                }
            }
        }
    }

    //Draws an apple and its leaf to canvas
    show() {
        fill(255, 0, 0);
        rect(this.position.x, this.position.y, 1, 1);
        fill(0, 200, 0);
        rect(this.position.x+0.25, this.position.y-0.25, 0.5, 0.5);
    }
}