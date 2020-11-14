//Create variables here
var dog;
var foodS;
var foodStock;
var database;
var haapyDog;
var feed;
var addFoods;
var fedTime;
var lastFed;
var foodObj;
function preload()
{
  //load images here
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(1000, 1000);
  
  //Creation of the dog.
  dog = createSprite(250,400,30,30);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  foodObj = new Food(34)

  feed = createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods)
  
}


function draw() {  
background("#1E8E3E")
foodObj.display();
fill(255,255,254);
textSize(15)
if(lastFed>=12){
  text("Last Feed :" +lastFed%12 + "PM", 300,30);
}else if(lastFed == 0){
text("Last Feed : 12 PM",300,30);
}else{
  text("Last Feed :" + lastFed + "AM", 300,30);
}

textSize(19)
fill("yellow")
text("Food:"+foodS,250,250);

fedTime = database.ref('FeedTime')
fedTime.on("value",function(data){
 lastFed = data.val();
})
  drawSprites();
  //add styles here
}

function readStock(data){
foodS = data.val();

}

function writeStock(x){
  if(x<=1){
    x = 0;
  }else {
  x = x-1;
 } 
database.ref('/').update({
  Food:x
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
 }
 
 function feedDog(){
   dog.addImage(happyDogImage)
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour()
   })
 }