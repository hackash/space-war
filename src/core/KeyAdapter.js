export class KeyAdapter {

    constructor(keyCode) {
        this.keyCode = keyCode;
        this.released = _.noop;
        this.pressed = _.noop;
        this.state = {
            pressed: false,
            released: false
        };
    }

    onKeyDown(evt) {
        if (this.isDefinedKey(evt.keyCode)) {
            this.state.released = false;
            this.state.pressed = true;
            this.pressed.call(this, arguments);
        }
    };

    onKeyUp(evt) {
        if (this.isDefinedKey(evt.keyCode)) {
            this.state.pressed = false;
            this.state.released = true;
            this.released.call(this, arguments);
        }
    };

    isDefinedKey(code) {
        return this.keyCode === code;
    };

    init() {
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
        window.addEventListener('keyup', this.onKeyUp.bind(this), false);
        return this;
    };
}
