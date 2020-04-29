import { BlockClassProp } from "./types";
import AbstractBaseBlock from "./AbstractBaseBlock";

class Grid extends AbstractBaseBlock {
    tileKey : string
    constructor(props: BlockClassProp) {
        super(props);
        this.spriteKey = props.spriteKey || 'sprites'
        this.tileKey = 'grass'
    }

    create() {
        this.drawDebug()
        this.game.sprites[this.spriteKey].drawImage(this.tileKey, this.getPosX(), this.getPosY())
        this.ctx.stroke();
    }

    drawDebug() {
        if(this.game.debug.getStatus()) {
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "#dedede";
            this.ctx.rect(this.getSize(this.pos.x), this.getSize(this.pos.y), this.getSize(this.dim.x), this.getSize(this.dim.y));
        }
    }
}

export default Grid;