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
    items: any,
    gazeDirection: 'u' | 'd' | 'l' | 'r' | 'c'
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
    dim?: Dim, pos: Pos, type?: string,
}

export type BlockClassProp = {
    game: Game, pos: Pos, spriteKey?: string, tileKey?: string, type?: string,
}

export type ItemClassProp = {
    game: Game, pos: Pos, spriteKey?: string, tileKey?: string,
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