var btnsContainer = document.getElementsByClassName('buttons')[0],
    mainBtn = document.getElementById('main-button'),
    stopWatchContainer = document.getElementsByClassName('stop-watch')[0],
    minContainer = document.getElementsByClassName('minutes')[0],
    secContainer = document.getElementsByClassName('seconds')[0],
    msContainer = document.getElementsByClassName('milliseconds')[0],
    marksContainer = document.getElementsByClassName('marks')[0],
    min = 0,
    sec = 0,
    ms = 0,
    timerId,
    initialTime = '00 : 00 : 00',
    endTime = '60 : 00 : 00',
    time = localStorage.getItem('time'),
    state = localStorage.getItem('state'),
    marksCounter = 1,
    marks = [];

if (time) {
    if (time !== endTime) {
        if (state === 'running' || state === 'stopped') {
            setStopWatchState(state);
            setMainBtnText();

            setTime(time);

            drawAdditionalBtns();

            marks = marks.concat(JSON.parse(localStorage.getItem('marks')));
            drawMarks();
        }

        if (state === 'running') {
            startTimer();
        }
    } else {
        localStorage.clear();
    }
}

btnsContainer.onclick = function() {
    var target = event.target;

    if (target.tagName === 'BUTTON') {
        var time = getTime();

        switch(target.id) {
            case 'main-button':
                mainBtnActions();

                break;

            case 'save-button':
                marks.push(time);
                drawMarks();

                break;

            case 'reset-button':
                setStopWatchState('initial');

                if (time === endTime) {
                    target.remove();
                    btnsContainer.appendChild(mainBtn);

                    localStorage.clear();
                } else {
                    removeBtns(1);
                }
                setMainBtnText();

                stopTimer();
                setTime(initialTime);

                marks = [];
                removeMarks();

                break;
        }
    }
};

function mainBtnActions() {
    switch(stopWatchContainer.dataset.state) {
        case 'initial':
            setStopWatchState('running');
            setMainBtnText();
            drawAdditionalBtns();
            startTimer();

            break;

        case 'running':
            setStopWatchState('stopped');
            setMainBtnText();
            stopTimer();

            break;

        case 'stopped':
            setStopWatchState('running');
            setMainBtnText();
            startTimer();

            break;
    }
}

function setStopWatchState(state) {
    stopWatchContainer.dataset.state = state;
}

function setMainBtnText() {
    var state = stopWatchContainer.dataset.state;

    mainBtn.innerText = (state === 'initial') ? 'Start' : (state === 'running') ? 'Stop' : 'Run';
}

function startTimer() {
    timerId = setInterval(function() {
        ms++;
        if (ms === 100) {
            ms = 0;
            sec++;
            if (sec === 60) {
                sec = 0;
                min++;
                if (min === 60) {
                    removeBtns(0);
                    stopTimer();
                }

                minContainer.innerText = formatTimeParam(min);
            }
            secContainer.innerText = formatTimeParam(sec);
        }
        msContainer.innerText = formatTimeParam(ms);
    }, 10);
}

function stopTimer() {
    clearInterval(timerId);
}

function setTime(time) {
    time = time.split(' : ');

    min = +time[0];
    sec = +time[1];
    ms = +time[2];

    minContainer.innerText = time[0];
    secContainer.innerText = time[1];
    msContainer.innerText = time[2];
}

function getTime() {
    return formatTimeParam(min) + ' : ' + formatTimeParam(sec) + ' : ' + formatTimeParam(ms);
}

function formatTimeParam(param) {
    return (param < 10) ? ('0' + param) : param;
}

function drawAdditionalBtns() {
    btnsContainer.insertAdjacentHTML('beforeend', '<button id="save-button">Save</button><button id="reset-button">Reset</button>');
}

function removeBtns(index) {
    btnsContainer.children[index].remove();
    btnsContainer.children[index].remove();
}

function drawMarks() {
    removeMarks();
    marks.forEach(function(mark) {
        marksContainer.insertAdjacentHTML('beforeend', '<div>' + marksCounter++ + ') ' + mark + '</div>');
    });
}

function removeMarks() {
    marksCounter = 1;
    marksContainer.innerHTML = '';
}

window.onunload = function() {
    localStorage.setItem('time', getTime());
    localStorage.setItem('state', stopWatchContainer.dataset.state);
    localStorage.setItem('marks', JSON.stringify(marks));
};
