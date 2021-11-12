var colorArr = []
var fromWhere;
var ticketColorInput;
var zones;
var fromColor;



function onClick(){
	//Get name or Interstate
	fromWhere = document.getElementById("fromInput").value; 
	zones = document.getElementById("zoneInput").value; 
	ticketColorInput = document.getElementById("ticketColorInput").value; 

	//Get colors
	var inputColors = document.getElementsByClassName('clr-field');
	for(i = 0; i < inputColors.length; i++) {
	  colorArr[i] = inputColors[i].style.color;
	}
	fromColor = "rgb(0,0,0)"
	fromWhere = fromWhere.toUpperCase();
	if(fromWhere == 'INTERSTATE')
		fromColor = "rgb(255,0,0)"
	

	const params = new URLSearchParams({
			fromWhereA: fromWhere,
			fromWhereCo: fromColor,
			zoneNumA: zones,
			ticketColorA: ticketColorInput,
			color1A: colorArr[0],
			color2A: colorArr[1],
			color3A: colorArr[2]
		});
	var separator = (window.location.href.indexOf("?")===-1)?"?":"&";
	window.location.href = "generated.html" + separator + params;

}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


  function deltaE(rgbA, rgbB) {
	let labA = rgb2lab(rgbA);
	let labB = rgb2lab(rgbB);
	let deltaL = labA[0] - labB[0];
	let deltaA = labA[1] - labB[1];
	let deltaB = labA[2] - labB[2];
	let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
	let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
	let deltaC = c1 - c2;
	let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
	deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
	let sc = 1.0 + 0.045 * c1;
	let sh = 1.0 + 0.015 * c1;
	let deltaLKlsl = deltaL / (1.0);
	let deltaCkcsc = deltaC / (sc);
	let deltaHkhsh = deltaH / (sh);
	let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
	return i < 0 ? 0 : Math.sqrt(i);
  }

  function rgb2lab(rgb){
	let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
	r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
	g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
	b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
	x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
	y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
	z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
	x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
	y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
	z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
	return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  }

function preview_image(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output_image');
      output.src = reader.result;

	  console.log(output.width + " " + output.height )

	  var canvas = document.createElement('canvas');
	  canvas.width = output.width;
	  canvas.height = output.height;
	  canvas.getContext('2d').drawImage(output, 0, 0, output.width, output.height);
  
	  var ticketColorTable = [
		[106, 180, 106],//Green
		[64, 140, 255],	//Blue
		[247, 210, 216],//Red
		[237, 111, 108],//DarkRed
		[254, 224, 65], //Yellow
		[161, 161, 161] //Gray
	  ];	

	  var ticketColorScan = canvas.getContext('2d').getImageData(470, 617, 1, 1).data;
	  var rgbVal = ticketColorScan.toString();
	  var ticketColAr = [];
	  rgbVal = rgbVal.replace(",255", "");
	  ticketColAr = rgbVal.split(',');
	  var col1 = parseInt(ticketColAr[0]);
	  var col2 = parseInt(ticketColAr[1]);
	  var col3 = parseInt(ticketColAr[2]);
	  var ticketColorArray = [col1, col2, col3]
	  console.log("input: " + ticketColorArray)

	  var finalTicketColr;
	  var ticketColNameArr = [
		  "Green",
		  "Blue",
		  "Red",
		  "DarkRed",
		  "Yellow",
		  "Gray"
	  ]
	  for(i = 0; i < ticketColorTable.length; i++){
		if(deltaE(ticketColorTable[i], ticketColorArray) <= 3)
			finalTicketColr = ticketColNameArr[i];
	  }
	  console.log(finalTicketColr)
	  document.getElementById("ticketColorInput").value = finalTicketColr; 


	  var colorAr = [];
	  colorAr[0] = canvas.getContext('2d').getImageData(169, 1739, 1, 1).data;
	  colorAr[1] = canvas.getContext('2d').getImageData(470, 1739, 1, 1).data;	
	  colorAr[2] = canvas.getContext('2d').getImageData(770, 1739, 1, 1).data;
	  
	  var inputColors = document.getElementsByClassName('clr-field');
	  for(i = 0; i < inputColors.length; i++) {
		inputColors[i].style.color = "rgb(" + colorAr[i].toString() + ")";
	  }

    }
    var fileRead = reader.readAsDataURL(event.target.files[0]);
	console.log(fileRead)

	var context = document.getElementById('canvas').getContext('2d');
	context.drawImage(img, 0, 0);
	data = context.getImageData(x, y, 1, 1).data;
}


window.onload = function () { 
	window.scrollTo(0,1);
	let here = new URL(window.location.href).searchParams;
	console.log(window.location.href);

	document.getElementById('fromWhere').innerHTML = here.get('fromWhereA');
	document.getElementById('fromWhere').style.color = here.get('fromWhereCo');
	document.getElementById('zoneNum').innerHTML = here.get('zoneNumA');
	document.getElementById('ticketColor').src = "img/" + here.get('ticketColorA') + ".png";
	document.getElementById('coloredBoxes1').style.backgroundColor = here.get('color1A');
	document.getElementById('coloredBoxes2').style.backgroundColor = here.get('color2A');
	document.getElementById('coloredBoxes3').style.backgroundColor = here.get('color3A');


	
	const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
	if (!isInStandaloneMode()) {
		this.setState({ showInstallMessage: true });
	  }

}
