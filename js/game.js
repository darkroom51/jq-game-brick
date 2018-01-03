var env = {
    minPosX: 0,
    maxPosX: 100,
    minPosY: 0,
    maxPosY: 95,
    viewPortHpx: $('.game-board').height(),
    viewPortWpx: $('.game-board').width(),
    level: 0,
    score: 0,
    speed: 0,
    creationDelay: 0,
    levelEndHealth: 0,
    levelDeadHealth: 0,
    health: 0,
    calcProc: function (x) {
        return Math.floor(x * 100 / env.viewPortWpx)
    },
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    clearBricks: function (bricks) {
        bricks.forEach(function (element) {
            element.removeBrick();
        });
    },
    setPageStartGame: function () {
        var pageStartGame = $('<div class="page-level-ok"><span>Get Ready!</span><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Start Game</button><button onclick="$(\'.page-level-ok\').remove(); env.setPageInstruction();">Instruction</button><button>Hi-Scores</button></div>');
        $('.game-board').append(pageStartGame);
        env.score = 0;
        env.level = 0;
        env.health = 0;
        $('#score_bar').text('');
    },
    setPageInstruction: function () {
        var pageInstruction = $('<div class="page-level-ok"><div class="game-instruction">'+ gameInstruction +'</div><button onclick="$(\'.page-level-ok\').remove(); env.setPageStartGame();">Back to Menu</button></div>');
        $('.game-board').append(pageInstruction);
    },
    setPageLevelEnd: function () {
        var pageLevelEnd = $('<div class="page-level-ok"><span>LEVEL UP!</span><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Next level</button></div>');
        $('.game-board').append(pageLevelEnd);
    },
    setPageGameEnd: function () {
        var pageGameEnd = $('<div class="page-level-ok"><span>YOU WON!</span><button>Submit Scores</button><button onclick="$(\'.page-level-ok\').remove(); env.setPageStartGame();">Reset Game</button><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Bonus level</button></div>');
        $('.game-board').append(pageGameEnd);
    },
    setPageGameOver: function () {
        //document.querySelector('.game-board').innerHTML = '<div class="page-level-ok"><span>GAME OVER</span></div>';
        if (env.level<10)
            var pageGameOver = $('<div class="page-level-ok"><span>GAME OVER</span><button onclick="$(\'.page-level-ok\').remove(); env.setPageStartGame();">Reset Game</button></div>');
        else
            var pageGameOver = $('<div class="page-level-ok"><span>GAME OVER</span><button>Submit Scores</button><button onclick="$(\'.page-level-ok\').remove(); env.setPageStartGame();">Reset Game</button></div>');
        $('.game-board').append(pageGameOver);
    },
    initLevel: function (level) {
        /*-- Set Starting values for each level --*/
        if (level === 0) {
            env.level = 1;
            env.speed = 0.3;
            env.creationDelay = 1500;
            env.levelEndHealth = 200;
            env.levelDeadHealth = -100;
            env.health = 0;
        }
        if (level === 1) {
            env.level = 2;
            env.speed = 0.4;
            env.creationDelay = 1000;
            env.levelEndHealth = 400;
            env.levelDeadHealth = -100;
            env.health = 0;
        }
        if (level === 2) {
            env.level = 3;
            env.speed = 0.5;
            env.creationDelay = 400;
            env.levelEndHealth = 600;
            env.levelDeadHealth = -100;
            env.health = 0;
        }
        if (level === 3) { //bonus round, no chance to survive
            env.level = 10;
            env.speed = 0.6;
            env.creationDelay = 100;
            env.levelEndHealth = 10000;
            env.levelDeadHealth = -100;
            env.health = 0;
        }

        $('#score_bar').text('level: '+ env.level +' | health: '+ env.health +' | score: '+ env.score); //-----wld_TEMP

        /*-- Bricks Interval --*/
        var bricks = [];
        var intervalBrick = setInterval(function () {
            var brick = new Brick(env.getRandom(0, 100), 0, env.getRandom(1, 10), env.getRandom(1, 2));
            brick.init();
            bricks.push(brick);
        }, env.creationDelay);

        /*-- Game Interval --*/
        var intervalCheck = setInterval(function () {
            bricks.forEach(function (element) {
                element.moveDown();
                if (element.checkCollision(basket)) {
                    if (element.type <= 5) { env.score += element.score; env.health += element.health; } else { env.score -= element.type; env.health -= element.health; }
                    $('#score_bar').text('level: '+ env.level +' | health: '+ env.health +' | score: '+ env.score);
                    element.removeBrick();
                    //delete element;
                } else {
                    //do nothing
                }
            });
            //if levelEndHealth reached, stop intervals and LEVEL UP!
            if (env.health >= env.levelEndHealth) {
                clearInterval(intervalCheck);
                clearInterval(intervalBrick);
                env.clearBricks(bricks);
                bricks = [];
                if (env.level < 3) {env.setPageLevelEnd();}
                if (env.level === 3) {env.setPageGameEnd();}
            }
            //if levelDeathHealth reached, stop intervals and GAME OVER!
            if (env.health < env.levelDeadHealth) {
                clearInterval(intervalCheck);
                clearInterval(intervalBrick);
                env.clearBricks(bricks);
                bricks = [];
                env.setPageGameOver();
            }
        }, 50); //end Game Interval
    } //end initLevel
} //end env{}


//incjujemy strone startowa, umieszczamy w html score_bar i bg_sound
env.setPageStartGame();
$('.game-board').append('<div id="score_bar"></div>'); //-----wld_TEMP
$('.game-board').append('<div class="sounds"><audio id="bg_sound" autoplay="autoplay" loop="loop"><source src="audio/8-bit-bg-sound.mp3" /></audio><a href="#noscroll" id="bg_sound_mute" class="bg-sound-on"></a></div>'); //-----wld_TEMP


/*-- Init basket --*/
var basket = new Basket();
basket.init();
//Set .mousemove() listener for basket
$('.game-board').mousemove(function (e) {
    var newX = Math.floor(env.calcProc(e.pageX) - basket.width / 2 - env.calcProc($('.game-board').offset().left));
    if ((newX + basket.width < env.maxPosX) && (newX > env.minPosX)) {
        basket.positionX = newX;
    } else if (newX + basket.width >= env.maxPosX) {
        basket.positionX = env.maxPosX - basket.width;
    } else {
        basket.positionX = env.minPosX;
    }
    basket.moveBasket(basket.positionX);
});


/*-----------------------------Testowa Instrukcja Gry--------------------------------*/
//temp game-instruction
var gameInstruction =
'<p>Catch good ones <img src="img/h1.svg" alt="good ones"><img src="img/h2.svg" alt="good ones"><img src="img/h3.svg" alt="good ones"></p>'+
'<p>Avoid bad ones &nbsp;&nbsp;&nbsp;<img src="img/h6.svg" alt="bad ones"><img src="img/h7.svg" alt="bad ones"><img src="img/h8.svg" alt="bad ones"></p>'+
'<p>Take care of your Health:<br>+200 * lvl No. -> Level up!<br>&nbsp;-100 -> You\'re dead!</p>'+
'<p>Bonus lvl -> No chanve to survive, but xtra scores ;)</p>'+
'';

/*-----------------------------Testowe Zatrzymywanie Gry--------------------------------*/
// setTimeout(function () {
//     clearInterval(intervalCheck);
//     clearInterval(intervalBrick);
// }, 10000)

/*
tudu  ----->
2. delete brick Objects
3. cos nie tak z basket, jesli nie uruchomimy gry z mysza nad game-board
4. bardziej inteligenetne trzorzenie bricks - maybe
*/