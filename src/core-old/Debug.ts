class Debug {
    private target : HTMLElement;
    private on: boolean = false

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

    getStatus() : boolean {
        return this.on;
    }

    display(data : any) {
        if (!this.on) return
        this.target.innerHTML = '';
        this.target.innerHTML = JSON.stringify(data, undefined, 2)
    }
}

export default Debug