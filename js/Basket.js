function Basket() {
    this.positionX = 40;
    this.positionY = 85;
    this.height = 10;
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