import { Position } from "../Position";
import { Shape } from "./Shape";
import { Point } from "./Point";

export class Circle implements Shape {

    constructor(
        public readonly position: Position,
        public readonly radius: number) {
    }

    get center() {
        return Point.fromPosition(this.position);
    }

    draw(graphics: CanvasRenderingContext2D) {
        graphics.beginPath();
        graphics.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        graphics.stroke();
        graphics.closePath();
    }
}
