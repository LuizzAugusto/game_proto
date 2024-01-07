//@ts-check
import { createObservableSubject } from "../utils/ObservableSubject.js";

/**
 * 
 * @param {import("../types").SpriteType[]} sprites 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {import("../types").DimensionType} canvasDimension 
 * @returns 
 */
export function createDrawSubject(sprites, ctx, canvasDimension) {
  const drawSubject = createObservableSubject();
  drawSubject.subscribe(() => {
    ctx.clearRect(0, 0, canvasDimension.width, canvasDimension.height);
    sprites.forEach(sprite => drawSprite(sprite, ctx));
  });

  return drawSubject;
}

/**
 * 
 * @param {import("../types").SpriteType} sprite 
 * @param {CanvasRenderingContext2D} ctx 
 */
function drawSprite({ color, x, y, width, height, visible }, ctx) {
  if (visible) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }
}