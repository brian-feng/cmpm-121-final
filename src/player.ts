import Board from "./board.ts";
import Position from "./position.ts";

const image = new Image();
image.src =
  "https://www.pikpng.com/pngl/b/234-2345936_kawaii-pixel-ghost-stickers-messages-sticker-2-plain.png";

export default class Player {
  position: Position = { x: 0, y: 0 };
  board: Board;
  constructor(board: Board) {
    this.board = board;
  }
  move(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // TODO: refactor!!
    const prevSpace = this.board.getSpace(this.position);
    this.position.x += x;
    this.position.y += y;
    const newSpace = this.board.getSpace(this.position);
    if (prevSpace && newSpace) {
      prevSpace.refreshSpace(ctx);
      console.log("playerPos: ", this.position);
      this.draw(ctx, newSpace.position);
    } else {
      this.position.x -= x;
      this.position.y -= y;
    }
  }

  draw(ctx: CanvasRenderingContext2D, pos: Position) {
    // image wasn't working so temporarily the player is a black square
    //ctx.drawImage(image, pos.x, pos.y, this.board.width, this.board.height);
    ctx.fillStyle="black";
    ctx.fillRect(pos.x, pos.y, this.board.width, this.board.height);
  }
}