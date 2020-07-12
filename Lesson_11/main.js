/*Задание 1:
    Переписать предыдущий пример с кошками на прототипный стиль ООП. */


function Animal( name ) {
   this.name = name;
}

Animal.prototype._foodAmount = 50;

Animal.prototype._formatFoodAmount = function() {
   return this._foodAmount + 'гр.';
}

Animal.prototype.feed = function() {
   console.log( 'Насыпаем в миску ' + this.dailyNorm() + ' корма.' );
};

Animal.prototype.dailyNorm = function( amount ) {
   
   if ( !arguments.length ) return this._formatFoodAmount();
   
   if ( amount < 50 || amount > 500 ) {
      throw new Error( 'Корма не должно быть меньше 50гр. или больше 500гр.' );
   }
   
   this._foodAmount = amount;
   
}

function Cat( name ) {
   this.name = name;
   this._animalFeed = this.feed;
}

Cat.prototype = Object.create( Animal.prototype );
Cat.prototype.constructor = Cat;

var barsik = new Cat( 'Барсик' );

Cat.prototype.feed = function() {
   this._animalFeed();
   console.log( 'Кот доволен ^_^' );
   return this;
};
Cat.prototype.stroke = function() {
   console.log( 'Гладим кота.' );
   return this;
}

console.log( barsik.name );
barsik.dailyNorm( 100 );
barsik.feed().stroke().feed().stroke();



/* Задание 2:
    Написать функцию, возвращающую глубокую копию объекта - его клон. Клонироваться должны значения всех типов данных
    (+ массивы и функции), а также любого уровня вложенности. Метод isArray использовать можно.*/





function deepClone(obj) {
       var rv;
 
       switch (typeof obj) {
           case "object":
               if (obj === null) {
                   rv = null;
               } else {
                   switch (toString.call(obj)) {
                       case "[object Array]":
                           rv = obj.map(deepCopy);
                           break;
                       default:
                           rv = Object.keys(obj).reduce(function(prev, key) {
                               prev[key] = deepClone(obj[key]);
                               return prev;
                           }, {});
                           break;
                   }
               }
               break;
           default:
               rv = obj;
               break;
       }
       return rv;
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


function deepCompare( obj1, obj2 ) {
   if ( obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined ) {
      return false;
   }
   
   for ( var key in obj1 ) {
      if(!obj2.hasOwnProperty(key)){
         return false;
      }
      
      if(typeof obj1[key] == 'object' && obj1[key] != null){
         return deepCompare( obj1[key], obj2[key] )
      }
   }
   
   for ( var key in obj2 ) {
      if(!obj1.hasOwnProperty(key)){
         return false;
      }
   }
   
   return true;
}


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
console.log( "false or true: " + deepCompare( initialObj, initialObj2 ) )

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