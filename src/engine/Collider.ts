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

class ReverseCollider<S2 extends Shape, S1 extends Shape> implements ShapeCollider<S1, S2> {
    constructor(private delegate: ShapeCollider<S2, S1>) {}
    
    checkTop(s1: S1, s2: S2): boolean {
        return this.delegate.checkTop(s2, s1);
    }

    checkBottom(s1: S1, s2: S2): boolean {
        return this.delegate.checkBottom(s2, s1);
    }

    checkLeft(s1: S1, s2: S2): boolean {
        return this.delegate.checkLeft(s2, s1);
    }

    checkRight(s1: S1, s2: S2): boolean {
        return this.delegate.checkRight(s2, s1);
    }
}

class CircleCircleCollider implements ShapeCollider<Circle, Circle> {
    checkTop(s1: Circle, s2: Circle): boolean {
        throw new Error("Method not implemented.");
    }

    checkBottom(s1: Circle, s2: Circle): boolean {
        throw new Error("Method not implemented.");
    }

    checkLeft(s1: Circle, s2: Circle): boolean {
        throw new Error("Method not implemented.");
    }

    checkRight(s1: Circle, s2: Circle): boolean {
        throw new Error("Method not implemented.");
    }
}

class RectangleRectangleCollider implements ShapeCollider<Rectangle, Rectangle> {
    checkTop(s1: Rectangle, s2: Rectangle): boolean {
        throw new Error("Method not implemented.");
    }

    checkBottom(s1: Rectangle, s2: Rectangle): boolean {
        throw new Error("Method not implemented.");
    }

    checkLeft(s1: Rectangle, s2: Rectangle): boolean {
        throw new Error("Method not implemented.");
    }

    checkRight(s1: Rectangle, s2: Rectangle): boolean {
        throw new Error("Method not implemented.");
    }
}

class CircleRectangleCollider implements ShapeCollider<Circle, Rectangle> {
    checkTop(s1: Circle, s2: Rectangle): boolean {
        const top = s2.y;
        return s1.center.y - s1.radius <= top
            && top <= s1.center.y + s1.radius
            && s2.x <= s1.center.x + s1.radius
            && s2.x + s2.width >= s1.center.x - s1.radius;
    }

    checkBottom(s1: Circle, s2: Rectangle): boolean {
        const bottom = s2.y + s2.height;
        return s1.center.y - s1.radius <= bottom
            && bottom <= s1.center.y + s1.radius
            && s2.x <= s1.center.x + s1.radius
            && s2.x + s2.width >= s1.center.x - s1.radius;
    }

    checkLeft(s1: Circle, s2: Rectangle): boolean {
        const left = s2.x;
        return s1.center.x - s1.radius <= left
            && left <= s1.center.x + s1.radius
            && s2.y <= s1.center.y + s1.radius
            && s2.y + s2.height >= s1.center.y - s1.radius;
    }

    checkRight(s1: Circle, s2: Rectangle): boolean {
        const right = s2.x + s2.width;
        return s1.center.x - s1.radius <= right
            && right <= s1.center.x + s1.radius
            && s2.y <= s1.center.y + s1.radius
            && s2.y + s2.height >= s1.center.y - s1.radius;
    }
}

type ColliderDef<S1 extends Shape, S2 extends Shape> = {
    s1: S1,
    s2: S2,
    collider: ShapeCollider<S1, S2>
}
const SHAPES_COLLIDERS: Array<ColliderDef<any, any>> = [
    {
        "s1": Circle,
        "s2": Rectangle,
        "collider": new CircleRectangleCollider()
    }, {
        "s1": Circle,
        "s2": Circle,
        "collider": new CircleCircleCollider()
    }, {
        "s1": Rectangle,
        "s2": Rectangle,
        "collider": new RectangleRectangleCollider()
    }
]

export class Collider {

    constructor(
        private entities: Array<Entity>) {
    }

    check() {
        for (let i = 0; i < this.entities.length; i++) {
            const e1 = this.entities[i];
            for (let j = 0; j < this.entities.length; j++) {
                if (i != j) {
                    this._checkCollision(e1, this.entities[j]);
                }
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
            }
        });
    }

    _findCollider<S1 extends Shape, S2 extends Shape>(s1: S1, s2: S2): ShapeCollider<S1, S2> {
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
