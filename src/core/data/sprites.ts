import { SpriteResource } from "../Sprite";

const sprites: SpriteResource[] = [
    {
        key: 'player01',
        imageTileSize: 32,
        imageKey: 'player_01' ,
        map: {
            d0: { x: 0, y: 0 },
            d1: { x: 0, y: 32 },
            d2: { x: 0, y: 64 },
            d3: { x: 0, y: 96 },

            l0: { x: 32, y: 0 },
            l1: { x: 32, y: 32 },
            l2: { x: 32, y: 96 },
            l3: { x: 32, y: 96 },

            u0: { x: 64, y: 0 },
            u1: { x: 64, y: 32 },
            u2: { x: 64, y: 64 },
            u3: { x: 64, y: 96 },
            
            r0: { x: 96, y: 0 },
            r1: { x: 96, y: 32 },
            r2: { x: 96, y: 64 },
            r3: { x: 96, y: 96 },
        },
    },
    {
        key: 'sprites',
        imageTileSize: 32,
        imageKey: 'sprites',
        map: {
            grass: { x: 0, y: 0 },
            ladrilloBlockRotoConPiedraHoja: { x: 160, y: 32 },
            ladrilloBlockRotoConPiedra: { x: 64, y: 32 },
            ladrilloBlockRoto: { x: 0, y: 32 },
            ladrilloBlock: { x: 32, y: 32 },
            chairDown: { x: 0, y: 96 },
            chairRight: { x: 128, y: 96 },
        },
    }
];

export default sprites;