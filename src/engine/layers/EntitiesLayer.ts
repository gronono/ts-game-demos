import { Entity } from "../Entity";
import { Layer } from "./Layer";

export class EntitiesLayer implements Layer {
    constructor(private entities: Array<Entity>) {}
    
    update(deltaTime: number): void {
        this.entities.forEach(entity => entity.update(deltaTime));
    }
    
    renderer(graphics: CanvasRenderingContext2D): void {
        this.entities.forEach(entity => entity.renderer(graphics));
    }
}
