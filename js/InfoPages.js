// Pages
function InfoPages() {
    this.pageStartGame = $('<div class="page-level-ok"><span>Get Ready!</span><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Start Game</button><button onclick="$(\'.page-level-ok\').remove(); env.infoPages.setPageInstruction();">Instruction</button><button onclick="$(\'.page-level-ok\').remove(); env.infoPages.setPageHiScoresList();">Hi-Scores</button></div>');
    this.pageInstruction = $('<div class="page-level-ok"><div class="game-instruction">' +
        '<p>Catch good ones <img src="img/h1.svg" alt="good ones"><img src="img/h2.svg" alt="good ones"><img src="img/h3.svg" alt="good ones"></p>'+
        '<p>Avoid bad ones &nbsp;&nbsp;&nbsp;<img src="img/h6.svg" alt="bad ones"><img src="img/h7.svg" alt="bad ones"><img src="img/h8.svg" alt="bad ones"></p>'+
        '<p>Take care of your Health:<br>+200 * lvl No. -> Level up!<br>&nbsp;-100 -> You\'re dead!</p>'+
        '<p>Survive 3 levels to win the game and be a hero on our hall of fame</p>'+
        '<p>Oh, there\'s also bonus level to catch some extra points ;)</p>'+
        '</div><button onclick="$(\'.page-level-ok\').remove(); env.infoPages.setPageStartGame();">Back to Menu</button></div>');
    this.pageLevelEnd = $('<div class="page-level-ok"><span>LEVEL UP!</span><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Next level</button></div>');
    this.pageGameEnd = $('<div class="page-level-ok"><span>YOU WON!</span><button onclick="$(\'.page-level-ok\').remove(); env.infoPages.setPageHiScoresSubmit();">Submit Scores</button><button onclick="$(\'.page-level-ok\').remove(); env.resetGame();">Reset Game</button><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Bonus level</button></div>');
    this.pageGameOver = $('<div class="page-level-ok"><span>GAME OVER</span><button onclick="$(\'.page-level-ok\').remove(); env.resetGame();">Reset Game</button></div>');
    this.pageGameOverBonus = $('<div class="page-level-ok"><span>GAME OVER</span><button onclick="$(\'.page-level-ok\').remove(); env.infoPages.setPageHiScoresSubmit();">Submit Scores</button><button onclick="$(\'.page-level-ok\').remove(); env.resetGame();">Reset Game</button></div>');
}

InfoPages.prototype.setPageStartGame = function () {
    $('.game-board').append(this.pageStartGame);
}
InfoPages.prototype.setPageInstruction = function () {
    $('.game-board').append(this.pageInstruction);
}
InfoPages.prototype.setPageLevelEnd = function () {
    $('.game-board').append(this.pageLevelEnd);
}
InfoPages.prototype.setPageGameEnd = function () {
    $('.game-board').append(this.pageGameEnd);
}
InfoPages.prototype.setPageGameOver = function (level) {
    if (level < 10)
        $('.game-board').append(this.pageGameOver);
    else
        $('.game-board').append(this.pageGameOverBonus);
}


InfoPages.prototype.setPageHiScoresList = function () {
    var pageHiScoresList = $('<div class="page-level-ok"><div class="game-hiscores"><p>Hi-Scores:</p><p id="hi_scores_list"></p></div><button onclick="$(\'.page-level-ok\').remove(); env.infoPages.setPageStartGame();">Back to Menu</button></div>');
    $('.game-board').append(pageHiScoresList);
    env.infoPages.lsFetchScores();
}
InfoPages.prototype.setPageHiScoresSubmit = function () {
    var pageHiScoresSubmit = $('<div class="page-level-ok"><div class="game-hiscores">' +
        '<p><input id="your_name" type="text" name="yourName" placeholder="Enter your name" maxlength="10"></p>'+
        '<p><input id="your_score" type="hidden" name="yourScore" value="'+ env.score +'"></p>'+
        '<p>Your Score: '+ env.score +'</p>'+
        '</div><button onclick="env.infoPages.lsSubmitScores(); $(\'.page-level-ok\').remove(); env.resetGame();">Submit my Scores</button><button onclick="$(\'.page-level-ok\').remove(); env.resetGame();">Reset game</button></div>');

    $('.game-board').append(pageHiScoresSubmit);
}
InfoPages.prototype.lsSubmitScores = function () {
    var name = document.getElementById('your_name').value;
    var score = document.getElementById('your_score').value;
        var hiScore = {
            name: name ? name : 'NoName',
            score: score
        }
        if (localStorage.getItem('hiScores') === null) {
            var hiScores = [];
            hiScores.push(hiScore);
            localStorage.setItem('hiScores', JSON.stringify(hiScores));
        }
        else {
            var hiScores = JSON.parse(localStorage.getItem('hiScores'));
            hiScores.push(hiScore);
            localStorage.setItem('hiScores', JSON.stringify(hiScores));
        }
}
InfoPages.prototype.lsFetchScores = function () {
    var hiScoresList = document.getElementById('hi_scores_list');
    if (localStorage.getItem('hiScores') !== null) {
        var hiScores = JSON.parse(localStorage.getItem('hiScores'));
        hiScoresList.innerHTML = '<ul>';
        for (var i = hiScores.length-1; i >= 0 ; i--) {
                hiScoresList.innerHTML += '<li><div class="text">'+ hiScores[i].name +' -> '+ hiScores[i].score +'</div></li>';
        }
        hiScoresList.innerHTML += '</ul>';
    }
    else{
        hiScoresList.innerHTML = 'No Hi-Scores yet :(';
    }
}



