function Cat(name){
  this.name = name;
  var foodAmount=50;
  
   function formatFoodAmount(){
   return foodAmount + ' гр.';
  }
    
    this.feed = function(){
    console.log('Насыпаем в миску '+ formatFoodAmount() +"корма.");
   }

 this.dailyNorm  = function(foodAmount) {
    
    function formatFoodAmount(){
   return foodAmount + ' гр.';
  }
    
    this.feed = function(){
    console.log('Насыпаем в миску '+ formatFoodAmount() +"корма.");
   }
    
    if (typeof foodAmount == 'number' && foodAmount > 50 && foodAmount < 500) return this.feed();
    if (foodAmount < 50) {
      throw new Error('Если недкормить покемона то он не эвалюционирует должно быть > 50 гр.');
    }
    if (foodAmount > 500) {
      throw new Error('Нельзя перекармливать покемона иначе он не влезет потом в двери это много < 500 гр должно быть а у вас :' + formatFoodAmount());
    }
    dailyNorm = foodAmount;
  }

}


var barsik=new Cat("Pokenom");

console.log(barsik.name);
barsik.feed();
//barsik.dailyNorm(501);
//barsik.dailyNorm(49);
barsik.dailyNorm(300);

barsik=null;