class Bullets {
  constructor(ctx, playerPosX, playerPosY, playerSizeW, playerSizeH) {
    this.ctx = ctx;
    this.bullPosX = playerPosX + playerSizeW;
    this.bullPosY = playerPosY + playerSizeH / 2;
    this.bullW = 50
    this.bullH = 7
    this.bullVelX = 30;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.bullPosX, this.bullPosY);
    this.ctx.lineTo(this.bullPosX + 50, this.bullPosY);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.lineWidth = 7;
    this.ctx.strokeStyle = 'red';
    this.move();
  }
  // draw() {
  //   this.ctx.fillRect(this.bullPosX, this.bullPosY, this.bullW, 7)
  //   this.move();
  // }

  move() {
    this.bullPosX += this.bullVelX;
  }
}




