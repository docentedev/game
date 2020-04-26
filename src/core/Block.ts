import { BlockClassProp } from "./types";
import AbstractBaseBlock from "./AbstractBaseBlock";

class Block extends AbstractBaseBlock {
    image: HTMLImageElement = new Image();
    constructor(props: BlockClassProp) {
        super(props);
        this.bgColor = 'red';
        this.imageId = props.imageId || 'wall'
    }

    create() {
        this.image = this.game.images[this.imageId].img;
        this.ctx.beginPath();
        // this.ctx.fillStyle = this.bgColor;
        // this.ctx.fillRect(this.getPosY(), this.getPosY(), this.getDimX(), this.getDimY());
        this.drawImage();
        this.ctx.stroke();
    }
}

export default Block;