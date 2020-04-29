import { Dim, Pos, BlockClassProp } from "./types";
import { Game } from "./Game";

abstract class AbstractBaseBlock {
    dim: Dim
    pos: Pos
    ctx: CanvasRenderingContext2D;
    spriteKey: string = 'grass';
    tileKey? : string
    game: Game
    type: string = 'block';
    relativePlayerPos: 'u' | 'd' | 'r' | 'l' = 'd';

    constructor(props: BlockClassProp) {
        this.dim = { x: 1, y: 1 };
        this.pos = props.pos;
        this.type = props.type || 'block';
        this.game = props.game;
        this.ctx = props.game.ctx
    }

    getSize = (n: number) => n * this.game.blockSize
    getPosX = () => this.getSize(this.pos.x)
    getPosY = () => this.getSize(this.pos.y)
    getDimX = () => this.getSize(this.dim.x)
    getDimY = () => this.getSize(this.dim.y)

}

export default AbstractBaseBlock;