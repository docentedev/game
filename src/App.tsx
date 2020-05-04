import React from 'react';

import Game from './core/Game';
import Block from './core/Block';
import Sprite from './core/Sprite';
import Player from './core/Player';
import { playerSpriteMap, objectSpriteMap } from './core/data/sprites';
import items from './core/data/items';
import blocks from './core/data/blocks';

Game.init(() => {
  const blockSize = 32
  const resourceUrl = 'http://localhost:3000/images'
  const g = new Game({
    targetID: 'game',
    w: blockSize * 12, // cuantas unit en x
    h: blockSize * 19, // cuantas unit en y
    blockSize: blockSize,
  })

  // g.onDebug()

  g.images.addImage('player', `${resourceUrl}/p1.png`)
  g.images.addImage('sprite', `${resourceUrl}/sprites.png`)
  g.images.addImage('book', `${resourceUrl}/book.png`)
  g.images.onAllLoad(() => {

    g.addSprite('player', new Sprite({ image: g.images.getImage('player'), map: playerSpriteMap, }))
    g.addSprite('sprite', new Sprite({ image: g.images.getImage('sprite'), map: objectSpriteMap }))

    g.addGridSprite(g.sprites['sprite'], 'grass')

    const player = g.addPlayer(new Player({ sprite: g.sprites['player'], x: 0, y: 0, w: g.bz(0.8), h: g.bz(0.8) }))

    // Items book
    const item01 = g.iBlock(items.ladrilloBlock)
    const llavePuerta01 = g.iBlock(items.llaveMaestra)
    const llavePuerta02 = g.iBlock(items.llaveMaestra2)
    
    const puerta01 = g.aBlock(blocks.puerta01)
    
    g.aBlock(blocks.piedraOlvidata)
    g.aBlock(blocks.piedraOlvidada02)
    g.aBlock(blocks.piedraOlvidada03)
    g.aBlock(blocks.piedraOlvidada04)
    g.aBlock(blocks.piedraOlvidada05)

    g.aBlock(blocks.pisoCasa01)

    const cofre01 = g.aBlock(blocks.cofre01)
    
    g.addBlock(new Block({ sprite: g.sprites['sprite'], tile: 'ladrilloBlock', x: g.bz(6), y: g.bz(4), w: g.bz(1), h: g.bz(1 / 2) }))
    g.addBlock(new Block({ sprite: g.sprites['sprite'], tile: 'ladrilloBlock', x: g.bz(5), y: g.bz(4.5), w: g.bz(1), h: g.bz(1 / 2) }))
    g.addBlock(new Block({ sprite: g.sprites['sprite'], tile: 'ladrillosVertical', x: g.bz(4), y: g.bz(7), w: g.bz(5), h: g.bz(1) }))

    g.addBlock(new Block({ sprite: g.sprites['sprite'], tile: 'chairDown', x: g.bz(5), y: g.bz(5), w: g.bz(0.8), h: g.bz(0.8) }))
    g.addBlock(new Block({ sprite: g.sprites['sprite'], tile: 'chairDown', x: g.bz(6), y: g.bz(5), w: g.bz(0.8), h: g.bz(0.8) }))

    player.book.addItemUnique(item01)
    llavePuerta01.handlerOnInMenuSelect((b : Block) => {
      !b.alreadyConsumed && player.book.addItem(b)
      b.alreadyConsumed = true
    })
    // bloques
    cofre01.handlerOnSelect(() => {
      cofre01.setTile('cofreOpen')
      player.book.open()
      player.book.removeAllAndAddExternalItem(llavePuerta01)
      player.book.addExternalItem(llavePuerta02)
      setTimeout(() => cofre01.setTile('cofre'), 200);
    })

    puerta01.handlerOnSelect((b) => {
      if(b.getCollision()) {
        setTimeout(() => b.setTile('puertaHorizontal1'), 100);
        setTimeout(() => b.setTile('puertaHorizontal2'), 200);
        setTimeout(() => b.offCollision(), 300);
      } else {
        b.onCollision()
        setTimeout(() => b.setTile('puertaHorizontal1'), 100);
        setTimeout(() => b.setTile('puertaHorizontal0'), 200);
      }
      //player.book.open()
      //player.book.removeAllAndAddExternalItem(llavePuerta01)
      //player.book.addExternalItem(llavePuerta02)
      //setTimeout(() => cofre01.setTile('cofre'), 200);
    })

    //block02.handlerOnSelect((block: Block) => {
    //  player.book.addItem(block)
    //  g.removeBlock(block)
    //})

    //block03.handlerOnSelect((block: Block) => {
    //  player.book.addExternalItem(block);
    //  g.removeBlock(block)
    //  player.book.open()
    //})
    //block03.handlerOnInMenuSelect((block: Block) => {
    //  console.log(block); 
    //})

    g.start()
  })
})

function App() {
  return (<div id="game"></div>);
}
export default App;
