import { Layer } from "./Layer";
import { GameEngine } from "../GameEngine";

type FpsSupplier = () => number;

export class FpsLayer implements Layer {
    constructor(private fpsSupplier: FpsSupplier, private offset = {
        x: -50,
        y: 16
    }) {}

    update(deltaTime: number): void {
    }

    renderer(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = "white";
        graphics.font = '16px';
        graphics.fillText("FPS: " + this.fpsSupplier(), graphics.canvas.width + this.offset.x, this.offset.y);
    }

}
