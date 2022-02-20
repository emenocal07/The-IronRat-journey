class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;
    this.gameSizeW = gameW;
    this.gameSizeH = gameH;

    this.playerSizeW = 175;
    this.playerSizeH = 150;

    this.imageInstance = new Image();
    this.imageInstance.src = "./img/player.png";
    this.imageInstance.frames = 4
    this.imageInstance.framesIndex = 0

    this.playerPosX = 50;
    this.playerPosY = this.gameSizeH / 2;
    this.playerBasePos = this.gameSizeH / 2;

    this.playerVelY = 1;
    this.playerVelX = 1;

    this.keys = keys;

    this.bullets = [];
    this.movements = [];

    this.setEventListeners();

  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.imageInstance,
      this.imageInstance.framesIndex * (this.imageInstance.width / this.imageInstance.frames),
      0,
      this.imageInstance.width / this.imageInstance.frames,
      this.imageInstance.height,
      this.playerPosX,
      this.playerPosY,
      this.playerSizeW,
      this.playerSizeH
    )


    this.animate(framesCounter)
    this.moveUp()
    this.moveDown()
    this.moveRight()
    this.moveLeft()
    this.bullets.forEach((bullet) => bullet.draw());
    this.clearBullets();
  }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.imageInstance.framesIndex++;
    }
    if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
      this.imageInstance.framesIndex = 0;
    }
  }


  // KEYDOWN
  setEventListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case this.keys.UP:
          !this.movements.includes("UP") ? this.movements.push("UP") : null
          break;
        case this.keys.DOWN:
          !this.movements.includes("DOWN") ? this.movements.push("DOWN") : null

          break;
        case this.keys.RIGHT:
          !this.movements.includes("RIGHT") ? this.movements.push("RIGHT") : null

          break;
        case this.keys.LEFT:
          !this.movements.includes("LEFT") ? this.movements.push("LEFT") : null

          break;
        case this.keys.SPACE:
          this.shoot()
          break;
      }
    });

    // KEYUP
    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case this.keys.RIGHT:
          this.movements = [];
          break;
        case this.keys.LEFT:
          this.movements = [];
          break;
        case this.keys.UP:
          this.movements = [];
          break;
        case this.keys.DOWN:
          this.movements = [];
          break;
      }
    });
  }

  moveUp() {
    if (this.movements.includes('UP') && this.playerPosY > 0)
      this.playerPosY -= 10;
  }

  moveDown() {
    if (this.movements.includes('DOWN') && this.playerPosY < this.gameSizeH - 170)
      this.playerPosY += 10;
  }

  moveRight() {
    if (this.movements.includes('RIGHT') && this.playerPosX < this.gameSizeW - 150)
      this.playerPosX += 10;
  }
  moveLeft() {
    if (this.movements.includes('LEFT') && this.playerPosX > 10)
      this.playerPosX -= 10;
  }

  shoot() {
    this.bullets.push(
      new Bullets(
        this.ctx,
        this.playerPosX,
        this.playerPosY,
        this.playerSizeW,
        this.playerSizeH
      )
    );
  }

  clearBullets() {
    this.bullets = this.bullets.filter(
      (bull) => bull.bullPosX <= this.gameSizeW
    );
  }
}
// const button= document.QuerySelector(#button)
  //startGame(){
    //button.addEventListener("click",() =>{
  // this.init()

  //}) 
  // const startGame= button.on