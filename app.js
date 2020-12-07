"use strict";

const ball = document.querySelector("#main-ball");
const instruction = document.querySelector("#instruction");
const button = document.querySelector("#primary-btn");
const sittingDog = document.querySelector("#dog-sitting");
const standingDog = document.querySelector("#dog-standing");

let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;

const dragBall = (e) => {
  e = e;
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

// On desktop
ball.addEventListener("mousedown", (e) => {
  instruction.style.display = "none";
  e = e;
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
  e = e;
  e.preventDefault();
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  // call a function whenever the cursor moves:
  document.addEventListener("touchmove", dragBall);
  document.addEventListener("touchend", () => {
    document.removeEventListener("touchmove", dragBall);
  });
});
