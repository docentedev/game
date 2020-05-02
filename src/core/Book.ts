import Block from "./Block"
import Debug from "./Debug"

class Book {
    private ctx: CanvasRenderingContext2D | undefined
    private visible: boolean = false
    private debug: Debug | undefined
    private w: number = 8
    private h: number = 8
    bz: Function | undefined

    // medidas relativas con x,y cero del propio menu
    private x0 : number = 0
    private y0 : number = 0
    private isCalc0Size : boolean = false
    private items: Block[] = []

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
        const middleBookW = this.getBz(this.w) / 2
        this.x0 = middleW - middleBookW
        const middleH = ctx.canvas.height / 2
        const middleBookH = this.getBz(this.h) / 2
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
        this.getContext().fillRect(this.x0, this.y0, this.getBz(this.w), this.getBz(this.h))

        this.items.forEach((b : Block ) => {
            b.setIsVisible(true)
            b.x= sizeX
            b.y = sizeY
            b.draw()
            b.drawInfo(b.x + this.getBz(1.25),sizeY + this.getBz(0.375),this.getBz(0.25))
            sizeY = sizeY + this.getBz(1.25)
        })
    }

    // Items
    addItem = (block: Block) => this.items.push(block)

    // agregamos items una sola vez, sin que se repita el uid
    // retorna falso si no se puede agregar
    addItemUnique = (block: Block) : boolean => {
        const result = this.items.find(b => b.uid === block.uid)
        if(!result) this.items.push(block)
        return !result
    }
}
export default Book  