import AbstractBlock from "./AbstractBlock"
import Debug from "./Debug"

class Book {
    visible: boolean = false
    ctx: CanvasRenderingContext2D | undefined
    debug: Debug | undefined
    bz: Function | undefined
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

    draw() {
        if (!this.visible) return;
        const ctx = this.getContext()
        const bz = (n : number) => this.getBz(n)
        this.drawBookOveralay(ctx, bz)
        this.drawBook(ctx, bz)
    }

    private drawBookOveralay(ctx: CanvasRenderingContext2D, bz: (n: number) => number) {
        const W = ctx.canvas.width
        const H = ctx.canvas.height
        ctx.fillStyle = '#00000070'
        ctx.fillRect(0, 0, W, H)
    }

    private drawBook(ctx: CanvasRenderingContext2D, bz: (n: number) => number) {
        const middleW = ctx.canvas.width / 2
        const middleBookW = bz(7) / 2
        const centerW = middleW - middleBookW
        const middleH = ctx.canvas.height / 2
        const middleBookH = bz(6) / 2
        const centerH = middleH - middleBookH
        ctx.fillStyle = '#ae978b'
        ctx.fillRect(centerW, centerH, bz(7), bz(6))

        this.items.forEach((b : AbstractBlock ) => {
            b.visible = true
            b.draw()
        })
    }
}
export default Book