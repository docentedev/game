import React from 'react';

import Game from './core/Game';
import Block from './core/Block';
import Sprite from './core/Sprite';
import Player from './core/Player';
import { playerSpriteMap, objectSpriteMap } from './core/data/sprites';
import AbstractBlock from './core/AbstractBlock';

Game.init(() => {
  const blockSize = 48
  const resourceUrl = 'http://localhost:3000/images'
  const game = new Game({
    targetID: 'game',
    w: blockSize * 9, // cuantas unit en x
    h: blockSize * 19, // cuantas unit en y
    blockSize: blockSize,
  })

  game.images.addImage('player', `${resourceUrl}/p1.png`)
  game.images.addImage('sprite', `${resourceUrl}/sprites.png`)
  game.images.onAllLoad(() => {

    game.addSprite('player', new Sprite({ image: game.images.getImage('player'), size: 32, x: 0, y: 0, blockSize: game.blockSize, map: playerSpriteMap, }))
    game.addSprite('sprite', new Sprite({ image: game.images.getImage('sprite'), sizeY: 32, size: 32, x: 0, y: 0, blockSize: game.bz(0.5), map: objectSpriteMap }))

    game.addGridSprite(game.sprites['sprite'], 'grass')

    const rompible = game.addBlock(new Block({
      // Romper automatico
      // type: EnumBlockType.BREKABLE,
      sprite: game.sprites['sprite'],
      spriteTitle: 'ladrilloBlockRotoConPiedraHoja',
      x: game.bz(4),
      y: game.bz(4),
      w: game.bz(1),
      h: game.bz(1),
    }))
    rompible.handlerOnSelect((block: AbstractBlock) => {
      // Romper manual
      block.visible = false
      console.log(block);
    })

    game.addBlock(new Block({ sprite: game.sprites['sprite'], spriteTitle: 'ladrilloBlock', x: game.bz(5), y: game.bz(4), w: game.bz(1), h: game.bz(1 / 2) }))
    game.addBlock(new Block({ sprite: game.sprites['sprite'], spriteTitle: 'ladrilloBlock', x: game.bz(6), y: game.bz(4), w: game.bz(1), h: game.bz(1 / 2) }))
    game.addBlock(new Block({ sprite: game.sprites['sprite'], spriteTitle: 'ladrilloBlock', x: game.bz(5), y: game.bz(4.5), w: game.bz(1), h: game.bz(1 / 2) }))
    game.addBlock(new Block({ sprite: game.sprites['sprite'], spriteTitle: 'ladrillosVertical', x: game.bz(4), y: game.bz(7), w: game.bz(5), h: game.bz(1) }))

    game.addBlock(new Block({ sprite: game.sprites['sprite'], spriteTitle: 'chairDown', x: game.bz(5), y: game.bz(5), w: game.bz(0.8), h: game.bz(0.8) }))
    game.addBlock(new Block({ sprite: game.sprites['sprite'], spriteTitle: 'chairDown', x: game.bz(6), y: game.bz(5), w: game.bz(0.8), h: game.bz(0.8) }))

    game.addPlayer(new Player({ sprite: game.sprites['player'], x: 0, y: 0, w: game.blockSize, h: game.blockSize }))
    game.start()
  })
})

function App() {
  return (
    <div className="App">
      <div id="game"></div>
    </div>
  );
}

export default App;
