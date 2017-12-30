function Brick(positionX, positionY, type, isGood) {
    this.brickHandler = '';
    this.x = positionX;
    this.y = positionY;
    this.width = 5;
    this.height = 5;
    this.type = type; //dodawanie klasy, zeby okreslic typ
    this.isGood = isGood;
    this.score = this.type * 10;
    this.step = env.speed * this.type;
    this.init = function () {
        if (this.x >= env.maxPosX - this.width) {this.x = env.maxPosX - this.width}
        this.brickHandler = $('<div class="brick brick-type-'+this.type+'" style="left: ' + this.x + '%;"></div>');
        $('.game-board').append(this.brickHandler);
        $(this.brickHandler).html(this.score); //-----------wld_test
    }
    this.moveDown = function () {
        if ((this.y + this.step) <= env.maxPosY) {
            this.y = this.y + this.step;
            $(this.brickHandler).css('top', this.y + '%');
        }
        else {
           this.removeBrick();
        }
    }
    this.removeBrick = function () {
        $(this.brickHandler).remove();
        this.x = -10000; // tymczasowe wywalanie Objektow za ekran
        this.y = -10000;
    }
    this.doRemoveBrick = function () {
        return this.y >= env.maxPosY;
    }
    this.checkCollision = function (basket) {
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
}