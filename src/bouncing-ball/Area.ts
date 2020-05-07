import { Entity } from "../engine/Entity";
import { Rectangle } from "../engine/math/shape/Rectangle";
import { Side } from "../engine/math/Side";

export class Area implements Entity {
    public readonly collisionShape: Rectangle;

    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly width: number,
        public readonly height: number
    ) {
        this.collisionShape = new Rectangle(x, y, width, height);
    }

    renderer(graphics: CanvasRenderingContext2D): void {
    }

    update(deltaTime: number): void {
    }

    collides(other: Entity, side: Side): void {
        console.log(this, "collides with ", other, side);
    }
    
}
