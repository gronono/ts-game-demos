import { Entity } from "./Entity";
import { Side } from "./math/Side";
import { Circle } from "./math/shape/Circle";
import { Rectangle } from "./math/shape/Rectangle";
import { Shape } from "./math/shape/Shape";

type colliderFct<S1 extends Shape, S2 extends Shape> = (s1: S1, s2: S2) => boolean;

interface ShapeCollider<S1 extends Shape, S2 extends Shape> {
    checkTop(s1: S1, s2: S2): boolean;
    checkBottom(s1: S1, s2: S2): boolean;
    checkLeft(s1: S1, s2: S2): boolean;
    checkRight(s1: S1, s2: S2): boolean;
}

class ReverseCollider<S1 extends Shape, S2 extends Shape> implements ShapeCollider<S2, S1> {
    constructor(private delegate: ShapeCollider<S1, S2>) {}
    
    checkTop(s1: S2, s2: S1): boolean {
        return this.delegate.checkTop(s2, s1);
    }

    checkBottom(s1: S2, s2: S1): boolean {
        return this.delegate.checkBottom(s2, s1);
    }

    checkLeft(s1: S2, s2: S1): boolean {
        return this.delegate.checkLeft(s2, s1);
    }

    checkRight(s1: S2, s2: S1): boolean {
        return this.delegate.checkRight(s2, s1);
    }
}

class CircleRectangleCollider implements ShapeCollider<Circle, Rectangle> {
    checkTop(s1: Circle, s2: Rectangle): boolean {
        const y1 = s1.center.y - s1.radius;
        const y2 = s1.center.y + s1.radius;
        const top = s2.y;
        return y1 <= top && top <= y2;
    }

    checkBottom(s1: Circle, s2: Rectangle): boolean {
        const y1 = s1.center.y - s1.radius;
        const y2 = s1.center.y + s1.radius;
        const bottom = s2.y + s2.height;
        return y1 <= bottom && bottom <= y2;
    }

    checkLeft(s1: Circle, s2: Rectangle): boolean {
        const x1 = s1.center.x - s1.radius;
        const x2 = s1.center.x + s1.radius;
        const left = s2.x;
        return x1 <= left && left <= x2;
    }

    checkRight(s1: Circle, s2: Rectangle): boolean {
        const x1 = s1.center.x - s1.radius;
        const x2 = s1.center.x + s1.radius;
        const right = s2.x + s2.width;
        return x1 <= right && right <= x2;
    }
}

const SHAPES_COLLIDERS = [
    {
        "s1": Circle,
        "s2": Rectangle,
        "collider": new CircleRectangleCollider()
    }
]

export class Collider {

    constructor(
        private entities: Array<Entity>) {
    }

    check() {
        for (let i = 0; i < this.entities.length / 2; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                this._checkCollision(this.entities[i], this.entities[j]);
            }
        }
    }

    _checkCollision(e1: Entity, e2: Entity) {
        const s1 = e1.collisionShape;
        const s2 = e2.collisionShape;
        const collider = this._findCollider(s1, s2);
        Side.values().forEach(side => {
            const checkFct = this._findCheckFct(collider, side).bind(collider);
            if (checkFct(s1, s2)) {
                e1.collides(e2, side);
                e2.collides(e1, side);
            }
        });
    }

    _findCollider(s1: Shape, s2: Shape): ShapeCollider<Shape, Shape> {
        const shapeCollider = SHAPES_COLLIDERS
            .find(collider => 
                (s1 instanceof collider.s1 && s2 instanceof collider.s2) || 
                (s1 instanceof collider.s2 && s2 instanceof collider.s1));
        if (s1 instanceof shapeCollider.s1) {
            return shapeCollider.collider;
        }
        return new ReverseCollider(shapeCollider.collider);
    }

    _findCheckFct<S1 extends Shape, S2 extends Shape>(collider: ShapeCollider<S1, S2>, side: Side): colliderFct<S1, S2> {
        switch (side) {
            case Side.TOP:
                return collider.checkTop;
            case Side.BOTTOM:
                return collider.checkBottom;
            case Side.LEFT:
                return collider.checkLeft;
            case Side.RIGHT:
                return collider.checkRight;
        }
    }
}
