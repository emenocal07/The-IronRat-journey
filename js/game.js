const game = {
  appName: "The IronRat Journey app",
  author: "Ernesto Espinoza & Hiba Berber",
  version: "1.0.0",
  license: undefined,
  gameSizeW: undefined,
  gameSizeH: undefined,
  ctx: undefined,
  canvas: undefined,
  FPS: 60,
  framesCounter: 0,
  background: undefined,
  player: undefined,
  music: undefined,
  score: 0,
  enemies: [],
  goals: [],
  numberOfGoalTypes: 9,
  numberOfEnemyTypes: 2,
  keys: {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37,
    SPACE: 32,
  },

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    this.start();
    this.music = new Audio("./sounds/sound.mp3");
    this.music.loop = true;
  },

  setDimensions() {
    this.gameSizeW = window.innerWidth;
    this.gameSizeH = window.innerHeight;
    this.canvas.setAttribute("width", this.gameSizeW);
    this.canvas.setAttribute("height", this.gameSizeH);
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter > 5000
        ? (this.framesCounter = 0)
        : this.framesCounter++;
      this.createEnemies();
      this.createGoals();
      this.clearAll();
      this.drawAll();
      this.clearEnemies();
      this.clearGoals();
      this.isCollisionPlayer() ? this.gameOver() : null;
      this.checkEnemyKill();
      this.checkGoalTaken();
      this.music.play();
    }, 1000 / this.FPS);
  },

  reset() {
    this.background = new Background(
      this.ctx,
      this.gameSizeW,
      this.gameSizeH,
      "bg.png"
    );
    this.player = new Player(
      this.ctx,
      this.gameSizeW,
      this.gameSizeH,
      this.keys
    );
    this.bullets = new Bullets(
      this.ctx,
      this.playerPosX,
      this.playerPosY,
      this.playerSizeW,
      this.playerSizeH
    );
  },

  drawAll() {
    this.background.draw();
    this.player.draw(this.framesCounter);
    this.framesCounter;
    this.enemies.forEach((element) => element.draw());
    this.goals.forEach((element) => element.draw());
  },

  clearAll() {
    this.ctx.clearRect(0, 0, this.gameSizeW, this.gameSizeH);
  },

  createGoals() {
    if (this.framesCounter % 250 === 0) {
      const index = Math.floor(Math.random() * this.numberOfGoalTypes);
      this.goals.push(
        new Goal(this.ctx, this.gameSizeW, this.gameSizeH, index)
      );
    }
  },

  clearGoals() {
    this.goals = this.goals.filter((goal) => goal.goalPosX >= 0);
  },

  checkGoalTaken() {
    if (this.goals.length > 0) {
      this.goals.forEach((elm, i) => {
        if (this.isCollisionPlayerG(elm)) {
          this.score += 50;
          this.goals.splice(i, 1);
        }
      });
    }
  },

  createEnemies() {
    if (this.framesCounter % 30 === 0) {
      const index = Math.floor(Math.random() * this.numberOfEnemyTypes);
      this.enemies.push(
        new Enemy(this.ctx, this.gameSizeW, this.gameSizeH, index)
      );
    }
  },

  clearEnemies() {
    this.enemies = this.enemies.filter((enem) => enem.enemyPosX >= 0);
  },

  checkEnemyKill() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((elm, i) => {
        if (this.isCollisionEnemies(elm)) {
          this.enemies.splice(i, 1);
        }
      });
    }
  },

  isCollisionPlayer() {
    return this.enemies.some((enem) => {
      return (
        this.player.playerPosX < enem.enemyPosX + enem.enemyWidth &&
        this.player.playerPosX + this.player.playerSizeW > enem.enemyPosX &&
        this.player.playerPosY < enem.enemyPosY + enem.enemyHeight &&
        this.player.playerPosY + this.player.playerSizeH > enem.enemyPosY
      );
    });
  },

  isCollisionPlayerG() {
    return this.goals.some((goal) => {
      return (
        this.player.playerPosX < goal.goalPosX + goal.goalWidth &&
        this.player.playerPosX + this.player.playerSizeW > goal.goalPosX &&
        this.player.playerPosY < goal.goalPosY + goal.goalHeight &&
        this.player.playerPosY + this.player.playerSizeH > goal.goalPosY
      );
    });
  },

  isCollisionEnemies(enem) {
    return this.player.bullets.some((bullet) => {
      return (
        bullet.bullPosX < enem.enemyPosX + enem.enemyWidth &&
        bullet.bullPosX + bullet.bullW > enem.enemyPosX &&
        bullet.bullPosY < enem.enemyPosY + enem.enemyHeight &&
        bullet.bullPosY + bullet.bullH > enem.enemyPosY
      );
    });
  },

  gameOver() {
    clearInterval(this.interval);
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
    this.ctx.fillRect(0, 0, this.gameSizeW, this.gameSizeH);

    this.ctx.fillStyle = "#c94c4c";
    this.ctx.fillRect(415, 175, 655, 320);

    this.ctx.font = "bold 70px Comic Sans MS";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("GAME OVER!", 510, 270);

    this.ctx.font = "bold 40px Comic Sans MS";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Your final score is: ${this.score}`, 530, 360);

    this.ctx.font = "bold 40px Comic Sans MS";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("RELOAD and try again!", 520, 450);
  },
};
//const button = document.querySelector(#button)
//startGame(){

//}
