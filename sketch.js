var PLAY= 1;
var END= 0;
var gameState = PLAY;
var score=0;
var player;
var alien,aliensGroup;
var ground, invisibleGround;
var alienImg,playerImg,backgroundImg,groundImg;

function preload(){
  alienImg=loadImage("Alien_image.png");
  playerImg=loadImage("Astronaut_image.png");
  backgroundImg=loadImage("background_image.jpg")
  groundImg=loadImage("ground_image.jpg")
  restartImg=loadImage("restart_image.png")


}
function setup() {
  createCanvas(windowWidth,windowHeight);

  player=createSprite(50,180,20,50);
  player.addImage(playerImg);
  player.scale=0.25

  //Bg=createSprite(width/2,height/2,windowWidth,windowHeight);
  //Bg.addImage(backgroundImg);
  //Bg.scale=4;

  restart=createSprite(windowWidth/2,windowHeight/2,50,50);
  restart.addImage(restartImg);
  restart.scale=0.125
  restart.visible=false
  
  //ground.addImage(groundImg);
  //ground.x= ground.width/2
  //ground.scale=0.5
  

  invisibleGround = createSprite(0,600,windowWidth,10);
  invisibleGround.visible=false

  aliensGroup = new Group()
}

function draw() {
  background(backgroundImg);
  text("Score: "+ score, 500,50);
  console.log(player.y)
  drawSprites();
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //Bg.velocityX = -(6 + 3*score/100);
  
  //if (Bg.x < 0){
  //Bg.x = Bg.width/2;
  //}

    if(keyDown("space") && player.y >= 500) {
      player.velocityY = -18;
    }

    if(keyDown("right_arrow")){
      player.x=player.x+5;
    }

    if(keyDown("left_arrow")){
      player.x=player.x-5;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    player.collide(invisibleGround);
    spawnAliens();
  
    if(aliensGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    //set velcity of each game object to 0
    //bg.velocityX = 0;
    player.velocityY = 0;
    aliensGroup.setVelocityXEach(0);

    //set lifetime of the game objects so that they are never destroyed
    aliensGroup.setLifetimeEach(-1)

    restart.visible=true;
    if(mousePressedOver(restart)){
      retry();
    }

    
    

    
    }
  }

  
  
  

  function spawnAliens(){
  if(frameCount % 100 === 0){
     alien = createSprite(windowWidth,558,1,1)
     alien.addImage(alienImg)
     alien.velocityX= -(6 + 3*score/200);

     alien.scale=0.05;
     alien.lifetime= 300;
     aliensGroup.add(alien);

  }

  function retry(){
    gameState=PLAY;
    restart.visible=false;
   
    aliensGroup.destroyEach()

    score=0;
  }
}

