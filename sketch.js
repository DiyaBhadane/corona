var START = 0;
var PLAY = 1;
var MASK = 2;
var END = 3;
gameState = 0;
var score = 0;

var city, cityImage;
var corona, corona1, corona2, corona3;
var car1, car2, car3;
var player, playerImage;
var mask, maskImage;
var grp1, grp2, grp3;
var best, bestImage;

function preload() {
  cityImage = loadImage("city.png");
  corona1 = loadImage("corona1.gif");
  corona2 = loadImage("corona2.gif");
  corona3 = loadImage("corona3.gif");
  car1 = loadImage("carred.png");
  car2 = loadImage("carblue.png");
  car3 = loadImage("carblack.png");
  bestImage = loadImage("best.png")

  playerImage = loadAnimation("walk1.png", "walk2.png", "walk3.png", "walk4.png", "walk5.png", "walk6.png", "walk7.png");
  maskImage = loadImage("mask.png");
  grp1 = new Group();
  grp2 = new Group();
  grp3 = new Group();
}

function setup() {
  createCanvas(600, 600);

  city = createSprite(300, 300);
  city.addImage(cityImage);
  city.scale = 2.2;
  city.velocityX = -3;

  player = createSprite(80, 360);
  player.addAnimation("walking", playerImage);
  player.scale = 1;

  mask = createSprite(85, 313);
  mask.addImage(maskImage);
  mask.scale = 0.12;
  mask.visible = false;
}

function draw() {
  background("yellow");

  if (gameState === START) {
    textSize(30);
    fill("red");
    stroke("lightblue");
    text("You are walking in the city...",120,100);
    text("It's vary much important to wear the mask ", 20,150);
    text(" when you go out of your home...",70, 185);
    textSize(28);
    noStroke();
    fill("blue");
    text("Click on SPACE key to wear the mask...",50,300);
    text("Now click SPACE key to strat the game..",50, 350);
    textSize(40);
    fill("green");
    text("All The Best..!!!👍", 150, 500);
    
    if(keyDown("space")){
      gameState = PLAY;
    }
  }

  if (gameState === PLAY) {

    if (city.x < 100) {
      city.x = 300;
    }

    mask.visible = false;
    spawnCorona();
    spawnCar();

    drawSprites();

    if (player.isTouching(grp1)) {
      gameState = END;
    }
    if (player.isTouching(grp2)) {
      gameState = END;
    }
    if (player.isTouching(grp3)) {
      gameState = END;
    }

    if (keyDown("space")) {
      gameState = MASK;
    }
    textSize(30);
    fill("red");
    text("Score : " + score, 450,50);
  }

  if (gameState === MASK) {
    if (city.x < 100) {
      city.x = 300;
    }

    mask.visible = true;
    spawnCorona();
    spawnCar();

    drawSprites();

    if (player.isTouching(grp1)) {
      grp1.destroyEach();
      gameState = PLAY;
      BEST();
      score = score +10;
    }
    if (player.isTouching(grp2)) {
      grp2.destroyEach();
      gameState = PLAY;
      BEST();
      score = score +10;
    }

    if (player.isTouching(grp3)) {
      grp3.destroyEach();
      gameState = PLAY;
      BEST();
      score = score +10;
    }
    textSize(30);
    fill("red");
    text("Score : " + score, 450,50);
  }

  if (gameState === END) {
    textSize(40);
    fill("red")
    text("Game Over..!!! 😢", 130, 100);
    textSize(30);
    fill("blue")
    text("As you were not wearing the mask...", 60, 200);
    text("The virus attecked on you...", 110, 250);
    fill("green");
    text("Be careful the next time...", 130, 350);
    text("You shoud always wear mask whenever", 30, 400);
    text("you go outside...", 170, 430);
    textSize(40);
    fill("red");
    stroke("lightblue")
    text("STAY HOME, STAY SAFE..!!!", 50, 530);
  }
}

function CORONA1() {
  corona_1 = createSprite(700, Math.round(random(360, 450)));
  corona_1.addImage(corona1);
  corona_1.scale = 0.2;
  corona_1.velocityX = -5;
  corona_1.lifetime = 300;
  grp1.add(corona_1);
}

function CORONA2() {
  corona_2 = createSprite(700, Math.round(random(360, 450)));
  corona_2.addImage(corona2);
  corona_2.scale = 0.4;
  corona_2.velocityX = -5;
  corona_2.lifetime = 300;
  grp2.add(corona_2);
}

function CORONA3() {
  corona_3 = createSprite(700, Math.round(random(350, 450)));
  corona_3.addImage(corona3);
  corona_3.scale = 0.3;
  corona_3.velocityX = -5;
  corona_3.lifetime = 300;
  grp3.add(corona_3);
}

function spawnCorona() {
  if (frameCount % 150 === 0) {
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        CORONA1();
        break;
      case 2:
        CORONA2();
        break;
      case 3:
        CORONA3();
        break;
      default:
        break;
    }
  }
}

function spawnCar() {
  if (frameCount % 200 === 0) {
    var car = createSprite(700, 510);
    car.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        car.addImage(car1);
        break;
      case 2:
        car.addImage(car2);
        break;
      case 3:
        car.addImage(car3);
        break;
      default:
        break;
    }

    car.scale = 0.5;
    car.lifetime = 300;
  }
}

function BEST(){
  best = createSprite(300,250);
  best.addImage(bestImage);
  best.scale = 0.5;
  best.lifetime = 30;
}