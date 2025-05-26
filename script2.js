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
	const PENGUIN_SPEED = 60;

	if (!penguinFront || !penguinBack) {
		console.warn("Penguins not found in DOM.");
		return;
	}

	penguinFront.style.opacity = "1";

	penguinFront.style.transition = "left 0s linear, top 0s linear";
	penguinBack.style.transition = "left 0s linear, top 0s linear";

	let animationInProgress = false;
	let currentAnimationTimeout = null;

	areas.forEach((area) => {
		area.style.cursor = "pointer";
		area.addEventListener("click", (e) => {
			e.preventDefault();
			if (!animationInProgress) {
				handlePenguinMove(area);
			}
		});
	});

	const mapImage = document.querySelector("img[usemap]");
	mapImage.addEventListener("click", (e) => {
		if (animationInProgress) return;

		const rect = mapImage.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const clickY = e.clientY - rect.top;

		const dummyArea = {
			coords: [clickX - 10, clickY - 10, clickX + 10, clickY + 10].join(","),
			href: "#",
		};

		handlePenguinMove(dummyArea);
	});

	function handlePenguinMove(area) {
		const coords = area.coords.split(",").map(Number);
		const targetX = (coords[0] + coords[2]) / 2;
		const targetY = (coords[1] + coords[3]) / 2;

		const currentX =
			parseFloat(penguinFront.style.left) || penguinFront.offsetLeft;
		const currentY =
			parseFloat(penguinFront.style.top) || penguinFront.offsetTop;

		const distance = Math.sqrt(
			Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
		);

		const duration = distance / PENGUIN_SPEED;
		const mapImage = document.querySelector("img[usemap]");
		const imageRect = mapImage.getBoundingClientRect();
		const viewportY = imageRect.top + targetY;

		const penguinRect = penguinFront.getBoundingClientRect();
		const currentPenguinY = penguinRect.top + penguinRect.height / 2;

		let activePenguin, inactivePenguin;
		if (viewportY > currentPenguinY - 20) {
			activePenguin = penguinFront;
			inactivePenguin = penguinBack;
		} else {
			activePenguin = penguinBack;
			inactivePenguin = penguinFront;
		}

		inactivePenguin.style.opacity = "0";
		activePenguin.style.opacity = "1";

		activePenguin.style.animation =
			"waddle 0.4s infinite alternate ease-in-out";

		animationInProgress = true;

		if (currentAnimationTimeout) {
			clearTimeout(currentAnimationTimeout);
		}

		penguinFront.style.transition = `left ${duration}s linear, top ${duration}s linear`;
		penguinBack.style.transition = `left ${duration}s linear, top ${duration}s linear`;

		penguinFront.style.left = `${targetX}px`;
		penguinFront.style.top = `${targetY}px`;
		penguinBack.style.left = `${targetX}px`;
		penguinBack.style.top = `${targetY}px`;

		currentAnimationTimeout = setTimeout(() => {

			penguinFront.style.animation = "none";
			penguinBack.style.animation = "none";

			animationInProgress = false;

			if (area.href && area.href !== "#") {
				window.location.href = area.href;
			}

			penguinBack.style.opacity = "0";
			penguinFront.style.opacity = "1";
		}, duration * 1000);
	}
}
