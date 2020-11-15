var PLAY=1;
var END=0;
var WIN=11;
var score=0;
var gameState=PLAY;
var monkey , monkey_running,ground ;
var banana ,bananaImg,FoodGroup;
var obstacle, obstacleImg,obstaclesGroup,score;
var bg,bgImg,restart,restartImg;
var sound;

function preload()
{
  
monkey_running =      loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stop=loadAnimation("sprite_0.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
  bgImg=loadImage("jungle.jpg"); 
  restartImg = loadImage("restart.png");
  sound=loadSound("jungleSound.m4a");
}

function setup() {
  createCanvas(600,600);

  sound.loop();
  
  bg=createSprite(0,0,600,600);
  bg.addImage("bg",bgImg);
  bg.scale=1;
  
  // creating monkey
  monkey = createSprite(80,200,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stop", monkey_stop);
  monkey.scale=0.07;
  monkey.setCollider("circle",15,10,250);
  //monkey.debug=true;
  
  ground = createSprite(400,300,900,10);
  ground.velocityX=-4
  ground.x = ground.width /2;
  ground.visible=false;
  
   restart = createSprite(270,230);
  restart.addImage("restart",restartImg);
  restart.scale = 0.8;
  
  console.log(ground.x);
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
}
function draw()
{
  
 if(gameState === PLAY)
 { 
      restart.visible=false;  
   
  ground.velocityX = -(4 + 3* score/50)
  if (ground.x < 0)
  {
  ground.x = ground.width/2;
  }   
   
   bg.velocityX=-5;
   if (bg.x < 0)
   {
   bg.x = bg.width/2;
   }   
   
   if(keyWentDown("space")&& monkey.y >= 100) 
   {
        monkey.velocityY = -11;
    }
    //adding gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
   Food();
  obstacles();
   
   if(FoodGroup.isTouching(monkey))
 {
     FoodGroup.destroyEach();
    score = score+2;
     
     if(score%20===0)
        {
        monkey.scale=monkey.scale+0.5;
        }
   } 
       if(obstaclesGroup.isTouching(monkey)){      
         monkey.addAnimation("stop",monkey_stop);
         gameState = END;    
         monkey.scale=0.07;
       }
   
   if(monkey.scale===25)
     {
       gameState=WIN;
     }
 }
  else if (gameState === END) 
  {
    restart.visible = true;
    
    ground.velocityX = 0;
    bg.velocityX=0;
    monkey.velocityY=0;
    
    monkey.changeAnimation("stop",monkey_stop);
    
    FoodGroup.setVelocityXEach(0); 
    obstaclesGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
  
   if(mousePressedOver(restart)) {
      reset();
     }
  }

  if(gameState===WIN)
  {
    text("CONGRATULATIONS",200,200);
  }
  
  monkey.collide(ground);
  
  drawSprites();
  
   //displaying score
  stroke("white");
  fill("white");
  textSize(18);
  text("Score : "+ score, 400,50);
}
function Food()
{
  if(frameCount%60===10)
  {
    banana = createSprite(600,50,10,40);
    banana.y= Math.round(random(1,100)); 
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = 75;
    FoodGroup.add(banana);
  } 
}
function obstacles()
{
  if(frameCount%100===0)
  {
    obstacle=createSprite(500,260,20,20);
    obstacle.velocityX = -(6 + score/100);
    obstacle.setCollider("circle",10,10,255);
    //obstacle.debug=true;
    
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    
    // assigning scale and lifetime to the obstacle           
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}
function reset()
{  
    gameState = PLAY;
   monkey.changeAnimation("running",monkey_running);
  
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  score=0;  
}