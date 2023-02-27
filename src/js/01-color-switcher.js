const refs = {
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop]'),
}

let intervalId = null;

function onButtonStartClick(){
    changeDisabledButtonStart();
    changeDisabledButtonStop();
    intervalId = setInterval(()=>{
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onButtonStopClick(){
    changeDisabledButtonStart();
    changeDisabledButtonStop();
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeDisabledButtonStart(){
    refs.buttonStart.disabled = !refs.buttonStart.disabled;
}

function changeDisabledButtonStop(){
    refs.buttonStop.disabled = !refs.buttonStop.disabled;
}



changeDisabledButtonStop();

refs.buttonStart.addEventListener('click', onButtonStartClick);
refs.buttonStop.addEventListener('click', onButtonStopClick);