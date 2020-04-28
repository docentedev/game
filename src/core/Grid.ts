import { BlockClassProp } from "./types";
import AbstractBaseBlock from "./AbstractBaseBlock";

class Grid extends AbstractBaseBlock {
    constructor(props: BlockClassProp) {
        super(props);
        this.spriteId = props.spriteId || 'grassSprite'
    }

    create() {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.beginPath();
        this.drawDebug()
        this.game.sprites[this.spriteId].drawImage('grass', this.getPosX(), this.getPosY())
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