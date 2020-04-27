import { Dim, Pos, BlockClassProp } from "./types";
import { Game } from "./Game";

abstract class AbstractBaseBlock {
    dim: Dim
    pos: Pos
    bgColor: string = 'green'
    blockSize: number;
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement = new Image();
    spriteId: string = 'grass';
    game: Game
    type: string='block';
    relativePlayerPos: 'u' | 'd' | 'r' | 'l' = 'd';

    constructor(props: BlockClassProp) {
        this.dim = props.dim || { x: 1, y: 1 };
        this.pos = props.pos;
        this.game = props.game;
        this.ctx = props.game.ctx
        this.blockSize = props.game.blockSize;
    }

    getSize = (n: number) => n * this.blockSize
    getPosX = () => this.getSize(this.pos.x)
    getPosY = () => this.getSize(this.pos.y)
    getDimX = () => this.getSize(this.dim.x)
    getDimY = () => this.getSize(this.dim.y)

    drawImage() {
        this.ctx.drawImage(this.image, this.getSize(this.pos.x), this.getSize(this.pos.y), this.getSize(this.dim.x), this.getSize(this.dim.y));
    }
}

export default AbstractBaseBlock;