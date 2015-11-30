
# Frogger Game

## Overview

### Installation

The game directory should contain the following files and subdirectories in the given structure (**directories** are indicated in bold):

* (**game directory**)
  * index.html
  * README.md (this file)
  * **css**
    * style.css
  * **images**
    * char-boy.png
    * enemy-bug.png
    * grass-block.png
    * stone-block.png
    * water-block.png
  * **js**
    * app.js
    * engine.js
    * gameTracker.js
    * resources.js

### Running the Game

To run the game, you simply need to navigate to the _index.html_ file from any web browser. To do this, open your web browser. Click on "File" and navigate to the game-directory where the above files are stored. Click on _index.html_. This will launch the game.

## Game Play

### Description

The frogger game involves moving the player character (the boy) from its starting position at the center bottom of the game board to the water, while avoiding contact with the enemy bugs. Each time the player reaches the water is considered a success and increments the score by 1. Every 5 points will advance the player's level by 1. The player has 5 "lives," which will be decremented every time the player collides with a bug. The number and speed of enemy bugs is random, but both number and speed of the enemies will increase with each higher game level. The player can move in four directions - up, down, left and right - and in defined increments. The bugs move within three "lanes" of the stone blocks on the board.

### Moving the character

To move the character, use the keyboard's **up**, **down**, **left** and **right** arrow keys. The player can only move in these directions, with a defined increment for each move. If moving the character in the direction indicated by the arrow key would exceed the boundaries of the game board, the move is not allowed.


