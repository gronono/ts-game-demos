// import { Pad } from "./Pad";
// import { Ball } from "./Ball";
// import { GameLoop } from "./engine/GameLoop";

import { BouncingBall } from "./bouncing-ball/BouncingBall";

// const canvas = document.createElement("canvas");
// document.body.appendChild(canvas);
// canvas.width = 800;
// canvas.height = 600;

// const graphics = canvas.getContext("2d");

// const MARGIN = 50;
// const leftPad = new Pad(MARGIN, canvas.height / 2);
// const rightPad = new Pad(canvas.width - MARGIN, canvas.height / 2);
// const ball = new Ball(canvas.width / 2, canvas.height / 2);

// const entities = [ leftPad, rightPad, ball ];

// const draw = (deltaTime: number) => {
//     graphics.fillStyle = "black";
//     graphics.fillRect(0, 0, canvas.width, canvas.height);
//     entities.forEach(e => e.update(deltaTime))
//     entities.forEach(e => e.draw(graphics));  
// }
// const gameLoop = new GameLoop(draw);
// gameLoop.start();

const game = new BouncingBall();
game.start();
