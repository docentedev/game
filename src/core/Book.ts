import AbstractBlock from "./AbstractBlock"
import Debug from "./Debug"

class Book {
    visible: boolean = false
    ctx: CanvasRenderingContext2D | undefined
    debug: Debug | undefined
    bz: Function | undefined

    // medidas relativas con x,y cero del propio menu
    x0 : number = 0
    y0 : number = 0
    isCalc0Size : boolean = false

    constructor() { }

    items: AbstractBlock[] = []
    toggle() {
        this.getDebug().getStatus() && console.log(this)
        this.visible = !this.visible
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

    getBz(n: number): number {
        if (this.bz) return this.bz(n);
        throw new Error("Error")
    }

    calc0Size() {
        if(this.isCalc0Size) return;
        const ctx = this.getContext()
        const middleW = ctx.canvas.width / 2
        const middleBookW = this.getBz(7) / 2
        this.x0 = middleW - middleBookW
        const middleH = ctx.canvas.height / 2
        const middleBookH = this.getBz(6) / 2
        this.y0 = middleH - middleBookH
        this.isCalc0Size = true
    }

    draw() {
        if (!this.visible) return;
        this.calc0Size()
        this.drawBookOveralay()
        this.drawBook()
    }

    private drawBookOveralay() {
        const W = this.getContext().canvas.width
        const H = this.getContext().canvas.height
        this.getContext().fillStyle = '#00000070'
        this.getContext().fillRect(0, 0, W, H)
    }

    private drawBook() {
        let sizeX = this.x0 + this.getBz(0.5)
        let sizeY = this.y0 + this.getBz(0.5)
        this.getContext().fillStyle = '#ae978b'
        this.getContext().fillRect(this.x0, this.y0, this.getBz(7), this.getBz(6))

        this.items.forEach((b : AbstractBlock ) => {
            b.visible = true
            b.x= sizeX
            b.y = sizeY
            b.draw()
            b.drawInfo(
                b.x + this.getBz(1.25),
                sizeY + this.getBz(0.375),
                this.getBz(0.25))
            sizeY = sizeY + this.getBz(1.25)
        })
    }
}
export default Book  