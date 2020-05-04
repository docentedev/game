import Player from "./Player";
import Block from "./Block";
import { Keys, EnumMovePosition } from "./InputController";

/*
HitBox Collision Box Axys
x,y ------ xe,y
|           |
|           |
|           |
x,ye------ xe,ye 
*/
class HitBox {
    lastPosition: string = 'DOWN';
    finded: any[] = []
    items: any = {
        [EnumMovePosition.DOWN]: [],
    }

    detected(originalBlocks: Block[], direction: Keys, player: Player, callbackOpenMenu: Function) {

        // filtrar por bloques visiles y colisionables
        const blocks: Block[] = originalBlocks.filter((b: Block): boolean => {
            return b.getIsVisible()
        })

        const collisionableBlocks: Block[] = blocks.filter((b: Block): boolean => {
            return b.getCollision()
        })

        const unitMov = player.getVelocity()
        if (direction.DOWN) {
            const toY = player.y + unitMov
            const toYE = toY + player.h
            this.finded = collisionableBlocks.filter(this.filterDOWN(toYE, player.x, (player.x + player.w)));
            if (this.finded.length === 0 && toYE <= player.getHCanvas()) { player.y = toY }

            this.lastPosition = EnumMovePosition.DOWN
        }
        if (direction.UP) {
            const toY = player.y - unitMov;
            this.finded = collisionableBlocks.filter(this.filterUP(toY, player.x, (player.x + player.w)));
            if (this.finded.length === 0 && toY >= 0) { player.y = toY }

            this.lastPosition = EnumMovePosition.UP
        }
        if (direction.LEFT) {
            const toX = player.x - unitMov;
            // buscamos colisiones
            this.finded = collisionableBlocks.filter(this.filterLEFT(toX, player.y, (player.y + player.h)));
            // solo si no intersecto con bloques y aun esta dentro de limite X de Grid
            if (this.finded.length === 0 && toX >= 0) { player.x = toX }

            this.lastPosition = EnumMovePosition.LEFT
        }
        if (direction.RIGHT) {
            const toX = player.x + unitMov
            const toXE = toX + player.w
            this.finded = collisionableBlocks.filter(this.filterRIGHT(toXE, player.y, (player.y + player.h)));
            if (this.finded.length === 0 && toXE <= player.getWCanvas()) { player.x = toX }

            this.lastPosition = EnumMovePosition.RIGHT
        }

        // Deteccion para items seguin la ultima posicion donde
        // el personaje miro
        if (direction.SPACE) {
            this.items[EnumMovePosition.DOWN] = []
            this.items[EnumMovePosition.LEFT] = []
            this.items[EnumMovePosition.RIGHT] = []
            this.items[EnumMovePosition.UP] = []

            const toY = player.y + unitMov
            const toYE = toY + player.h

            if (this.lastPosition === EnumMovePosition.DOWN) {
                this.items[EnumMovePosition.DOWN] = blocks.filter(this.filterDOWNFindItems(toYE, player.x, (player.x + player.w), unitMov));
            }
            if (this.lastPosition === EnumMovePosition.LEFT) {
                const toX = player.x - unitMov
                this.items[EnumMovePosition.LEFT] = blocks.filter(this.filterLEFTFindItems(toX, player.y, (player.y + player.h), unitMov));
            }
            if (this.lastPosition === EnumMovePosition.RIGHT) {
                const toX = player.x + unitMov
                const toXE = toX + player.w
                this.items[EnumMovePosition.RIGHT] = blocks.filter(this.filterRIGHTFindItems(toXE, player.y, (player.y + player.h), unitMov));
            }
            if (this.lastPosition === EnumMovePosition.UP) {
                const toY = player.y - unitMov;
                this.items[EnumMovePosition.UP] = blocks.filter(this.filterUPFindItems(toY, player.x, (player.x + player.w), unitMov));
            }
            callbackOpenMenu(this.lastPosition, this.items);
        }

        //if (this.finded.length > 0) {
        //    this.finded.forEach((e: Block) => e.onCollision())
        //}
    }

    private filterDOWN(toYE: number, x: number, xe: number): (value: Block, index: number, array: Block[]) => boolean {
        return (b: Block): boolean => {
            const bye = b.y + b.h;
            const bx = b.x;
            const by = b.y;
            const bxe = b.x + b.w;
            const yIntersect = bye > toYE && by < toYE;
            const xIntersect = x > bx && x < bxe;
            const xeIntersect = xe < bxe && xe > bx;
            const blockInPlayer = x <= bx && xe >= bxe;
            return (yIntersect && (xIntersect || xeIntersect || blockInPlayer));
        };
    }

    private filterDOWNFindItems(toYE: number, x: number, xe: number, unitMov: number): (value: Block, index: number, array: Block[]) => boolean {
        return (b: Block): boolean => {
            const bye = b.y + b.h;
            const bx = b.x;
            const by = b.y;
            const bxe = b.x + b.w;
            const yIntersect = bye > toYE + unitMov && by < toYE + unitMov;
            const xIntersect = x > bx && x < bxe;
            const xeIntersect = xe < bxe && xe > bx;
            const blockInPlayer = x <= bx && xe >= bxe;
            return (yIntersect && (xIntersect || xeIntersect || blockInPlayer));
        };
    }

    private filterLEFT(toX: number, y: number, ye: number): (value: Block, index: number, array: Block[]) => boolean {
        return (b: Block): boolean => {
            const bxe = b.x + b.w;
            const bx = b.x;
            const by = b.y;
            const bye = b.y + b.h;
            // comprobacion player eje X intersecta con bloque en eje X
            const xIntersect = bxe > toX && bx < toX;
            // comprobacion player eje Y estas dentro de un bloque
            const yIntersect = y > by && y < bye;
            // comprobacion player eje Y Inferior estas dentro de un bloque
            const yeIntersect = ye < bye && ye > by;
            // comprobacion bloque esta dentro del player en eje Y
            const blockInPlayer = y <= by && ye >= bye;
            return (xIntersect && (yIntersect || yeIntersect || blockInPlayer));
        };
    }

    private filterLEFTFindItems(toX: number, y: number, ye: number, unitMov: number): (value: Block, index: number, array: Block[]) => boolean {
        return (b: Block): boolean => {
            const bxe = b.x + b.w;
            const bx = b.x;
            const by = b.y;
            const bye = b.y + b.h;
            const xIntersect = bxe > toX - unitMov && bx < toX - unitMov;
            const yIntersect = y > by && y < bye;
            const yeIntersect = ye < bye && ye > by;
            const blockInPlayer = y <= by && ye >= bye;
            return (xIntersect && (yIntersect || yeIntersect || blockInPlayer));
        };
    }

    private filterRIGHT(toXE: number, y: number, ye: number): (value: Block, index: number, array: Block[]) => boolean {
        return (b: Block): boolean => {
            const bxe = b.x + b.w;
            const bx = b.x;
            const by = b.y;
            const bye = b.y + b.h;
            const xIntersect = bxe > toXE && bx < toXE;
            const yIntersect = y > by && y < bye;
            const yeIntersect = ye < bye && ye > by;
            const blockInPlayer = y <= by && ye >= bye;
            return (xIntersect && (yIntersect || yeIntersect || blockInPlayer));
        };
    }

    private filterRIGHTFindItems(toXE: number, y: number, ye: number, unitMov: number): (value: Block, index: number, array: Block[]) => boolean {
        return (b: Block): boolean => {
            const bxe = b.x + b.w;
            const bx = b.x;
            const by = b.y;
            const bye = b.y + b.h;
            const xIntersect = bxe > toXE + unitMov && bx < toXE + unitMov;
            const yIntersect = y > by && y < bye;
            const yeIntersect = ye < bye && ye > by;
            const blockInPlayer = y <= by && ye >= bye;
            return (xIntersect && (yIntersect || yeIntersect || blockInPlayer));
        };
    }

    private filterUP(toY: number, x: number, xe: number): (value: Block, index: number, array: Block[]) => boolean {
        return (b: Block): boolean => {
            const bye = b.y + b.h;
            const bx = b.x;
            const by = b.y;
            const bxe = b.x + b.w;
            const yIntersect = bye > toY && by < toY;
            const xIntersect = x > bx && x < bxe;
            const xeIntersect = xe < bxe && xe > bx;
            const blockInPlayer = x <= bx && xe >= bxe;
            return (yIntersect && (xIntersect || xeIntersect || blockInPlayer));
        };
    }

    private filterUPFindItems(toY: number, x: number, xe: number, unitMov: number): (value: Block, index: number, array: Block[]) => boolean {
        return (b: Block): boolean => {
            const bye = b.y + b.h;
            const bx = b.x;
            const by = b.y;
            const bxe = b.x + b.w;
            const yIntersect = bye > toY - unitMov && by - unitMov < toY;
            const xIntersect = x > bx && x < bxe;
            const xeIntersect = xe < bxe && xe > bx;
            const blockInPlayer = x <= bx && xe >= bxe;
            return (yIntersect && (xIntersect || xeIntersect || blockInPlayer));
        };
    }
}

export default HitBox