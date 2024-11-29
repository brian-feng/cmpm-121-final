interface Position {
  x: number;
  y: number;
}

export default class Plant {
  color: string;
  name: string;
  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }
  placePlant() {
  }
  draw(ctx: CanvasRenderingContext2D, pos: Position, w: number, h: number) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      pos.x + w / 4,
      pos.y + h / 4,
      w / 2,
      h / 2,
    );
  }
}
