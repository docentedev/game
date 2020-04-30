import InputController, { Keys } from "./InputController";
import AbstractBlock from "./AbstractBlock";
import HitBox from "./HitBox";
import Sprite from "./Sprite";
import Debug from "./Debug";
import Block from "./Block";

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
    spriteKey : string = 'd0'
    debug: Debug | undefined

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
        if(keys.DOWN) { this.spriteKey = `d${frame}` }
        if(keys.UP) { this.spriteKey = `u${frame}` }
        if(keys.RIGHT) { this.spriteKey = `r${frame}` }
        if(keys.LEFT) { this.spriteKey = `l${frame}` }
        if(keys.SPACE) { this.spriteKey = `d${frame}` }
        // llamo al metodo que verifica colisiones y
        // mueve el player si es posible
        this.hitBox?.detected(this.blocks, keys, this, this.callbackOpenMenu) 
    }

    callbackOpenMenu = (lastPosition: string, objItems: any ) => {
        const items : Block[] = objItems[lastPosition]
        items.forEach((b: Block) => {
            b.onSelected()
            console.log(b);
            
        });
        
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

    setDebug = (debug: Debug) => this.debug = debug
    getDebug(): Debug {
        if (this.debug) return this.debug;
        throw new Error("getDebugError")
    }

    draw(): void {
        this.sprite.draw(this.spriteKey, this.x, this.y, this.w, this.h)
        this.getDebug().drawBox(
            this.x, this.y, this.w, this.h,
            'blue')
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