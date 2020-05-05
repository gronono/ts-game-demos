import { Game } from "./Game";
import { GameEngine } from "./GameEngine";

const UPDATE_INTERVAL = 1/60;

export class GameLoop {
    private _animationFramehandle: number;
    private _accumulatedTime = 0;
    private _lastTime: number = 0;
    private _fps: number;

    private _animationFrameCallBack = (time: number) => this._loop(time);

    constructor(private engine: GameEngine) {}

    start() {
        this._animationFramehandle = requestAnimationFrame(this._animationFrameCallBack);
    }

    stop() {
        cancelAnimationFrame(this._animationFramehandle);
    }

    private _loop(time: number) {
        const deltaTime = (time - this._lastTime) / 1000;
        this._accumulatedTime += deltaTime;
        this._fps = Math.round(1 /  deltaTime);

        while (this._accumulatedTime > UPDATE_INTERVAL) {
            this.engine.update(UPDATE_INTERVAL);
            this._accumulatedTime -= UPDATE_INTERVAL;
        }
        this.engine.renderer();
        
        this._lastTime = time;
        this._animationFramehandle = requestAnimationFrame(this._animationFrameCallBack);
    }

    get fps() {
        return this._fps;
    }
}
