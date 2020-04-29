import AbstractBlock from "./AbstractBlock";
import { Pos } from "./Sprite";

class Block extends AbstractBlock{
    draw(): void {
        //this.getContext().fillStyle = 'red'
        //this.getContext().fillRect(this.x,this.y, this.h, this.w)

        const k = this.spriteTitle
        const pos : Pos = this.sprite.map[k]
        this.sprite.x = pos.x
        this.sprite.y = pos.y
        this.sprite.blockSize = this.w
        this.sprite.blockSizeY = this.h
        this.sprite.size = pos.w || this.w
        this.sprite.sizeY = pos.h || this.h
        this.sprite.drawImage(
            this.x,
            this.y)
    }
}

export default Block