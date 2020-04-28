import { Game } from "./Game"
import { IPlayer } from "./types"

type BagProps = {
    game: Game,
    player: IPlayer,
}

class Bag {
    game: Game
    player: IPlayer
    open: boolean = false

    constructor(props: BagProps) {
        this.game = props.game
        this.player = props.player
    }

    drawBag() {
        if (!this.open) return;
        const ctx = this.game.ctx;
        const bz = this.game.blockSize;
        const x = (bz * this.game.dim.x)
        const y = (bz * this.game.dim.y)

        const xBox = x / 4
        const yBox = y / 4

        ctx.fillStyle = 'rgba(0, 0, 0, 0.67)'
        ctx.fillRect(0, 0, x, y);

        ctx.fillStyle = '#CFD8DC'
        ctx.fillRect(
            xBox, yBox,
            x / 2,
            y / 2);

        ///////////////////////
        ctx.fillStyle = '#000000'
        ctx.font = `${bz/3}px Arial`;
        ctx.fillText("Acciones", xBox + (bz * bz/200), yBox + (bz * bz/100));

        ctx.font = `${bz/4}px Arial`;

        const allowItems = this.player.items
        const gzDir = this.player.gazeDirection

        let yMov = bz/45
        allowItems[gzDir].forEach((e : any) => {
            const _x = xBox + (bz * bz/200)
            const _y = yBox + (bz * yMov)

            ctx.fillText(e.type, _x, _y);
            this.game.sprites.sprites.drawImage(e.tileKey,_x, _y + (bz/10))
            yMov = yMov + (bz/30)
        });
        
    }

    toggleMenu() {
        this.open = !this.open
    }
}

export default Bag