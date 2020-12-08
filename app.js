"use strict";

const ball = document.querySelector("#main-ball");
const instruction = document.querySelector("#instruction");
const button = document.querySelector("#primary-btn");
const sittingDog = document.querySelector("#dog-sitting");
const standingDog = document.querySelector("#dog-standing");
const dogContainer = document.querySelector(".dog-container");
const main = document.querySelector("main");
const randomColors = [
  "hotpink",
  "yellow",
  "blue",
  "crimson",
  "mediumorchid",
  "lightgreen",
];
const sound = new Audio();
sound.src = "/assets/yay.mp3";
const toySquek = new Audio();
toySquek.src = "/assets/toy.mp3";
let squeekable = true;

let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;

//make the ball draggable
const dragBall = (e) => {
  e.preventDefault();
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  // set the element's new position:
  ball.style.top = ball.offsetTop - pos2 + "px";
  ball.style.left = ball.offsetLeft - pos1 + "px";
};

//make the ball draggable on mobile
const dragBallMobile = (e) => {
  pos1 = pos3 - e.changedTouches[0].clientX;
  pos2 = pos4 - e.changedTouches[0].clientY;
  pos3 = e.changedTouches[0].clientX;
  pos4 = e.changedTouches[0].clientY;
  ball.style.top = ball.offsetTop - pos2 + "px";
  ball.style.left = ball.offsetLeft - pos1 + "px";
};
//make the dog chase after the ball
const activateDog = () => {
  let movingX = false;
  let movingY = false;
  setInterval(() => {
    const ballPosTop = ball.offsetTop;
    const ballPosLeft = ball.offsetLeft;

    const dogPosTop = dogContainer.offsetTop;
    const dogPosLeft = dogContainer.offsetLeft;

    if (ballPosLeft - dogPosLeft > 30 || ballPosLeft - dogPosLeft < -30) {
      sittingDog.style.display = "none";
      standingDog.style.display = "block";
      dogContainer.style.left =
        ballPosLeft < dogPosLeft
          ? `${dogPosLeft - 3}px`
          : `${dogPosLeft + 3}px`;
      movingX = true;
    } else {
      movingX = false;
    }
    if (ballPosTop - dogPosTop > 30 || ballPosTop - dogPosTop < -30) {
      sittingDog.style.display = "none";
      standingDog.style.display = "block";
      dogContainer.style.top =
        ballPosTop < dogPosTop ? `${dogPosTop - 3}px` : `${dogPosTop + 3}px`;
      movingY = true;
    } else {
      movingY = false;
    }
    if (!movingX && !movingY) {
      if (standingDog.style.display === "block") {
        if (squeekable) {
          toySquek.pause();
          toySquek.currentTime = 0;
          toySquek.play();
          squeekable = false;
          setTimeout(() => {
            squeekable = true;
          }, 2000);
        }
      }
      sittingDog.style.display = "block";
      standingDog.style.display = "none";
    }
  }, 30);
};

//create the falling tennis balls and randomize color, position, duration
const rain = () => {
  const rainArray = [];
  for (let index = 0; index < 150; index++) {
    const colorfulBall = document.createElement("div");
    colorfulBall.classList.add("tennis-ball");
    colorfulBall.classList.add("small-ball");
    colorfulBall.style.background =
      randomColors[Math.floor(Math.random() * Math.floor(5))];
    colorfulBall.style.top = "-25px";
    colorfulBall.style.left = `${Math.floor(
      Math.random() * Math.floor(window.innerWidth)
    )}px`;
    colorfulBall.style.animationDelay = `${Math.random() * 1.9}s`;
    colorfulBall.style.animationDuration = `${
      (Math.random() * 1000) / 8 + 1300
    }ms`;
    main.appendChild(colorfulBall);
    rainArray.push(colorfulBall);
  }
  setTimeout(() => {
    rainArray.forEach((el) => {
      el.remove();
    });
  }, 6000);
};
button.addEventListener("click", () => {
  rain();
  sound.play();
});
button.addEventListener("touchstart", () => {
  rain();
  sound.play();
});

// on desktop
ball.addEventListener("mousedown", (e) => {
  instruction.style.display = "none";
  e.preventDefault();
  activateDog();
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  // call a function whenever the cursor moves:
  document.addEventListener("mousemove", dragBall);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", dragBall);
  });
});

//on mobile
ball.addEventListener("touchstart", (e) => {
  instruction.style.display = "none";
  pos3 = e.clientX;
  pos4 = e.clientY;
  activateDog();
  document.addEventListener("touchmove", dragBallMobile);
  document.addEventListener("touchend", () => {
    document.removeEventListener("touchmove", dragBallMobile);
  });
});
