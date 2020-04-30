import HitBox from "./HitBox"
import Sprite from "./Sprite"
import Debug from "./Debug"

export interface GameProps {
    targetID: string,
    w: number,
    h: number,
    blockSize: number
}

abstract class AbstractGame {
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

    constructor(props: GameProps) {
        this.w = props.w
        this.h = props.h
        this.blockSize = props.blockSize
        this.canvas = document.createElement('canvas')
        this.target = this.getElement(props.targetID)
        this.ctx = this.getContext()

        this.debug.setContext(this.ctx)
        this.debug.onDebug()
    }

    private getElement(id: string): HTMLElement {
        const elm = document.getElementById(id)
        if (elm) {
            return elm;
        }
        throw new Error("getElementError")
    }

    private getContext(): CanvasRenderingContext2D {
        const ctx = this.canvas.getContext('2d')
        if (ctx) {
            return ctx;
        }
        throw new Error("getContextError")
    }

    canvasCreate() {
        document.body.style.backgroundColor = 'black'
        this.target.appendChild(this.canvas)
        this.canvas.height = this.h
        this.canvas.width = this.w
    }

    addGridSprite(sprite: Sprite, key: string) {
        this.sprite = sprite
        this.spriteKey = key
    }

    // metodo que mantiene vivo el juego
    loop = (cb: FrameRequestCallback) => window.requestAnimationFrame(cb)
    // Metodos que dibujan
    // beginPath() Crea un nuevo trazo. Una vez creado, los comandos de dibujo futuros son aplicados dentro del trazo y usados para construir el nuevo trazo hacia arriba.
    // closePath() Cierra el trazo de tal forma que los comandos de dibujo futuros son, una vez más redireccionados al contexto.
    // stroke() Dibuja el contorno de la forma.
    // fill() Dibuja una forma solida rellenando el área del trazo.

    drawGrid() {
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

    drawClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    static init: (callback: Function) => void
}

AbstractGame.init = (callback: Function) => document.addEventListener('DOMContentLoaded', (event) => callback(event), false);


export default AbstractGame