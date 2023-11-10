
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const blueButton = document.getElementById('blueButton');
const redButton = document.getElementById('redButton');
const yellowButton = document.getElementById('yellowButton');
const captureButton = document.getElementById('capture');

// Function to change color
function changeColor(color) {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  let frame = context.getImageData(0, 0, canvas.width, canvas.height);
  let data = frame.data;

  for (let i = 0; i < data.length; i += 4) {
    let red = data[i];
    let green = data[i + 1];
    let blue = data[i + 2];

    if (color === 'blue') {
      // Example logic: If the pixel is blue, change it to red
      if (blue > 150 && red < 100 && green < 100) {
        data[i] = 255;     // Red
        data[i + 1] = 0;   // Green
        data[i + 2] = 0;   // Blue
      }
    } else if (color === 'red') {
      // Example logic: If the pixel is red, change it to yellow
      if (red > 150 && blue < 100 && green < 100) {
        data[i] = 255;     // Red
        data[i + 1] = 255; // Green
        data[i + 2] = 0;   // Blue
      }
    } else if (color === 'yellow') {
      // Example logic: If the pixel is yellow, change it to green
      if (red > 150 && green > 150 && blue < 100) {
        data[i] = 0;       // Red
        data[i + 1] = 255; // Green
        data[i + 2] = 0;   // Blue
      }
    }
  }

  context.putImageData(frame, 0, 0);
}

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
