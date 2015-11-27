// Declare a level variable - initial/default value is 0, but
// this might get updated later in a version with additional functionality
var level = 0;
// declare variables
var allEnemies, player;


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101; // all enemies start at the same x location - far left of game board
    this.y = getRandomInteger(1, 3) * 75; // each instance will one of 3 possible y values
    this.front = Math.floor(this.x + 100);
    this.top = Math.floor(this.y + 86);
    this.bottom = Math.floor(this.y + 137);
    //this.x = 0;
    //this.y = 0;
    this.speed = getRandomInteger(50, 200);
};

Enemy.prototype.overlapsPoint = function(coordArray) {
    var x = coordArray[0];
    var y = coordArray[1];
    if (((this.front - 5 <= x) && (x <= this.front + 5)) || ((this.x - 5 <= x) && (x <= this.x + 5))) {
        if ((this.top <= y) && (y <= this.bottom)) {
            return true;
        }
        return false;
    }
    return false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 505) {
        this.x = -101;
        this.speed = getRandomInteger(50, 200);
    }
    // handle collisions
    var bottomLeft, bottomRight, upperLeft, upperRight;
    bottomLeft = player.bottomLeft();
    if (this.overlapsPoint(bottomLeft)) {
        init();
    }
    bottomRight = player.bottomRight();
    if (this.overlapsPoint(bottomRight)) {
        init();
    }
    upperLeft = player.upperLeft();
    if (this.overlapsPoint(upperLeft)) {
        init();
    }
    upperRight = player.upperRight();
    if (this.overlapsPoint(upperRight)) {
        init();
    }




    this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.image = 'images/char-boy.png';
    this.x = 200; //200
    this.y = 425; // 425
    this.minX = 0;
    this.maxX = 400;
    this.minY = 25; // this is the edge of the water - a Y value < 50 will reset game (== success)
    this.maxY = 425;
};
Player.prototype.bottomLeft = function() {
    var bottomLeft = [];
    var x = this.x + 25;
    var y = this.y + 137;
    bottomLeft.push(x);
    bottomLeft.push(y);
    return bottomLeft;
};
Player.prototype.bottomRight = function() {
    var bottomRight = [];
    var x = this.x + 80;
    var y = this.y + 137;
    bottomRight.push(x);
    bottomRight.push(y);
    return bottomRight;
};
Player.prototype.upperLeft = function() {
    var upperLeft = [];
    var x = this.x + 25;
    var y = this.y + 68;
    upperLeft.push(x);
    upperLeft.push(y);
    return upperLeft;
};
Player.prototype.upperRight = function() {
    var upperRight = [];
    var x = this.x + 80;
    var y = this.y + 68;
    upperRight.push(x);
    upperRight.push(y);
    return upperRight;
};
Player.prototype.update = function() {
    // player movement is handled by handleinput and collisions handled by Enemy class - so what should this do?
};
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};
Player.prototype.handleInput = function(input) {
    var increment = 100;
    //allEnemies.forEach(function(enemy) {
     //   console.log("enemy:", enemy.x, enemy.y, "player:", player.x, player.y);
   //});
    if (input === 'up') {
        if (this.y - increment >= this.minY) {
            this.y -= increment;
        } else {
            // if this.y - increment < min.Y, player has reached the water and game resets
            init();
        }
    }
    if (input === 'down') {
        if (this.y + increment <= this.maxY) {
            this.y += increment;
        }
    }
    if (input === 'left') {
        if (this.x - increment >= this.minX) {
            this.x -= increment;
        }
    }
    if (input === 'right') {
        if (this.x + increment <= this.maxX) {
            this.x += increment;
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function instantiateGameObjects() {
    allEnemies = [];
    player = new Player();
    // generate a random number of enemies within a range that varies with level, but will always be at least 2:
    //var numberEnemies = getRandomInteger(2, level + 4);
    var numberEnemies = 1; // for testing right now
    for (i = 0; i < numberEnemies; i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    }
}
instantiateGameObjects();

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
