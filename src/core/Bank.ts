// clase que a modo de banco. manejara los items del entorno y del player
// el player tendra sus items y los bloques tambien, que transacionarar mediante el banco

import Block from "./Block"
import InputController, { Keys } from "./InputController"

// Casos de uso
// 
/*
-- Cliente abre un cofre
Cofre       Banco                   Player   
ITEM   os ->  Mtrar | Mostrar   <-  ITEM

-- Cliente solicita item
Cofre       Banco                   Player   
ITEM    ->  Mostrar | Mostrar   <-  ITEM

Cofre       Banco                   Player   
ITEM    ->  Comprobar | Mostrar   <-  ITEM

Cofre       Banco                   Player   
ITEM    ->  Enviar -> | Mostrar   <-  ITEM

*/

class Bank {
    playerItems: Block[] = []
    externalItems: Block[] = []
    ctx: CanvasRenderingContext2D | undefined
    _bz: ((n: number | undefined) => number) | undefined

    wMid: number = 0
    hMid: number = 0

    xStart: number = 0
    yStart: number = 0
    xEnd: number = 0
    yEnd: number = 0

    input:InputController

    indexItems: number = 0
    indexItem: number = 0

    constructor() {
        this.input = new InputController(this.handlerKey)
    }

    handlerKey = (keys: Keys) => {
        console.log(keys);
        if(keys.LEFT || keys.RIGHT) {
            this.indexItems = this.indexItems === 0 ? 1 : 0
        }

        if(keys.DOWN) {
            this.indexItem = this.indexItem + 1
        }
        if(keys.UP) {
            this.indexItem = this.indexItem - 1
        }

    }
    newTransaction() {
        this.playerItems = []
        this.externalItems = []
    }

    playerShowItems(b: Block[]) {
        this.playerItems = b
    }

    externalShowItems(b: Block[]) {

    }

    draw() {
        const ctx = this.getContext()
        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)


        this.wMid = ctx.canvas.width / 2
        this.hMid = ctx.canvas.height / 2

        this.xStart = this.wMid / 2
        this.yStart = this.hMid / 2
        this.xEnd = ctx.canvas.width / 2
        this.yEnd = ctx.canvas.height / 2

        ctx.fillStyle = 'rgba(0,0,0,0.2)'
        ctx.fillRect(this.xStart, this.yStart, this.xEnd, this.yEnd)


        const xMargin = this.xStart + this.bz(0.5)
        const yMargin = this.yStart + this.bz(0.5)
        const xMarginEnd = this.xEnd - this.bz(1)
        const yMarginEnd = this.yEnd - this.bz(1)

        ctx.fillStyle = 'rgba(255,255,255,0.8)'
        ctx.fillRect(xMargin, yMargin, xMarginEnd, yMarginEnd)

        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.fillRect(this.wMid - this.bz(0.0625), yMargin, this.bz(0.125), yMarginEnd)

        this.drawItems()
    }

    drawItems() {
        const ctx = this.getContext()
        let y = this.yStart + this.bz(1)
        this.externalItems.forEach((b: Block) => {
            // ctx.fillStyle = 'red'
            // ctx.fillRect(this.wMid + this.bz(0.5), y, this.bz(1), this.bz(1))
            b.offCollision()
            b.x = this.wMid + this.bz(0.5)
            b.y = y
            b.draw()

            y = y + this.bz(1.5)
        });

        let yP = this.yStart + this.bz(1)
        this.playerItems.forEach((b: Block) => {
            // ctx.fillStyle = 'red'
            // ctx.fillRect(this.xStart + this.bz(1), yP, this.bz(1), this.bz(1))
            b.offCollision()
            b.x = this.xStart + this.bz(1)
            b.y = yP
            b.draw()

            yP = yP + this.bz(1.5)
        });

        this.drawSelecBorder()
    }

    drawSelecBorder() {
        const ctx = this.getContext()
        let y = this.yStart + this.bz(1)

        ctx.strokeStyle = 'red'
        ctx.lineWidth = 4
        const listSelected = this.indexItems === 0 ? this.xStart + this.bz(1) : this.wMid + this.bz(0.5)


        let hIndex = 0
        switch (this.indexItem) {
            case 0: hIndex = 0; break;
            case 1: hIndex = 1.5; break;
            case 2: hIndex = 3; break;
            case 3: hIndex = 4.5; break;
            case 4: hIndex = 6; break;
            case 5: hIndex = 7.5; break;
        }

        ctx.strokeRect(listSelected, y + this.bz(hIndex), this.bz(1), this.bz(1))
    }

    setContext = (ctx: CanvasRenderingContext2D) => this.ctx = ctx
    getContext(): CanvasRenderingContext2D {
        if (this.ctx) return this.ctx;
        throw new Error("getContextError")
    }

    setBz(bz: ((n: number | undefined) => number)) {
        this._bz = bz;
    }

    _getBz() {
        if (this._bz) return this._bz;
        throw new Error("_getBz")
    }

    bz = (n: number) => {
        if (this._bz) return this._bz(n)
        throw new Error("_getBz")
    }

}

export default Bank