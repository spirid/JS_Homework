
var tab; 
var tabContent; 
var isInfoLoaded=false;

var buttonUserSend =document.getElementsByTagName('button')[0];

buttonUserSend.onclick = function(){
   if(isInfoLoaded){
      alert('info already in your computer');
      return;
    }

    createRequestAndGetResponse();
}

function createRequestAndGetResponse() {
  var xhr= new XMLHttpRequest();
   xhr.open('GET','https://reqres.in/api/users?page=2',true);
   xhr.send();

  xhr.onload = function(){    
    loadInHtml(JSON.parse(this.response).data);
    hideTabs();
  };

  xhr.onerror = function() {
      alert('Something worng! No information about users.');
  }; 
}

document.getElementById('tabs').onclick= function (event) {
    var target = event.target;
    if (target.className =='tab') {
       for (var i = 0; i < tab.length; i++) {
           if (target == tab[i]) {
               showTabsContent(i);
               break;
           }
       }
    }
}

function loadInHtml(response){
      var info = document.getElementById('tabs');

          for(var i = 0;i < response.length;i++){            
                  createTab(i, info);
            }

          for(var j = 0; j < response.length; j++){
             createContent(j, info, response);
            }

         document.getElementsByClassName('tab')[0].setAttribute('class','tab whiteborder');
         document.getElementsByClassName('tabContent')[0].setAttribute('class','tabContent show');
  
          isInfoLoaded = true;
          alert('Users loading compleate');
    }

 function createTab(i, info) {
  var insertTab = document.createElement('div');
      insertTab.setAttribute('class','tab');
      insertTab.textContent = 'Tab '+ (i+1);
      info.insertAdjacentElement('beforeend', insertTab);
  }

  function createContent(j, info, response) {
      if (localStorage.getItem(localStorage.key(j)) == null) {
                      localStorage.setItem(j+1,JSON.stringify(response[j]));
                }

            var insertConext = createElements('div', 'class', 'tabContent', 'beforeend', info);
                 createElements('img', 'src', response[j].avatar, 'afterbegin', insertConext);
                 createElements('span', 'textChange', 'First Name: '+ response[j]['first_name'], 'beforeend', insertConext);
                 createElements('span', 'textChange', 'Last Name: '+ response[j]['last_name'], 'beforeend', insertConext);
                 createElements('i', 'textChange', 'id : '+ response[j]['id'], 'beforeend', insertConext);
                 createElements('u', 'textChange', 'email : '+ response[j]['email'], 'beforeend', insertConext);
  }

  function createElements(tagName, attributeName, attributeValue, insertTime, insertContext) {
    var elementInsert=document.createElement(tagName);
    if (attributeName == 'textChange') {
      elementInsert.textContent=attributeValue;
    } else {
      elementInsert.setAttribute(attributeName,attributeValue);
    }
    insertContext.insertAdjacentElement(insertTime, elementInsert);
    
    return elementInsert;
  }


  function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}

function showTabsContent(b){
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
};

window.onload = function(){
  if (localStorage.length > 0) {
    loadInHtml(createResponse());
    hideTabs();
  }
};

function hideTabs() {
    tabContent = document.getElementsByClassName('tabContent');
    tab = document.getElementsByClassName('tab');
    hideTabsContent(1);
}


function createResponse() {
  var response = getResponseFromStorage();
  return sortResponse(response);
}

function getResponseFromStorage() {
    var response = [];
    for (var i = 0; i < localStorage.length; i++) {
      response.push(JSON.parse(localStorage.getItem(localStorage.key(i))))     
    }
    return response;
}

function sortResponse(response) {
  return response.sort(function(a,b) {
      return a['id'] - b['id'];
    })  
}


