import Board from "./board.ts";
import Position from "./position.ts";
import BoardTile from "./boardTile.ts";

const image = new Image();
image.src =
  "https://www.pikpng.com/pngl/b/234-2345936_kawaii-pixel-ghost-stickers-messages-sticker-2-plain.png";

export default class Player {
  // requires the current boardspace
  pos: Position;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  board: Board;
  ctx: CanvasRenderingContext2D;
  constructor (canvas: HTMLCanvasElement, pos: Position, width: number, height: number, ctx: CanvasRenderingContext2D, board: Board){
    this.canvas = canvas;
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext("2d")!;
    // initialize player on this place
    this.draw(this.ctx);
    this.board = board;
  }

  move(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // TODO: refactor!!
    const prevSpace = this.board.getSpace(this.pos);
    this.pos.x += x;
    this.pos.y += y;
    const newSpace = this.board.getSpace(this.pos);
    if (prevSpace && newSpace) {
      this.board.refreshSpace(ctx, prevSpace);
      console.log("playerPos: ", this.pos);
      this.draw(ctx);
    } else {
      this.pos.x -= x;
      this.pos.y -= y;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(image, this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillStyle="black";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
  
  // PREVIOUS CODE
  // position: Position = { x: 0, y: 0 };
  // board: Board;
  // constructor(board: Board) {
  //   this.board = board;
  // }
  // move(ctx: CanvasRenderingContext2D, x: number, y: number) {
  //   // TODO: refactor!!
  //   const prevSpace = this.board.getSpace(this.position);
  //   this.position.x += x;
  //   this.position.y += y;
  //   const newSpace = this.board.getSpace(this.position);
  //   if (prevSpace && newSpace) {
  //     prevSpace.refreshSpace(ctx);
  //     console.log("playerPos: ", this.position);
  //     this.draw(ctx, newSpace.position);
  //   } else {
  //     this.position.x -= x;
  //     this.position.y -= y;
  //   }
  // }

  // draw(ctx: CanvasRenderingContext2D, pos: Position) {
  //   // image wasn't working so temporarily the player is a black square
  //   //ctx.drawImage(image, pos.x, pos.y, this.board.width, this.board.height);
  //   ctx.fillStyle="black";
  //   ctx.fillRect(pos.x, pos.y, this.board.width, this.board.height);
  // }
  
}