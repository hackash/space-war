import {Asteroid} from './Asteroid';

export class Enemy {

    constructor(game, config) {
        this.interval = null;
        this.config = config;
        this.stream = 2000;
        this.arsenal = [];
        this.game = game;
    }

    attack() {
        this.interval = setInterval(() => {
            this.arsenal.push(new Asteroid(this.game, this.config).init());
        }, this.stream);
        return this;
    }

    state() {
        for (let i = 0; i < this.arsenal.length; i++) {
            this.arsenal[i].fallDown();
        }
    }

    retreat() {
        clearInterval(this.interval);
    }
}
