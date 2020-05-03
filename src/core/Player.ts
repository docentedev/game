import InputController, { Keys } from "./InputController";
import Block from "./Block";
import HitBox from "./HitBox";
import Sprite from "./Sprite";
import Debug from "./Debug";
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
    ctx: CanvasRenderingContext2D | undefined
    x: number; y: number; h: number; w: number;

    wCanvas: number = 0
    hCanvas: number = 0

    input: InputController
    book : Book

    hitBox : HitBox | undefined
    debug: Debug | undefined

    sprite: Sprite
    spriteKey : string = 'd0'

    animationFrameSprite : number = 0
    bz: Function | undefined
    getBlocks: (() => Block[]) | undefined

    // X MENU
    // Y MENU
    xMenu: number = 0
    yMenu: number = 0

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

    private control = (keys : Keys) => {
        // OPEN MENU
        if(keys.MENU) this.book.toggle()
        if(!this.book.getVisible()) {
            const frame = this.animationFrameSprite
            if(keys.DOWN) { this.spriteKey = `d${frame}` }
            if(keys.UP) { this.spriteKey = `u${frame}` }
            if(keys.RIGHT) { this.spriteKey = `r${frame}` }
            if(keys.LEFT) { this.spriteKey = `l${frame}` }
            // llamo al metodo que verifica colisiones y
            // mueve el player si es posible
            if(this.getBlocks) this.hitBox?.detected(this.getBlocks(), keys, this, this.callbackAction) 
        } else {
            this.book.onMenuSelect(keys); 
        }
    }

    // Accion ejecutada al seleccionar con SPACE un bloque
    private callbackAction = (lastPosition: string, objItems: any ) => {
        const items : Block[] = objItems[lastPosition]
        items.forEach((b: Block) => {
            // ejecutamos el metodo on selected
            // de esta forma informamos al bloque que debe devolver la
            // acciones a la intancia de bloque creada
            b.onSelected(b);
        });
    }

    getVelocity = () => 6

    setBz(bz: (n: number) => number) {
        // seteamos la funcion bz al propio player y al book
        this.bz = bz
        this.book.bz = bz
    }
    setContext = (ctx: CanvasRenderingContext2D) => {
        this.ctx = ctx
        this.book.setContext(ctx)
    }
    private getContext(): CanvasRenderingContext2D {
        if (this.ctx) return this.ctx;
        throw new Error("getContextError")
    }

    setDebug = (debug: Debug) => {
        // seteamos el debug para Player y Book
        this.debug = debug;
        this.book.setDebug(debug)
    }
    private getDebug(): Debug {
        if (this.debug) return this.debug;
        throw new Error("getDebugError")
    }

    draw(): void {
        this.sprite.draw(this.spriteKey, this.x, this.y, this.w, this.h)
        this.getDebug().drawBox(this.x, this.y, this.w, this.h, 'blue')
        this.book.draw()
    }

    addHitBox = (hitBox : HitBox) => { this.hitBox = hitBox }

    setSizeCanvas(w: number, h: number) {
        this.wCanvas = w
        this.hCanvas = h
    }

    private animationFrame() {
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