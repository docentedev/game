import { SpriteResource } from "../Sprite";

const sprites: SpriteResource[] = [
    {
        key: 'player01',
        imageTileSize: 48,
        imageKey: 'player_01' ,
        map: {
            u0: { x: 96, y: 0 },
            u1: { x: 96, y: 48 },
            u2: { x: 96, y: 96 },
            u3: { x: 96, y: 144 },
            d0: { x: 0, y: 0 },
            d1: { x: 0, y: 48 },
            d2: { x: 0, y: 96 },
            d3: { x: 0, y: 144 },
            l0: { x: 48, y: 0 },
            l1: { x: 48, y: 48 },
            l2: { x: 48, y: 96 },
            l3: { x: 48, y: 144 },
            r0: { x: 144, y: 0 },
            r1: { x: 144, y: 48 },
            r2: { x: 144, y: 96 },
            r3: { x: 144, y: 144 },
        },
    },
    {
        key: 'grassSprite',
        imageTileSize: 32,
        imageKey: 'grass_sprite' ,
        map: {
            muroLadrilloQuebrado: { x: 0, y: 224 },
            muroLadrillo: { x: 32, y: 224 },
            muroLadrilloSemiPiedra: { x: 64, y: 224 },
            grassClaro: { x: 321, y: 608 },
            grassPiedra: { x: 351, y: 608 },
            grass: { x: 256, y: 800 },
        },
    }
];

export default sprites;