import InputController from './InputController'
import { Dim, ZAxys, BlockProp, ImageResources, ImageResource, ImageResourceData } from './types'
import Block from './Block'
import Grid from './Grid';
import blocks from './data/blocks';
import images from './data/images';
import Player from './Player';

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    target: HTMLElement;
    dim: Dim = { x: 20, y: 30 };
    blockSize: number = 30;
    fps: number = 20;
    zAxys: ZAxys;
    inputController: InputController;
    images: ImageResources = {};
    imageCount: number = 0;
    static init: (callback: Function) => void;

    constructor(id: string) {

        document.body.style.backgroundColor = 'black'

        this.canvas = document.createElement('canvas');
        this.ctx = this.getCtx();
        this.target = this.getTarget(id);

        this.zAxys = {
            grid: [],
            grown: [],
            player: new Player({
                game: this,
                dim: { x: 1, y: 1 },
                pos: { x: 0, y: 2 },
            }),
            block: [],
            item: [],
            NPC: [],
            msg: [],
        }

        this.inputController = new InputController(this.inputControllerCallback);
        this.create();
    }

    private inputControllerCallback = (data: any) => {
        this.zAxys.player.inputControl(data);
    }

    private getCtx(): CanvasRenderingContext2D {
        const ctx = this.canvas.getContext('2d');
        if (ctx !== null) {
            return ctx
        } else {
            throw new Error('Error CTX');
        }
    }

    private getTarget(id: string): HTMLElement {
        const div = document.getElementById(id);
        if (div !== null) {
            return div
        } else {
            throw new Error('Error DIV Target');
        }
    }

    private createCanvas() {
        this.canvas.height = this.dim.y * this.blockSize
        this.canvas.width = this.dim.x * this.blockSize
        this.canvas.style.border = '1px dashed #717171';
        this.canvas.style.margin = 'auto';
        this.canvas.style.display = 'block';

        this.target.appendChild(this.canvas);
    }

    private gridGenerate() {
        const game = this;
        for (let i = 0; i < this.dim.x; i++) {
            for (let j = 0; j < this.dim.y; j++) {
                this.addGrid(new Grid({ game, dim: { x: 1, y: 1 }, pos: { x: i, y: j } }));
            }
        }
    }

    addGrid(grid: Grid) {
        this.zAxys.grid.push(grid)
    }

    addGrown() {

    }

    addBlock(prop: BlockProp) {
        const block = new Block({ game: this, ...prop })
        this.zAxys.block.push(block)
    }
    addBlocks(prop: BlockProp[]) {
        prop.forEach((p: BlockProp) => this.addBlock(p))
    }

    addItem() {

    }

    addNPC() {

    }
    addMsg() {

    }

    private create() {
        const int = setInterval(() => {
            let isLoadAllImages = true

            // inicia solo si todos los recursos estan cargados...
            Object.keys(this.images).forEach((val, i) => {
                const image: ImageResource = this.images[val];
                if (!image.status) {
                    isLoadAllImages = image.status;
                }
            });

            // inicia el juego si hay 0 imagenes
            if (isLoadAllImages || this.imageCount === 0) {
                clearInterval(int);
                this.createResourcesLoad();
            }
        }, 0);
    }

    private createResourcesLoad() {
        this.gridGenerate()
        this.createCanvas();

        this.zAxys.grid.forEach((e: Grid) => e.create())
        this.zAxys.grown.forEach((e: Block) => e.create())
        this.zAxys.block.forEach((e: Block) => e.create())
        this.zAxys.item.forEach((e: Block) => e.create())
        this.zAxys.NPC.forEach((e: Block) => e.create())
        this.zAxys.msg.forEach((e: Block) => e.create())
        this.zAxys.player.create()
        this.update();
    }

    private update() {
        setInterval(() => {
            this.zAxys.grid.forEach((e: Grid) => e.create())
            this.zAxys.grown.forEach((e: Block) => e.create())
            this.zAxys.block.forEach((e: Block) => e.create())
            this.zAxys.item.forEach((e: Block) => e.create())
            this.zAxys.NPC.forEach((e: Block) => e.create())
            this.zAxys.msg.forEach((e: Block) => e.create())
            this.zAxys.player.update()

        }, this.fps);
    }

    private addImage(key: string, src: string) {
        const img = new Image();
        //img.height = this.getSize(this.dim.y)
        //img.width = this.getSize(this.dim.x)
        img.src = src
        img.onload = () => this.images[key].status = true

        this.images[key] = ({ status: false, img })
        this.imageCount = this.imageCount + 1;
    }

    private getSize = (d: number) => d * this.blockSize

    addImages(prop: ImageResourceData[]) {
        prop.forEach((p: ImageResourceData) => this.addImage(p.key, p.src))
    }
}

Game.init = (callback: Function) => document.addEventListener('DOMContentLoaded', (event) => callback(event), false);

// START GAME
Game.init(() => {
    const game = new Game('game');
    game.addBlocks(blocks);
    game.addImages(images);
});

const start = () => { }

export default start;