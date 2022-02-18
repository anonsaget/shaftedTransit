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
