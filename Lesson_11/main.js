/*Задание 1:
    Переписать предыдущий пример с кошками на прототипный стиль ООП. */


function Animal(name) {
      this._foodAmount = 50;
      this.name = name;
   }
   
   Animal.prototype._formatFoodAmount = function() {
      return this._foodAmount + 'гр.';
   }
   
   Animal.prototype.feed = function() {
      console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
   };
   
   Animal.prototype.dailyNorm = function(amount) {
      
      if (!arguments.length) return this._formatFoodAmount();
      
      if (amount < 50 || amount > 500) {
         throw new Error( 'Корма не должно быть меньше 50гр. или больше 500гр.' );
      }
      
      this._foodAmount = amount;    
   }
   
function Cat() {
      Animal.apply(this, arguments);

      var _feed = this.feed;
      this.feed = function() {
            _feed.call(this);
            console.log('Кот доволен ^_^');
            return this;
      }
   }
   
   Cat.prototype = Object.create(Animal.prototype);
   Cat.prototype.constructor = Cat;
   
   var barsik = new Cat('Барсик');

   Cat.prototype.stroke = function() {
      console.log('Гладим кота.');
      return this;
   }
   
   console.log(barsik.name);
   barsik.dailyNorm( 100 );
   barsik.feed().stroke().feed().stroke();



/* Задание 2:
    Написать функцию, возвращающую глубокую копию объекта - его клон. Клонироваться должны значения всех типов данных
    (+ массивы и функции), а также любого уровня вложенности. Метод isArray использовать можно.*/





function deepClone(obj) {
      var out = {};
    
      if (typeof obj !== "object" || obj === null) {
        return obj
      }   
      
      out = Array.isArray(obj) ? [] : {}
    
      for (var key in obj) {
        var value = obj[key]
        out[key] = deepClone(value)
      }
    
      return out
}

 var initialObj = {
          string: 'Vasya',
          number: 30,
          boolean: true,
          undefined: undefined,
          null: null,
          array: [1, 2, 3],
          object: {
              string2: 'Petrov',
              object2: {
                  array2: [{}, {}]
              },
              object3: {}
          },
          method: function() {
              alert('Hello');
          }
      };
 
      var clonedObj = deepClone(initialObj);
 
      clonedObj.object.object2.array2[1].name = 'Vasya';
      clonedObj.array.push(2);
 
      console.log(initialObj);
      console.log(clonedObj);




/* Задание 3:
    Написать функцию глубокого сравнения объектов, возвращающую boolean. Сравниваться должны значения всех типов данных
    (+ массивы и функции), а также любого уровня вложенности. Для определения длины объектов разрешается использовать
    метод Object.keys(). Хорошо протестировать работу функции (можно на примере из пред. задания).
*/


var initialObj = {
   string : 'Vasya',
   number : 30,
   boolean : true,
   undefined : undefined,
   null : null,
   array : [ 1, 2, 3 ],
   object : {
      string2 : 'Petrov',
      object2 : {
         array2 : [ {}, {} ]
      },
      object3 : {}
   },
   method : function() {
      alert( 'Hello' );
   }
};

console.log( "same: " + deepCompare( initialObj, initialObj ) )


var clonedObj = deepClone( initialObj );
clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push( 2 );
console.log( "cloned: " + deepCompare( initialObj, clonedObj ) )

var initialObj2 = {
   string : 'Vasya',
   number : 30,
   boolean : true,
   undefined : undefined,
   null : null,
   array : [ 1, 2, 3 ],
   object : {
      string2 : 'Petrov',
      object2 : {
         array2 : [ {}, {} ]
      },
      object3 : {}
   },
   method : function() {
      alert( 'Hello' );
   }
};
console.log( "some?: " + deepCompare( initialObj, initialObj2 ) )

var initialObj3 = {
   string : 'Vasya',
   number : 30,
   boolean : true,
   undefined : undefined,
   null : null,
   array : [ 1, 2, 3, 10 ],
   object : {
      string2 : 'Petrov',
      object2 : {
         array2 : [ {}, { name : '123' } ]
      },
      object3 : {}
   },
   method : function() {
      alert( 'Hello' );
   }
};
console.log( "some?: " + deepCompare( initialObj, initialObj3 ) )

function deepClone( obj ) {
   if ( !obj ) return obj;
   
   var newObj, item;
   
   if ( typeof obj === 'object' ) {
      newObj = !obj.length ? {} : [];
   }
   
   for ( var key in obj ) {
      item = obj[key];
      if ( typeof item !== 'object' ) {
         newObj[key] = item;
      } else {
         newObj[key] = deepClone( item );
      }
   }
   
   return newObj;
}


function deepCompare( objectA, objectB ) {
   var equal = true;
   
   if ( objectA === null || objectA === undefined || objectB === null || objectB === undefined ) {
      equal = false;
   }
   
   if ( Object.keys( objectA ).length !== Object.keys( objectB ).length ) {
      equal = false;
   }
   
   for (key in objectA){
      if ( !objectB.hasOwnProperty( key ) ) {
         equal = false;
      }
      
      if(typeof objectA[key] === 'string' || typeof objectA[key] === 'number' || typeof objectA[key] === 'boolean' || objectA[key] === null || objectA[key] === undefined){
         if ( objectA[key] !== objectB[key]) {
            equal = false;
         }
      }else {
         if(objectA[key] instanceof Function){
            if(Object(objectA[key]).toString() !== Object(objectB[key]).toString()){
               equal = false;
            }
         }else if(objectA[key] instanceof Array){
            if(objectA[key].length !== objectB[key].length){
               equal = false;
            }else{
               if(!deepCompare(objectA[key], objectB[key])){
                  equal = false;
               }
            }
         }else{
            if(!deepCompare(objectA[key], objectB[key])){
               equal = false;
            }
         }
      }
   }
   
   for (key in objectA){
      if ( !objectA.hasOwnProperty( key ) ) {
         equal = false;
      }
   }
   
   return equal;
}
