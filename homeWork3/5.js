/*   Задание 5 *:
    Натуральное число, большее 1, называется простым, если оно ни на что не 
    делится, кроме себя и 1.
    Другими словами, n>1 – простое, если при делении на любое число от 2 до n-1 
    есть остаток.
    Создайте код, который выводит все простые числа из интервала от 2 до 10.
    Результат должен быть: 2,3,5,7.
    P.S. Код также должен легко модифицироваться для любых других интервалов.*/

var number = +prompt('ведите интервал');

myPoint: for (let i=2; i<=number; i++) {
  for (let j=2; j<i; j++) { 
    if (i%j==0) continue myPoint;
  }
  alert( i ); 
}