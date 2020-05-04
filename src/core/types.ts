export type iBlock = {
    title?: string,
    description?: string,
    sprite: string,
    tile: string,
    x: number, y: number, w?: number, h?:  number
    collision?: boolean,
}