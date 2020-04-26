import { Dim, Pos, BlockClassProp, IPlayer } from "./types";
import { Game } from "./Game";
import Block from "./Block";

class Player implements IPlayer {
    dim: Dim
    pos: Pos
    ctx: CanvasRenderingContext2D
    game: Game
    blockSize: number

    velocity: number = 0.1
    fpsImagePass: number = 100

    image: HTMLImageElement = new Image();
    imageId: string = 'grass';
    size: any = { a: 0, b: 0, c: 31, d: 31 }

    currentImgPass: number = 0;
    currentMov: number = 0;

    elements: Dim = { x: 3, y: 4 }
    elementSize: number = 31

    allowMove: boolean = true

    playMove: boolean = false;

    currentPosition : Dim = {x: 0, y: 0}

    constructor(props: BlockClassProp) {
        this.dim = props.dim || { x: 1, y: 1 };
        this.pos = props.pos || { x: 0, y: 0 };
        this.game = props.game;
        this.ctx = props.game.ctx
        this.blockSize = props.game.blockSize;
        this.imageId = props.imageId || 'tite-image'
        this.moveInterval()
    }

    create() {
        this.image = this.game.images[this.imageId].img;
        this.ctx.beginPath();
        this.drawImage();
        this.ctx.stroke();
    }

    update() { this.create() }

    getPos = (): Pos => this.pos
    setPos(pos: Pos) { this.pos = pos; }

    inputControl(data: any) {
        if (!this.allowMove) return;

        this.playMove = true;

        const dim = this.game.dim;
        // console.log(blocks);

        const x = Math.floor(this.pos.x)
        // se agrega un uno, para que tome la 
        // posicion de los pies del personaje
        const y = Math.floor(this.pos.y)
        //const cleanX = x < 0 ? 0 : x;
        this.currentPosition = { x, y }

        const blockSize = this.blockSize;
        const calcXWithVelAdd = (this.pos.x * blockSize) + this.velocity
        const calcYWithVelAdd = (this.pos.y * blockSize) + this.velocity
        const calcXWithVelSub = (this.pos.x * blockSize) - this.velocity
        const calcYWithVelSub = (this.pos.y * blockSize) - this.velocity
        const calcXEnd = (dim.x * blockSize) - blockSize
        const calcYEnd = (dim.y * blockSize) - blockSize

        // UP
        if (data['38']) {
            this.size.b = this.elementSize * 3
            const finalPos = calcYWithVelSub <= 0 ? this.pos.y : (this.pos.y - this.velocity);

            if (!this.searchBlock('up')) {
                this.pos.y = finalPos
            }
        }
        // L
        if (data['37']) {
            this.size.b = this.elementSize
            this.pos.x = calcXWithVelSub <= 0 ? this.pos.x : (this.pos.x - this.velocity);
        }
        // R
        if (data['39']) {
            this.size.b = this.elementSize * 2
            this.pos.x = calcXWithVelAdd >= calcXEnd ? this.pos.x : (this.pos.x + this.velocity);
        }
        // B
        if (data['40']) {
            this.size.b = 0
            const finalPos = calcYWithVelAdd >= calcYEnd ? this.pos.y : (this.pos.y + this.velocity);
        
            if (!this.searchBlock('down')) {
                this.pos.y = finalPos
            }

        }
        if (data['0']) { this.playMove = false; }

    }

    searchBlock = (p: string) => {
        return this.game.zAxys.block.find((b: Block) => {
            if (p === 'up') {
                return (b.pos.x === this.currentPosition.x &&
                    b.pos.y === this.currentPosition.y)
            }
            if (p === 'down') {
                return (b.pos.x === this.currentPosition.x &&
                    b.pos.y === this.currentPosition.y + 1)
            }
        })
    }

    drawImage() {
        this.size.d = this.image.height / this.elements.y
        this.size.c = this.image.width / this.elements.x

        this.selectStepMove()
        this.ctx.drawImage(this.image,
            this.size.a,
            this.size.b,
            this.size.c,
            this.size.d,
            (this.pos.x * this.blockSize),
            (this.pos.y * this.blockSize),
            this.blockSize,
            this.blockSize);
    }

    selectStepMove() {
        if (!this.playMove) return;
        if (this.currentImgPass === 0) { this.size.a = 0 }
        if (this.currentImgPass === 1) { this.size.a = this.elementSize }
        if (this.currentImgPass === 2) { this.size.a = this.elementSize * 2 }
        if (this.currentImgPass === 3) { this.size.a = this.elementSize }
    }
    moveInterval() {
        setInterval(() => {
            this.currentImgPass = this.currentImgPass === 3 ? 0 : this.currentImgPass + 1
        }, this.fpsImagePass)
    }
}

export default Player;