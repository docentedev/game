import { BlockClassProp } from "./types";
import AbstractBaseBlock from "./AbstractBaseBlock";

class Block extends AbstractBaseBlock {
    tileKey : string
    constructor(props: BlockClassProp) {
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

export default Block;