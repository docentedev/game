type Keys = {
    37: boolean, // L
    38: boolean, // U
    39: boolean, // R
    40: boolean, // D
    32: boolean, // spaces
    [key: number]: boolean,
}

class InputController {
    keys : Keys;
    callback: Function;
    constructor(callback: Function) {
        this.callback = callback;
        this.initListener();
        this.keys = {
            37: false, // L
            38: false, // U
            39: false, // R
            40: false, // D
            32: false, // space
            0: true, // 0 is static
            77: false, // KEY m, open menu
        };
    }
    
    initListener() {
        document.body.addEventListener("keydown", (e) => {
            this.keys[e.keyCode] = true;
            this.keys[0] = false;
            this.callback(this.keys)
        });
        document.body.addEventListener("keyup", (e) => {
            this.keys[e.keyCode] = false;
            this.keys[0] = true;
            this.callback(this.keys)
        });
    }
}

export default InputController