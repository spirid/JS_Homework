// Задание 3 *:
//   Максимально упростить функцию c использованием операторов &&, || и тернарного. Принцип работы функции должен полностью
//   сохраниться. В функции должно быть 2 смысловых действия.

  // function isRomantic(gender) {
  //     if (gender === undefined) {
  //       gender = 'Неизвестно';
  //     }

  //     if (gender === 'Мужской') {
  //       return false;
  //     }

  //     if (gender === 'Женский') {
  //       return true;
  //     }

  //     if (gender === 'Неизвестно') {
  //       alert('Неизвестно');
  //     }
  // }

  // isRomantic('Мужской'); // false
  // isRomantic('Женский'); // true
  // isRomantic(); // alert('Неизвестно');
  // isRomantic('asdf'); // false

function isRomantic(gender) {
      return (typeof gender == 'string' && gender === 'Женский' ? true : false) || (gender === undefined ? alert('Неизвестно') : false)
    }

  console.log(isRomantic('Мужской')); // false
  console.log(isRomantic('Женский')); // true
  console.log(isRomantic()); // alert('Неизвестно');
  console.log(isRomantic('asdf')); // false











// Задание 4*. Усовершенствуйте задание 2 таким образом, чтобы функция, принимая объект вида
//     {
//         name_one: 'Vasya',
//         name_two: 'Piotr',
//         name_three: 'Fedya',
//         name_four: 'Piotr'
//     }
//   отдавала объект вида
//     {
//         name_four_length: 5,
//         name_one_length: 5,
//         name_three_length: 5,
//         name_two_length: 5,
//         'Duplicate values': {
//             Piotr: '2 times'
//         }
//     }
//   В решении использовать только пройденный материал. На порядок ключей внимание можно не обращать.

// В отправленном архиве должно быть два файла - index.html и подключенный в него main.js файл.




function maxCount(objCount){
  var tempArray=[],
   j=0,
   tempWord,
   counter=0,
   max=0,
   tempName,
   returnObj={'':''};

   for(var keys in objCount)
   {
     tempArray[j++]=objCount[keys];
   }
    for(var i = 0;i < tempArray.length;i++){
       tempWord=tempArray[i];
       
       for(var z = 0;z < tempArray.length;z++){
          if( tempWord == tempArray[z]) { 
            counter++; 
            if (max < counter){
              max = counter;
              tempName = tempWord;
            } else counter = 0;
          } else counter = 1;
        }
    } 
    max=max+' times';
    for(var key in returnObj){
        delete key;
        delete returnObj[key]
        key =tempName;
        returnObj[key] = max;        
    }  return returnObj;

}


function objectTransmut(mainObj){
  var tempKey,
      tempValueLength,
      tempValue,
      stringPlus="_length";
      FuncArray=maxCount(mainObj);
      
   for(var key in mainObj){
       tempKey = key;
       tempValue = mainObj[key];
       tempKey += stringPlus;
       tempValueLength = tempValue.length;
       mainObj[tempKey] = tempValueLength;
       tempKey = "'Duplicate values'";
       mainObj[tempKey] = FuncArray;
       delete key;
       delete mainObj[key];    
   } 
     return mainObj;
}


var obj={
        name_one: 'Vasya',
        name_two: 'Piotr',
        name_three: 'Fedya',
        name_four: 'Piotr'
    };

console.log(objectTransmut(obj));