import Block from "./Block";

const evalR = (b: Block, posX: number, posY: number) => (
    posX + 1 === b.pos.x &&
    (
        (b.pos.y <= posY && b.pos.y + 1 > posY) ||
        (b.pos.y < posY + 1 && b.pos.y + 1 >= posY + 1)
));

const evalL = (b: Block, posX: number, posY: number) => (
    posX - 1 === b.pos.x &&
    (
        (b.pos.y <= posY && b.pos.y + 1 > posY) ||
        (b.pos.y < posY + 1 && b.pos.y + 1 >= posY + 1)
));

const evalU = (b: Block, posX: number, posY: number) => (
    posY - 1 === b.pos.y &&
    (
        (b.pos.x <= posX && b.pos.x + 1 > posX) ||
        (b.pos.x < posX + 1 && b.pos.x + 1 >= posX + 1)
));

const evalD = (b: Block, posX: number, posY: number) => (
    posY + 1 === b.pos.y &&
    (
        (b.pos.x <= posX && b.pos.x + 1 > posX) ||
        (b.pos.x < posX + 1 && b.pos.x + 1 >= posX + 1)
));

class PlayerColisionTest {
    static filterToR =
        (posX: number, posY: number) =>
        (b: Block) =>
        evalR(b, posX, posY)
    
    static filterToL =
        (posX: number, posY: number) =>
        (b: Block) =>
        evalL(b, posX, posY)

    static filterToD =
        (posY: number, posX: number) =>
        (b: Block) =>
        evalD(b, posX, posY)

    static filterToU =
        (posY: number, posX: number) =>
        (b: Block) =>
        evalU(b, posX, posY)

    // crea un subset para no buscar en todos los blockes
    // con esto se crea un alista ya filtrada
    static getSubsetToColision(blocks: Block[], posX: number, posY: number) : Block[] {
        const b = blocks.filter((b: Block) => {
            return evalU(b, posX, posY) || 
            evalD(b, posX, posY) || 
            evalL(b, posX, posY) || 
            evalR(b, posX, posY);
        });
        return b
    }
}

export default PlayerColisionTest;