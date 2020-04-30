import AbstractGame, { GameProps } from "./AbstractGame"
import AbstractBlock from "./AbstractBlock"
import Player from "./Player";
import HitBox from "./HitBox";
import Sprite, { SpriteObj } from "./Sprite";
import ImagesLoader from "./ImageLoader";

class Game extends AbstractGame {

    images: ImagesLoader
    blocks: AbstractBlock[] = []
    player: Player | undefined;
    hitBox: HitBox
    sprites: SpriteObj = {}

    constructor(props: GameProps) {
        super(props)
        this.images = new ImagesLoader()
        this.hitBox = new HitBox()
        this.canvasCreate()
    }

    start() {
        this.create()
        this.loop(this.update)
    }

    private create = () => {
        this.onCollision()
    }

    private update = () => {
        this.drawClear()
        this.drawGrid()
        this.drawBlocks()
        this.drawPlayer()
        this.loop(this.update)
    }

    addSprite(key: string, sprite: Sprite) {
        sprite.setContext(this.ctx)
        this.sprites[key] = sprite
    }

    addBlock(block: AbstractBlock) : AbstractBlock {
        block.setDebug(this.debug)
        block.setContext(this.ctx)
        this.blocks.push(block)
        return block
    }

    addPlayer(player: Player) {
        player.setDebug(this.debug)
        player.setContext(this.ctx)
        player.setSizeCanvas(this.w, this.h)
        this.player = player
    }

    private drawBlocks() {
        this.blocks.forEach((block: AbstractBlock) => {
            block.draw()
        })
    }

    private drawPlayer() {
        if (this.player) {
            this.player.draw();
        }
    }

    getBlocks() {
        return this.blocks;
    }

    onCollision() {
        if (this.player) {
            this.player.addBlocks(this.blocks)
            this.player.addHitBox(this.hitBox)
        }
    }

    // retorna medidas dependiendo del block size
    bz = (n: number) => n * this.blockSize
}

export default Game