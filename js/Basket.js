function Basket() {
    this.positionX = 40;
    this.positionY = 90;
    this.height = 5;
    this.width = 20;
}

Basket.prototype.init = function () {
    var basket = $('<div class="basket" style="top: ' + this.positionY + '%;left: ' + this.positionX + '%;"></div>');
    $('.game-board').append(basket);
}
Basket.prototype.moveBasket = function (positionMX) {
    this.positionX = positionMX;
    $('.basket').css('left', (this.positionX) + '%');
}