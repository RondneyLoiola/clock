const minute = document.querySelector('.alarm-time-minute');
const second = document.querySelector('.alarm-time-second');
const alarm_cards = document.querySelectorAll('.alarm-card');
const buttonsContainer = document.querySelector('.buttons');

let countdownInterval = null;
let isAlarmActive = false;
let state = 'idle'; // 'idle', 'running', 'paused'
let originalTime = '00:00';
let pauseTime = { min: 0, sec: 0 };

function toggleAlarmCardsDisabled(disabled) {
    alarm_cards.forEach(card => {
        if (disabled) {
            card.classList.add('disabled');
        } else {
            card.classList.remove('disabled');
        }
    });
}

function countdownTimer() {
    const min = parseInt(minute.textContent);
    const sec = parseInt(second.textContent);

    if (min === 0 && sec === 0) {
        state = 'alarm';

        alarm_cards.forEach(card => card.classList.add('alarm-active'));
        updateButtons();
        return;
    }

    if (sec > 0) {
        second.textContent = `${sec - 1}`.padStart(2, '0');
    } else if (min > 0) {
        minute.textContent = `${min - 1}`.padStart(2, '0');
        second.textContent = '59';
    }
}

function updateButtons() {
    buttonsContainer.innerHTML = '';
    
    if (state === 'idle') {
        const playBtn = document.createElement('button');
        playBtn.className = 'btn-play';
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playBtn.title = 'Start Alarm';
        playBtn.addEventListener('click', startAlarm);
        buttonsContainer.appendChild(playBtn);
    } else if (state === 'running') {
        const pauseBtn = document.createElement('button');
        pauseBtn.className = 'btn-pause';
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        pauseBtn.title = 'Pause Alarm';
        pauseBtn.addEventListener('click', pauseAlarm);
        buttonsContainer.appendChild(pauseBtn);
    } else if (state === 'paused') {
        // Pause + Reset side-by-side
        const resumeBtn = document.createElement('button');
        resumeBtn.className = 'btn-resume';
        resumeBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        resumeBtn.title = 'Resume Alarm';
        resumeBtn.addEventListener('click', resumeAlarm);
        buttonsContainer.appendChild(resumeBtn);

        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn-reset';
        resetBtn.innerHTML = '<i class="fa-solid fa-arrow-rotate-left"></i>';
        resetBtn.title = 'Reset to Original Time';
        resetBtn.addEventListener('click', resetAlarm);
        buttonsContainer.appendChild(resetBtn);
    } else if (state === 'alarm') {
        const stopBtn = document.createElement('button');
        stopBtn.className = 'btn-stop';
        stopBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
        stopBtn.title = 'Stop Alarm';
        stopBtn.addEventListener('click', stopAlarm);
        buttonsContainer.appendChild(stopBtn);
    }
}

function startAlarm() {
    const min = parseInt(minute.textContent);
    const sec = parseInt(second.textContent);
    if (min === 0 && sec === 0) {
        alert('Please set a valid alarm time first!');
        return;
    }
    originalTime = `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
    state = 'running';
    toggleAlarmCardsDisabled(true);
    if (countdownInterval) clearInterval(countdownInterval); // se tiver um contador, limpa
    countdownInterval = setInterval(countdownTimer, 1000); // inicia o contador
    updateButtons();
}

function pauseAlarm() {
    state = 'paused';
    pauseTime = {
        min: parseInt(minute.textContent),
        sec: parseInt(second.textContent)
    };
    toggleAlarmCardsDisabled(false);
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    updateButtons();
}

function resumeAlarm() {
    state = 'running';
    toggleAlarmCardsDisabled(true);
    countdownInterval = setInterval(countdownTimer, 1000);
    updateButtons();
}

function resetAlarm() {
    const [origMin, origSec] = originalTime.split(':').map(Number);
    minute.textContent = origMin.toString().padStart(2, '0');
    second.textContent = origSec.toString().padStart(2, '0');
    state = 'paused'; // pausa depois do reset
    toggleAlarmCardsDisabled(false);
    updateButtons();
}

function stopAlarm() {
    state = 'idle';
    toggleAlarmCardsDisabled(false);
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = null;
    isAlarmActive = false;
    minute.textContent = '00';
    second.textContent = '00';
    alarm_cards.forEach(card => card.classList.remove('alarm-active'));

    updateButtons();
}

alarm_cards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('disabled')) return;
        const timeStr = card.querySelector('.alarm-minute').textContent;
        minute.textContent = timeStr.split(':')[0];
        second.textContent = '00';
        if (['running', 'paused', 'alarm'].includes(state)) {
            stopAlarm();
        }
        state = 'idle';
        updateButtons();
    });
});


updateButtons();
