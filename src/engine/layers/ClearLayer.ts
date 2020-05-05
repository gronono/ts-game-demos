import { Layer } from "./Layer";

export class ClearLayer implements Layer {

    update(deltaTime: number): void {
    }

    renderer(graphics: CanvasRenderingContext2D): void {
        graphics.beginPath();
        graphics.fillStyle = "black";
        graphics.fillRect(
            0, 0,
            graphics.canvas.width, graphics.canvas.height);
        graphics.closePath();
    }

}
