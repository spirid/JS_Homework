var container = document.getElementById('container');
var bodyContainer = document.getElementsByTagName('body')[0];

var firstPar = document.createElement('p'),
    secondPar = document.createElement('p');

firstPar.innerHTML = 'Hello, here are <a href="https://www.facebook.com">Link 1</a> and <a href="https://twitter.com">Link 2</a>';
secondPar.innerHTML = 'Hello, here are <a href="http://google.by">Link 3</a> and <a href="https://vk.com">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);

secondPar.addEventListener('click', changeSeconP);


bodyContainer.onload = function(){
 window.localStorage.clear();
}


function changeSeconP(event){
   event.preventDefault();
   target = event.target;
   if (target.hasAttribute('href')){
   	if(getKeyValueFromLS(target.text)){		
       alert(localStorage[target.text].slice(6));
   	}
     else if (localStorage != null){     	
        localStorage.setItem(target.text, 'path: ' + target);
     	target.setAttribute('href','#');
     	alert('Information save in LocalStorage',target);
     } 
   }
}

bodyContainer.onclick = function(event){
	var target = event.target;
	if (target == document.getElementsByTagName('button')[0]){
		//get button
		var buttonChange = target;
        // this button

   var firstParA = firstPar.getElementsByTagName('a');
	  for (var i = 0; i < firstParA.length; i++) {

	    firstParA[i].style.color='rgb(' +(Math.random()*100) 
	    + ',' + (Math.random() * 150) 
	    + ',' + (Math.random() * 200) + ')';
	  }
	}

}

function getKeyValueFromLS(targetText) {
	for(var i=0; i<localStorage.length; i++) {
  		if (localStorage.key(i) === targetText)
  			return true
}

return false;
}



