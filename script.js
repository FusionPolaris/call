
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const blueButton = document.getElementById('blueButton');
const redButton = document.getElementById('redButton');
const yellowButton = document.getElementById('yellowButton');
const captureButton = document.getElementById('capture');

// Access the camera
function startVideo() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.error("Error accessing the camera: ", err);
      });
  } else {
    alert("Sorry, your browser does not support video capture.");
  }
}

// Event listeners for buttons
blueButton.addEventListener('click', () => changeColor('blue'));
redButton.addEventListener('click', () => changeColor('red'));
yellowButton.addEventListener('click', () => changeColor('yellow'));

// Capture button functionality
captureButton.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/png');
  // This image data can be used to save the photo to the device.
});

// Start the video feed when the window loads
window.addEventListener('load', startVideo);
