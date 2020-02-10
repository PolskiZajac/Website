const ports = document.querySelectorAll(".hitbox");
const infos = document.querySelectorAll(".info");

for(var i = 0; i < ports.length; i++) {
	ports[i].addEventListener("mouseover", mouseOn(i));
	ports[i].addEventListener("mouseout", mouseOut(i));
}
for(var a = 0; a < infos.length; a++) {
	infos[a].addEventListener("mouseover", mouseOn(a));
	infos[a].addEventListener("mouseout", mouseOut(a));
}

function mouseOn(x) {
	return function() {
		document.querySelector(`#region${x}`).style.display = "block";
	};
}
function mouseOut(x) {
	return function() {
		document.querySelector(`#region${x}`).style.display = "none";
	};
}
