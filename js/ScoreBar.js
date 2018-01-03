function ScoreBar() {
    // this.level = 0;
    // this.health = 0;
    // this.score = 0;
}

ScoreBar.prototype.init = function () {
    var scoreBar = $('<div id="score_bar"></div>');
    $('.game-board').append(scoreBar);
}
ScoreBar.prototype.updateScoreBar = function (level, health, score) {
    $('#score_bar').text('level: '+ level +' | health: '+ health +' | score: '+ score);
}
ScoreBar.prototype.resetScoreBar = function () {
    $('#score_bar').text('');
}