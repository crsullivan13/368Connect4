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

    context.globalCompositeOperation = 'source-over';

    context.fillStyle = "blue";
    context.fillRect(120, 150, 740, 635);

    context.globalCompositeOperation = 'destination-out';

    let xInit = 175;
    let yInit = 205;
    for(let i = 0; i < 6; i++) {
        xInit = 175;
        for(let j = 0; j < 7; j++) {
            context.fillStyle = "black";
            context.beginPath();
            context.arc(xInit, yInit, 50, 0 , 2 * Math.PI);
            context.stroke();
            context.fill();
            xInit += 105;
        }
        yInit += 105;
    }
    

    tick();
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    splat();
})