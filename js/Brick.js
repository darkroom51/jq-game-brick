function Brick(positionX, positionY, type) {
    this.brickHandler = '';
    this.x = positionX;
    this.y = positionY;
    this.width = 7;
    this.height = 7;
    this.type = type; //1-9 integer value setting type of brick; 1-5 Good, 6-9 Bad
    this.score = this.type * 10;
    this.health = this.type * 5;
    this.step = env.speed * this.type; //speed of the brick
}

Brick.prototype.init = function () {
    if (this.x >= env.maxPosX - this.width) {this.x = env.maxPosX - this.width}
    this.brickHandler = $('<div class="brick brick-type-'+this.type+'" style="left: ' + this.x + '%;"></div>');
    $('.game-board').append(this.brickHandler);
    if (this.type<=5) {
        $(this.brickHandler).html('<div class="brick-health-good"> +'+ this.health +'</div>'); //-----------wld_test
    }
    else{
        $(this.brickHandler).html('<div class="brick-health-bad"> -'+ this.health +'</div>'); //-----------wld_test
    }
}
Brick.prototype.moveDown = function () {
    if ((this.y + this.step) <= env.maxPosY - this.height + 2) {
        this.y = this.y + this.step;
        $(this.brickHandler).css('top', this.y + '%');
    }
    else {
        this.removeBrick();
    }
}
Brick.prototype.removeBrick = function () {
    $(this.brickHandler).remove();
    this.x = -10000; // removing brick object from game area
    this.y = -10000;
}
Brick.prototype.checkCollision = function (basket) {
    if (basket instanceof Basket) {
        var bY1 = this.y + this.height;
        var bX1 = this.x;
        var bX2 = this.x + this.width;
        var iY1 = basket.positionY;
        var iX1 = basket.positionX;
        var iX2 = basket.positionX + basket.width;
        if (bY1 > iY1 && ((bX1 >= iX1 && bX1 <= iX2) || (bX2 >= iX1 && bX2 <= iX2))) {
            return true;
        } else {
            return false;
        }
    } else {
        throw Error('Invalid parameter in checkCollision');
    }
}