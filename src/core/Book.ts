import Block from "./Block"
import Debug from "./Debug"
import { Keys } from "./InputController"

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
    private externalItems: Block[] = []

    // X MENU
    // Y MENU
    xMenu: number = 0
    yMenu: number = 0

    toggle() {
        this.getDebug().getStatus() && console.log(this)
        this.visible = !this.visible
    }

    open() {
        this.getDebug().getStatus() && console.log(this)
        this.visible = true
    }
    getVisible = () => this.visible


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
        this.drawSelection()
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

        let sizeXExternal = this.x0 + this.getBz(3)
        let sizeYExternal = this.y0 + this.getBz(0.5)

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

        this.externalItems.forEach((b : Block ) => {
            b.setIsVisible(true)
            b.x= sizeXExternal
            b.y = sizeYExternal
            b.draw()
            b.drawInfo(b.x + this.getBz(1.25),sizeYExternal + this.getBz(0.375),this.getBz(0.25))
            sizeYExternal = sizeYExternal + this.getBz(1.25)
        })
    }

    drawSelection() {
        let sizeX = this.x0 + this.getBz(0.5)
        let sizeY = this.y0 + this.getBz(0.5)

        const xCalc = sizeX * (this.xMenu + 1)
        const yCalc = sizeY + (this.getBz(this.yMenu) + this.getBz(this.yMenu * 0.25))

        this.getContext().strokeStyle = 'red'
        this.getContext().strokeRect(
            xCalc,
            yCalc,
            this.getBz(1), this.getBz(1))
    }

    // Items
    addItem = (block: Block) => this.items.push(block)

    addExternalItem = (block: Block) => this.externalItems.push(block)
    removeAllExternalItems = () => { this.externalItems = [] }

    // agregamos items una sola vez, sin que se repita el uid
    // retorna falso si no se puede agregar
    addItemUnique = (block: Block) : boolean => {
        const result = this.items.find(b => b.uid === block.uid)
        if(!result) this.items.push(block)
        return !result
    }

    onMenuSelect(keys: Keys) {
        // Logica para un menu de 2x5
        // Menu
        if (keys.LEFT) {
            const prev = this.xMenu - 1
            this.xMenu = prev < 0 ? 0 : prev
        }
        if (keys.RIGHT) {
            const next = this.xMenu + 1
            const x = next > 1 ? 1 : next
            this.xMenu = x
        }

        if (keys.UP) {
            const prev = this.yMenu - 1
            const y = prev < 0 ? 0 : prev
            this.yMenu = y
        }
        if (keys.DOWN) {
            const next = this.yMenu + 1
            const y = next > 5 ? 5 : next
            this.yMenu = y
        }

        if(keys.SPACE) {
            this.onSelectItem()
        }
    }

    onSelectItem() {
        const isInternal = this.xMenu === 0
        const isExternal = this.xMenu === 1
        const index = this.yMenu

        if(isInternal) {
            console.log(this.items[index]); 
        }
        if(isExternal) {
            const item = this.externalItems[index]
            if(item) {
                item.onInMenuSelected()
            }
        }
    }
}
export default Book  