import { ItemClassProp } from "./types";
import AbstractBaseBlock from "./AbstractBaseBlock";

class Item extends AbstractBaseBlock {
    tileKey : string
    constructor(props: ItemClassProp) {
        super(props);
        this.spriteKey = props.spriteKey || 'sprites'
        this.tileKey = props.tileKey || 'ladrilloBlock'
    }

    create() {
        this.ctx.beginPath();
        this.game.sprites[this.spriteKey].drawImage(this.tileKey, this.getPosX(), this.getPosY())
        this.ctx.stroke();
    }
}

export default Item;