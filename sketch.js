var PLAY=1;
var END=0;
var gameState=PLAY;
var survivalTime;
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var gameOver,GameOver;

function preload(){
  
  
  
  monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  GameOver=loadImage("gameOver.png");
 
}



function setup() {
  createCanvas(displayWidth - 20, displayHeight-30);
  
  monkey=createSprite(displayWidth/5,325,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
   ground=createSprite(displayWidth/2,displayHeight/1.5,displayWidth+1000,displayHeight-600);
  ground.shapeColor="green";
  
  
obstacleGroup=createGroup();
  FoodGroup=createGroup();
  
score=0;

  gameOver=createSprite(displayWidth/2,displayHeight/2,10,10);
  gameOver.addImage("gameover",GameOver);
  gameOver.scale=0.5;

  

  
  
  

  
}


function draw() {
  background("lightblue");
  camera.position.x = displayWidth/2 ;
  camera.position.y = displayHeight/2;
  
  stroke("white");
  textSize(20);
  fill("white")
    text("Score:"+score,displayWidth/81,displayHeight/4);
    
  stroke("white");
  textSize(20);
  fill("white");
 
    text("Suvival Time:"+survivalTime,displayWidth/100,displayHeight/3);
  if (gameState===1){
    
   gameOver.visible=false;
    
  if(keyDown("space")){
    monkey.velocityY=-12;
    
  
    
  }
     survivalTime=Math.ceil(frameCount/frameRate());
    
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(monkey.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
  }
   food();
  spawnObstacle();
  
    ground.velocityX=-6;
  ground.x=ground.width/2;
    
   
    
  
  } else if (gameState===0){
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0;
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.visible=false;
    gameOver.visible=true;
  }
monkey.collide(ground);
  drawSprites();
 
}
function food(){
  if (frameCount%80===0){
    banana=createSprite(displayWidth/1.5,Math.round(random(displayWidth/6,camera.position.x)),10,10);
  banana.addImage("food",bananaImage);
    banana.scale=0.1;
    banana.velocityX=-8;
    banana.lifetime=1000;
    FoodGroup.add(banana)
    
  }
}
function spawnObstacle(){
  if (frameCount%300===0){    obstacle=createSprite(Math.round(random(camera.position.x,displayWidth/6)),200,10,10);
obstacle.addImage("obstacles",obstaceImage);
obstacle.scale=0.1;
  obstacle.velocityX=-5;
obstacle.lifetime=90;
obstacleGroup.add(obstacle);

    
  }
}







