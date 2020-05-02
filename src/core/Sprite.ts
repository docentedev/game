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
    map: SpriteMap,
}

class Sprite {
    private ctx: CanvasRenderingContext2D | undefined
    private image: HTMLImageElement;
    private map: SpriteMap

    constructor(props: SpriteProps) {
        this.image = props.image
        this.map = props.map
    }

    draw(key: string, x: number, y: number, blockW: number, blockH: number) {
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
    private getContext(): CanvasRenderingContext2D {
        if (this.ctx) return this.ctx;
        throw new Error("getContextError")
    }
}

export default Sprite;