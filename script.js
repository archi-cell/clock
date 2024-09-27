let sessionTime = 25;
let breakTime = 5;
let timeLeft = sessionTime * 60;
let isSession = true;
let interval;
let running = false;

// DOM elements
const countdownDisplay = document.getElementById('countdown');
const sessionTimeDisplay = document.getElementById('session-time');
const breakTimeDisplay = document.getElementById('break-time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const sessionIncrease = document.getElementById('session-increase');
const sessionDecrease = document.getElementById('session-decrease');
const breakIncrease = document.getElementById('break-increase');
const breakDecrease = document.getElementById('break-decrease');

// Update timer display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start timer
startButton.addEventListener('click', () => {
  if (!running) {
    running = true;
    interval = setInterval(countdown, 1000);
    startButton.textContent = 'Pause';
    disableControls(true);
  } else {
    running = false;
    clearInterval(interval);
    startButton.textContent = 'Start';
    disableControls(false);
  }
});

// Countdown logic
function countdown() {
  if (timeLeft === 0) {
    isSession = !isSession;
    timeLeft = isSession ? sessionTime * 60 : breakTime * 60;
  }
  timeLeft--;
  updateDisplay();
}

// Reset timer
resetButton.addEventListener('click', () => {
  clearInterval(interval);
  running = false;
  timeLeft = sessionTime * 60;
  isSession = true;
  updateDisplay();
  startButton.textContent = 'Start';
  disableControls(false);
});

// Update session time
sessionIncrease.addEventListener('click', () => {
  sessionTime++;
  sessionTimeDisplay.textContent = sessionTime;
  if (!running) timeLeft = sessionTime * 60;
  updateDisplay();
});

sessionDecrease.addEventListener('click', () => {
  if (sessionTime > 1) {
    sessionTime--;
    sessionTimeDisplay.textContent = sessionTime;
    if (!running) timeLeft = sessionTime * 60;
    updateDisplay();
  }
});

// Update break time
breakIncrease.addEventListener('click', () => {
  breakTime++;
  breakTimeDisplay.textContent = breakTime;
});

breakDecrease.addEventListener('click', () => {
  if (breakTime > 1) {
    breakTime--;
    breakTimeDisplay.textContent = breakTime;
  }
});

// Disable session/break controls while running
function disableControls(disabled) {
  sessionIncrease.disabled = disabled;
  sessionDecrease.disabled = disabled;
  breakIncrease.disabled = disabled;
  breakDecrease.disabled = disabled;
}

// Initialize display
updateDisplay();
