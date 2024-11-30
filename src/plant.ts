import Position from "./position.ts";

// export default class PlantType {
// future plans
// to select plant type
// the other plant will be normal class
// this is so that you can instantiate species with one class
// in the other class, the boardspace will instantiate it and
// automatically plant it on instantiation
// }

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
