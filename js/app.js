// Declare a level variable - initial/default value is 0, but
// this might get updated later in a version with additional functionality
var level = 0;
// declare variables
var allEnemies, player;


// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 5; // all enemies start at the same x location - far left of game board
    this.y = y * 75; // each instance will one of 3 possible y values
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
};
Player.prototype.update = function(dt) {
    // do something
};
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};
Player.prototype.handleInput = function() {
    // move the player according to keystroke input
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function instantiateGameObjects() {
    allEnemies = [];
    player = new Player();
    // generate a random number of enemies within a range that varies with level, but will always be at least 1:
    var numberEnemies = getRandomInteger(1, level + 2);
    for (i = 0; i < numberEnemies; i++) {
        // generate a random y coordinate for each enemy instance:
        var yCoord = getRandomInteger(1, 3);
        var enemy = new Enemy(yCoord);
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
