var image = null;
var generalColor = '';
var specificColors = [null, null, null];
var timeElapsed = 0;

var ticketColors = {
    '190,135,192': 'Purple',
    '254,207,215': 'Pink',
    '248,96,98': 'Red',
    '81,150,255': 'Blue',
    '246,217,62': 'Yellow',
    '98,172,97': 'Green',
};

function handleImageUpload(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        image = reader.result;
        processImage();
    };

    reader.readAsDataURL(file);
}

function processImage() {
    if (image) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = image;
        img.onload = function() {
            var startTime = Date.now();
            var canvasContainer = document.getElementById('canvas-container');
            while (canvasContainer.firstChild) {
                canvasContainer.removeChild(canvasContainer.firstChild);
            }
            canvasContainer.style.opacity = 1;
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            // Set the canvas dimensions to match the image
            canvas.width = img.width;
            canvas.height = img.height / 4; // We only want a quarter of the image
            // Draw only the second quarter of the image onto the canvas
            context.drawImage(img, 0, img.height / 4, img.width, img.height / 4, 0, 0, canvas.width, canvas.height);

            // Append the canvas to the canvas container
            canvasContainer.appendChild(canvas);

            var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            var foundColor = null;
            for (var i = 0; i < imgData.data.length; i += 4) {
                var r = imgData.data[i];
                var g = imgData.data[i + 1];
                var b = imgData.data[i + 2];

                var colorString = `${r},${g},${b}`;
                if (ticketColors[colorString]) {
                    foundColor = colorString;

                    // Calculate the x and y coordinates of the pixel
                    var x = (i / 4) % imgData.width;
                    var y = Math.floor((i / 4) / imgData.width);

                    // Draw a small red rectangle at the location of the pixel
                    context.fillStyle = 'red';
                    context.fillRect(x, y, 5, 5);

                    break;
                }
            }

            if (foundColor) {
                generalColor = ticketColors[foundColor];
                console.log(ticketColors[foundColor]);
                document.getElementById('ticket-color').value = ticketColors[foundColor];
            } else {
                foundColor = '153,153,153';
                generalColor = foundColor;
                console.log('gray');
                document.getElementById('ticket-color').value = 'Gray';
            }

            // Specific colors
            // Create a new canvas for the second half of the image
            var canvas2 = document.createElement('canvas');
            var context2 = canvas2.getContext('2d');

            // Set the canvas dimensions to match the image
            canvas2.width = img.width;
            canvas2.height = img.height / 8; // We only want half of the image

            // Draw only the second half of the image onto the canvas
            context2.drawImage(img, 0, img.height * 6 / 8, img.width, img.height / 8, 0, 0, canvas2.width, canvas2.height);

            // Append the canvas to the canvas container
            canvasContainer.appendChild(canvas2);

            // Get the image data from the canvas
            var imgData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height);

            // Divide the image into three parts
            var partWidth = imgData2.width / 3;

            // Create an array to hold the color counts for each part
            var colorCounts = [{}, {}, {}];

            for (var i = 0; i < imgData2.data.length; i += 4) {
                var r = imgData2.data[i];
                var g = imgData2.data[i + 1];
                var b = imgData2.data[i + 2];

                // Ignore white (or near white), black (or near black), and gray (or near gray) pixels
                if ((r > 200 && g > 200 && b > 200) || (r < 50 && g < 50 && b < 50) || (Math.abs(r - g) < 10 && Math.abs(r - b) < 10)) {
                    continue;
                }

                var colorString = `${r},${g},${b}`;

                // Calculate the x coordinate of the pixel
                var x = (i / 4) % imgData2.width;

                // Determine which part of the image this pixel belongs to
                var partIndex = Math.floor(x / partWidth);

                // Increment the count for this color in the appropriate part
                colorCounts[partIndex][colorString] = (colorCounts[partIndex][colorString] || 0) + 1;
            }

            // Find the most frequent color in each part
            var topColors = colorCounts.map(function(counts, partIndex) {
                var topColorEntry = Object.entries(counts)
                    .sort(function(a, b) {
                        return b[1] - a[1];
                    })
                    .slice(0, 1)[0];

                if (topColorEntry) {
                    var [color, count] = topColorEntry;

                    // Convert the color from 'r,g,b' to '#rrggbb'
                    var [r, g, b] = color.split(',');
                    var colorHex = '#' + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);

                    // Draw a small red circle at the middle of the part where the color was found
                    context2.beginPath();
                    context2.arc(partIndex * partWidth + partWidth / 2, imgData2.height / 2, 5, 0, 2 * Math.PI, false);
                    context2.fillStyle = 'red';
                    context2.fill();

                    return colorHex;
                }

                return null;
            });

            specificColors = topColors; // Set the specific colors
            console.log(topColors);
            document.getElementById('color1').value = topColors[0] || '#000000';
            document.getElementById('color2').value = topColors[1] || '#000000';
            document.getElementById('color3').value = topColors[2] || '#000000';


            var endTime = Date.now();
            var timeElapsedInSec = (endTime - startTime) / 1000;
            timeElapsed = timeElapsedInSec;
            document.getElementById('time-elapsed').textContent = `It took ${timeElapsed} seconds to read the screenshot!`;
        };

    }
}

document.getElementById('screenshot').addEventListener('change', handleImageUpload);
