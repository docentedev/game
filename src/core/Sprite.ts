import { SpriteMap } from "./types";
import { Game } from "./Game";

export interface SpriteResource {
    key: string,
    imageTileSize: number,
    imageKey: string,
    map: SpriteMap,
}

interface SpriteProps {
    game: Game
    image: HTMLImageElement,
    map: SpriteMap,
    blockSize: number,
    imageTileSize: number,
}

class Sprite {
    image: HTMLImageElement;
    map: SpriteMap
    game: Game
    imageTileSize: number
    blockSize: number;

    constructor(props: SpriteProps) {
        this.image = props.image
        this.map = props.map
        this.game = props.game
        this.imageTileSize = props.imageTileSize
        this.blockSize = props.blockSize
    }

    drawImage(key: string, posX: number, posY: number) {
        this.game.ctx.drawImage(this.image,
            this.map[key].x, this.map[key].y,
            this.imageTileSize, this.imageTileSize,
            posX, posY,
            this.blockSize, this.blockSize);
    }
}

export default Sprite;