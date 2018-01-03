// Pages
function InfoPages() {
    this.pageStartGame = $('<div class="page-level-ok"><span>Get Ready!</span><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Start Game</button><button onclick="$(\'.page-level-ok\').remove(); env.infoPages.setPageInstruction();">Instruction</button><button>Hi-Scores</button></div>');
    this.pageInstruction = $('<div class="page-level-ok"><div class="game-instruction">' + gameInstruction + '</div><button onclick="$(\'.page-level-ok\').remove(); env.infoPages.setPageStartGame();">Back to Menu</button></div>');
    this.pageLevelEnd = $('<div class="page-level-ok"><span>LEVEL UP!</span><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Next level</button></div>');
    this.pageGameEnd = $('<div class="page-level-ok"><span>YOU WON!</span><button>Submit Scores</button><button onclick="$(\'.page-level-ok\').remove(); env.resetGame();">Reset Game</button><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Bonus level</button></div>');
    this.pageGameOver = $('<div class="page-level-ok"><span>GAME OVER</span><button onclick="$(\'.page-level-ok\').remove(); env.resetGame();">Reset Game</button></div>');
    this.pageGameOverBonus = $('<div class="page-level-ok"><span>GAME OVER</span><button>Submit Scores</button><button onclick="$(\'.page-level-ok\').remove(); env.resetGame();">Reset Game</button></div>');
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

var gameInstruction =
    '<p>Catch good ones <img src="img/h1.svg" alt="good ones"><img src="img/h2.svg" alt="good ones"><img src="img/h3.svg" alt="good ones"></p>'+
    '<p>Avoid bad ones &nbsp;&nbsp;&nbsp;<img src="img/h6.svg" alt="bad ones"><img src="img/h7.svg" alt="bad ones"><img src="img/h8.svg" alt="bad ones"></p>'+
    '<p>Take care of your Health:<br>+200 * lvl No. -> Level up!<br>&nbsp;-100 -> You\'re dead!</p>'+
    '<p>Bonus lvl -> No chanve to survive, but xtra scores ;)</p>'+
    '';