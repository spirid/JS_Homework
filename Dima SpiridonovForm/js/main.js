var form = document.forms["registration"];

window.onload = function() {
    if (localStorage.length > 0) {
        showSubmitText();
        return;
    }

    registration.addEventListener("submit", formSubmit);
    form.elements["email"].addEventListener('change', checkAndColorInputs);
    form.elements["password"].addEventListener('change', checkAndColorInputs);
}

function formSubmit(e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://reqres.in/api/register");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(getObjectFromForm());

    xhr.onload = function(e) {
        try {
            processResponse(JSON.parse(xhr.responseText));
            showSubmitText();
            alert('Registered!');
            return;
        } catch {
            clearValues();
            checkAndColorInput("email");
            checkAndColorInput("password");
            document.getElementsByClassName('error')[0].textContent = JSON.parse(xhr.response).error;
        }
    }
}

function getObjectFromForm() {
    var jsonObj = {
        email: form.elements["email"].value,
        password: form.elements["password"].value
    }

    return JSON.stringify(jsonObj);
}

function checkAndColorInput(inputName) {
    if (form.elements[inputName].value == '') {
        form.elements[inputName].classList.add('incorectInfo');
    }
}

function clearValues() {
    var inputs = document.querySelectorAll('input[type=text]');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}


function checkAndColorInputs(e) {
    if (e.target.value == '') {
        checkAndColorInput(e.target.name);
        return;
    }

    e.target.classList.remove('incorectInfo');
}

function processResponse(responseObject) {
    if (responseObject.id == undefined) {
        throw new Error(responseObject.error);
    }

    localStorage.setItem("userId", responseObject.id);
}

function showSubmitText() {
    document.body.innerHTML = `<label>User ${localStorage.getItem("userId")} has been successfully registered</label>`;
}