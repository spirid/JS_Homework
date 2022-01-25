/*  Задание 2:
    При помощи цикла for вывести чётные числа от 2 до 10. 
    Придумать несколько решений.
 */


for(var i=2;i<=10;i++)
 if (i%2==0){
  alert(i);
}

for(var i=0;i<=8;){
  alert(i+=2);
}

var numb;
for(var i=1;i<=5;i++){
  numb=Math.pow(2,i); 
  switch(i){
      case 3: numb=numb-2;
      alert(numb)
      break;
      case 4: numb=numb-8;
      alert(numb);
      break;
      case 5: numb=numb-22;
      alert(numb);
      break;
      default: alert(numb);
  }
}