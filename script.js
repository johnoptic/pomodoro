// Pomodoro Web App
console.log("Icons courtesy of icons8");

var pomoAlarm = new Howl({
    src: ['digital-alarm.mp3']
});

const timerBtn = document.getElementById('timerStart');
const pauseBtn = document.getElementById('timerPause');
const timerDisplay = document.querySelector('.timer');
const flashOverlay = document.querySelector('.flash-overlay');
const cloudOverlay = document.querySelector('.cloud-overlay');

const cloudArray = [
    './clouds/cloud1.png',
    './clouds/cloud2.png',
    './clouds/cloud3.png',
    './clouds/cloud4.png',
    './clouds/cloud5.png'
];

let countdown;
let timeLeft = 20 * 60;
let isPaused = false; 

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

function startTimer() {
    if (countdown) return;

    generateClouds();

    if (isPaused) {
        isPaused = false;
    }

    countdown = setInterval(function () {
        timeLeft--;
        displayTimeLeft(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            countdown = null;
            pomoAlarm.play();
            triggerBackgroundFlash();
            timeLeft = 20 * 60;
            displayTimeLeft(timeLeft);
        }
    }, 1000);
}

function pauseTimer() {
    if (countdown) {
        clearInterval(countdown);
        countdown = null;
        isPaused = true; 
    }
}

function triggerBackgroundFlash() {
    flashOverlay.classList.add('flash-red');

    setTimeout(() => {
        flashOverlay.classList.remove('flash-red'); 
    }, 15000);
}

function generateClouds() {
    const cloudCount = 9;
    for (let i = 0; i < cloudCount; i++) {
        const cloudImg = document.createElement('img');
        cloudImg.src = cloudArray[Math.floor(Math.random() * cloudArray.length)];
        cloudImg.classList.add('cloud');
        
        // Randomly position the cloud vertically
        cloudImg.style.top = `${Math.random() * 80}vh`; // Randomly place within the top half of the screen

        //Give each cloud a random size
        cloudImg.style.height = `${Math.random() * 10 + 25}%`;

        // Give each cloud a random opacity
        cloudImg.style.opacity = Math.random() * (0.6 - 0.2) + 0.2;

        // Animation & Speed
        const animationDuration = Math.random() * 180 + 30;
        cloudImg.style.animationDuration = `${animationDuration}s`;

        cloudOverlay.appendChild(cloudImg);

        // Remove cloud after it completes its animation
        cloudImg.addEventListener('animationend', () => {
            cloudImg.remove();
        });
    }
}

timerBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
