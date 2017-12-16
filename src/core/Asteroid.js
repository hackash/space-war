export class Asteroid {

    constructor(game, config) {
        this.config = config;
        this.game = game;
        this.speed = 1;
    }

    fallDown() {
        this.texture.y += this.speed;
    }

    getAttackPoint() {
        return (Math.random() * (this.game.renderer.width - 1) + 1);
    }

    init() {
        this.texture = new PIXI.Sprite(PIXI.loader.resources[this.config.resources.asteroid.path].texture);
        Object.assign(this.texture, this.config.resources.asteroid.style, {x: this.getAttackPoint()});
        this.game.stage.addChild(this.texture);
        return this;
    }
}
