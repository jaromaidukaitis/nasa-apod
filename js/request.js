let object = undefined;
let submitRequest = document.getElementById("submitDate");
let inputedDate = document.getElementById("inputedDate");
let req = new XMLHttpRequest();

req.open(
	"GET",
	"https://api.nasa.gov/planetary/apod?api_key=aEwu5Jyn70uJcPMlhvUhgptSJqEqgnsF55sUlPSL"
);

req.onload = function () {
	object = JSON.parse(req.responseText);
	console.log(object);
	title.textContent = object.title;
	date.textContent = object.date;
	explanation.textContent = object.explanation;
	copyright.textContent = "Copyright: " + object.copyright;
	if (object.media_type == "image") {
		img.src = object.url;
		video.classList.add("hide");
	} else {
		video.src = object.url;
		img.classList.add("hide");
	}
};

req.send();

submitRequest.addEventListener("click", function () {
	let newReq = new XMLHttpRequest();
	console.log(inputedDate.value);
	let urlNewReq = `https://api.nasa.gov/planetary/apod?api_key=aEwu5Jyn70uJcPMlhvUhgptSJqEqgnsF55sUlPSL&date=${inputedDate.value}`;

	newReq.open("GET", urlNewReq);

	newReq.onload = function () {
		if (newReq.status == 200) {
			console.log(newReq.status);
			object = JSON.parse(newReq.responseText);
			console.log(object);
			title.textContent = object.title;
			date.textContent = object.date;
			explanation.textContent = object.explanation;
			copyright.textContent = "Copyright: " + object.copyright;
			if (object.media_type == "image") {
				img.src = object.url;
				img.classList.remove("hide");
				video.classList.add("hide");
			} else {
				video.src = object.url;
				video.classList.remove("hide");
				img.classList.add("hide");
			}
		} else {
			object = JSON.parse(newReq.responseText);
			title.textContent = `Erro ${object.code}`;
			explanation.textContent = object.msg;
			date.textContent = "";
			copyright.textContent = "";
			img.classList.add("hide");
			video.classList.add("hide");
		}
	};

	newReq.send();
});
