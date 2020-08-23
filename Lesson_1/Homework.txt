1.)
var a = 5,
    b = 10;
b=[a, a = b][0];
2.)
var   a = 5,
         b = 10,
         temp = a;
    a = b;
    b = temp;
3.)
Var a=5,
    b=10;
    b-=a;
    a+=a;
4.)
Var a=5,  b=10;
     a=a*b;
     b=a/b;
     a=a/b;