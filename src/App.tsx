import React from 'react';

import Game from './core/Game';
import Block from './core/Block';
import Sprite from './core/Sprite';
import Player from './core/Player';
import { playerSpriteMap, objectSpriteMap } from './core/data/sprites';
import AbstractBlock from './core/AbstractBlock';
import Book from './core/Book';

Game.init(() => {
  const blockSize = 48
  const resourceUrl = 'http://localhost:3000/images'
  const game = new Game({
    targetID: 'game',
    w: blockSize * 12, // cuantas unit en x
    h: blockSize * 19, // cuantas unit en y
    blockSize: blockSize,
  })

  // game.onDebug()

  game.images.addImage('player', `${resourceUrl}/p1.png`)
  game.images.addImage('sprite', `${resourceUrl}/sprites.png`)
  game.images.addImage('book', `${resourceUrl}/book.png`)
  game.images.onAllLoad(() => {

    game.addSprite('player', new Sprite({ image: game.images.getImage('player'), size: 32, x: 0, y: 0, blockSize: game.blockSize, map: playerSpriteMap, }))
    game.addSprite('sprite', new Sprite({ image: game.images.getImage('sprite'), sizeY: 32, size: 32, x: 0, y: 0, blockSize: game.bz(0.5), map: objectSpriteMap }))

    game.addGridSprite(game.sprites['sprite'], 'grass')

    const block01 = game.addBlock(new Block({
      title: 'Piedra antigua',
      description: 'aun no sirve para algo, es solo un test',
      sprite: game.sprites['sprite'],
      spriteTitle: 'ladrilloBlockRotoConPiedraHoja',
      x: game.bz(4), y: game.bz(4), w: game.bz(1), h: game.bz(1),
    }))
    block01.handlerOnSelect((book : Book, block: AbstractBlock) => {
      book.items.push(block)
      game.blocks = game.blocks.filter((b : AbstractBlock) => b.uid !== block.uid)
      console.log(game.blocks);
      block.visible = false
    })

    const block02= game.addBlock(new Block({
      title: 'Piedra olvidada',
      description: 'solo es un adorno',
      sprite: game.sprites['sprite'],
      spriteTitle: 'ladrilloBlockRotoConPiedraHoja',
      x: game.bz(4), y: game.bz(2), w: game.bz(1), h: game.bz(1),
    }))
    block02.handlerOnSelect((book : Book, block: AbstractBlock) => {
      // logica para quitar un block del juego
      // y hacerlo parte de los items del player
      book.items.push(block)
      game.blocks = game.blocks.filter((b : AbstractBlock) => b.uid !== block.uid)
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
