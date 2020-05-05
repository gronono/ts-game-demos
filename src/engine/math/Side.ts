export class Side {
    static LEFT = new Side("LEFT");
    static TOP = new Side("TOP");
    static RIGHT = new Side("RIGHT");
    static BOTTOM = new Side("BOTTOM");

    constructor(
        public readonly name: string) {}

    static values(): Array<Side> {
        return [ Side.LEFT, Side.TOP, Side.RIGHT, Side.BOTTOM ];
    }
}
