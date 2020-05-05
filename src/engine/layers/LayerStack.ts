import { Layer } from "./Layer";

type Layers = {
    [name: string]: Layer
}

export class LayerStack {
    private _layers: Layers = {}

    addLayer(name: string, layer: Layer) {
        this._layers[name] = layer;
    }

    removeLayer(name: string) {
        delete this._layers[name];
    }

    update(deltaTime: number) {
        Object.keys(this._layers)
            .forEach(name => this._layers[name].update(deltaTime));
    }

    renderer(graphics: CanvasRenderingContext2D) {
        Object.keys(this._layers)
            .forEach(name => this._layers[name].renderer(graphics));
    }
}
