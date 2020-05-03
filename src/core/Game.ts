import HitBox from "./HitBox"
import Sprite, { SpriteObj } from "./Sprite"
import Debug from "./Debug"
import ImagesLoader from "./ImageLoader"
import Block from "./Block"
import Player from "./Player"

export interface GameProps {
    targetID: string,
    w: number,
    h: number,
    blockSize: number
}

class Game {
    private target: HTMLElement
    private canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    blockSize: number = 32
    debug: Debug = new Debug()

    w: number
    h: number

    sprite: Sprite | undefined
    spriteKey: string | undefined

    hitBox: HitBox = new HitBox()

    images: ImagesLoader
    blocks: Block[] = []
    items: Block[] = []

    player: Player | undefined
    sprites: SpriteObj = {}
    blockUID : number = 0

    constructor(props: GameProps) {
        this.w = props.w
        this.h = props.h
        this.blockSize = props.blockSize
        this.images = new ImagesLoader()
        this.hitBox = new HitBox()
        this.canvas = document.createElement('canvas')
        this.target = this.getElement(props.targetID)
        this.ctx = this.getContext()
        this.debug.setContext(this.ctx)
        this.canvasCreate()
    }

    private getElement(id: string): HTMLElement {
        const elm = document.getElementById(id)
        if (elm) return elm
        throw new Error("getElementError")
    }

    private getContext(): CanvasRenderingContext2D {
        const ctx = this.canvas.getContext('2d')
        if (ctx) return ctx
        throw new Error("getContextError")
    }

    private loop = (cb: FrameRequestCallback) => window.requestAnimationFrame(cb)

    private canvasCreate() {
        document.body.style.backgroundColor = 'black'
        this.target.appendChild(this.canvas)
        this.canvas.height = this.h
        this.canvas.width = this.w
    }

    private drawGrid() {
        // recorrer x
        for (let ix = 0; ix < this.w/ this.blockSize; ix++) {
            // recorrer y
            for (let iy = 0; iy < this.h/this.blockSize; iy++) {
                if (this.sprite && this.spriteKey) {
                    const k = this.spriteKey
                    this.sprite.draw(
                        k,
                        this.blockSize * ix,
                        this.blockSize * iy,
                        this.blockSize,
                        this.blockSize)
                    this.debug.drawBox(
                        this.blockSize * ix,
                        this.blockSize * iy,
                        this.blockSize,
                        this.blockSize,
                        'white')
                }

            }
        }
    }

    private onCollision() {
        if (this.player) {
            this.player.getBlocks = () => this.blocks
            this.player.addHitBox(this.hitBox)
        }
    }

    // Ciclo de vida
    private create = () => {
        this.onCollision()
    }

    private update = () => {
        this.drawClear()
        this.drawGrid()
        this.drawBlocks()
        this.drawPlayer()
        this.loop(this.update)
    }

    // Metodos para dibujar
    private drawBlocks() {
        this.blocks.forEach((block: Block) => block.draw())
    }

    private drawPlayer() {
        if (this.player) this.player.draw();
    }

    drawClear = () => this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Metodos para agregar objetos
    addGridSprite(sprite: Sprite, key: string) {
        this.sprite = sprite
        this.spriteKey = key
    }

    addSprite(key: string, sprite: Sprite) {
        sprite.setContext(this.ctx)
        this.sprites[key] = sprite
    }

    addBlock(block: Block) : Block {
        block.setDebug(this.debug)
        block.setContext(this.ctx)
        block.setBz(this.bz)

        block.uid = this.blockUID
        this.blocks.push(block)
        this.blockUID = this.blockUID + 1
        return block
    }

    addItem(block: Block) : Block {
        block.setDebug(this.debug)
        block.setContext(this.ctx)
        block.setBz(this.bz)

        block.uid = this.blockUID
        this.items.push(block)
        this.blockUID = this.blockUID + 1
        return block
    }

    addPlayer = (player: Player) => {
        player.setDebug(this.debug)
        player.setContext(this.ctx)
        player.setSizeCanvas(this.w, this.h)
        player.setBz(this.bz)
        this.player = player
        return player
    }

    getBlocks = () => this.blocks
    removeBlock(block : Block) {
        this.blocks = this.blocks.filter((b : Block) => b.uid !== block.uid)
    }
    // retorna medidas dependiendo del block size
    public bz = (n: number) => n * this.blockSize
    public onDebug = () => this.debug.onDebug()
    static init: (callback: Function) => void

    public start() {
        this.create()
        this.loop(this.update)
    }
}

Game.init = (callback: Function) => document.addEventListener('DOMContentLoaded', (event) => callback(event), false);


export default Game