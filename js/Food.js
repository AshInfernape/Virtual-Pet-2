class Food{
    constructor(foodStock){
        var getFoodStock;
      
        var deductFood;
        this.image = loadImage("images/Milk.png");
    }

    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }

     updateFoodStock(y){
        database.ref('/').update({
         Food:y,
       })
      }

   getFoodStock(){
       var getFood = database.ref('Food') 
      getFood.on("value",(data)=>{
     getFood = data.val();
      })
    }
    
   
}