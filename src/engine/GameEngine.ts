import { Game } from "./Game";
import { GameLoop } from "./GameLoop";
import { LayerStack } from "./layers/LayerStack";
import { Layer } from "./layers/Layer";
import { ClearLayer } from "./layers/ClearLayer";
import { Entity } from "./Entity";
import { Collider as Collider } from "./Collider";
import { EntitiesLayer } from "./layers/EntitiesLayer";
import { FpsLayer } from "./layers/FpsLayer";
import { CollisionLayer } from "./layers/CollisionLayer";

export class GameEngine {
    private _gameLoop: GameLoop;
    private _layers = new LayerStack();
    private _graphics: CanvasRenderingContext2D;
    private _entities: Array<Entity> = [];
    private _collider: Collider;

    constructor(game: Game) {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.width = game.canvasSize.width;
        canvas.height = game.canvasSize.height;
        this._graphics = canvas.getContext("2d");
        this._layers.addLayer("clear", new ClearLayer());
        this._layers.addLayer("entities", new EntitiesLayer(this._entities));
        this._layers.addLayer("collision", new CollisionLayer(this._entities));
        this._layers.addLayer("fps", new FpsLayer(() => this._gameLoop.fps));
        this._collider = new Collider(this._entities);
        this._gameLoop = new GameLoop(this);
    }

    start() {
        this._gameLoop.start();
    }

    stop() {
        this._gameLoop.stop();
    }

    addLayer(name: string, layer: Layer) {
        this._layers.addLayer(name, layer);
    }

    removeLayer(name: string) {
        this._layers.removeLayer(name);
    }

    addEntity(entity: Entity) {
        this._entities.push(entity);
    }

    removeEntity(entity: Entity) {
        this._entities.slice(this._entities.indexOf(entity));
    }
    
    update(deltaTime: number) {
        this._collider.check();
        this._layers.update(deltaTime);
    }

    renderer() {
        this._layers.renderer(this._graphics);
    }
}
