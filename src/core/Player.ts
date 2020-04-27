import { Dim, Pos, BlockClassProp, IPlayer } from "./types";
import { Game } from "./Game";
import Block from "./Block";
import PlayerColisionTest from "./PlayerColisionTest";

class Player implements IPlayer {

    // CONFIGURABLES
    // tamaño del blocker de sprite del player
    imageTileSize: number = 48

    dim: Dim
    pos: Pos
    ctx: CanvasRenderingContext2D
    game: Game
    blockSize: number

    velocity: number = 1 / 10
    fpsImagePass: number = 200

    image: HTMLImageElement = new Image();
    imageId: string = 'grass';
    size: any = { a: 0, b: 0, c: 31, d: 31 }

    // donde esta minrando el player
    gazeDirection : 'u' | 'b' | 'l' | 'r' | 'c' = 'b'

    // el paso de la imagen para animar
    currentImgPass: number = 0;

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
        this.imageId = props.imageId || 'player_01'
        this.velocity = this.velocity * this.blockSize

        this.getCurrentBlocks();
        this.moveInterval()
    }

    create() {
        this.image = this.game.images[this.imageId].img;
        this.ctx.beginPath();
        this.drawImage();
        this.game.debugMode && this.ctx.rect(this.pos.x, this.pos.y, this.game.blockSize, this.game.blockSize)
        this.ctx.stroke();
        this.addInfo()

        this.text = {
            ...this.pos, ...this.getCurrentBlocks(),
            u: this.adjacentBlocks.up.map((b: Block) => b.pos),
            d: this.adjacentBlocks.down.map((b: Block) => b.pos),
            l: this.adjacentBlocks.left.map((b: Block) => b.pos),
            r: this.adjacentBlocks.right.map((b: Block) => b.pos),
            gazeDirection: this.gazeDirection,
        }
    }

    update() { this.create() }

    getPos = (): Pos => this.pos
    setPos(pos: Pos) { this.pos = pos; }

    inputControl(data: any) {
        if (!this.allowMove) return;
        const result = this.getCurrentBlocks();
        this.playMove = true;

        if (data['38']) {
            this.gazeDirection = 'u'
            this.size.b = this.imageTileSize * 2
            if (result.moveUp)
            this.pos.y = this.pos.y - this.velocity;
        }
        if (data['37']) {
            this.gazeDirection = 'l'
            this.size.b = this.imageTileSize
            if(result.moveLeft)
            this.pos.x = this.pos.x - this.velocity
        }
        if (data['39']) {
            this.gazeDirection = 'r'
            this.size.b = this.imageTileSize * 3
            if(result.moveRight)
            this.pos.x = this.pos.x + this.velocity
        }

        // paso
        if (data['40']) {
            this.gazeDirection = 'b' // direccion de mirada
            this.size.b = 0 // asignacion de animacion
            if (result.moveDown) // control de colision
            this.pos.y = this.pos.y + this.velocity;// moverse
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
            // U
            this.adjacentBlocks.up = this.game.zAxys.block.filter(PlayerColisionTest.filterToU(posY, posX)) || []
            moveUp = this.adjacentBlocks.up.length === 0;
            // D
            this.adjacentBlocks.down = this.game.zAxys.block.filter(PlayerColisionTest.filterToD(posY, posX)) || []
            moveDown = this.adjacentBlocks.down.length === 0;
            // R
            this.adjacentBlocks.right = this.game.zAxys.block.filter(PlayerColisionTest.filterToR(posX, posY)) || []
            moveRight = this.adjacentBlocks.right.length === 0;
            // L
            this.adjacentBlocks.left = this.game.zAxys.block.filter(PlayerColisionTest.filterToL(posX, posY)) || []
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

    toFixed = (n: number) => Number.parseFloat(n.toFixed(2))

    drawImage() {
        this.selectStepMove()
        this.ctx.drawImage(this.image,
            this.size.b, this.size.a,
            this.imageTileSize, this.imageTileSize,
            this.pos.x, this.pos.y,
            this.blockSize, this.blockSize);
    }

    selectStepMove() {
        if (!this.playMove) return;
        if (this.currentImgPass === 0) { this.size.a = 0 }
        if (this.currentImgPass === 1) { this.size.a = this.imageTileSize }
        if (this.currentImgPass === 2) { this.size.a = this.imageTileSize * 2 }
        if (this.currentImgPass === 3) { this.size.a = this.imageTileSize }
    }
    moveInterval() {
        setInterval(() => {
            this.currentImgPass = this.currentImgPass === 3 ? 0 : this.currentImgPass + 1
        }, this.fpsImagePass)
    }

    /**
     * Funcion que retorna las posiciones del grid observadas por el player
     * para esto se evalua 'gazePosition' y que bloques estan en colision
     */
    getWatchedGrids() {}
    // ONLY DEBUG
    addInfo() {
        const e = document.getElementById('info')
        if (this.game.debugMode && e) {
            e.innerHTML = JSON.stringify(this.text, undefined, 2)
        }
    }
}

export default Player;