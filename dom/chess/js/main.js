var xInput = document.getElementsByTagName('input')[1];
var yInput = document.getElementsByTagName('input')[0];
var button = document.getElementsByTagName('button')[0];
var chessBoard = document.getElementsByTagName('div')[0];

xInput.addEventListener('keyup', inputChanged);
yInput.addEventListener('keyup', inputChanged);
button.addEventListener('click', buttonClicked);


function inputChanged() {
    button.disabled = (xInput.value == '' || yInput.value == '') ? true : false;
}

function chessCellClicked() {
    for (var i = 0; i < chessBoard.children.length; i++) {
        chessBoard.children[i].style.backgroundColor = chessBoard.children[i].style.backgroundColor == 'black' ? 'white' : 'black';
    }
}

function buttonClicked(e) {
    if (!(+xInput.value > 0 && +xInput.value <= 10 ) || !(+yInput.value > 0 && +yInput.value <= 10)){
       alert("incorrect format \nplease use numbers from 1 to 10");
       return;
    }

    if (chessBoard.children.length > 0) {
        chessBoard.textContent = '';
    }

    setBoardStyle(xInput, yInput)
    for (var j = 0; j < (+xInput.value * +yInput.value)/+yInput.value ; j++){
      for (var i = 0; i < (+xInput.value * +yInput.value)/+xInput.value ; i++){
          addElementToBoard(i,j)
      }
    }
}

function setBoardStyle(xInput, yInput) {
    chessBoard.style.height =  50 * +xInput.value + 'px';
    chessBoard.style.width =  50 * +yInput.value + 'px';
    chessBoard.style.border = '1px solid black'; 
}

function addElementToBoard(i,j) {
    var element = document.createElement("div");
    element.style.height = 50 +'px'; 
    element.style.width = 50 + 'px';
    if (+xInput.value == +yInput.value){    
      element.style.backgroundColor = (i + j & 1) ?  'white' : 'black' ;
    } else {
    element.style.backgroundColor = !(i + j & 1) ? 'black'  : 'white'  ;
    }
    element.style.float = 'left';
    element.addEventListener('click', chessCellClicked)

    chessBoard.appendChild(element)
}
