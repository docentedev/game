import { Dim, Pos, BlockClassProp, IPlayer } from "./types";
import { Game } from "./Game";

class Player implements IPlayer {
    dim: Dim
    pos: Pos
    ctx: CanvasRenderingContext2D
    game: Game
    blockSize: number

    velocity: number = 0.08
    fpsImagePass: number = 200

    bgColor: string
    image: HTMLImageElement = new Image();
    imageId: string = 'grass';
    bgInitColor: string = 'magenta'
    size: any = { a: 0, b: 0, c: 30, d: 30 }

    currentImgPass: number = 0;
    currentMov: number = 0;

    allowMove: boolean = true

    playMove: boolean = false;

    constructor(props: BlockClassProp) {
        this.dim = props.dim || { x: 1, y: 1 };
        this.pos = props.pos || { x: 0, y: 0 };
        this.game = props.game;
        this.ctx = props.game.ctx
        this.blockSize = props.game.blockSize;
        this.bgColor = this.bgInitColor;
        this.imageId = props.imageId || 'tite-image'

        this.moveInterval()
    }

    create() {
        this.image = this.game.images[this.imageId].img;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.bgColor;
        this.drawImage();
        this.ctx.stroke();
    }

    update() {
        // this.pos.x = this.pos.x - 0.01;
        this.create()
    }

    getPos(): Pos {
        return this.pos;
    }

    setPos(pos: Pos) {
        this.pos = pos;
    }

    inputControl(data: any) {
        this.playMove = true;

        const dim = this.game.dim;
        const blockSize = this.blockSize;
        const calcXWithVelAdd = (this.pos.x * blockSize) + this.velocity
        const calcYWithVelAdd = (this.pos.y * blockSize) + this.velocity
        const calcXWithVelSub = (this.pos.x * blockSize) - this.velocity
        const calcYWithVelSub = (this.pos.y * blockSize) - this.velocity
        const calcXEnd = (dim.x * blockSize) - blockSize
        const calcYEnd = (dim.y * blockSize) - blockSize


        if (!this.allowMove) return;

        // UP
        if (data['38']) {
            this.size.b = 96
            this.pos.y = calcYWithVelSub <= 0 ? this.pos.y : (this.pos.y - this.velocity);
        }
        // L
        if (data['37']) {
            this.size.b = 32
            this.pos.x = calcXWithVelSub <= 0 ? this.pos.x : (this.pos.x - this.velocity);
        }
        // R
        if (data['39']) {
            this.size.b = 64
            this.pos.x = calcXWithVelAdd >= calcXEnd ? this.pos.x : (this.pos.x + this.velocity);
        }
        // B
        if (data['40']) {
            this.size.b = 0
            this.pos.y = calcYWithVelAdd >= calcYEnd ? this.pos.y : (this.pos.y + this.velocity);
        }
        if (data['0']) {
            this.playMove = false;
            this.bgColor = this.bgInitColor
        }
    }

    drawImage() {
        this.size.c = this.image.height / 8
        this.size.d = this.image.width / 12
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
        if (this.playMove) {
            if (this.currentImgPass === 0) {
                this.size.a = 0
            }
            if (this.currentImgPass === 1) {
                this.size.a = 32
            }
            if (this.currentImgPass === 2) {
                this.size.a = 64
            }
            if (this.currentImgPass === 3) {
                this.size.a = 32
            }
        }
    }
    moveInterval() {
        setInterval(() => {
            this.currentImgPass = this.currentImgPass === 3 ? 0 : this.currentImgPass + 1
        }, this.fpsImagePass)
    }
}

export default Player;