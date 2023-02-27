import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

let time = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function (selectedDates) {
        time = selectedDates[0].getTime() - Date.now();
        if (time < 0){
            Notify.failure('Please choose a date in the future')
        }
        if(time => 0){
            disabledButton();
        }
    },
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function disabledButton(){
    refs.button.disabled = !refs.button.disabled;
}

function updateTaimeraInterface({ days, hours, minutes, seconds }){
    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours);
    refs.dataMinutes.textContent = addLeadingZero(minutes);
    refs.dataSeconds.textContent = addLeadingZero(seconds);
}

const refs = {
    element: document.querySelector('#datetime-picker'),
    button: document.querySelector('button[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
}

disabledButton();

const fp = flatpickr(refs.element, options);
refs.button.addEventListener('click', ()=>{
    const intervalId = setInterval(()=>{
        const time = fp.selectedDates[0].getTime() -  Date.now();
        console.log(time)
        if(time < 1000){
            clearInterval(intervalId);
        }
        updateTaimeraInterface(convertMs(time));
    }, 1000);
});