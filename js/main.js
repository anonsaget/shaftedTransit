var colorArr = []
var fromWhere;
var ticketColorInput;
var zones;
var fromColor;

const button = document.querySelector('input[type="button"][value="Generate"]');

function hexToRgb(hex) {
    // Convert the hexadecimal string to a base-10 integer
    const value = parseInt(hex, 16);
  
    // Get the red, green, and blue values
    const r = (value >> 16) & 0xff;
    const g = (value >> 8) & 0xff;
    const b = value & 0xff;
  
    // Return the RGB values as an array
    return [r, g, b];
  }

function onClick(){

	//Loading new page
	fromWhere = document.getElementById("interstate-intrastate").value; 
	zones = document.getElementById("zones").value; 
	ticketColorInput = document.getElementById("ticket-color").value; 
	var barColor1 = document.getElementById("color1").value;
	var barColor2 = document.getElementById("color2").value;
	var barColor3 = document.getElementById("color3").value;

	colorArr[0] = barColor1.replace('#', '');
	colorArr[1] = barColor2.replace('#', '');
	colorArr[2] = barColor3.replace('#', '');
	console.log(colorArr[0])
	//Get colors
	fromColor = "000000"
	fromWhere = fromWhere.toUpperCase();

	if(fromWhere == 'INTERSTATE')
		fromColor = "FF0000"
	//document.getElementById("spinner-border text-light").style.visibility = "visible"
	  
	location.assign(`generated.html?fromWhere=${fromWhere}&fromColor=${fromColor}&zones=${zones}&ticketColor=${ticketColorInput}&color1=${colorArr[0]}&color2=${colorArr[1]}&color3=${colorArr[2]}`);

}
