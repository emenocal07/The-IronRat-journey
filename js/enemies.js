class Enemy {
  constructor(ctx, gameSizeW, gameSizeH, i) {
    this.ctx = ctx;
    this.enemyWidth = 72;
    this.enemyHeight = 72;

    this.enemyPosX = gameSizeW;
    this.gameSizeH = gameSizeH;

    this.enemyPosY = this.randomEnemy();
    this.enemyVelX = 8;

    this.imageInstance = new Image();
    this.imageEnemyArr = ["./img/enemy1.png", "./img/enemy2.png"]
    this.imageInstance.src = this.imageEnemyArr[i]
  }

  draw() {
    this.ctx.drawImage(
      this.imageInstance,
      this.enemyPosX,
      this.enemyPosY,
      this.enemyWidth,
      this.enemyHeight
    )
    this.move()
  }

  move() {
    this.enemyPosX -= this.enemyVelX;
  }

  randomEnemy() {
    let random = Math.floor(Math.random() * (this.gameSizeH - this.enemyHeight));
    return random
  }



}


