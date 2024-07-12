const pianoKeys = document.querySelectorAll(".piano-keys .key"),
  volumeSlider = document.querySelector(".volume-slider input"),
  keysCheckbox = document.querySelector(".keys-checkbox input"),
  playButton = document.querySelector(".play-button");

let allKeys = [],
  recordedKeys = [],
  isRecording = false,
  audio = new Audio(`tunes/a.wav`); // by default, audio src is "a" tune

const playTune = (key) => {
  audio.src = `tunes/${key}.wav`; // passing audio src based on key pressed
  audio.play(); // playing audio

  const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
  clickedKey.classList.add("active"); // adding active class to the clicked key element
  setTimeout(() => {
    // removing active class after 150 ms from the clicked key element
    clickedKey.classList.remove("active");
  }, 150);

  if (isRecording) {
    recordedKeys.push({ key: key, time: Date.now() });
  }
};

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
  // calling playTune function with passing data-key value as an argument
  key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
  audio.volume = e.target.value; // passing the range slider value as an audio volume
};

const showHideKeys = () => {
  // toggling hide class from each key on the checkbox click
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
  // if the pressed key is in the allKeys array, only call the playTune function
  if (allKeys.includes(e.key)) playTune(e.key);
};

const startRecording = () => {
  recordedKeys = [];
  isRecording = true;
  recordButton.classList.add("recording"); // Add the recording class to change color
};

const stopRecording = () => {
  isRecording = false;
  recordButton.classList.remove("recording"); // Remove the recording class to revert color
};

const playRecording = () => {
  if (recordedKeys.length === 0) return;
  let startTime = recordedKeys[0].time;
  recordedKeys.forEach(({ key, time }) => {
    setTimeout(() => {
      playTune(key);
    }, time - startTime);
  });
};

// Adding event listeners
keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
playButton.addEventListener("click", playRecording);

// Optionally, add buttons to start and stop recording
const recordButton = document.querySelector(".record-button"),
  stopButton = document.querySelector(".stop-button");

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
