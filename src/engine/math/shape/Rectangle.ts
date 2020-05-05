import { Shape } from "./Shape";

export class Rectangle implements Shape {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly width: number,
        public readonly height: number
    ) {}

    draw(graphics: CanvasRenderingContext2D): void {
        graphics.beginPath();
        graphics.rect(this.x, this.y, this.width, this.height);
        graphics.stroke();
        graphics.closePath();
    }
}
