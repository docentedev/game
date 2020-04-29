import Sprite from "./Sprite";

/**
 * las medidas son con respecto a
 * la unidad base de Game.unit
 */
export interface BlockProps {
    x: number
    y: number
    h: number
    w: number
    sprite: Sprite
    spriteTitle : string
}

interface IBlock {
    x: number
    y: number
    h: number
    w: number
    ctx: CanvasRenderingContext2D | null
    isCollision: boolean

    sprite: Sprite
    spriteTitle : string

    onCollision(): void
    draw(): void
}

abstract class AbstractBlock implements IBlock {
    
    x: number;
    y: number;
    h: number;
    w: number;
    isCollision: boolean = false

    sprite: Sprite
    spriteTitle : string

    ctx: CanvasRenderingContext2D | null = null

    bg : string= 'green'
    /**
     * 
     * @param props 
     * @param props.x - Medida en units
     */
    constructor(props: BlockProps) {
        this.x = props.x
        this.y = props.y
        this.w = props.w
        this.h = props.h  

        this.sprite = props.sprite
        this.spriteTitle = props.spriteTitle
    }

    offCollision() {
        this.bg = 'green'
    }

    onCollision(): void {
        this.bg = 'blue'
    }
    setContext = (ctx: CanvasRenderingContext2D) => this.ctx = ctx
    getContext(): CanvasRenderingContext2D {
        if (this.ctx) return this.ctx;
        throw new Error("getContextError")
    }
    
    draw(): void {
        this.getContext().fillStyle = this.bg
        this.getContext().fillRect(
            this.x,
            this.y,
            this.w,
            this.h)
    }
}

export default AbstractBlock