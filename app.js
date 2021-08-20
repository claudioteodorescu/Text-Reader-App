const textDisplay = document.querySelector("#text");
const speedBtn = document.querySelector("#speed");
const readBtn = document.querySelector(".read");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");

let currentChar;

// Read Functionality
readBtn.addEventListener("click", () => {
  readText(textDisplay.value);
});

// Pause Functionality
pauseBtn.addEventListener("click", pauseText);

// Stop Functionality
stopBtn.addEventListener("click", stopText);

// Speed Functionality
speedBtn.addEventListener("input", () => {
  stopText();
  readText(utterance.text.substring(currentChar));
});

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("end", () => {
  textDisplay.disabled = false;
});

utterance.addEventListener("boundary", (e) => {
  currentChar = e.charIndex;
});

function readText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }

  if (speechSynthesis.speaking) return;

  utterance.text = text;
  utterance.rate = speedBtn.value || 1;
  textDisplay.disabled = true;
  speechSynthesis.speak(utterance);
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
