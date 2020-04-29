import HitBox from "./HitBox"
import Sprite, { Pos } from "./Sprite"

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
        this.ctx.lineWidth = 0.5
        this.ctx.strokeStyle = '#2e2222'

        this.ctx.fillStyle = '#2e2e2e'
        let n = 0
        // recorrer x
        for (let ix = 0; ix < this.w/ this.blockSize; ix++) {
            // recorrer y
            for (let iy = 0; iy < this.h/this.blockSize; iy++) {
                n++
                // pintando grilla
                //this.ctx.fillRect(
                //    this.blockSize * ix,
                //    this.blockSize * iy,
                //    this.blockSize,
                //    this.blockSize)
                //this.ctx.strokeRect(
                //    this.blockSize * ix,
                //    this.blockSize * iy,
                //    this.blockSize,
                //    this.blockSize)

                if (this.sprite && this.spriteKey) {
                    const k = this.spriteKey
                    const pos: Pos = this.sprite.map[k]
                    this.sprite.x = pos.x
                    this.sprite.y = pos.y
                    this.sprite.blockSize = this.blockSize
                    this.sprite.blockSizeY = this.blockSize
                    this.sprite.size = pos.w || this.blockSize
                    this.sprite.sizeY = pos.h || this.blockSize
                    this.sprite.drawImage(
                        this.blockSize * ix,
                        this.blockSize * iy)
                }

            }
        }
        console.log(n);
        
    }

    drawClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    static init: (callback: Function) => void
}

AbstractGame.init = (callback: Function) => document.addEventListener('DOMContentLoaded', (event) => callback(event), false);


export default AbstractGame