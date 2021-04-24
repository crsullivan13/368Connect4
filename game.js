let canvas;
let context;
let xInit;
let yInit;
let color;
let turn = 'r';
let winner;

let model = {
    board : [[],[],[],[],[],[]],
}

//fills in the model
for(let i = 0; i < 6; i ++) {
    for (let j = 0; j < 7; j++) {
        model.board[i][j] = 'w';
    }
}

console.log(model.board);

let tick = () => {
    window.requestAnimationFrame(splat);
}

let roundMeX = (x) => {
    return Math.ceil((x - 134)/105) - 1;
}

let roundMeY = (y) => {
    return Math.ceil((y - 50)/105) - 1;
}

//check win
//check from last chip dropped, go clockwise starting vertically
//basically check in one direction until white or other color, keep track of count, then go
//back to the og chip and go the other direction, then switch to new axis
//need to check for out of bounds
//i think mutiple recursive funcs
//one for cols, one for rows, one for left diag, one for right diag

let checkWin = (row, col) => {
    console.log(row + " " + col + " ye");
    let count = 1;
    for(let i = 0; i < 4; i++) {
        if(i+row+1 <= 5) {
            if(turn === model.board[i+row+1][col]) {
                count++;
            }
        }

        if(row-i-1 >= 0) {
            if(turn === model.board[row-i-1][col]) {
                count++;
            }
        }

        if(count === 4) {
            winner = turn;
            console.log(winner + "WON vert");
            break;
        }
    }

    count = 1;
    for(let i = 0; i < 4; i++) {
        if(i+col+1 <= 6) {
            if(turn === model.board[row][i+col+1]) {
                count++;
            }
        }

        if(col-i-1 >= 0) {
            if(turn === model.board[row][col-i-1]) {
                count++;
            }
        }

        console.log(count);
        if(count === 4) {
            winner = turn;
            console.log(winner + "WON horiz");
            break;
        }
    }

}

document.addEventListener("click" , e => {
    const i = roundMeX(e.x);
    const j = roundMeY(e.y);
    console.log(i + " " + j);

    if(i < 0 || i > 6) {return}
    if(j != 0) {return}

    context.globalCompositeOperation = 'source-over';
    //context.fillStyle = "red";

    for(let k = 0; k < 6; k++) {
        if(model.board[5-k][i] === 'w') {
            console.log("Color change")
            model.board[5-k][i] = turn;
            (turn === 'r') ? context.fillStyle = "red" : context.fillStyle = "yellow";
            console.log(model.board[k][i] + " " + k + " " + i);
            context.beginPath();
            context.arc((i*105) + 175 , 730-(k*105) , 50 , 0 , 2 * Math.PI);
            context.stroke();
            context.fill();
            checkWin(5-k, i);
            (turn === 'r') ? turn='y' : turn = 'r';
            console.log(turn);
            break;
        }
    }
    //console.log(model.board);
})

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
    

    //tick();
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    splat();
})