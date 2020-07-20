 // Задание 1:
 //    Написать функцию, принимающую массив имен и возвращающую массив объектов вида {name: 'Vasya'}.

function isArrNames(mainArr){
  return mainArr.map(function(name) {
      return { name : name }
   })
}

console.log(isArrNames(['Вася','Петя','Дима','Саша']));


  // Задание 2:
  //   Написать функцию, принимающую массив вида ['00', '13', '24'] и возвращающую строку "Текущее время : 00 : 13 : 24".
  //   Для решения использовать перебирающий метод массивов.

function isTime(mainArr){
   return mainArr.reduce(function(time, current) {
      return time + " : " + current;
   }, 'Текущее время')
}

console.log(isTime(['00', '13', '24']));


  // Задание 3:
  //   Написать функцию, которая будет возвращать количество гласных в переданном тексте. Регистр любой. Решение не
  //   должно быть "топорным".

var arrAlfabet=['a', 'e' , 'y', 'u', 'i', 'o', 'а', 'е', 'и', 'э', 'о', , 'ю' ,'я'];

function isVowelsNumbers(str){
   return arr = str.split('').filter(function(item) {
         return isVowel(item).length > 0;
      }).length;
}

function isVowel(letter){
   return arrAlfabet.filter(function(item) {
      return letter.toLowerCase() === item.toLowerCase();
   })
}

console.log(isVowelsNumbers('Привет медвед'));

    

  // Задание 4:
  //   Написать функцию, которая будет принимать текст в качестве параметра. У текста должны быть пробелы, точки, запятые,
  //   восклицательные и вопросительные знаки. Текст необходимо разбить на предложения (по точкам, восклицательным и
  //   вопросительным знакам - убрав их).
  //   Для каждого из предложений - отдельно вывести текст предложения и рядом количество букв в нем (без учета пробелов,
  //   запятых и т.д. - именно букв). Из ранее непройденных методов разрешается использовать только (!!!) регулярное выражение
  //   в методе split.

function countSentencesLetters(str){
   return str.split( /[.!?]/ ).map(function(trimStr){
      return trimStr.trim()
   }).filter(function(strLenght){
      return strLenght.length > 0
   }).map(function(items) {
      return items + ': Letters quantity is: ' + getLength( items ) 
   }).forEach(function(item){ console.log( item ) 
   });
}

function getLength(str) {
   return str.split( /[\s,]/g ).join( '' ).split( '' ).length;
}


countSentencesLetters('Привет, студент! Студент... Как дела, студент?');

    // Функция должна работать следущим образом (потестировать на данном тексте):
    //   countSentencesLetters('Привет, студент! Студент... Как дела, студент?');
      // Привет, студент: Letters quantity is: 13
      // Студент: Letters quantity is: 7
      // Как дела, студент: Letters quantity is: 14



  // Задание 5 *:
  //   Написать функцию, которая будет находить в переданном ей тексте наиболее часто повторяемое слово и возвращать
  //   информацию вида:
  //     "Максимальное число повторений у слова "привет" - 8"
  //   При решении предположить, что у двух и более слов не может быть одинакового количества повторений.
  //   Для удобного разделения текста на слова сразу по нескольким знакам препинания - разрешается использовать регулярное

function isRepeatWord( str ) {
    var maxRepeat = 0,
        result = '';

   var text = str.toLowerCase().split( /[\s\n.!,?]/ ).filter(function(item){ 
   return !!item 
   }).sort();
   
   var textObject = {};

       text.forEach(function(item) {
      if ( textObject.hasOwnProperty( item ) ) {
         textObject[item]++;
      } else {
         textObject[item] = 1;
      }
   } )
   
   for (var key in textObject) {
      if (maxRepeat < textObject[key]) {
         maxRepeat = textObject[key];
         result = 'Максимальное повторение : ' + key + ' - ' + maxRepeat + ' раз ';
      }
   }
   
   return result;
}

console.log(isRepeatWord('g g g g, g g. g?  Привет kokos d kokos привет кокос привет лена жена привет g! f f f f f f f f  g g'));
