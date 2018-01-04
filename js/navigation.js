var cable = document.getElementsByTagName("a");

for(var a = 0; a<cable.length; a++){
	cable[a].addEventListener("click", function (b){
		b.preventDefault();

		alert("[SUCCESS]: navigation.js working!");
	},
	false);
}