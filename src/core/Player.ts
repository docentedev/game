import InputController, { Keys } from "./InputController";
import AbstractBlock from "./AbstractBlock";
import HitBox from "./HitBox";
import Sprite, { Pos } from "./Sprite";

/**
 * las medidas son con respecto a
 * la unidad base de Game.unit
 */
export interface DimPosProps {
    x: number
    y: number
    h: number
    w: number
    sprite: Sprite
}

interface IPlayer {
    x: number
    y: number
    h: number
    w: number
    ctx: CanvasRenderingContext2D | null
    isCollision: boolean
    sprite: Sprite

    actionCollision(): void
    draw(): void
}

class Player implements IPlayer {
    
    x: number;
    y: number;
    h: number;
    w: number;

    wCanvas: number = 0
    hCanvas: number = 0

    isCollision: boolean = false

    input: InputController

    ctx: CanvasRenderingContext2D | null = null

    blocks : AbstractBlock[] = []
    hitBox : HitBox | undefined
    sprite: Sprite
    posSprite : Pos = {x: 0, y: 0}

    animationFrameSprite : number = 0
    
    /**
     * 
     * @param props 
     * @param props.x - Medida en units
     */
    constructor(props: DimPosProps) {
        this.x = props.x
        this.y = props.y
        this.w = props.w
        this.h = props.h
        this.sprite = props.sprite

        this.input = new InputController(this.control)

        this.animationFrame()
    }

    control = (keys : Keys) => {

        const frame = this.animationFrameSprite
        if(keys.DOWN) { this.posSprite = this.sprite.map[`d${frame}`] }
        if(keys.UP) { this.posSprite = this.sprite.map[`u${frame}`] }
        if(keys.RIGHT) { this.posSprite = this.sprite.map[`r${frame}`] }
        if(keys.LEFT) { this.posSprite = this.sprite.map[`l${frame}`] }
        if(keys.SPACE) { this.posSprite = this.sprite.map[`d${frame}`] }
        // llamo al metodo que verifica colisiones y
        // mueve el player si es posible
        this.hitBox?.detected(this.blocks, keys, this) 
    }

    getVelocity() {
        return 4
    }

    actionCollision(): void {
        throw new Error("Method not implemented.");
    }
    setContext = (ctx: CanvasRenderingContext2D) => this.ctx = ctx
    getContext(): CanvasRenderingContext2D {
        if (this.ctx) return this.ctx;
        throw new Error("getContextError")
    }

    draw(): void {
        //this.getContext().fillStyle = 'red'
        //this.getContext().fillRect(this.x,this.y, this.h, this.w)

        this.sprite.x = this.posSprite.x
        this.sprite.y = this.posSprite.y
        this.sprite.drawImage(
            this.x,
            this.y)
    }

    addBlocks(blocks : AbstractBlock[]) {
        this.blocks = blocks;
    }
    addHitBox(hitBox : HitBox) {
        this.hitBox = hitBox
    }

    setSizeCanvas(w: number, h: number) {
        this.wCanvas = w
        this.hCanvas = h
    }

    animationFrame() {
        const timer = 100
        setInterval(() => {
            this.animationFrameSprite++
            if(this.animationFrameSprite === 4) {
                this.animationFrameSprite = 0
            }
        }, timer)
    }

    getHCanvas = () => this.hCanvas
    getWCanvas = () => this.wCanvas
}

export default Player