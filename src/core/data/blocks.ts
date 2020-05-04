const cofre01 = {
    title: 'Piedra antigua',
    description: 'solo test',
    sprite: 'sprite',
    tile: 'cofre',
    x: 2, y: 0, w: 1, h: 1,
}

const piedraOlvidata = {
    title: 'Piedra olvidada',
    description: 'solo adorno',
    sprite: 'sprite',
    tile: 'ladrilloNormal',
    x: 2, y: 2, w: 1, h: 1,
}

const piedraOlvidada02 = {sprite: 'sprite', tile: 'ladrilloNormal', x: 0, y: 2, w: 1, h: 1 }
const piedraOlvidada03 = {sprite: 'sprite', tile: 'ladrilloNormal', x: 3, y: 0, w: 1, h: 1 }
const piedraOlvidada04 = {sprite: 'sprite', tile: 'ladrilloNormal', x: 3, y: 1, w: 1, h: 1 }
const piedraOlvidada05 = {sprite: 'sprite', tile: 'ladrilloNormal', x: 3, y: 2, w: 1, h: 1 }

const pisoCasa01 = {collision: false, sprite: 'sprite', tile: 'pisoCasa1', x: 0, y: 0, w: 3, h: 3 }
const pisoCalle = {collision: false, sprite: 'sprite', tile: 'pisoCalle', x: 0, y: 3, w: 20, h: 4 }


const puerta01 = {
    title: 'Piedra de cofres',
    description: 'solo adorno',
    sprite: 'sprite',
    tile: 'puertaHorizontal0',
    x: 1, y: 2, w: 1, h: 1,
}

export default {
    puerta01,
    cofre01,
    piedraOlvidata,
    piedraOlvidada02,
    piedraOlvidada03,
    piedraOlvidada04,
    piedraOlvidada05,
    pisoCasa01,
    pisoCalle,
}