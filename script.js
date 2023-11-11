
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const blueButton = document.getElementById('blueButton');
const redButton = document.getElementById('redButton');
const yellowButton = document.getElementById('yellowButton');
const captureButton = document.getElementById('capture');

let currentColor = 'normal'; // Default state, no color change

// Function to process each frame of the video
function processFrame() {
    if (video.paused || video.ended) {
        return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let frame = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = frame.data;

    // Apply color change based on the current selected color
    for (let i = 0; i < data.length; i += 4) {
        let red = data[i];
        let green = data[i + 1];
        let blue = data[i + 2];

        switch(currentColor) {
            case 'blue':
                // Change blue pixels to red, then yellow, green, and purple on subsequent clicks
                if (blue > 100 && red < 100 && green < 100) {
                    data[i] = 255;     // Red
                    data[i + 1] = 0;   // Green
                    data[i + 2] = 0;   // Blue
                }
                break;
            case 'red':
                // Change red pixels to yellow, green, purple, and blue on subsequent clicks
                if (red > 100 && blue < 100 && green < 100) {
                    data[i] = 255;     // Red
                    data[i + 1] = 255; // Green
                    data[i + 2] = 0;   // Blue
                }
                break;
            case 'yellow':
                // Change yellow pixels to green, purple, blue, and red on subsequent clicks
                if (red > 100 && green > 100 && blue < 100) {
                    data[i] = 0;       // Red
                    data[i + 1] = 255; // Green
                    data[i + 2] = 0;   // Blue
                }
                break;
        }
    }

    context.putImageData(frame, 0, 0);
    requestAnimationFrame(processFrame); // Continuously process the next frame
}

// Start video processing when the video plays
video.addEventListener('play', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    processFrame();
});

// Button click handlers to change the currentColor
blueButton.addEventListener('click', () => currentColor = 'blue');
redButton.addEventListener('click', () => currentColor = 'red');
yellowButton.addEventListener('click', () => currentColor = 'yellow');

// Capture button functionality
captureButton.addEventListener('click', () => {
    const imageData = canvas.toDataURL('image/png');
    // Code to save imageData to the device
});

// Access the camera
function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error("Error accessing the camera: ", err);
        });
}

// Start the video feed when the window loads
window.addEventListener('load', startVideo);
