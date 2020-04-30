import Sprite from "./Sprite";
import Debug from "./Debug";

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
    x: number
    y: number
    h: number
    w: number
    sprite: Sprite
    spriteTitle: string
    type?: EnumBlockType
}

interface IBlock {
    x: number
    y: number
    h: number
    w: number
    ctx: CanvasRenderingContext2D | null
    isCollision: boolean

    sprite: Sprite
    spriteTitle: string

    onCollision(): void
    draw(): void

    type: EnumBlockType
}

abstract class AbstractBlock implements IBlock {

    x: number;
    y: number;
    h: number;
    w: number;
    isCollision: boolean = false

    sprite: Sprite
    spriteTitle: string

    debug: Debug | undefined
    color: string = Debug.getRandomColor()
    debugColor: string = this.color;

    visible: boolean = true

    ctx: CanvasRenderingContext2D | null = null

    type: EnumBlockType

    callbackHandlerOnSelect: Function | undefined
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
        this.type = props.type || EnumBlockType.BLOCK
    }

    offCollision() {
        this.debugColor = this.color
    }

    onCollision(): void {
        this.debugColor = 'blue'
    }

    // Acciones al accionar
    onSelected(): void {
        this.debugColor = 'green'
        if (this.type === EnumBlockType.BREKABLE) {
            this.visible = false
        }
        if (this.callbackHandlerOnSelect) {
            this.callbackHandlerOnSelect(this)
        }
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

    // Registro de un callback para cuando se seleccione
    handlerOnSelect(callback: Function) {
        this.callbackHandlerOnSelect = callback
    }
}

export default AbstractBlock