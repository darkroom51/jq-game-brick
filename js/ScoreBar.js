function ScoreBar() {
    // nothing for now
}

ScoreBar.prototype.init = function () {
    var scoreBar = $('<div id="score_bar"></div>');
    $('.game-board').append(scoreBar);
    $('#score_bar').css('background','silver');
}
ScoreBar.prototype.updateScoreBar = function (level, health, score) {
    $('#score_bar').text('level: '+ level +' | health: '+ health +' | score: '+ score);
    if (health < -50){
        $('#score_bar').css('background','#FF737E');
    }
    else{
        $('#score_bar').css('background','silver');
    }
}
ScoreBar.prototype.resetScoreBar = function () {
    $('#score_bar').text('');
    $('#score_bar').css('background','silver');
}