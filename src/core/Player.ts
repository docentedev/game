import { Dim, Pos, BlockClassProp, IPlayer } from "./types";
import { Game } from "./Game";
import PlayerColisionTest from "./PlayerColisionTest";
import Sprite from "./Sprite";

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

    // donde esta minrando el player
    gazeDirection : 'u' | 'd' | 'l' | 'r' | 'c' = 'd'

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

    blocks: any = []
    items: any = []

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
        this.game.debug.getStatus() && this.ctx.rect(this.pos.x, this.pos.y, this.game.blockSize, this.game.blockSize)
        this.ctx.stroke();

        this.game.debug.display ({
            ...this.pos, ...this.getCurrentBlocks(),
            gazeDirection: this.gazeDirection,
            blocks: this.blocks,
            items: this.items,
        });
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
            if (result.moveUp)
            this.pos.y = this.pos.y - this.velocity;
        }
        if (data['37']) {
            this.gazeDirection = 'l'
            if(result.moveLeft)
            this.pos.x = this.pos.x - this.velocity
        }
        if (data['39']) {
            this.gazeDirection = 'r'
            if(result.moveRight)
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
        const s = new Sprite({
            image: this.image,
            map: {
                u0: { x: 96, y: 0},
                u1: { x: 96, y: 48},
                u2: { x: 96, y: 96},
                u3: { x: 96, y: 144},
                d0: { x: 0, y: 0},
                d1: { x: 0, y: 48},
                d2: { x: 0, y: 96},
                d3: { x: 0, y: 144},
                l0: { x: 48, y: 0},
                l1: { x: 48, y: 48},
                l2: { x: 48, y: 96},
                l3: { x: 48, y: 144},
                r0: { x: 144, y: 0},
                r1: { x: 144, y: 48},
                r2: { x: 144, y: 96},
                r3: { x: 144, y: 144},
            },
            ctx: this.ctx,
            blockSize: this.blockSize,
        })

        s.drawImage(`${this.gazeDirection}${this.currentImgPass}`, this.pos.x, this.pos.y)
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
    getWatchedGrids() {}

    arrIsVoid = (arr: any[]) : boolean => arr.length === 0
}

export default Player;