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
    // data descriptora del block
    title?: string
    description?: string

    // posicion y tamaño del block
    x: number
    y: number
    h: number
    w: number

    // sprite a cargar para el block
    sprite: Sprite
    // parte del sprite a mostrar
    tile: string

    // el tipo de bloque
    type?: EnumBlockType

    collision?: boolean,
}

class Block {
    private ctx: CanvasRenderingContext2D | undefined
    // data descriptora del block
    private title: string
    private description: string
    // id unico que debe tener un bloque
    uid: number | undefined
    // medidas del bloque
    x: number
    y: number
    h: number
    w: number
    // sprite a cargar para el block
    private sprite: Sprite
    // parte del sprite a mostrar
    private tile: string
    // funciones extra
    private debug: Debug | undefined
    private debugColor: string = Debug.getRandomColor()
    // define si el bloque sera colisionable
    private collision: boolean = true
    // define si un bloque es visible
    private visible: boolean = true
    // el tipo de bloque
    private type: EnumBlockType
    // funcion que retorna el tamaño del bloque definido
    private bz: Function | undefined
    // function que se acciona cuando el block es seleccionado con SPACE
    private cbHandlerOnSelect: ((block: Block) => void) | undefined

    private cbHandlerOnInMenuSelect: ((block: Block) => void) | undefined

    private items : Block[] =[]

    // esta variable debe ser verdadera cuando se consuma en el Book
    alreadyConsumed : boolean = false

    constructor(props: BlockProps) {
        this.title = props.title || ''
        this.description = props.description || ''
        this.x = props.x
        this.y = props.y
        this.w = props.w
        this.h = props.h
        this.sprite = props.sprite
        this.tile = props.tile
        this.type = props.type || EnumBlockType.BLOCK
        this.collision = props.collision === undefined ? true : props.collision
    }

    offCollision = () => this.collision = false
    onCollision = (): void => { this.collision = true }
    getCollision = () => this.collision
    getIsVisible = () => this.visible
    setIsVisible = (visible: boolean) => { this.visible = visible}

    // al seleccionar un bloque se ejecuta este evento
    onSelected(block: Block): void {
        if (this.cbHandlerOnSelect) {
            this.cbHandlerOnSelect(block)
        }
    }

    setBz = (bz: (n: number) => number) => { this.bz = bz }
    setContext = (ctx: CanvasRenderingContext2D) => this.ctx = ctx
    private getContext(): CanvasRenderingContext2D {
        if (this.ctx) return this.ctx
        throw new Error("getContextError")
    }

    setDebug = (debug: Debug) => this.debug = debug
    private getDebug(): Debug {
        if (this.debug) return this.debug;
        throw new Error("getDebugError")
    }

    draw(): void {
        this.visible && this.sprite.draw(this.tile, this.x, this.y, this.w, this.h)
        this.getDebug().drawBox(this.x, this.y, this.w, this.h, this.debugColor)
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

    getItems() {
        return this.items
    }

    // Registro de un callback para cuando se seleccione
    handlerOnSelect(cb: (block: Block) => void) {
        this.cbHandlerOnSelect = cb
    }

    // Registro de un callback para cuando se seleccione dentro del menu
    handlerOnInMenuSelect(cb: (block: Block) => void) {
        this.cbHandlerOnInMenuSelect = cb
    }

    setTile(key: string) {
        this.tile = key
    }

    // Acciones
    onInMenuSelected = () => {
        if (this.cbHandlerOnInMenuSelect) {
            this.cbHandlerOnInMenuSelect(this)
        }
    }
}

export default Block