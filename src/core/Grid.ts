import { BlockClassProp } from "./types";
import AbstractBaseBlock from "./AbstractBaseBlock";

class Grid extends AbstractBaseBlock {
    image: HTMLImageElement = new Image();
    constructor(props: BlockClassProp) {
        super(props);
        this.imageId = props.imageId || 'grass'
    }

    create() {
        this.image = this.game.images[this.imageId].img;
        this.ctx.fillStyle = this.bgColor;
        this.ctx.beginPath();
        //this.ctx.lineWidth = 1;
        //this.ctx.strokeStyle = "#dedede";
        //this.ctx.rect(this.getSize(this.pos.x), this.getSize(this.pos.y), this.getSize(this.dim.x), this.getSize(this.dim.y));
        this.drawImage();
        this.ctx.stroke();
    }
}

export default Grid;