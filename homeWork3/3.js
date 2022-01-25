/* Задание 3:
    Создать функцию isEmpty(obj), которая возвращает true, 
    если в объекте нет свойств 
    и false – если хоть одно свойство есть. */


function isEmpty(obj) {
    for (let key in obj) {
      alert("Объект не пустой");
      return false;
    }
    alert("Обект пустой");
    return true;
  }

var obj={};

isEmpty(obj);