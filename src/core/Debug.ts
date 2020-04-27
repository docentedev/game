class Debug {
    private target : HTMLElement;
    private on: boolean = false

    constructor() {
        this.target = document.createElement('pre');
        this.target.style.backgroundColor = '#ffffff'
        this.target.style.fontSize = '10px'
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