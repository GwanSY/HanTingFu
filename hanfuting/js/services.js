console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right")
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");

	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		previousCardEl.classList.remove("previous--card");
		nextCardEl.classList.remove("next--card");

		currentBgImageEl.classList.remove("current--image");
		previousBgImageEl.classList.remove("previous--image");
		nextBgImageEl.classList.remove("next--image");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			nextCardEl.style.zIndex = "30";

			nextBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("previous--card");
			previousCardEl.classList.add("next--card");
			nextCardEl.classList.add("current--card");

			currentBgImageEl.classList.add("previous--image");
			previousBgImageEl.classList.add("next--image");
			nextBgImageEl.classList.add("current--image");
		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			nextCardEl.style.zIndex = "20";

			previousBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("next--card");
			previousCardEl.classList.add("current--card");
			nextCardEl.classList.add("previous--card");

			currentBgImageEl.classList.add("next--image");
			previousBgImageEl.classList.add("current--image");
			nextBgImageEl.classList.add("previous--image");
		}
	}
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

	gsap
		.timeline()
		.to([buttons.prev, buttons.next], {
			duration: 0.2,
			opacity: 0.5,
			pointerEvents: "none"
		})
		.to(
			currentInfoEl.querySelectorAll(".text"),
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "-120px",
				opacity: 0
			},
			"-="
		)
		.call(() => {
			swapInfosClass(direction);
		})
		.call(() => initCardEvents())
		.fromTo(
			direction === "right"
				? nextInfoEl.querySelectorAll(".text")
				: previousInfoEl.querySelectorAll(".text"),
			{
				opacity: 0,
				translateY: "40px"
			},
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "0px",
				opacity: 1
			}
		)
		.to([buttons.prev, buttons.next], {
			duration: 0.2,
			opacity: 1,
			pointerEvents: "all"
		});

	function swapInfosClass() {
		currentInfoEl.classList.remove("current--info");
		previousInfoEl.classList.remove("previous--info");
		nextInfoEl.classList.remove("next--info");

		if (direction === "right") {
			currentInfoEl.classList.add("previous--info");
			nextInfoEl.classList.add("current--info");
			previousInfoEl.classList.add("next--info");
		} else if (direction === "left") {
			currentInfoEl.classList.add("next--info");
			nextInfoEl.classList.add("previous--info");
			previousInfoEl.classList.add("current--info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0
	});
	gsap.set(currentInfoEl, {
		rotateY: 0
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {
	let tl = gsap.timeline();

	tl
		.to(cardsContainerEl.children, {
			delay: 0.15,
			duration: 0.5,
			stagger: {
				ease: "power4.inOut",
				from: "right",
				amount: 0.1
			},
			"--card-translateY-offset": "0%"
		})
		.to(
			cardInfosContainerEl
				.querySelector(".current--info")
				.querySelectorAll(".text"),
			{
				delay: 0.5,
				duration: 0.4,
				stagger: 0.1,
				opacity: 1,
				translateY: 0
			}
		)
		.to(
			[buttons.prev, buttons.next],
			{
				duration: 0.4,
				opacity: 1,
				pointerEvents: "all"
			},
			"-=0.4"
		);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh"
	});
	gsap.set(
		cardInfosContainerEl
			.querySelector(".current--info")
			.querySelectorAll(".text"),
		{
			translateY: "40px",
			opacity: 0
		}
	);
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0"
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`
				});

				if (totalImages == loadedImages) {
					gsap
						.timeline()
						.to(".loading__wrapper", {
							duration: 0.8,
							opacity: 0,
							pointerEvents: "none"
						})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();






// // Import jQuery and OwlCarousel libraries
// import $ from "jquery";
// import "owl.carousel";

// // Initialize the carousel
// $(".custom-carousel").owlCarousel({
//   autoWidth: true,
//   loop: true
// });

// // Add click listener to each item in the carousel
// $(document).ready(function () {
//   $(".custom-carousel .item").click(function () {
//     // Remove "active" class from all items except the clicked one
//     $(".custom-carousel .item").not($(this)).removeClass("active");
//     // Toggle "active" class on clicked item
//     $(this).toggleClass("active");
//   });
// });

// const imagesScrollerTrigger = ScrollTrigger.create({
// 	trigger: "section",
// 	start: "top 50%",
// 	end: "bottom 50%",
// 	onUpdate: function (self) {
// 	  const velocity = self.getVelocity();
// 	  if (velocity > 0) {
// 		if (additionalYAnim) additionalYAnim.kill();
// 		additionalY.val = -velocity / 2000;
// 		additionalYAnim = gsap.to(additionalY, { val: 0 });
// 	  }
// 	  if (velocity < 0) {
// 		if (additionalYAnim) additionalYAnim.kill();
// 		additionalY.val = -velocity / 3000;
// 		additionalYAnim = gsap.to(additionalY, { val: 0 });
// 	  }
// 	}
//   });
  
	
// console.clear();

// const { gsap, imagesLoaded } = window;

// const buttons = {
// 	prev: document.querySelector(".btn--left"),
// 	next: document.querySelector(".btn--right")
// };
// const cardsContainerEl = document.querySelector(".cards__wrapper");
// const appBgContainerEl = document.querySelector(".app__bg");

// const cardInfosContainerEl = document.querySelector(".info__wrapper");

// buttons.next.addEventListener("click", () => swapCards("right"));

// buttons.prev.addEventListener("click", () => swapCards("left"));

// function swapCards(direction) {
// 	const currentCardEl = cardsContainerEl.querySelector(".current--card");
// 	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
// 	const nextCardEl = cardsContainerEl.querySelector(".next--card");

// 	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
// 	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
// 	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

// 	changeInfo(direction);
// 	swapCardsClass();

// 	removeCardEvents(currentCardEl);

// 	function swapCardsClass() {
// 		currentCardEl.classList.remove("current--card");
// 		previousCardEl.classList.remove("previous--card");
// 		nextCardEl.classList.remove("next--card");

// 		currentBgImageEl.classList.remove("current--image");
// 		previousBgImageEl.classList.remove("previous--image");
// 		nextBgImageEl.classList.remove("next--image");

// 		currentCardEl.style.zIndex = "50";
// 		currentBgImageEl.style.zIndex = "-2";

// 		if (direction === "right") {
// 			previousCardEl.style.zIndex = "20";
// 			nextCardEl.style.zIndex = "30";

// 			nextBgImageEl.style.zIndex = "-1";

// 			currentCardEl.classList.add("previous--card");
// 			previousCardEl.classList.add("next--card");
// 			nextCardEl.classList.add("current--card");

// 			currentBgImageEl.classList.add("previous--image");
// 			previousBgImageEl.classList.add("next--image");
// 			nextBgImageEl.classList.add("current--image");
// 		} else if (direction === "left") {
// 			previousCardEl.style.zIndex = "30";
// 			nextCardEl.style.zIndex = "20";

// 			previousBgImageEl.style.zIndex = "-1";

// 			currentCardEl.classList.add("next--card");
// 			previousCardEl.classList.add("current--card");
// 			nextCardEl.classList.add("previous--card");

// 			currentBgImageEl.classList.add("next--image");
// 			previousBgImageEl.classList.add("current--image");
// 			nextBgImageEl.classList.add("previous--image");
// 		}
// 	}
// }

// function changeInfo(direction) {
// 	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
// 	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
// 	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

// 	gsap
// 		.timeline()
// 		.to([buttons.prev, buttons.next], {
// 			duration: 0.2,
// 			opacity: 0.5,
// 			pointerEvents: "none"
// 		})
// 		.to(
// 			currentInfoEl.querySelectorAll(".text"),
// 			{
// 				duration: 0.4,
// 				stagger: 0.1,
// 				translateY: "-120px",
// 				opacity: 0
// 			},
// 			"-="
// 		)
// 		.call(() => {
// 			swapInfosClass(direction);
// 		})
// 		.call(() => initCardEvents())
// 		.fromTo(
// 			direction === "right"
// 				? nextInfoEl.querySelectorAll(".text")
// 				: previousInfoEl.querySelectorAll(".text"),
// 			{
// 				opacity: 0,
// 				translateY: "40px"
// 			},
// 			{
// 				duration: 0.4,
// 				stagger: 0.1,
// 				translateY: "0px",
// 				opacity: 1
// 			}
// 		)
// 		.to([buttons.prev, buttons.next], {
// 			duration: 0.2,
// 			opacity: 1,
// 			pointerEvents: "all"
// 		});

// 	function swapInfosClass() {
// 		currentInfoEl.classList.remove("current--info");
// 		previousInfoEl.classList.remove("previous--info");
// 		nextInfoEl.classList.remove("next--info");

// 		if (direction === "right") {
// 			currentInfoEl.classList.add("previous--info");
// 			nextInfoEl.classList.add("current--info");
// 			previousInfoEl.classList.add("next--info");
// 		} else if (direction === "left") {
// 			currentInfoEl.classList.add("next--info");
// 			nextInfoEl.classList.add("previous--info");
// 			previousInfoEl.classList.add("current--info");
// 		}
// 	}
// }

// function updateCard(e) {
// 	const card = e.currentTarget;
// 	const box = card.getBoundingClientRect();
// 	const centerPosition = {
// 		x: box.left + box.width / 2,
// 		y: box.top + box.height / 2
// 	};
// 	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
// 	gsap.set(card, {
// 		"--current-card-rotation-offset": `${angle}deg`
// 	});
// 	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
// 	gsap.set(currentInfoEl, {
// 		rotateY: `${angle}deg`
// 	});
// }

// function resetCardTransforms(e) {
// 	const card = e.currentTarget;
// 	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
// 	gsap.set(card, {
// 		"--current-card-rotation-offset": 0
// 	});
// 	gsap.set(currentInfoEl, {
// 		rotateY: 0
// 	});
// }

// function initCardEvents() {
// 	const currentCardEl = cardsContainerEl.querySelector(".current--card");
// 	currentCardEl.addEventListener("pointermove", updateCard);
// 	currentCardEl.addEventListener("pointerout", (e) => {
// 		resetCardTransforms(e);
// 	});
// }

// initCardEvents();

// function removeCardEvents(card) {
// 	card.removeEventListener("pointermove", updateCard);
// }

// function init() {
// 	let tl = gsap.timeline();

// 	tl
// 		.to(cardsContainerEl.children, {
// 			delay: 0.15,
// 			duration: 0.5,
// 			stagger: {
// 				ease: "power4.inOut",
// 				from: "right",
// 				amount: 0.1
// 			},
// 			"--card-translateY-offset": "0%"
// 		})
// 		.to(
// 			cardInfosContainerEl
// 				.querySelector(".current--info")
// 				.querySelectorAll(".text"),
// 			{
// 				delay: 0.5,
// 				duration: 0.4,
// 				stagger: 0.1,
// 				opacity: 1,
// 				translateY: 0
// 			}
// 		)
// 		.to(
// 			[buttons.prev, buttons.next],
// 			{
// 				duration: 0.4,
// 				opacity: 1,
// 				pointerEvents: "all"
// 			},
// 			"-=0.4"
// 		);
// }

// const waitForImages = () => {
// 	const images = [...document.querySelectorAll("img")];
// 	const totalImages = images.length;
// 	let loadedImages = 0;
// 	const loaderEl = document.querySelector(".loader span");

// 	gsap.set(cardsContainerEl.children, {
// 		"--card-translateY-offset": "100vh"
// 	});
// 	gsap.set(
// 		cardInfosContainerEl
// 			.querySelector(".current--info")
// 			.querySelectorAll(".text"),
// 		{
// 			translateY: "40px",
// 			opacity: 0
// 		}
// 	);
// 	gsap.set([buttons.prev, buttons.next], {
// 		pointerEvents: "none",
// 		opacity: "0"
// 	});

// 	images.forEach((image) => {
// 		imagesLoaded(image, (instance) => {
// 			if (instance.isComplete) {
// 				loadedImages++;
// 				let loadProgress = loadedImages / totalImages;

// 				gsap.to(loaderEl, {
// 					duration: 1,
// 					scaleX: loadProgress,
// 					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`
// 				});

// 				if (totalImages == loadedImages) {
// 					gsap
// 						.timeline()
// 						.to(".loading__wrapper", {
// 							duration: 0.8,
// 							opacity: 0,
// 							pointerEvents: "none"
// 						})
// 						.call(() => init());
// 				}
// 			}
// 		});
// 	});
// };

// waitForImages();

// console.clear();

// gsap.registerPlugin(ScrollTrigger);

// const additionalY = { val: 0 };
// let additionalYAnim;
// let offset = 0;
// const cols = gsap.utils.toArray(".col");

// cols.forEach((col, i) => {
//   const images = col.childNodes;

//   // DUPLICATE IMAGES FOR LOOP
//   images.forEach((image) => {
//     var clone = image.cloneNode(true);
//     col.appendChild(clone);
//   });

//   // SET ANIMATION
//   images.forEach((item) => {
//     let columnHeight = item.parentElement.clientHeight;
//     let direction = i % 2 !== 0 ? "+=" : "-="; // Change direction for odd columns

//     gsap.to(item, {
//       y: direction + Number(columnHeight / 2),
//       duration: 20,
//       repeat: -1,
//       ease: "none",
//       modifiers: {
//         y: gsap.utils.unitize((y) => {
//           if (direction == "+=") {
//             offset += additionalY.val;
//             y = (parseFloat(y) - offset) % (columnHeight * 0.5);
//           } else {
//             offset += additionalY.val;
//             y = (parseFloat(y) + offset) % -Number(columnHeight * 0.5);
//           }

//           return y;
//         })
//       }
//     });
//   });
// });

