var addInput=document.createElement('input');
var tempTable = document.getElementsByTagName('table')[0];
var temptext;
var addRow=document.getElementById('addRow'); 

tempTable.onclick = function(event) {
  var target = event.target; 


      if (target === addInput) {
      alert('input already in focus!');
   }
   else if(target != document.getElementById('addRow') ){      
      temptext = target.textContent;
      target.textContent = '';
      target.append(addInput);
      addInput.value = temptext;
      addInput.focus();

      //  PUSH ENTER
       addInput.addEventListener('keydown', function(event) {
       if (event.keyCode === 13) {
            addInput.onblur();
      }
      });
      //  End Code ENTER 


      addInput.onblur = function (){
       target.textContent = addInput.value;
     }

   } 
};


  addRow.onclick =function(event){
   tempTable = document.getElementsByTagName('tbody')[0];
   tempTable.insertAdjacentHTML( 'afterbegin', '<tr><td></td><td></td><td></td></tr>');
  }  


  
