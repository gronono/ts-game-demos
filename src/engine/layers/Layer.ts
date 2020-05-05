export interface Layer {
    update(deltaTime: number): void;
    renderer(graphics: CanvasRenderingContext2D): void;
}
