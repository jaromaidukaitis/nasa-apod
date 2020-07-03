let req = new XMLHttpRequest();

req.open("GET", "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");

req.onload = function () {
	let object = JSON.parse(req.responseText);
	console.log(object);
	title.textContent = object.title;
	img.src = object.url;
	date.textContent = object.date;
	explanation.textContent = object.explanation;
	copyright.textContent = "Copyright: " + object.copyright;
};

req.send();
