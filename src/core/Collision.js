export class Collision {

    constructor(figure, boundry) {
        this.boundry = boundry;
        this.figure = figure;
    }

    isOnRightBound() {
        return (this.figure.x + this.figure.width) >= this.boundry.right;
    };

    isOnLeftBound() {
        return this.figure.x <= this.boundry.left;
    };

}
