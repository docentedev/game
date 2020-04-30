class Debug {
    private target: HTMLElement;
    private on: boolean = false
    ctx: CanvasRenderingContext2D | null = null

    constructor() {
        this.target = document.createElement('pre');
        this.target.style.backgroundColor = 'rgba(255,255,255,0.4)'
        this.target.style.fontSize = '10px'
        this.target.style.position = 'absolute'
        this.target.style.top = '0'
        this.target.style.left = '0'
        document.body.appendChild(this.target);
    }

    onDebug() {
        this.on = true;
    }

    offDebug() {
        this.on = false;
    }

    getStatus(): boolean {
        return this.on;
    }

    display(data: any) {
        if (!this.on) return
        this.target.innerHTML = '';
        this.target.innerHTML = JSON.stringify(data, undefined, 2)
    }

    setContext = (ctx: CanvasRenderingContext2D) => this.ctx = ctx
    getContext(): CanvasRenderingContext2D {
        if (this.ctx) return this.ctx;
        throw new Error("getContextError")
    }

    drawBox(x: number, y: number, h: number, w: number, color: string = '#2e2222') {
        if (!this.on) return
        this.getContext().lineWidth = 0.5
        this.getContext().strokeStyle = color
        this.getContext().strokeRect(x, y, h, w)
    }

    static getRandomColor() : string {
        const items = ['#F44336', '#9C27B0', '#3F51B5', '#FFC107', '#795548'];
        return items[Math.floor(Math.random() * items.length)];
    }
}

export default Debug