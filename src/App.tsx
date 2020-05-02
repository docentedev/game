import React from 'react';

import Game from './core/Game';
import Block from './core/Block';
import Sprite from './core/Sprite';
import Player from './core/Player';
import { playerSpriteMap, objectSpriteMap } from './core/data/sprites';
import Book from './core/Book';

Game.init(() => {
  const blockSize = 48
  const resourceUrl = 'http://localhost:3000/images'
  const g = new Game({
    targetID: 'game',
    w: blockSize * 12, // cuantas unit en x
    h: blockSize * 19, // cuantas unit en y
    blockSize: blockSize,
  })

  g.onDebug()

  g.images.addImage('player', `${resourceUrl}/p1.png`)
  g.images.addImage('sprite', `${resourceUrl}/sprites.png`)
  g.images.addImage('book', `${resourceUrl}/book.png`)
  g.images.onAllLoad(() => {

    g.addSprite('player', new Sprite({ image: g.images.getImage('player'), map: playerSpriteMap, }))
    g.addSprite('sprite', new Sprite({ image: g.images.getImage('sprite'), map: objectSpriteMap }))

    g.addGridSprite(g.sprites['sprite'], 'grass')


    // Items
    const llavePuerta01 = g.addItem(new Block({
      title: 'LLave Maestra',
      description: 'Aun no hace nada',
      sprite: g.sprites['sprite'],
      spriteTitle: 'llave',
      x: g.bz(4), y: g.bz(2), w: g.bz(1), h: g.bz(1),
    }))

    const block01 = g.addBlock(new Block({
      title: 'Piedra antigua',
      description: 'aun no sirve para algo, es solo un test',
      sprite: g.sprites['sprite'],
      spriteTitle: 'cofre',
      x: g.bz(4), y: g.bz(4), w: g.bz(1), h: g.bz(1),
    }))
    block01.handlerOnSelect((book : Book, block: Block) => {
      //book.addItem(block)
      //g.removeBlock(block)
      block01.setSpriteTitle('cofreOpen')
      book.addItemUnique(llavePuerta01)
      setTimeout(() => block01.setSpriteTitle('cofre'), 200);
    })

    const block02= g.addBlock(new Block({
      title: 'Piedra olvidada',
      description: 'solo es un adorno',
      sprite: g.sprites['sprite'],
      spriteTitle: 'ladrilloBlockRotoConPiedraHoja',
      x: g.bz(4), y: g.bz(2), w: g.bz(1), h: g.bz(1),
    }))
    block02.handlerOnSelect((book : Book, block: Block) => {
      book.addItem(block)
      g.removeBlock(block)
    })

    g.addBlock(new Block({ sprite: g.sprites['sprite'], spriteTitle: 'ladrilloBlock', x: g.bz(5), y: g.bz(4), w: g.bz(1), h: g.bz(1 / 2) }))
    g.addBlock(new Block({ sprite: g.sprites['sprite'], spriteTitle: 'ladrilloBlock', x: g.bz(6), y: g.bz(4), w: g.bz(1), h: g.bz(1 / 2) }))
    g.addBlock(new Block({ sprite: g.sprites['sprite'], spriteTitle: 'ladrilloBlock', x: g.bz(5), y: g.bz(4.5), w: g.bz(1), h: g.bz(1 / 2) }))
    g.addBlock(new Block({ sprite: g.sprites['sprite'], spriteTitle: 'ladrillosVertical', x: g.bz(4), y: g.bz(7), w: g.bz(5), h: g.bz(1) }))

    g.addBlock(new Block({ sprite: g.sprites['sprite'], spriteTitle: 'chairDown', x: g.bz(5), y: g.bz(5), w: g.bz(0.8), h: g.bz(0.8) }))
    g.addBlock(new Block({ sprite: g.sprites['sprite'], spriteTitle: 'chairDown', x: g.bz(6), y: g.bz(5), w: g.bz(0.8), h: g.bz(0.8) }))

    g.addPlayer(new Player({ sprite: g.sprites['player'], x: 0, y: 0, w: g.blockSize, h: g.blockSize }))
    g.start()
  })
})

function App() {
  return (<div id="game"></div>);
}
export default App;
