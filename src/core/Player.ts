import { Dim, Pos, BlockClassProp, IPlayer } from "./types";
import { Game } from "./Game";
import Block from "./Block";

class Player implements IPlayer {
    dim: Dim
    pos: Pos
    ctx: CanvasRenderingContext2D
    game: Game
    blockSize: number

    velocity: number = 1 / 10
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

    adjacentBlocks: any = {
        up: [],
        down: [],
        left: [],
        right: [],
    }
    text: any = {}

    constructor(props: BlockClassProp) {
        this.dim = props.dim || { x: 1, y: 1 };
        this.pos = props.pos || { x: 0, y: 0 };
        this.game = props.game;
        this.ctx = props.game.ctx
        this.blockSize = props.game.blockSize;
        this.imageId = props.imageId || 'tite-image'
        this.velocity = this.velocity * this.blockSize;

        this.getCurrentBlocks();
        this.moveInterval()
    }

    create() {
        this.image = this.game.images[this.imageId].img;
        this.ctx.beginPath();
        // this.drawImage();
        this.ctx.fillRect(this.pos.x, this.pos.y, this.game.blockSize, this.game.blockSize)
        this.ctx.stroke();
        this.addInfo()

        this.text = {
            ...this.pos, ...this.getCurrentBlocks(),
            u: this.adjacentBlocks.up.map((b: Block) => b.pos),
            d: this.adjacentBlocks.down.map((b: Block) => b.pos),
            l: this.adjacentBlocks.left.map((b: Block) => b.pos),
            r: this.adjacentBlocks.right.map((b: Block) => b.pos),
        }
    }

    update() { this.create() }

    getPos = (): Pos => this.pos
    setPos(pos: Pos) { this.pos = pos; }

    inputControl(data: any) {
        if (!this.allowMove) return;
        const result = this.getCurrentBlocks();
        this.playMove = true;

        if (data['38'] && result.moveUp) {
            this.size.b = this.elementSize * 3
            this.pos.y = this.pos.y - this.velocity;
        }
        if (data['37'] && result.moveLeft) {
            this.size.b = this.elementSize
            this.pos.x = this.pos.x - this.velocity
        }
        if (data['39'] && result.moveRight) {
            this.size.b = this.elementSize * 2
            this.pos.x = this.pos.x + this.velocity
        }
        if (data['40'] && result.moveDown) {
            this.size.b = 0
            this.pos.y = this.pos.y + this.velocity;

        }
        if (data['0']) { this.playMove = false; }

    }

    getCurrentBlocks = () => {
        const posX = this.pos.x / this.game.blockSize
        const posY = this.pos.y / this.game.blockSize
        const posXLast = (this.pos.x + this.game.blockSize) / this.game.blockSize
        const posYLast = (this.pos.y + this.game.blockSize) / this.game.blockSize

        let moveRight = true;
        let moveLeft = true;
        let moveUp = true;
        let moveDown = true;

        if (this.game.zAxys) {

            // eval if is posible move to moveRight
            this.adjacentBlocks.right = this.game.zAxys.block.filter(this.filterToR(posX, posY, posYLast)) || []
            moveRight = this.adjacentBlocks.right.length === 0;

            this.adjacentBlocks.left = this.game.zAxys.block.filter(this.filterToL(posX, posY, posYLast)) || []
            moveLeft = this.adjacentBlocks.left.length === 0;

            // LIMITS
            if ((posXLast >= this.game.dim.x)) { moveRight = false; }
            if (posX <= 0) { moveLeft = false; }
            if (posY <= 0) { moveUp = false; }
            if (posYLast >= this.game.dim.y) { moveDown = false; }
        }


        // PROPS
        return { posX, posY, posXLast, posYLast, moveUp, moveDown, moveLeft, moveRight }
    }


    filterToR = (posX: number, posY: number, posYLast: number) => (b: Block) => {
        return (
            posX + 1 === b.pos.x &&
            (
                (b.pos.y <= posY && b.pos.y + 1 > posY) ||
                (b.pos.y < posYLast && b.pos.y + 1 >= posYLast)
            ));
    }

    filterToL = (posX: number, posY: number, posYLast: number) => (b: Block) => {
        return (
            posX - 1 === b.pos.x &&
            (
                (b.pos.y <= posY && b.pos.y + 1 > posY) ||
                (b.pos.y < posYLast && b.pos.y + 1 >= posYLast)
            ));
    }

    toFixed = (n: number) => Number.parseFloat(n.toFixed(2))

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

    addInfo() {
        const e = document.getElementById('info')
        if (e) {
            e.innerHTML = JSON.stringify(this.text, undefined, 2)
        }
    }
}

export default Player;