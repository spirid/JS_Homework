 // 1.Переписать задачу с использованием перебирающего метода массивов:
 //      function filterNumbersArr(numbers) {
 //          var newArr = [];

 //          for (var i = 0; i < numbers.length; i++) {
 //              var el = numbers[i];

 //              if (el > 0) {
 //                  newArr[newArr.length] = el;
 //              }
 //          }

 //          return newArr;
 //      }

 //      filterNumbersArr([-1, 0, 2, 34, -2]);

  function filterNumbersArr(numbers) {
        var positiveArr = numbers.filter(function(number) {
        return number > 0;
  });
      return positiveArr;
 }

      console.log(filterNumbersArr([-1, 0, 2, 34, -2]));


// Задание 2:
//     Написать функцию, принимающую массив чисел и возвращающую первое найденное положительное число.

  var array = [-1, -2, 3, -4],
      filtred;

  filtred = array.find( 
    function checkNumber( currentValue ) {
      return currentValue > 0; 
    } 
  );
   console.log(filtred);


  // Задание 3:
  //   Написать функцию, которая будет определять, является ли переданное в нее слово палиндромом (напр. шалаш).
  //   Регистр в словах учитываться не должен. Тестировать функцию можно только на одиночных словах (без фраз).

  //   Функция должна работать следущим образом:
  //     isPalindrome('шалаШ'); // true
  //     isPalindrome('привет'); // false


function isPalindrome(word) {
      word.toLowerCase();

  var tempWordArr = word.split('').reverse(),
      mainWordArr = word.split(''),
      bool;
   
  for(var i = 0;i < tempWordArr.length;i++){
     if(tempWordArr[i] == mainWordArr[i])
      bool = true;
     else {bool = false; break};
  }
  
  return(bool);
}

console.log(isPalindrome("кок"));


// Задание 4:
//     Написать функцию, которая будет определять, являются ли переданные в нее слова анаграммами (напр. кот и отк).
//     Регистр в словах учитываться не должен.

//     Функция должна работать следущим образом:
//       areAnagrams('кот', 'отк'); // true
//       areAnagrams('кот', 'атк'); // false
//       areAnagrams('кот', 'отко'); // false

function areAnagrams(wordOne,wordTwo) {
      wordOne.toLowerCase();
      wordTwo.toLowerCase();

  var wordOne = wordOne.split('').sort(),
      wordTwo = wordTwo.split('').sort(),
      bool;
   
  for(var i = 0;i < wordOne.length;i++){
     if(wordOne[i] == wordTwo[i])
      bool = true;
     else {bool = false; break};
  }
  
  return(bool);
}

      console.log(areAnagrams('кот', 'отк')); // true
      console.log(areAnagrams('кот', 'атк')); // false
      console.log(areAnagrams('кот', 'отко')); // false

// Задание 5:
//     Написать функцию, которая будет разбивать массив на под-массивы определенной длины.

//     Функция должна работать следущим образом:
//       divideArr([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
//       divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]

// 1 вариант

function divideArr(mainArr,countArr){
  var tempArr=[],
      i=0;

      while (mainArr.length)
       tempArr[i++]=mainArr.splice(0,countArr)
      console.log(tempArr);
}


      divideArr([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
      divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]
//2 вариант

function divideArr(mainArr,countArr){
      var temp = []
      while(mainArr.length) {
        temp.push(mainArr.splice(0, countArr))
      }     
      console.log(temp)
}
    
    
divideArr([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]
