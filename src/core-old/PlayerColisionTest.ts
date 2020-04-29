import AbstractBaseBlock from "./AbstractBaseBlock";

const evalR = (b: AbstractBaseBlock, posX: number, posY: number) => (
    posX + 1 === b.pos.x &&
    (
        (b.pos.y <= posY && b.pos.y + 1 > posY) ||
        (b.pos.y < posY + 1 && b.pos.y + 1 >= posY + 1)
    ));

const evalL = (b: AbstractBaseBlock, posX: number, posY: number) => (
    posX - 1 === b.pos.x &&
    (
        (b.pos.y <= posY && b.pos.y + 1 > posY) ||
        (b.pos.y < posY + 1 && b.pos.y + 1 >= posY + 1)
    ));

const evalU = (b: AbstractBaseBlock, posX: number, posY: number) => (
    posY - 1 === b.pos.y &&
    (
        (b.pos.x <= posX && b.pos.x + 1 > posX) ||
        (b.pos.x < posX + 1 && b.pos.x + 1 >= posX + 1)
    ));

const evalD = (b: AbstractBaseBlock, posX: number, posY: number) => (
    posY + 1 === b.pos.y &&
    (
        (b.pos.x <= posX && b.pos.x + 1 > posX) ||
        (b.pos.x < posX + 1 && b.pos.x + 1 >= posX + 1)
    ));

class PlayerColisionTest {
    static filterToR =
        (posX: number, posY: number) =>
            (b: AbstractBaseBlock) =>
                evalR(b, posX, posY)

    static filterToL =
        (posX: number, posY: number) =>
            (b: AbstractBaseBlock) =>
                evalL(b, posX, posY)

    static filterToD =
        (posY: number, posX: number) =>
            (b: AbstractBaseBlock) =>
                evalD(b, posX, posY)

    static filterToU =
        (posY: number, posX: number) =>
            (b: AbstractBaseBlock) =>
                evalU(b, posX, posY)

    // crea un subset para no buscar en todos los blockes
    // con esto se crea un alista ya filtrada
    static info(blocks: AbstractBaseBlock[], posY: number, posX: number): any {
        const o = blocks.map((b: AbstractBaseBlock) => ({ pos: b.pos, type: b.type, tileKey: b.tileKey }))
        const filterSubset = o.filter((b: any) => {
            return evalL(b, posX, posY) || evalR(b, posX, posY) || evalU(b, posX, posY) || evalD(b, posX, posY)
        });

        return {
            u: filterSubset.filter((b: any) => evalU(b, posX, posY)) || [],
            d: filterSubset.filter((b: any) => evalD(b, posX, posY)) || [],
            l: filterSubset.filter((b: any) => evalL(b, posX, posY)) || [],
            r: filterSubset.filter((b: any) => evalR(b, posX, posY)) || [],
        };
    }
}

export default PlayerColisionTest;