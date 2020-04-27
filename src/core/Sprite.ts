import { SpriteMap } from "./types";

interface SpriteProps {
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    map: SpriteMap,
    blockSize: number,
}

class Sprite {
    image: HTMLImageElement;
    map: SpriteMap
    ctx: CanvasRenderingContext2D
    imageTileSize: number = 48
    blockSize: number;

    constructor(props : SpriteProps) {
        this.image = props.image
        this.map = props.map
        this.ctx = props.ctx
        this.blockSize = props.blockSize
    }

    drawImage(key: string, posX : number, posY: number) {
        this.ctx.drawImage(this.image,
            this.map[key].x, this.map[key].y,
            this.imageTileSize, this.imageTileSize,
            posX, posY,
            this.blockSize, this.blockSize);
    }
}

export default Sprite;