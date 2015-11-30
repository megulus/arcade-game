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
    this.top = Math.floor(this.y + 90);
    this.bottom = Math.floor(this.y + 137);
    this.speed = getRandomInteger(50, 200);
};

Enemy.prototype.overlapsPoint = function(x, y) {
    if (((this.front - 5 <= x) && (x <= this.front + 5)) || ((this.x - 2 <= x) && (x <= this.x + 2))) {
        if ((this.top - 12 <= y) && (y <= this.bottom + 5)) {
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
        this.front = this.x + 100;
        this.speed = getRandomInteger(50, 100) * (game.level + 1);
    }
    // handle collisions
    var bottomLeft, bottomRight, upperLeft, upperRight;
    bottomLeft = player.bottomLeft();
    if (this.overlapsPoint(bottomLeft[0], bottomLeft[1])) {
        game.playerLives -= 1;
        reset();
    }
    bottomRight = player.bottomRight();
    if (this.overlapsPoint(bottomRight[0], bottomRight[1])) {
        game.playerLives -= 1;
        reset();
    }
    upperLeft = player.upperLeft();
    if (this.overlapsPoint(upperLeft[0], upperLeft[1])) {
        game.playerLives -= 1;
        reset();
    }
    upperRight = player.upperRight();
    if (this.overlapsPoint(upperRight[0], upperRight[1])) {
        game.playerLives -= 1;
        reset();
    }
    this.x += dt * this.speed;
    this.front = this.x + 100;
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
    this.x = 200;
    this.y = 425;
    this.minX = 0;
    this.maxX = 400;
    this.minY = 25; // edge of the water
    this.maxY = 425;
};
Player.prototype.bottomLeft = function() {
    var x = this.x + 20;
    var y = this.y + 137;
    return [x, y];
};
Player.prototype.bottomRight = function() {
    var x = this.x + 80;
    var y = this.y + 137;
    return [x, y];
};
Player.prototype.upperLeft = function() {
    var x = this.x + 20;
    var y = this.y + 68;
    return [x, y];
};
Player.prototype.upperRight = function() {
    var x = this.x + 80;
    var y = this.y + 68;
    return [x, y];
};
Player.prototype.update = function() {
    // player movement is handled by handleinput and collisions handled by Enemy class - so what should this do?
};
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};
Player.prototype.handleInput = function(input) {
    var increment = 90;
    if (input === 'up') {
        if (this.y - increment >= this.minY) {
            this.y -= increment;
        } else {
            // if this.y - increment < min.Y, player has reached the water and game resets
            writeBannerText();
            game.score += 1;
            if (game.score > 0 && game.score % 5 == 0) {
                game.level += 1;
            }
            reset();

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
// This function is called by the reset() function in engine.js
function instantiateGameObjects() {
    allEnemies = [];
    player = new Player();
    // generate a random number of enemies within a range that varies with level, but will always be at least 2:
    var numberEnemies = getRandomInteger(2, game.level + 4);
    for (i = 0; i < numberEnemies; i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    }
    writeBannerText();
}


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function writeBannerText() {
    var levelScoreText;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 500, 50);
    ctx.fillStyle = "black";
    ctx.font = "24pt Helvetica";
    if (game.playerLives > 0) {
        levelScoreText = "Level: " + game.level.toString() + "   Score: " + game.score.toString() + "  Lives: " + game.playerLives.toString();
    } else {
        levelScoreText = "GAME OVER";
    }
    ctx.fillText(levelScoreText, 10, 25);
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
