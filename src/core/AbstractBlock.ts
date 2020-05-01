import Sprite from "./Sprite";
import Debug from "./Debug";
import Book from "./Book";

export enum EnumBlockType {
    BLOCK = 'BLOCK',
    DOOR = 'DOOR',
    BREKABLE = 'BREKABLE',
}
/**
 * las medidas son con respecto a
 * la unidad base de Game.unit
 */
export interface BlockProps {
    title?: string
    description?: string

    x: number
    y: number
    h: number
    w: number
    sprite: Sprite
    spriteTitle: string
    type?: EnumBlockType
}

abstract class AbstractBlock {

    title: string
    description: string
    uid: number | undefined
    x: number;
    y: number;
    h: number;
    w: number;

    sprite: Sprite
    spriteTitle: string

    debug: Debug | undefined
    color: string = Debug.getRandomColor()
    debugColor: string = this.color;

    visible: boolean = true

    ctx: CanvasRenderingContext2D | undefined

    type: EnumBlockType

    bz: Function | undefined

    callbackHandlerOnSelect: ((book: Book, block: AbstractBlock) => void) | undefined
    /**
     * 
     * @param props 
     * @param props.x - Medida en units
     */
    constructor(props: BlockProps) {

        this.title = props.title || ''
        this.description = props.description || ''

        this.x = props.x
        this.y = props.y
        this.w = props.w
        this.h = props.h

        this.sprite = props.sprite
        this.spriteTitle = props.spriteTitle
        this.type = props.type || EnumBlockType.BLOCK


    }

    offCollision() {
        this.debugColor = this.color
    }

    onCollision(): void {
        this.debugColor = 'blue'
    }

    // Acciones al accionar
    onSelected(book: Book, block: AbstractBlock): void {
        this.debugColor = 'green'
        if (this.type === EnumBlockType.BREKABLE) {
            this.visible = false
        }
        if (this.callbackHandlerOnSelect) {
            this.callbackHandlerOnSelect(book, block)
        }
    }

    setBz(bz: (n: number) => number) {
        this.bz = bz
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
        this.visible && this.sprite.draw(this.spriteTitle, this.x, this.y, this.w, this.h)
        this.getDebug().drawBox(
            this.x, this.y, this.w, this.h,
            this.debugColor)
    }

    getBz(n: number): number {
        if (this.bz) return this.bz(n);
        throw new Error("Error")
    }

    drawInfo(x: number, y: number, fontSize: number) {
        const title = `#${this.uid} ${this.title}`

        this.getContext().font = fontSize +"px Arial";
        this.getContext().fillStyle = '#000000'
        this.getContext().fillText(title, x, y);
        this.getContext().fillText(this.description, x, y + this.getBz(0.375));
    }

    // Registro de un callback para cuando se seleccione
    handlerOnSelect(callback: (book : Book, block: AbstractBlock) => void) {
        this.callbackHandlerOnSelect = callback
    }
}

export default AbstractBlock