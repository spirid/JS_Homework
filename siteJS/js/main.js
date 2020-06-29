var MenuOpen=document.getElementsByClassName('navbar-collapse collapse show');
var content=document.getElementsByClassName('content')[0];

function isOpenMenu(open){
   if (!open.length){
    content.style.position='relative';
    content.style.top='250px';
   } else content.style.top='0px';
}
