import { Position } from "./math/Position";
import { Shape } from "./math/shape/Shape";
import { Side } from "./math/Side";

export interface Entity {
    readonly collisionShape: Shape;
    
    renderer(graphics: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
    collides(other: Entity, side: Side): void;
}
