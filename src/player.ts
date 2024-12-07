import Board from "./board.ts";
import Position from "./position.ts"; // Position is an interface
import BoardTile from "./boardTile.ts";

// Image to be used for player representation
const image = new Image();
image.src =
  "https://www.pikpng.com/pngl/b/234-2345936_kawaii-pixel-ghost-stickers-messages-sticker-2-plain.png";

export default class Player {
  pos: Position;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  board: Board;
  ctx: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    pos: Position,
    width: number,
    height: number,
    board: Board
  ) {
    this.canvas = canvas;
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.board = board;
    this.ctx = canvas.getContext("2d")!;

    // Initial draw
    this.draw();
  }

  // Function to move the player
  move(x: number, y: number) {
    // Retrieve the previous space where the player was
    const prevSpace = this.board.getSpace(this.pos);
    
    // Create a new position object based on the move
    const newPos: Position = { x: this.pos.x + x, y: this.pos.y + y };
  
    // Check if the move is valid by checking the new space
    if (this.isValidMove(newPos)) {
      // If valid, update the player's position
      this.updatePosition(newPos);
  
      // Ensure prevSpace is defined before calling refreshSpace
      if (prevSpace) {
        this.board.refreshSpace(this.ctx, prevSpace); // Only call if prevSpace is defined
      } else {
        console.warn("Previous space is undefined, can't refresh.");
      }
  
      // Redraw the player at the new position
      this.draw();
    } else {
      // If invalid move, revert to the previous position
      console.log("Invalid move, player position unchanged.");
    }
  }  

  // Function to check if the move is valid
  private isValidMove(newPos: Position): boolean {
    const newSpace = this.board.getSpace(newPos);
    return newSpace !== undefined; // Ensures that the new space exists on the board
  }

  // Function to update the player's position
  private updatePosition(newPos: Position) {
    this.pos = newPos;
    console.log("Player moved to position: ", this.pos);
  }

  // Function to draw the player on the canvas
  private draw() {
    this.ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height); // Clear previous drawing
    this.ctx.drawImage(image, this.pos.x, this.pos.y, this.width, this.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}