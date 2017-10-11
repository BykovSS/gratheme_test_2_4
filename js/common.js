'use strict';

window.addEventListener('load', function () {

	var br_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var br_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', '../img/sea.jpg', false);
	xhr.send();
	if (xhr.status != 200) {
		alert(xhr.status + ': ' + xhr.statusText);
	} else {
		alert(xhr.responseText);
	}

	var koef = void 0;
	var parusa = void 0,
	    car = void 0,
	    sea = new Image();
	sea.src = "../img/sea.jpg";
	sea.onload = function () {
		console.log('sea done');
		parusa = new Image();
		parusa.src = "../img/Parusa.png";
		parusa.onload = function () {
			car = new Image();
			car.src = "../img/car.png";
			car.onload = function () {
				koef = Math.max(sea.width / sea.height, parusa.width / parusa.height, car.width / car.height);
				MakeParallax(br_width, br_height);
			};
		};
	};

	function MakeParallax(width, height) {
		document.body.style.position = 'absolute';

		var div1 = document.getElementById('div1');
		div1.style.backgroundImage = 'url(' + sea.src + ')';
		div1.style.backgroundPosition = 'bottom';
		div1.style.backgroundSize = 'cover';
		div1.style.position = 'absolute';
		div1.style.zIndex = 0;

		var div2 = document.getElementById('div2');
		div2.style.backgroundImage = 'url(' + car.src + ')';
		div2.style.backgroundPosition = 'bottom';
		div2.style.backgroundSize = '100% auto';
		div2.style.position = 'absolute';
		div2.style.zIndex = 1;

		var div3 = document.getElementById('div3');
		div3.style.backgroundImage = 'url(' + parusa.src + ')';
		div3.style.backgroundPosition = 'bottom';
		div3.style.backgroundSize = '100% auto';
		div3.style.position = 'absolute';
		div3.style.zIndex = 2;

		if (height > width) {
			div1.style.height = width / koef + "px";
			div1.style.left = 0;
			div1.style.top = (height - parseInt(div1.style.height)) / 2 + "px";
			div1.style.width = width + "px";

			div2.style.height = width / koef + "px";
			div2.style.left = 0;
			div2.style.top = (height - parseInt(div2.style.height)) / 2 + "px";
			div2.style.width = width + "px";

			div3.style.height = width / koef + "px";
			div3.style.left = 0;
			div3.style.top = (height - parseInt(div3.style.height)) / 2 + "px";
			div3.style.width = width + "px";
		} else {
			div1.style.height = height - document.getElementsByTagName('h3')[0].offsetHeight + "px";
			div1.style.width = height * koef + "px";
			div1.style.left = (width - parseInt(div1.style.width)) / 2 + "px";
			div1.style.top = document.getElementsByTagName('h3')[0].offsetHeight + "px";

			div2.style.height = height - document.getElementsByTagName('h3')[0].offsetHeight + "px";
			div2.style.width = height * koef + "px";
			div2.style.left = (width - parseInt(div2.style.width)) / 2 + "px";
			div2.style.top = document.getElementsByTagName('h3')[0].offsetHeight + "px";

			div3.style.height = height - document.getElementsByTagName('h3')[0].offsetHeight + "px";
			div3.style.width = height * koef + "px";
			div3.style.left = (width - parseInt(div3.style.width)) / 2 + "px";
			div3.style.top = document.getElementsByTagName('h3')[0].offsetHeight + "px";

			var beta = void 0,
			    step = parseInt(div3.style.left) / 40;

			window.addEventListener('deviceorientation', function (event) {
				beta = event.beta;
				if (-40 <= beta && beta <= 0) {
					div2.style.left = parseInt(div1.style.left) + step * beta / 2 + "px";
					div3.style.left = parseInt(div1.style.left) + step * beta + "px";
				} else if (0 <= beta && beta <= 40) {
					div2.style.left = parseInt(div1.style.left) + step * beta + "px";
					div3.style.left = parseInt(div1.style.left) + step * beta / 2 + "px";
				}
			});
		}
	}

	window.addEventListener('resize', function () {
		br_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		br_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		MakeParallax(br_width, br_height);
	});
});