"use strict";

const ball = document.querySelector("#main-ball");
const instruction = document.querySelector("#instruction");
const button = document.querySelector("#primary-btn");
const sittingDog = document.querySelector("#dog-sitting");
const standingDog = document.querySelector("#dog-standing");
const dogContainer = document.querySelector(".dog-container");
const main = document.querySelector("main");
const body = document.querySelector("body");
const backgroundColor = [
  "linear-gradient(162.61deg, #B0F3F1 -0.68%, #FFCFDF 100%)",
  "linear-gradient(326deg, #F6FC9C 0%, #EAF818 74%)",
  "linear-gradient(to top left, #a8ceff 0%, #ff8ab3 81%)",
  "linear-gradient(to bottom right, #a8ffae 0%, #fdff8a 81%)",
  "linear-gradient(315deg, #f39f86 0%, #f9d976 74%)",
];

const speedX = window.innerWidth * 0.005;
const speedY = window.innerHeight * 0.005;

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
let squeekable = true;
let active = false;
let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;

//change background on load
window.addEventListener("load", () => {
  body.style.background =
    backgroundColor[Math.floor(Math.random() * backgroundColor.length)];
});

//make the ball draggable
const dragBall = (e) => {
  e.preventDefault();
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  // set the element's new position and stay inside the window
  console.log(ball.offsetTop - pos2);
  console.log(window.innerHeight);
  ball.style.top =
    ball.offsetTop - pos2 > 0
      ? ball.offsetTop - pos2 < window.innerHeight - 50
        ? ball.offsetTop - pos2 + "px"
        : `${window.innerHeight - 50}px`
      : "0px";
  ball.style.left =
    ball.offsetLeft - pos1 > 0
      ? ball.offsetLeft - pos1 < window.innerWidth - 50
        ? ball.offsetLeft - pos1 + "px"
        : `${window.innerWidth - 50}px`
      : "0px";
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
  // toySquek.play();
  toySquek.src = "/assets/toy.mp3";
  let movingX = false;
  let movingY = false;
  if (!active) {
    active = true;
    setInterval(() => {
      const ballPosTop = ball.offsetTop;
      const ballPosLeft = ball.offsetLeft;

      const dogPosTop = dogContainer.offsetTop;
      const dogPosLeft = dogContainer.offsetLeft;

      if (ballPosLeft - dogPosLeft > 40 || ballPosLeft - dogPosLeft < -30) {
        sittingDog.style.display = "none";
        standingDog.style.display = "block";
        dogContainer.style.left =
          ballPosLeft < dogPosLeft
            ? `${dogPosLeft - speedX}px`
            : `${dogPosLeft + speedX}px`;
        movingX = true;
      } else {
        movingX = false;
      }
      if (ballPosTop - dogPosTop > 30 || ballPosTop - dogPosTop < -30) {
        sittingDog.style.display = "none";
        standingDog.style.display = "block";
        dogContainer.style.top =
          ballPosTop < dogPosTop
            ? `${dogPosTop - speedY}px`
            : `${dogPosTop + speedY}px`;
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
      if (ballPosLeft < dogPosLeft) {
        dogContainer.style.transform = "rotateY(180deg)";
      } else {
        dogContainer.style.transform = "rotateY(0deg)";
      }
    }, 30);
  }
};

//create the falling tennis balls and randomize color, position, duration
const rain = () => {
  const rainArray = [];
  for (let index = 0; index < 150; index++) {
    const colorfulBall = document.createElement("div");
    colorfulBall.classList.add("tennis-ball");
    colorfulBall.classList.add("small-ball");
    colorfulBall.style.background =
      randomColors[Math.floor(Math.random() * randomColors.length)];
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
