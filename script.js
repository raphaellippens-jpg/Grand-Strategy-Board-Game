/* ===========================================================
   GRAND STRATEGY DIGITAL
   Version 0.0.1
   File 3 - Part 1

   Engine Initialization
=========================================================== */

"use strict";

/* ===========================================================
   CANVAS
=========================================================== */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/* ===========================================================
   GAME STATE
=========================================================== */

const game = {

    turn: 1,

    currentPlayer: "Blue",

    zoom: 1,

    cameraX: 0,

    cameraY: 0,

    selectedTile: null

};

/* ===========================================================
   BOARD SETTINGS
=========================================================== */

const board = {

    rows: 25,

    cols: 25,

    hexSize: 35

};

/* ===========================================================
   RESIZE
=========================================================== */

function resizeCanvas(){

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    draw();

}

window.addEventListener("resize", resizeCanvas);

/* ===========================================================
   HEX FUNCTIONS
=========================================================== */

function hexToPixel(col, row){

    const size = board.hexSize * game.zoom;

    const x =
        size * Math.sqrt(3) * (col + 0.5 * (row & 1));

    const y =
        size * 1.5 * row;

    return {

        x: x + game.cameraX + 100,

        y: y + game.cameraY + 100

    };

}

function drawHex(x, y, size, color){

    ctx.beginPath();

    for(let i = 0; i < 6; i++){

        const angle =
            (Math.PI / 180) * (60 * i - 30);

        const px =
            x + size * Math.cos(angle);

        const py =
            y + size * Math.sin(angle);

        if(i === 0){

            ctx.moveTo(px, py);

        }else{

            ctx.lineTo(px, py);

        }

    }

    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;

    ctx.stroke();

}

/* ===========================================================
   DRAW BOARD
=========================================================== */

function drawBoard(){

    const size = board.hexSize * game.zoom;

    for(let row = 0; row < board.rows; row++){

        for(let col = 0; col < board.cols; col++){

            const pos = hexToPixel(col, row);

            drawHex(
                pos.x,
                pos.y,
                size,
                "#5d9c47"
            );

        }

    }

}

/* ===========================================================
   MAIN DRAW
=========================================================== */

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawBoard();

}

/* ===========================================================
   UI UPDATE
=========================================================== */

function updateUI(){

    document.getElementById("turnNumber").textContent =
        game.turn;

    document.getElementById("playerInfo").textContent =
        game.currentPlayer;

}

/* ===========================================================
   START
=========================================================== */

resizeCanvas();

updateUI();

console.log("Grand Strategy Digital v0.0.1 started.");
