// Parse the query string parameters from the URL of the page
const params = new URLSearchParams(location.search);

// Get the values of the variables from the query string parameters
const fromWhere = params.get('fromWhere');
const fromWhereColor = params.get('fromColor');
const zones = params.get('zones');
const ticketColor = params.get('ticketColor');
const barColor1 = params.get('color1');
const barColor2 = params.get('color2');
const barColor3 = params.get('color3');

const fromWhereID = document.getElementById('fromWhere');
const fromWhereColorElem = document.getElementById('fromWhere');
const zonesID = document.getElementById('zoneNum');
const ticketColorID = document.getElementById('ticketColor');
const barColor1ID = document.getElementById('coloredBoxes1');
const barColor2ID = document.getElementById('coloredBoxes2');
const barColor3ID = document.getElementById('coloredBoxes3');


fromWhereID.textContent = params.get('fromWhere')
fromWhereColorElem.style.color = fromWhereColor
zonesID.textContent = zones
ticketColorID.src = "img/" + ticketColor + ".png"
barColor1ID.style.backgroundColor = barColor1
barColor2ID.style.backgroundColor = barColor2
barColor3ID.style.backgroundColor = barColor3

if (navigator.standalone === false) {
    // The user has not added your website to their homescreen as a web app
    console.log('The user has not added your website to their homescreen as a web app');
    document.getElementById("alertbox").style.display = 'block'
  } else {
    // The user has added your website to their homescreen as a web app
    console.log('The user has added your website to their homescreen as a web app');
    document.getElementById("alertbox").style.display = 'none'
  }
  
