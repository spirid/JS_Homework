 // Задание 1:
 //    Написать функцию, принимающую массив имен и возвращающую массив объектов вида {name: 'Vasya'}.

function isArrNames(mainArr){
  var tempArr = [];
  mainArr.forEach(function(item,index){
  var obj = {},
      key = 'name';
      obj[key] = item;
      tempArr[index] = obj;
  });
   return tempArr;
}


console.log(isArrNames(['Вася','Петя','Дима','Саша']));


  // Задание 2:
  //   Написать функцию, принимающую массив вида ['00', '13', '24'] и возвращающую строку "Текущее время : 00 : 13 : 24".
  //   Для решения использовать перебирающий метод массивов.

function isTime(mainArr){
   return 'Текущее время : '+ mainArr.reduce(function(sum, current) {
  return  sum + ':' + current;
}, );
}

console.log(isTime(['00', '13', '24']));


  // Задание 3:
  //   Написать функцию, которая будет возвращать количество гласных в переданном тексте. Регистр любой. Решение не
  //   должно быть "топорным".

3.function isVowels(str){
    var arrAlfabet=['a', 'e' , 'y', 'u', 'i', 'o', 'а', 'е', 'и', 'э', 'о', 'я'];
    var counter=0;

    str=str.toLowerCase().split('');

    str.forEach(function (item) { 
        if(arrAlfabet.includes(item))
          counter++;
}); 
   return counter;
}

console.log(isVowels('Привет медвед'));

  // Задание 4:
  //   Написать функцию, которая будет принимать текст в качестве параметра. У текста должны быть пробелы, точки, запятые,
  //   восклицательные и вопросительные знаки. Текст необходимо разбить на предложения (по точкам, восклицательным и
  //   вопросительным знакам - убрав их).
  //   Для каждого из предложений - отдельно вывести текст предложения и рядом количество букв в нем (без учета пробелов,
  //   запятых и т.д. - именно букв). Из ранее непройденных методов разрешается использовать только (!!!) регулярное выражение
  //   в методе split.
function countSentencesLetters(str){
   var separators = /[?!.]/,
       tempStr = [];

  str = str.split(separators);

  str.forEach(function(item){
      if(item.length) {
       var itemCount = item;
           itemCount = itemCount.trim().replace(/[\s.,%]/g,'').length;

       console.log(item.trim()+ ': Letters quantity is: ' + itemCount);
      }    
       
});  
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

function isRepeatWord(text) {
   var wordCounterMax=1,counterCorrect,maxWord;
   var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
   var spaceRE = /\s+/g;
  
   text=text.toLowerCase(). replace(punctRE, '').replace(spaceRE, ' ').split(' ').sort();

  var word;

  text.forEach(function(item){
   if (word != item){
    counterCorrect = 1;
    word = item;
   } else  if(word == item){
      counterCorrect++;
      word = item;
      }
   
     if(counterCorrect > wordCounterMax){
       wordCounterMax = counterCorrect;
       maxWord = item;
      }
});
   console.log( maxWord + ' ' + wordCounterMax);
}

isRepeatWord('g g )g g, g g. g?  Привет kokos d kokos привет кокос привет лена жена привет g! f f f f f f f f ');