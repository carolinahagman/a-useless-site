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
  // calculate the new cursor position:
  pos1 = pos3 - e.changedTouches[0].clientX;
  pos2 = pos4 - e.changedTouches[0].clientY;
  pos3 = e.changedTouches[0].clientX;
  pos4 = e.changedTouches[0].clientY;
  // set the element's new position:
  ball.style.top = ball.offsetTop - pos2 + "px";
  ball.style.left = ball.offsetLeft - pos1 + "px";
};

//create the falling tennis balls and randomize color, position, duration
const rain = () => {
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
    colorfulBall.style.animationDelay = `${Math.random() * 3}s`;
    colorfulBall.style.animationDuration = `${Math.random() + 3}s`;
    main.appendChild(colorfulBall);
  }
};
// On desktop
ball.addEventListener("mousedown", (e) => {
  instruction.style.display = "none";
  e.preventDefault();
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  // call a function whenever the cursor moves:
  document.addEventListener("mousemove", dragBall);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", dragBall);
  });
});

//On mobile
ball.addEventListener("touchstart", (e) => {
  instruction.style.display = "none";
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  // call a function whenever the cursor moves:
  document.addEventListener("touchmove", dragBallMobile);
  document.addEventListener("touchend", () => {
    document.removeEventListener("touchmove", dragBallMobile);
  });
});

button.addEventListener("click", rain);
button.addEventListener("touchstart", rain);
