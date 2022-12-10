// Get the file input element
var fileInput = document.getElementById("screenshot");

// Get a reference to the canvas element
const canvas = document.getElementById('screenshotDisplay');

const dropdownTxtColor = document.getElementById('ticket-color');
const barColor1 = document.getElementById('color1');
const barColor2 = document.getElementById('color2');
const barColor3 = document.getElementById('color3');
//Ticket Color at 30 Y Coordinate

//Ticket Color 1 X25 Y85
//Ticket Color 2 X55 Y85
//Ticket Color 3 X85 Y85


var ticketColorTable = [
    [121, 185, 126],//Green
    [64, 140, 255],	//Blue
    [247, 210, 216],//Red
    [237, 111, 108],//DarkRed
    [254, 224, 65], //Yellow
    [161, 161, 161], //Gray
    [206, 156, 205] //Purple
];	
var txtColors = [
    "Green",
    "Blue",
    "Pink",
    "Red",
    "Yellow",
    "Grey",
    "Purple"
]
  

function euclideanDistance(color1, color2) {
    // Calculate the Euclidean distance between the two colors
    return Math.sqrt(
      Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2)
    );
  }

// Create a FileReader object
const reader = new FileReader();

// Bind an event listener to the "change" event of the file input
fileInput.addEventListener("change", function() {
    // Get the selected file
    const file = event.target.files[0];

    // Use the FileReader to read the image as a data URL
    reader.readAsDataURL(file);

});

// Define a function to run when the FileReader has finished reading the image
reader.addEventListener('load', () => {
    // Create an image element
    const img = document.createElement('img');
  
    // Set the img src to the data URL that was read
    img.src = reader.result;
  
    // When the image has finished loading, draw it onto the canvas
    img.addEventListener('load', () => {
      // Reduce the size of the image by 80%
      canvas.getContext('2d').scale(100 / img.width, 100 / img.height);

      // Draw the image onto the canvas
      canvas.getContext('2d').drawImage(img, 0, 0);
      //Image rendered and scaled to Webpage

      // Get the canvas context
      const ctx = canvas.getContext('2d');

      // Get the width and height of the canvas
      const width = canvas.width;
      const height = canvas.height;

      const imageData = ctx.getImageData(0, 0, width, height);

      const colorsLoop = [
        ((30 * canvas.width + 82) * 4),
        ((85 * canvas.width + 25) * 4),
        ((85 * canvas.width + 50) * 4),
        ((85 * canvas.width + 85) * 4),
      ]

      let counter = 0
      var colorDef = []
      var ticketColor = []
      colorsLoop.forEach(element => {
        
        const r = imageData.data[element];
        const g = imageData.data[element + 1];
        const b = imageData.data[element + 2];
        if (counter == 0) {
            colorDef[counter] = ('')
            ticketColor = [r,g,b]
        }
        else {
            var rHex = r.toString(16)
            var gHex = g.toString(16)
            var bHex = b.toString(16)
            colorDef[counter] = ('#'+rHex+gHex+bHex)
        }
        counter = counter + 1
      });


      //Get first Ticket Color
      const distances = ticketColorTable.map(color => euclideanDistance(ticketColor, color));

      // Find the index of the smallest distance
      const closestColorIndex = distances.indexOf(Math.min(...distances));

      console.log(txtColors[closestColorIndex]);
      dropdownTxtColor.value = txtColors[closestColorIndex]
      barColor1.value = colorDef[1]
      barColor2.value = colorDef[2]
      barColor3.value = colorDef[3]

      //After doing everything, hide the image
      canvas.style.display = "none"
    });
  });

