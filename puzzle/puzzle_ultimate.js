"use strict";

var puzzle = new Object();

puzzle = {
	machine_type: "javascript",
    machine_name: "Puzzle",
    machine_description: "HTML Management Library",
    machine_version: "1.00",
    machine_author: "Hamba Allah",
    pointing: null,
    prepareEquipment: null,
    dematerialization: null,
    render: null,
    installPagepart: null
};

puzzle.pointing = function (a, b){
	if(a === "body"){
		return document.body.appendChild(b);
	}
	else if(a === "head"){
		return document.head.appendChild(b);
	}
	else{
		return document.getElementById(a).appendChild(b);
	}
};

puzzle.prepareEquipment = function (a){
	if(a.css.length !== 0){
		var c;

		for(c in a.css){
			var b = document.createElement("link");

			b.setAttribute("rel", "stylesheet");
			b.setAttribute("type", "text/css");
			b.setAttribute("href", a.css[c].href);
			b.setAttribute("preload", "this");

			puzzle.pointing(a.css[c].point, b);
		}
	}

	if(a.js.length !== 0){
		var d;

		for(d in a.js){
			var e = document.createElement("script");

			e.setAttribute("type", "text/javascript");
			e.setAttribute("src", a.js[d].src);
			e.setAttribute("preload", "this");

			puzzle.pointing(a.js[d].point, e);
		}
	}
};

puzzle.dematerialization = function (a){
    var e = JSON.parse(a);
    var b;
    var d = "";

    for(b in e){
        Object.keys(e[b]).forEach(function (c){
            d += e[b][c];
        });
    }

    return d;
};

puzzle.render = function (a){
	var http = new XMLHttpRequest();

	http.onreadystatechange = function (){
		var b = document.getElementById(a.attr.id);

		if(b !== null){
			if(this.readyState === 2 || this.readyState === 3){
				b.innerHTML = "";
			}
			else if(this.readyState === 4){
				if(this.status === 404){
                    b.innerHTML = "error...";
                }
                else if(this.status === 200){
                	if(a.content_type === "html/txt/etc"){
                		b.innerHTML = this.responseText;
                	}
                	else if(a.content_type === "JSON"){
                		b.innerHTML = puzzle.dematerialization(this.responseText);
                	}
                	else{
                		b.innerHTML = "[ERROR]: content_type must be html/txt or JSON.";
                	}
                }
			}
		}
	};

	http.open("GET", a.path, true);
    http.send();
};

puzzle.installPagepart = function (a){
	var b = document.createElement(a.model);
	var c = a.attr;
	var d = a.point;

	Object.keys(c).forEach(function (e){
		b.setAttribute(e, c[e]);
	});

	puzzle.pointing(d, b);
	puzzle.prepareEquipment(a);
	puzzle.render(a);
};