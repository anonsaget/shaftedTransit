var colorArr = []
var fromWhere;
var zones;
var fromColor;

function onClick(){
	//Get name or Interstate
	fromWhere = document.getElementById("fromInput").value; 
	zones = document.getElementById("zoneInput").value; 
	//Get colors
	var inputColors = document.getElementsByClassName('clr-field');
	for(i = 0; i < inputColors.length; i++) {
	  colorArr[i] = inputColors[i].style.color;
	}
	fromColor = "rgb(0,0,0)"
	fromWhere = fromWhere.toUpperCase();
	if(fromWhere == 'INTERSTATE')
		fromColor = "rgb(255,0,0)"
	
	setCookie('fromWhereC', fromWhere.toUpperCase(), 1)
	setCookie('fromColorC', fromColor, 1)
	setCookie('zonesC', zones, 1)
	setCookie('ticketColor', colorArr[0], 1)
	setCookie('color1', colorArr[1], 1)
	setCookie('color2', colorArr[2], 1)
	setCookie('color3', colorArr[3], 1)
	
	window.location.href = "generated.html";

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
	here.append('fromWhereA', getCookie('fromWhereC'));
	here.append('fromWhereCo', getCookie('fromColorC'));
	here.append('zoneNumA', getCookie('zonesC'));
	here.append('ticketColorA', getCookie('ticketColorC'));
	here.append('coloredBox1', getCookie('color1'));
	here.append('coloredBox2', getCookie('color2'));
	here.append('coloredBox3', getCookie('color3'));
	console.log(window.location.href);

	document.getElementById('fromWhere').innerHTML = here.get('fromWhereA');
	document.getElementById('fromWhere').style.color = here.get('fromWhereCo');
	document.getElementById('zoneNum').innerHTML = here.get('zoneNumA');
	//document.getElementById('ticketColor').innerHTML = getCookie('ticketColorC');
	document.getElementById('coloredBoxes1').style.backgroundColor = here.get('coloredBox1');
	document.getElementById('coloredBoxes2').style.backgroundColor = here.get('coloredBox2');
	document.getElementById('coloredBoxes3').style.backgroundColor = here.get('coloredBox3');
}
