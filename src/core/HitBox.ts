import Player from "./Player";
import AbstractBlock from "./AbstractBlock";
import { Keys } from "./InputController";

/*
HitBox Collision Box Axys
x,y ------ xe,y
|           |
|           |
|           |
x,ye------ xe,ye 
*/
class HitBox {
    finded: any[] = []

    detected(originalBlocks: AbstractBlock[], direction: Keys, player: Player) {
        const blocks = originalBlocks
            .map((b: AbstractBlock): AbstractBlock => {
                b.offCollision()
                return b;
            })

        const unitMov = player.getVelocity()
        if (direction.DOWN) {
            const toY = player.y + unitMov
            const toYE = toY + player.h
            const xe = player.x + player.w
            const x = player.x
            this.finded = blocks.filter((b: AbstractBlock) => {
                const bye = b.y + b.h
                const bx = b.x
                const by = b.y
                const bxe = b.x + b.w
                const yIntersect = bye > toYE && by < toYE
                const xIntersect = x > bx && x < bxe
                const xeIntersect = xe < bxe && xe > bx
                const blockInPlayer = x <= bx && xe >= bxe
                return (yIntersect && (xIntersect || xeIntersect || blockInPlayer))
            });
            
            if (this.finded.length === 0 && toYE <= player.getHCanvas()) {
                player.y = toY
            }
        }
        if (direction.UP) {
            const toY = player.y - unitMov;
            const xe = player.x + player.w
            const x = player.x
            this.finded = blocks.filter((b: AbstractBlock) => {
                const bye = b.y + b.h
                const bx = b.x
                const by = b.y
                const bxe = b.x + b.w
                const yIntersect = bye > toY && by < toY
                const xIntersect = x > bx && x < bxe
                const xeIntersect = xe < bxe && xe > bx
                const blockInPlayer = x <= bx && xe >= bxe
                return (yIntersect && (xIntersect || xeIntersect || blockInPlayer))
            });

            if (this.finded.length === 0 && toY >= 0) {
                player.y = toY
            }
        }
        if (direction.LEFT) {
            //console.log(dimPos, blocks, direction);
            const toX = player.x - unitMov;
            const ye = player.y + player.h
            const y = player.y
            // buscamos colisiones
            this.finded = blocks.filter((b: AbstractBlock) => {
                const bxe = b.x + b.w
                const bx = b.x
                const by = b.y
                const bye = b.y + b.h

                // comprobacion player eje X intersecta con bloque en eje X
                const xIntersect = bxe > toX && bx < toX
                // comprobacion player eje Y estas dentro de un bloque
                const yIntersect = y > by && y < bye
                // comprobacion player eje Y Inferior estas dentro de un bloque
                const yeIntersect = ye < bye && ye > by
                // comprobacion bloque esta dentro del player en eje Y
                const blockInPlayer = y <= by && ye >= bye

                return (xIntersect && (yIntersect || yeIntersect || blockInPlayer))
            });

            // solo si no intersecto con bloques y aun esta dentro de limite X de Grid
            if (this.finded.length === 0 && toX >= 0) {
                player.x = toX
            }
        }
        if (direction.RIGHT) {
            const toX = player.x + unitMov
            const toXE = toX + player.w
            const ye = player.y + player.h
            const y = player.y
            this.finded = blocks.filter((b: AbstractBlock) => {
                const bxe = b.x + b.w
                const bx = b.x
                const by = b.y
                const bye = b.y + b.h
                const xIntersect = bxe > toXE && bx < toXE
                const yIntersect = y > by && y < bye
                const yeIntersect = ye < bye && ye > by
                const blockInPlayer = y <= by && ye >= bye
                return (xIntersect && (yIntersect || yeIntersect || blockInPlayer))
            });

            if (this.finded.length === 0 && toXE <= player.getWCanvas()) {
                player.x = toX
            }
        }

        if (this.finded.length > 0) {
            this.finded.forEach((e: AbstractBlock) => {
                e.onCollision()
            })
        }
    }
}

export default HitBox