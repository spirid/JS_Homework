/* Задание 1:
    Задача из 5 шагов-строк (методы массивов использовать можно):
      - Создать массив styles с элементами "Джаз", "Блюз".
      - Добавить в конец значение "Рок-н-Ролл".
      - Заменить предпоследнее значение с конца на "Классика" - код замены должен работать для массивов любой длины.
      - Удалить первое значение массива и вывести его в alert.
      - Добавить в начало значения "Рэп" и "Регги".

    Массив в результате каждого шага:
      - Джаз, Блюз
      - Джаз, Блюз, Рок-н-Ролл
      - Джаз, Классика, Рок-н-Ролл
      - Классика, Рок-н-Ролл
      - Рэп, Регги, Классика, Рок-н-Ролл */

var style=["Джаз", "Блюз"];
    style.push("Рок-н-Ролл");
    style[style.length-2]="Классика";
    alert("был удален 1 элемент в массиве "+style.shift());
    style.unshift("Рэп" , "Регги");
    alert(style);