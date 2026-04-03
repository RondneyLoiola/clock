const nowTime = document.getElementById('time_hour');
const nowSecond = document.getElementById('time_second');

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nowDate = document.getElementById('date_day');
const nowMonth = document.getElementById('date_month');

setInterval(() => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    nowTime.textContent = `${hour < 10 ? `0${hour}` : hour}:${
        minute < 10 ? `0${minute}` : minute
    }`;
    nowSecond.textContent = `${second < 10 ? `0${second}` : second}`;
    nowDate.textContent = dayNames[day];
    nowMonth.textContent = `${monthNames[month]} ${date.getDate().toString().padStart(2, '0')}, ${year}`;
}, 1000);

const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
const day = date.getDay();
const month = date.getMonth();
const year = date.getFullYear();

nowTime.textContent = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
}`;
nowSecond.textContent = `${second < 10 ? `0${second}` : second}`;
nowDate.textContent = dayNames[day];
nowMonth.textContent = `${monthNames[month]} ${date.getDate().toString().padStart(2, '0')}, ${year}`;