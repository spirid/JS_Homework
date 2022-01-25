var i=1,
    btn_old='background: rgb(245,245,245) linear-gradient(rgb(245,245,245), rgb(188,192,193)) 50% 50% / calc(1.5em + .5em*2) calc(1.5em + .5em*2);'
    btn=document.getElementsByTagName('button');
    
    
var checkLi=document.getElementsByTagName('li')[0];
    checkLi_checked=document.getElementsByTagName('li');
    checkLi.style.borderColor='aqua';


var imgCarusel=document.getElementById('carausel');
    imgCarusel.src='img/'+i+'.jpg';


var background_arraow=document.getElementsByTagName('div');
    background_arraow[0].style.background='#424040';
    background_arraow[2].style.background='#424040';

    
function imgNext(){
  if (i<=7){
    i++;
   checkLi_checked=document.getElementsByTagName('li')[i-1];
   checkLi_checked.style.borderColor='aqua';
   checkLi_checked=document.getElementsByTagName('li')[i-2];
   checkLi_checked.style.border='solid rgb(66, 64, 64) 5px';
  } else {
    checkLi_checked=document.getElementsByTagName('li')[i-1];
    checkLi_checked.style.border='solid rgb(66, 64, 64) 5px'; 
    i=1;  
    checkLi_checked=document.getElementsByTagName('li')[0];
    checkLi_checked.style.borderColor='aqua';
  }

  imgCarusel.src='img/'+i+'.jpg';

  
  
    

}


function imgPrev(){
  if (i<2){
    checkLi_checked=document.getElementsByTagName('li')[i-1];
    checkLi_checked.style.border='solid rgb(66, 64, 64) 5px';
    i = 8;
    checkLi_checked=document.getElementsByTagName('li')[i-1];
    checkLi_checked.style.borderColor='aqua';
  }
  else {
    i--;
    checkLi_checked=document.getElementsByTagName('li')[i];
   checkLi_checked.style.border='solid rgb(66, 64, 64) 5px';
   checkLi_checked=document.getElementsByTagName('li')[i-1];
   checkLi_checked.style.borderColor='aqua';
   
  }
  imgCarusel.src='img/'+i+'.jpg';
}

function changeButton(a){
  btn[a].style.opacity='1';  
  btn[a].style.background='#e60c07';
}

function returnButton(a){
  btn[a].style.opacity='0.5';
  btn[a].style=btn_old;
}