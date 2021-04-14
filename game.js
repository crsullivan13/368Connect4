let canvas;
let context;
let xInit;
let yInit;

function Chip(x, y) {
    color = 'white';
    centerX = x;
    centerY = y;
}

let model = {
    board : [[],[],[],[],[],[]],
}

xInit = 175;
yInit = 205;

//fills in the model
for(let i = 0; i < 6; i ++) {
    xInit = 175;
    for (let j = 0; j < 7; j++) {
        let temp = new Chip(xInit, yInit);
        model.board[i].push(temp);
        xInit += 105;
    }
    yInit += 105;
}

console.log(model.board);

let tick = () => {
    window.requestAnimationFrame(splat);
}

let splat = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.globalCompositeOperation = 'source-over';

    context.fillStyle = "blue";
    context.fillRect(120, 150, 740, 635);

    xInit = 122;
    yInit = 45;

    for(let i = 0; i < 7; i++) {
        context.fillStyle = "black";
        context.rect(xInit,yInit,105,105);
        context.stroke();
        xInit += 105;
    }

    context.globalCompositeOperation = 'destination-out';

    xInit = 175;
    yInit = 205;
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