import {config} from './config/index';
import {Rocket} from './core/Rocket';
import {Enemy} from './core/Enemy';

class SpaceWar {

    constructor(config, document) {
        this.container = document.querySelector(config.container);
        this.game = new PIXI.Application(config.app);
        this.game.renderer.resolution = 2;
    }

    onProgress(loader) {
        this.progress = loader.progress;
    }

    loadResources(loaded = _.noop) {
        this.resources = _.map(_.values(config.resources), r => r.path);
        PIXI.loader.add(this.resources).on('progress', this.onProgress).load(loaded);
    }

    scaleToWindow() {
        Object.assign(this.game.renderer.view.style, config.window);
        return this.game.renderer.view;
    }

    gameLoop() {
        requestAnimationFrame(this.gameLoop.bind(this));
        this.rocket.state();
        this.enemy.state();
    }

    start() {
        this.rocket = new Rocket(this.game, config).init();
        this.enemy = new Enemy(this.game, config).attack();
        this.gameLoop();
    }

    initiate() {
        this.loadResources(() => {
            this.container.appendChild(this.scaleToWindow());
            this.start();
        });
    }
}

new SpaceWar(config, document).initiate();
