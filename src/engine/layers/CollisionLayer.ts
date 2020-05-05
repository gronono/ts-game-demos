import { Layer } from "./Layer";
import { Entity } from "../Entity";

export class CollisionLayer implements Layer {

    constructor(private entities: Array<Entity>) {}

    update(deltaTime: number): void {
    }

    renderer(graphics: CanvasRenderingContext2D): void {
        graphics.strokeStyle = "red";
        graphics.fillStyle = "red";
        this.entities
            .map(entity => entity.collisionShape)
            .forEach(shape => shape.draw(graphics));
    }


}
