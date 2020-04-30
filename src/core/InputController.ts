export enum EnumMovePosition {
    LEFT = 'LEFT', // L
    UP = 'UP', // U
    RIGHT = 'RIGHT', // R
    DOWN = 'DOWN', // D
    SPACE = 'SPACE', // D
    MENU = 'MENU', // D
    DEFAULT = 'DEFAULT', // Other Keys
    STOP = 'STOP',
}

export type Keys = {
    LEFT: boolean, // L
    UP: boolean, // U
    RIGHT: boolean, // R
    DOWN: boolean, // D
    SPACE: boolean, // spaces
    STOP: boolean,
    MENU: boolean,
    [key: string]: boolean,
}

export type InputControllerCallback = (keys: Keys) => void

class InputController {
    keys : Keys;
    callback: Function;
    constructor(callback: InputControllerCallback) {
        this.callback = callback;
        this.initListener();
        this.keys = {
            LEFT: false, // L
            UP: false, // U
            RIGHT: false, // R
            DOWN: false, // D
            SPACE: false, // space
            STOP: true, // 0 is static
            MENU: false, // KEY m, open menu
        };
    }

    keyResolve (k : number) : EnumMovePosition {
        if (k === 37) return EnumMovePosition.LEFT
        if (k === 32) return EnumMovePosition.SPACE
        if (k === 38) return EnumMovePosition.UP
        if (k === 39) return EnumMovePosition.RIGHT
        if (k === 40) return EnumMovePosition.DOWN
        if (k === 77) return EnumMovePosition.MENU
        return EnumMovePosition.DEFAULT
    }
    
    initListener() {
        document.body.addEventListener("keydown", (e) => {
            this.keys[this.keyResolve(e.keyCode)] = true;
            this.keys.STOP = false;
            this.callback(this.keys)
        });
        document.body.addEventListener("keyup", (e) => {
            this.keys[this.keyResolve(e.keyCode)] = false;
            this.keys.STOP = true;
            this.callback(this.keys)
        });
    }
}

export default InputController