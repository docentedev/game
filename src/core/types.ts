import { Game } from "./Game"

export type Dim = {
    x: number,
    y: number,
}

/**
 * Las medidas son multiplicadas por el block size
 */
export type Pos = {
    x: number,
    y: number,
}

export interface IPlayer {
    dim: Dim
    pos: Pos
    game: Game
    velocity: number,
    create(): void,
    update(): void,
    inputControl(data: any): void,
}

export type ZAxys = {
    grid: any[],
    grown: any[],
    player: IPlayer,
    block: any[],
    item: any[],
    NPC: any[],
    msg: any[],
}

export type BlockProp = {
    dim?: Dim, pos: Pos
}

export type BlockClassProp = {
    game: Game, dim?: Dim, pos: Pos, spriteId?: string,
}

export type ImageResourceData = {
    key: string,
    src: string,
}

export type ImageResource = {
    status: boolean,
    img: HTMLImageElement,
}

export type ImageResources = {
    [key: string]: ImageResource,
}

export type SpriteMap = {
    [key: string]: Dim,
}