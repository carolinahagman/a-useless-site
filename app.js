const ball = document.querySelector("#main-ball");
const instruction = document.querySelector("#instruction");
const button = document.querySelector("#primary-btn");
const sittingDog = document.querySelector("#dog-sitting");
const standingDog = document.querySelector("#dog-standing");

ball.addEventListener("mousedown", () => {
  instruction.style.display = "none";
});

ball.addEventListener("drag", (event) => {
  console.log(event);
});
