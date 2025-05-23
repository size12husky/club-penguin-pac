if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		runPenguinScript();
	});
} else {
	runPenguinScript();
}

function runPenguinScript() {
	const penguinFront = document.getElementById("penguin-front");
	const penguinBack = document.getElementById("penguin-back");
	const areas = document.querySelectorAll("area");

	if (!penguinFront || !penguinBack) {
		console.warn("Penguins not found in DOM.");
		return;
	}

	penguinFront.style.opacity = "1";

	areas.forEach((area) => {
		area.style.cursor = "pointer";
		area.addEventListener("click", (e) => {
			e.preventDefault();

			const coords = area.coords.split(",").map(Number);
			const x = (coords[0] + coords[2]) / 2;
			const y = (coords[1] + coords[3]) / 2;

			const mapImage = document.querySelector("img[usemap]");
			const imageRect = mapImage.getBoundingClientRect();

			const viewportY = imageRect.top + y;

			const penguinRect = penguinFront.getBoundingClientRect();
			const currentPenguinY = penguinRect.top + penguinRect.height / 2;

			if (viewportY > currentPenguinY) {
				penguinBack.style.opacity = "0";
				penguinFront.style.opacity = "1";
				penguinFront.style.left = `${x}px`;
				penguinFront.style.top = `${y}px`;
			} else {
				penguinFront.style.opacity = "0";
				penguinBack.style.opacity = "1";
				penguinBack.style.left = `${x}px`;
				penguinBack.style.top = `${y}px`;
			}

			setTimeout(() => {
				window.location.href = area.href;
			}, 1500);
		});
	});
};
