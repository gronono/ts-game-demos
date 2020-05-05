import { Position } from '../engine/math/Position';
import { Entity } from '../engine/Entity';
import { Circle } from '../engine/math/shape/Circle';
import { Side } from '../engine/math/Side';
import { Area } from './Area';

export class Ball implements Entity {
    private _radius = 20;
    position: Position;
    private _velocity = {
        x: (Math.random() > 0.5 ? 1 : -1) * 100,
        y: (Math.random() > 0.5 ? 1 : -1) * 100,
    }

    constructor(x: number, y: number) {
        this.position = {x, y};
    }

    update(deltaTime: number): void {
        this.position.x += this._velocity.x * deltaTime;
        this.position.y += this._velocity.y * deltaTime;
    }

    renderer(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = "white";
        this.collisionShape.draw(graphics);
        graphics.fill();
    }

    get collisionShape() {
        return new Circle(this.position, this._radius);
    }
    
    collides(other: Entity, side: Side): void {
        console.log("collides with ", other, side);
        if (other instanceof Area) {
            if (side == Side.RIGHT || side == Side.LEFT) {
                this._velocity.x = this._velocity.x * -1;
            } else if (side == Side.TOP || side == Side.BOTTOM) {
                this._velocity.y = this._velocity.y * -1;
            }
        }
    }
}
