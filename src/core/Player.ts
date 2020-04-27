import { Dim, Pos, BlockClassProp, IPlayer } from "./types";
import { Game } from "./Game";
import PlayerColisionTest from "./PlayerColisionTest";

class Player implements IPlayer {
    dim: Dim
    pos: Pos
    game: Game

    velocity: number = 1 / 10
    fpsImagePass: number = 200

    spriteId: string = '';

    // donde esta minrando el player
    gazeDirection: 'u' | 'd' | 'l' | 'r' | 'c' = 'd'

    // el paso de la imagen para animar
    currentImgPass: number = 0;

    allowMove: boolean = true
    playMove: boolean = false;

    blocks: any = []
    items: any = []

    constructor(props: BlockClassProp) {
        this.dim = props.dim || { x: 1, y: 1 };
        this.pos = props.pos || { x: 0, y: 0 };
        this.game = props.game;
        this.game.blockSize = props.game.blockSize;
        this.spriteId = props.spriteId || 'player01'
        this.velocity = this.velocity * this.game.blockSize

        this.getCurrentBlocks();
        this.moveInterval()
    }

    create() {
        this.game.ctx.beginPath();
        this.drawImage();
        this.game.debug.getStatus() && this.game.ctx.rect(this.pos.x, this.pos.y, this.game.blockSize, this.game.blockSize)
        this.game.ctx.stroke();

        this.game.debug.display({
            ...this.pos, ...this.getCurrentBlocks(),
            gazeDirection: this.gazeDirection,
            blocks: this.blocks,
            items: this.items,
        });
    }

    update() { this.create() }

    inputControl(data: any) {
        if (!this.allowMove) return;
        const result = this.getCurrentBlocks();
        this.playMove = true;

        if (data['38']) {
            this.gazeDirection = 'u'
            if (result.moveUp)
                this.pos.y = this.pos.y - this.velocity;
        }
        if (data['37']) {
            this.gazeDirection = 'l'
            if (result.moveLeft)
                this.pos.x = this.pos.x - this.velocity
        }
        if (data['39']) {
            this.gazeDirection = 'r'
            if (result.moveRight)
                this.pos.x = this.pos.x + this.velocity
        }

        // paso
        if (data['40']) {
            this.gazeDirection = 'd' // direccion de mirada
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
            debugger
            const arrIsVoid = this.arrIsVoid;
            this.blocks = PlayerColisionTest.info(this.game.zAxys.block, posY, posX);
            this.items = PlayerColisionTest.info(this.game.zAxys.item, posY, posX);
            // U
            moveUp = arrIsVoid(this.blocks.u) && arrIsVoid(this.items.u)
            // D
            moveDown = arrIsVoid(this.blocks.d) && arrIsVoid(this.items.d)
            // R
            moveRight = arrIsVoid(this.blocks.r) && arrIsVoid(this.items.r)
            // L
            moveLeft = arrIsVoid(this.blocks.l) && arrIsVoid(this.items.l)

            // LIMITS
            if ((posXLast >= this.game.dim.x)) { moveRight = false; }
            if (posX <= 0) { moveLeft = false; }
            if (posY <= 0) { moveUp = false; }
            if (posYLast >= this.game.dim.y) { moveDown = false; }
        }

        // PROPS
        return { moveUp, moveDown, moveLeft, moveRight }
    }

    drawImage() {
        this.game.sprites[this.spriteId]
            .drawImage(`${this.gazeDirection}${this.currentImgPass}`,
                this.pos.x,
                this.pos.y)
    }

    moveInterval() {
        setInterval(() => {
            if (this.playMove) {
                this.currentImgPass = this.currentImgPass === 3 ? 0 : this.currentImgPass + 1
            }
        }, this.fpsImagePass)
    }

    /**
     * Funcion que retorna las posiciones del grid observadas por el player
     * para esto se evalua 'gazePosition' y que bloques estan en colision
     */
    getWatchedGrids() { }

    arrIsVoid = (arr: any[]): boolean => arr.length === 0
}

export default Player;