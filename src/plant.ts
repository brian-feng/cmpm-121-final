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
  color: number;
  name: number;
  constructor(color: number, name: number) {
    this.color = color;
    this.name = name;
  }
  placePlant() {
  }
  draw(ctx: CanvasRenderingContext2D, pos: Position, w: number, h: number, level: number) {
    ctx.fillStyle = this.color.toString();
  
    // Calculate the plant size based on the level
    let sizePercentage = 0;
    switch (level) {
      case 1:
        sizePercentage = 0.4; // 40%
        break;
      case 2:
        sizePercentage = 0.6; // 60%
        break;
      case 3:
        sizePercentage = 0.8; // 80%
        break;
      default:
        sizePercentage = 0.4; // Default to level 1 if the level is invalid
    }
  
    // Width and height based on %
    const newWidth = w * sizePercentage;
    const newHeight = h * sizePercentage;
  
    // Center the plant within the space
    ctx.fillRect(
      pos.x + (w - newWidth) / 2,  // Horizontal center alignment
      pos.y + (h - newHeight) / 2, // Vertical center alignment
      newWidth,
      newHeight
    );
  }
  
}
