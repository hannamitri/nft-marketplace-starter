const countDown = 5 * 1000

const timerMilliSeconds = document.querySelector('.timer__milliseconds')
const timerSeconds = document.querySelector('.timer__seconds')
const timerMinutes = document.querySelector('.timer__minutes')

let cancelId;
let startTime;
let savedTime = 0;

setInterval(() => {
}, 1000)


function resetTimer() {
startTime = Date.now();
savedTime = 0;

timerMilliSeconds.innerHTML = '000';
timerSeconds.innerHTML = '05';
timerMinutes.innerHTML = '01';

console.log('resetTimer()')
}


function updateTimer() {
console.log('this ran')
let millisElapsed = Date.now() - startTime + savedTime;


let millisLeft = countDown - millisElapsed;

if (millisLeft < 0) {
    millisLeft = 0;
    cancelAnimationFrame(cancelId);
    cancelId = null;
}

let secondsLeft = millisLeft / 1000
let minutesLeft = secondsLeft / 60


let millisText = millisLeft % 1000
let secondsText = Math.floor(secondsLeft) % 60;
let minutesText = Math.floor(minutesLeft);


if (minutesText.toString().length < 2) {
    minutesText = minutesText.toString().padStart(2, '0');
}
if (secondsText.toString().length < 2) {
    secondsText = secondsText.toString().padStart(2, '0');
}
if (millisText.toString().length < 3) {
    millisText = millisText.toString().padStart(3, '0');
}

timerMilliSeconds.innerHTML = millisText
timerSeconds.innerHTML = secondsText;
timerMinutes.innerHTML = minutesText;

if (cancelId) {
 cancelId = requestAnimationFrame(updateTimer)   
}

}