import React from 'react';

import Game from './core/Game';
import Block from './core/Block';
import Sprite from './core/Sprite';
import Player from './core/Player';
import { playerSpriteMap, objectSpriteMap } from './core/data/sprites';
import AbstractBlock from './core/AbstractBlock';
import Book from './core/Book';

Game.init(() => {
  const blockSize = 36
  const resourceUrl = 'http://localhost:3000/images'
  const game = new Game({
    targetID: 'game',
    w: blockSize * 9, // cuantas unit en x
    h: blockSize * 19, // cuantas unit en y
    blockSize: blockSize,
  })

  game.onDebug()

  game.images.addImage('player', `${resourceUrl}/p1.png`)
  game.images.addImage('sprite', `${resourceUrl}/sprites.png`)
  game.images.addImage('book', `${resourceUrl}/book.png`)
  game.images.onAllLoad(() => {

    game.addSprite('player', new Sprite({ image: game.images.getImage('player'), size: 32, x: 0, y: 0, blockSize: game.blockSize, map: playerSpriteMap, }))
    game.addSprite('sprite', new Sprite({ image: game.images.getImage('sprite'), sizeY: 32, size: 32, x: 0, y: 0, blockSize: game.bz(0.5), map: objectSpriteMap }))

    game.addGridSprite(game.sprites['sprite'], 'grass')

    const rompible = game.addBlock(new Block({
      // Romper automatico
      // type: EnumBlockType.BREKABLE,
      sprite: game.sprites['sprite'],
      spriteTitle: 'ladrilloBlockRotoConPiedraHoja',
      x: game.bz(4), y: game.bz(4), w: game.bz(1), h: game.bz(1),
    }))
    rompible.handlerOnSelect((book : Book, block: AbstractBlock) => {
      book.items.push(block)
      game.blocks = game.blocks.filter((b : AbstractBlock) => {
        if(b.uid !== block.uid) {
          return true
        }
        return false
      })
      console.log(game.blocks);
      block.visible = false
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
  return (<div id="game"></div>);
}
export default App;
