
/* This file tracks score, game level and player lives. This will need to be loaded before both
 * engine.js and app.js
 */

var GameTracker = function(level, score, playerLives) {
    this.level = level;
    this.score = score;
    this.playerLives = playerLives;
};
GameTracker.prototype.playerDead = function () {
    return this.playerLives === 0;
};