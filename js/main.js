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
	setCookie('color1', colorArr[0], 1)
	setCookie('color2', colorArr[1], 1)
	setCookie('color3', colorArr[2], 1)
	
	
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

function loadData(){
	console.log(getCookie('color1'));
	console.log(getCookie('color2'));
	console.log(getCookie('color3'));
	console.log(getCookie('fromWhereC'));
	console.log(getCookie('fromColorC'));
	console.log(getCookie('zonesC'));
	document.getElementById('fromWhere').innerHTML = getCookie('fromWhereC');
	document.getElementById('fromWhere').style.color = getCookie('fromColorC');
	document.getElementById('zoneNum').innerHTML = getCookie('zonesC');
	document.getElementById('coloredBoxes1').style.backgroundColor = getCookie('color1');
	document.getElementById('coloredBoxes2').style.backgroundColor = getCookie('color2');
	document.getElementById('coloredBoxes3').style.backgroundColor = getCookie('color3');
	deleteAllCookies();
}

window.onload = function () { 
	window.scrollTo(0,1)
	document.getElementById('fromWhere').innerHTML = getCookie('fromWhereC');
	document.getElementById('fromWhere').style.color = getCookie('fromColorC');
	document.getElementById('zoneNum').innerHTML = getCookie('zonesC');
	document.getElementById('coloredBoxes1').style.backgroundColor = getCookie('color1');
	document.getElementById('coloredBoxes2').style.backgroundColor = getCookie('color2');
	document.getElementById('coloredBoxes3').style.backgroundColor = getCookie('color3');
}
