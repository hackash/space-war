import {KeyAdapter} from './KeyAdapter';
import {Collision} from './Collision';
import {Bullet} from './Bullet';

export class Rocket {

    constructor(game, config) {
        this.config = config;
        this.actions = [];
        this.game = game;
        this.speed = 10;
    }

    state() {
        for (let i = 0; i < this.actions.length; i++) {
            this.actions[i].fn();
        }
    }

    releaseAction(name) {
        for (let i = 0; i < this.actions.length; i++) {
            if (this.actions[i].name === name) {
                this.actions.splice(i, 1);
                break;
            }
        }
    }

    actionExist(name) {
        return this.actions.find(a => a.name === name);
    }

    addAction(action) {
        this.actions.push(action);
    }

    moveRight() {
        if (!this.collision.isOnRightBound()) {
            if (!this.texture.vx) {
                this.texture.vx = 1;
            }
            this.texture.x += this.speed;
        }
    };

    moveLeft() {
        if (!this.collision.isOnLeftBound()) {
            if (!this.texture.vx) {
                this.texture.vx = 1;
            }
            this.texture.x -= this.speed;
        }
    };

    shot() {
        let bullet = new Bullet(this.game, this.config);
        bullet.init({
            x: (this.texture.x + (bullet.texture.width / 2)),
            y: (this.texture.y - (bullet.texture.height / 2))
        });

        this.addAction({
            name: this.config.resources.rocket.actions.shot,
            fn: bullet.fly.bind(bullet)
        });
    }

    bindActions() {
        let leftKeyAdapter = new KeyAdapter(37).init();
        let rightKeyAdapter = new KeyAdapter(39).init();
        let spaceKeyAdapter = new KeyAdapter(32).init();

        leftKeyAdapter.pressed = () => {
            this.addAction({
                name: this.config.resources.rocket.actions.moveLeft,
                fn: this.moveLeft.bind(this)
            });
        };

        leftKeyAdapter.released = () => {
            this.releaseAction(this.config.resources.rocket.actions.moveLeft);
        };

        rightKeyAdapter.pressed = () => {
            this.addAction({
                name: this.config.resources.rocket.actions.moveRight,
                fn: this.moveRight.bind(this)
            });
        };

        rightKeyAdapter.released = () => {
            this.releaseAction(this.config.resources.rocket.actions.moveRight);
        };

        spaceKeyAdapter.pressed = () => {
            this.shot();
        };

        return this;
    };

    getBounds(config) {
        let view = this.game.renderer;
        return {
            x: Math.round((view.width / 2) - (config.width / 2)),
            y: Math.round((view.height) - config.height)
        }
    }

    init() {
        this.texture = new PIXI.Sprite(PIXI.loader.resources[this.config.resources.rocket.path].texture);
        let bounds = this.getBounds(this.config.resources.rocket.style);
        Object.assign(this.texture, this.config.resources.rocket.style, bounds);
        this.collision = new Collision(this.texture, {left: 0, right: this.game.renderer.width});
        this.game.stage.addChild(this.texture);
        this.bindActions();
        return this;
    }
}
