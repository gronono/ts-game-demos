import { Game } from "../engine/Game";
import { GameEngine } from "../engine/GameEngine";
import { Size } from "../engine/math/Size";
import { Ball } from "./Ball";
import { FpsLayer } from "../engine/layers/FpsLayer";
import { Area } from "./Area";

export class BouncingBall implements Game {
    private _gameEngine: GameEngine;
    
    constructor() {
        this._gameEngine = new GameEngine(this);
        const ball = new Ball(this.canvasSize.width / 2, this.canvasSize.height / 2);
        this._gameEngine.addEntity(new Area(10, 10, this.canvasSize.width - 20, this.canvasSize.height - 20));
        this._gameEngine.addEntity(ball);
    }

    start() {
        this._gameEngine.start();
    }

    stop() {
        this._gameEngine.stop();
    }

    get canvasSize(): Size {
        return {
            width: 800,
            height: 600
        };
    }
}
