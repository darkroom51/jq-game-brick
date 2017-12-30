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
    },
    setPageInstruction: function () {
        var pageInstruction = $('<div class="page-level-ok"><span>Game Instruction</span><button onclick="$(\'.page-level-ok\').remove(); env.setPageStartGame();">Back to Menu</button></div>');
        $('.game-board').append(pageInstruction);
    },
    setPageLevelEnd: function () {
        var pageLevelEnd = $('<div class="page-level-ok"><span>LEVEL UP!</span><button onclick="env.initLevel(env.level); $(\'.page-level-ok\').remove();">Next level</button></div>');
        $('.game-board').append(pageLevelEnd);
    },
    setPageGameOver: function () {
        //document.querySelector('.game-board').innerHTML = '<div class="page-level-ok"><span>GAME OVER</span></div>';
        var pageGameOver = $('<div class="page-level-ok"><span>GAME OVER</span><button onclick="$(\'.page-level-ok\').remove(); env.setPageStartGame();">Reset Game</button></div>');
        $('.game-board').append(pageGameOver);
    },
    initLevel: function (level) {
        /*-----------------------------Ustawiamy wartosci poczatkowe kazdego levelu--------------------------------*/
        if (level === 0) {
            env.speed = 0.2;
            env.creationDelay = 2000;
            env.levelEndHealth = 100;
            env.health = 0;
            env.levelDeadHealth = -100;
            env.level = env.level + 1;
        }
        if (level === 1) {
            env.speed = 0.3;
            env.creationDelay = 1000;
            env.levelEndHealth = 200;
            env.health = 0;
            env.levelDeadHealth = -50;
            env.level = env.level + 1;
        }
        if (level === 2) {
            env.speed = 0.5;
            env.creationDelay = 400;
            env.levelEndHealth = 300;
            env.health = 0;
            env.levelDeadHealth = -50;
            env.level = env.level + 1;
        }

        $('#scorebar').text('level: '+ env.level +' | health: '+ env.health +' | score: '+ env.score);

        /*-----------------------------Inicjujemy Bricks--------------------------------*/
        var bricks = [];
        //Interval tworzacy Bricks
        var intervalBrick = setInterval(function () {
            var brick = new Brick(env.getRandom(0, 100), 0, env.getRandom(1, 10), env.getRandom(1, 2));
            brick.init();
            bricks.push(brick);
        }, env.creationDelay);

        /*-----------------------------Interval Gry--------------------------------*/
        var intervalCheck = setInterval(function () {
            //sprawdzanie czy Brick zostal zlapany w Basket
            bricks.forEach(function (element) {
                element.moveDown();
                if (element.checkCollision(basket)) {
                    if (element.type <= 5) { env.score += element.score; env.health += element.health; } else { env.score -= element.type; env.health -= element.health; }
                    $('#scorebar').text('level: '+ env.level +' | health: '+ env.health +' | score: '+ env.score);
                    element.removeBrick();
                    //delete element;
                } else {
                    //console.log('out')
                }
            });
            //Jesli osiagnelismy wymagana liczbe punktow Gra zatrzymuje intervals i LEVEL UP!
            if (env.health >= env.levelEndHealth) {
                clearInterval(intervalCheck);
                clearInterval(intervalBrick);
                env.clearBricks(bricks);
                bricks = [];
                env.setPageLevelEnd();
            }
            //Jesli zeszlismy ponizej zalozonej liczby punktow to Game Over
            if (env.health < env.levelDeadHealth) {
                clearInterval(intervalCheck);
                clearInterval(intervalBrick);
                $('#scorebar').text('level: '+ env.level +' | health: '+ env.health +' | score: '+ env.score);
                env.setPageGameOver();
                env.clearBricks(bricks);
                bricks = [];
                env.score = 0;
                env.level = 0;
                env.health = 0;
            }
        }, 50);
    } //end initLevel
} //end env


env.setPageStartGame();

$('.game-board').append('<div id="scorebar"></div>'); //-----wld_TEMP
$('.game-board').append('<div class="sounds"><audio id="bg_sound" autoplay="autoplay" loop="loop"><source src="audio/8-bit-Arcade4.mp3" /></audio><a href="#noscroll" id="bg_sound_mute" class="bg-sound-on"></a></div>'); //-----wld_TEMP

/*-----------------------------Inicjujemy Basket--------------------------------*/
//tworzymy i inicjujemy koszyk
var basket = new Basket();
basket.init();
//poruszamy koszykiem
$('.game-board').mousemove(function (e) {
    //console.log('page: ', e.pageX); //--------------------wld_CL
    var newX = Math.floor(env.calcProc(e.pageX) - basket.width / 2 - env.calcProc($('.game-board').offset().left));
    //console.log(newX); //--------------------wld_CL
    if ((newX + basket.width < env.maxPosX) && (newX > env.minPosX)) {
        basket.positionX = newX;
    } else if (newX + basket.width >= env.maxPosX) {
        basket.positionX = env.maxPosX - basket.width;
    } else {
        basket.positionX = env.minPosX;
    }
    basket.moveBasket(basket.positionX);
});




/*-----------------------------Testowe Zatrzymywanie Gry--------------------------------*/
// setTimeout(function () {
//     clearInterval(intervalCheck);
//     clearInterval(intervalBrick);
// }, 10000)


/*
tudu  ----->
2. delete brick Objects
3. cos nie tak z basket, jesli nie uruchomimy gry z mysza nad game-board
4. bardziej inteligenetne trzorzenie bricks*
5. rodzielic score i health
*/