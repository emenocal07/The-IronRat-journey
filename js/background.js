class Background {
  constructor(ctx, bckgSizeW, bckgSizeH, bckgImgSource) {
    this.ctx = ctx;
    this.gameSizeW = bckgSizeW;
    this.gameSizeH = bckgSizeH;

    this.imageInstance = new Image();
    this.imageInstance.src = `img/${bckgImgSource}`;

    this.bckgPosX = 0;
    this.bckgPosY = 0;

    this.bckgVelX = 3;
  }

  draw() {
    this.ctx.drawImage(this.imageInstance, this.bckgPosX, this.bckgPosY, this.gameSizeW, this.gameSizeH);
    this.ctx.drawImage(this.imageInstance, this.bckgPosX + this.gameSizeW, this.bckgPosY, this.gameSizeW, this.gameSizeH);
    this.move()
    this.drawScore()
  }
  drawScore() {


    this.ctx.font = 'bold 50px Comic Sans MS'
    this.ctx.fillStyle = 'green'
    this.ctx.fillText(`SCORE: ${game.score}`, 70, 80)
  }
  move() {
    if (this.bckgPosX <= -this.gameSizeW) {
      this.bckgPosX = 0;
    }
    this.bckgPosX -= this.bckgVelX;
  }
}


