export type Sprites = {
    [key: string]: Sprite,
}

export type SpriteObj = {
    [key: string]: Sprite,
}

export type Pos = {
    x: number,
    y: number,
    w: number,
    h: number
}
export type SpriteMap = {
    [key: string]: Pos,
}

interface SpriteProps {
    image: HTMLImageElement,
    size: number,
    sizeY?: number
    x: number,
    y: number,
    blockSize: number,
    blockSizeY?: number,
    map: SpriteMap,
}

class Sprite {
    image: HTMLImageElement;
    ctx: CanvasRenderingContext2D | null = null
    size: number
    sizeY: number | undefined
    x: number
    y: number
    blockSize: number = 1
    blockSizeY: number | undefined
    map: SpriteMap

    constructor(props: SpriteProps) {
        this.image = props.image
        this.size = props.size
        this.sizeY = props.sizeY || props.size
        this.x = props.x
        this.y = props.y
        this.blockSize = props.blockSize
        this.blockSizeY = props.blockSizeY || props.blockSize
        this.map = props.map
    }

    draw(
        key: string,
        x: number,
        y: number,
        blockW: number,
        blockH: number
        ) {
            const pos : Pos = this.map[key]
            this.getContext().drawImage(
                this.image,
                pos.x,
                pos.y,
                pos.w,
                pos.h,
                x, y, blockW, blockH
            )
        }

    setContext = (ctx: CanvasRenderingContext2D) => this.ctx = ctx
    getContext(): CanvasRenderingContext2D {
        if (this.ctx) return this.ctx;
        throw new Error("getContextError")
    }
}

export default Sprite;