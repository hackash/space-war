export class Bullet {

    constructor(game, config) {
        this.texture = new PIXI.Sprite(PIXI.loader.resources[config.resources.bullet.path].texture);
        Object.assign(this.texture, config.resources.bullet.style);
        this.config = config;
        this.game = game;
        this.speed = 10;
    }

    fly() {
        this.texture.y -= this.speed;
    }

    init(source) {
        Object.assign(this.texture, source);
        this.game.stage.addChild(this.texture);
        return this;
    }
}
