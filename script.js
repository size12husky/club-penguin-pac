const checkbox = document.getElementById("penguin-toggle");
const penguinFront = document.getElementById("penguin-front");

checkbox.addEventListener("change", function () {
    localStorage.setItem("penguinToggle", this.checked);
    
    if (this.checked) {
        loadScript("script2.js");
    } else {
        penguinFront.style.opacity = "0";
    }
});
function loadScript(url) {
	const script = document.createElement("script");
	script.src = url;
	script.type = "text/javascript";
	script.onload = function () {
		console.log(`Script ${url} loaded`);
	};
	script.onerror = function () {
		console.error(`Error loading script ${url}`);
	};
	document.head.appendChild(script);
	console.log(script);
}

const savedState = localStorage.getItem("penguinToggle");
if (savedState !== null) {
	checkbox.checked = savedState === "true";
	if (checkbox.checked) {
		loadScript("script2.js");
	} else {
		loadScript("script3.js");
	}
}
