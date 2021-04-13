let canvas;
let context;

let chip = {
    color: 'white',
    centerX: 20,
    centerY: 20,
}

let tick = () => {
    window.requestAnimationFrame(splat);
}

let splat = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "blue";
    context.fillRect(120, 150, 740, 635);

    tick();
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    splat();
})