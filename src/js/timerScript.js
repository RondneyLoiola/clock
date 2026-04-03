const timer = document.querySelector('.timer-value');
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');

let timer_hours = 0;
let timer_minutes = 0;
let timer_seconds = 0;
let timerInterval = null;
let isTimerActive = false;

function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

function updateTimer() {
    const timer = document.querySelector('.timer-value');
    timer.textContent = 
        formatNumber(timer_hours) + ':' + 
        formatNumber(timer_minutes) + ':' + 
        formatNumber(timer_seconds);
}

function countTimer(){
    timer_seconds ++;

    if(timer_seconds === 60) {
        timer_seconds = 0;
        timer_minutes ++;
    }

    if(timer_minutes === 60) {
        timer_minutes = 0;
        timer_hours ++;
    }

    updateTimer();
}

function startTimer() {
    if(!isTimerActive) {
        timerInterval = setInterval(countTimer, 1000);
        isTimerActive = true;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerActive = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerActive = false;
    timer_hours = 0;
    timer_minutes = 0;
    timer_seconds = 0;
    updateTimer();
}

btnStart.addEventListener('click', startTimer);
btnPause.addEventListener('click', pauseTimer);
btnReset.addEventListener('click', resetTimer);
