var env = {
    minPosX: 0,
    maxPosX: 100,
    minPosY: 0,
    maxPosY: 95,
    viewPortHpx: $('.game-board').height(),
    viewPortWpx: $('.game-board').width(),
    scoreBar: null,
    basket: null,
    infoPages: null,
    level: 0,
    score: 0,
    health: 0,
    speed: 0,
    creationDelay: 0,
    levelEndHealth: 0,
    levelDeadHealth: 0,
    calcPct: function (x) {
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
    initGame: function () {
        /*-- Init scoreBar --*/
        env.scoreBar = new ScoreBar();
        env.scoreBar.init();
        /*-- Init infoPages --*/
        env.infoPages = new InfoPages();
        env.infoPages.setPageStartGame();
        /*-- Init basket --*/
        //in the global scope due to some reasons
        /*-- Init bgSound --*/
        $('.game-board').append('<div class="sounds"><audio id="bg_sound" autoplay="autoplay" loop="loop"><source src="audio/8-bit-bg-sound.mp3" /></audio><a href="#noscroll" id="bg_sound_mute" class="bg-sound-on"></a></div>'); //-----wld_TEMP
        $('.game-board').append('<div class="floor"></div>'); //-----wld_TEMP
    },
    resetGame: function () {
        env.level = 0;
        env.score = 0;
        env.health = 0;
        env.speed = 0;
        env.creationDelay = 0;
        env.levelEndHealth = 0;
        env.levelDeadHealth = 0;
        env.scoreBar.resetScoreBar();
        env.infoPages.setPageStartGame();
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

        env.scoreBar.updateScoreBar(env.level, env.health, env.score);

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
                    env.scoreBar.updateScoreBar(env.level, env.health, env.score);
                    element.removeBrick();
                    //delete element;
                } else {
                    //do nothing for now
                }
            });
            //if levelEndHealth reached, stop intervals and LEVEL UP!
            if (env.health >= env.levelEndHealth) {
                clearInterval(intervalCheck);
                clearInterval(intervalBrick);
                env.clearBricks(bricks);
                bricks = [];
                if (env.level < 3) {env.infoPages.setPageLevelEnd();}
                if (env.level === 3) {env.infoPages.setPageGameEnd();}
            }
            //if levelDeathHealth reached, stop intervals and GAME OVER!
            if (env.health < env.levelDeadHealth) {
                clearInterval(intervalCheck);
                clearInterval(intervalBrick);
                env.clearBricks(bricks);
                bricks = [];
                env.infoPages.setPageGameOver(env.level);
            }
        }, 50); //end Game Interval
    } //end initLevel
} //end env{}


/*-- Init Game --*/
env.initGame();


/*-- Init basket --*/
var basket = new Basket();
basket.init();
//Set .mousemove() listener for basket
$('.game-board').mousemove(function (e) {
    var newX = Math.floor(env.calcPct(e.pageX) - basket.width / 2 - env.calcPct($('.game-board').offset().left));
    if ((newX + basket.width < env.maxPosX) && (newX > env.minPosX)) {
        basket.positionX = newX;
    } else if (newX + basket.width >= env.maxPosX) {
        basket.positionX = env.maxPosX - basket.width;
    } else {
        basket.positionX = env.minPosX;
    }
    basket.moveBasket(basket.positionX);
});


/*-----------------------------Test Game Stop--------------------------------*/
// setTimeout(function () {
//     clearInterval(intervalCheck);
//     clearInterval(intervalBrick);
// }, 10000)
