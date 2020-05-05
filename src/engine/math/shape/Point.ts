import { Shape } from "./Shape";
import { Position } from "../Position";

export class Point implements Shape {
    static fromPosition(position: Position) {
        return new Point(position.x, position.y);
    }
    
    constructor(
        public readonly x: number,
        public readonly y: number
    ) {}

    distance(point: Point): number {
        return Math.sqrt(this.squareDistance(point));
    }

    squareDistance(point: Point): number {
        const d1 = point.x - this.x;
        const d2 = point.y - this.y;
        return (d1 * d1) + (d2 * d2);
    }

    draw(graphics: CanvasRenderingContext2D) {
        graphics.fillRect(this.x, this.y, 1, 1);
    }
}
