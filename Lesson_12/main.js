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

  function filtred(array){
    return array.find( 
    function(currentValue) {
      return currentValue > 0; 
    } 
  );
}
   

 var array = [-1, -2, 3, -4];
     
 console.log(filtred(array));


  // Задание 3:
  //   Написать функцию, которая будет определять, является ли переданное в нее слово палиндромом (напр. шалаш).
  //   Регистр в словах учитываться не должен. Тестировать функцию можно только на одиночных словах (без фраз).

  //   Функция должна работать следущим образом:
  //     isPalindrome('шалаШ'); // true
  //     isPalindrome('привет'); // false


//correct  вариант 
function isPalindrome(word) {
  word = word.toLowerCase();
  var tempWordArr = reverseString(word);
    console.log(word+" "+tempWordArr)
     if(tempWordArr == word)
      return true;
     return false;
}

function reverseString(str) {
      return str.split('').reverse().join('');
}

console.log(isPalindrome('шалаШ'));
console.log(isPalindrome('кол'));


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

  var wordOne = wordOne.split('').sort().join(''),
      wordTwo = wordTwo.split('').sort().join('');
    
     if(wordOne === wordTwo)
      return true;
     else return false;
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
