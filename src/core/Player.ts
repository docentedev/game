import InputController, { Keys } from "./InputController";
import AbstractBlock from "./AbstractBlock";
import HitBox from "./HitBox";
import Sprite from "./Sprite";
import Debug from "./Debug";
import Block from "./Block";
import Book from "./Book";

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

class Player {
    x: number; y: number; h: number; w: number;

    wCanvas: number = 0
    hCanvas: number = 0

    isCollision: boolean = false

    input: InputController
    book : Book

    ctx: CanvasRenderingContext2D | undefined
    hitBox : HitBox | undefined
    debug: Debug | undefined

    sprite: Sprite
    spriteKey : string = 'd0'

    animationFrameSprite : number = 0
    blockSize: number = 0

    bz: Function | undefined
    getBlocks: (() => AbstractBlock[]) | undefined;

    constructor(props: DimPosProps) {
        this.x = props.x
        this.y = props.y
        this.w = props.w
        this.h = props.h
        this.sprite = props.sprite

        this.input = new InputController(this.control)
        this.book = new Book()
        this.animationFrame()
    }

    control = (keys : Keys) => {

        const frame = this.animationFrameSprite
        if(keys.DOWN) { this.spriteKey = `d${frame}` }
        if(keys.UP) { this.spriteKey = `u${frame}` }
        if(keys.RIGHT) { this.spriteKey = `r${frame}` }
        if(keys.LEFT) { this.spriteKey = `l${frame}` }

        // OPEN MENU
        if(keys.MENU) {
            this.book.toggle()
        }
        // llamo al metodo que verifica colisiones y
        // mueve el player si es posible
        if(this.getBlocks) {
            this.hitBox?.detected(this.getBlocks(), keys, this, this.callbackAction) 
        }
    }

    callbackAction = (lastPosition: string, objItems: any ) => {
        const items : Block[] = objItems[lastPosition]
        items.forEach((b: Block) => {
            b.onSelected(this.book, b);
        });
    }

    getVelocity() {
        return 6
    }

    actionCollision(): void {
        throw new Error("Method not implemented.");
    }
    setBz(bz: (n: number) => number) {
        this.bz = bz
        this.book.bz = bz
    }
    setContext = (ctx: CanvasRenderingContext2D) => {
        this.ctx = ctx
        this.book.setContext(ctx)
    }
    getContext(): CanvasRenderingContext2D {
        if (this.ctx) return this.ctx;
        throw new Error("getContextError")
    }

    setDebug = (debug: Debug) => {
        this.debug = debug;
        this.book.setDebug(debug)
    }
    getDebug(): Debug {
        if (this.debug) return this.debug;
        throw new Error("getDebugError")
    }

    draw(): void {
        this.sprite.draw(this.spriteKey, this.x, this.y, this.w, this.h)
        this.getDebug().drawBox(
            this.x, this.y, this.w, this.h,
            'blue')
        this.book.draw();
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