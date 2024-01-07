//@ts-check
import { createObservableSubject } from "../utils/ObservableSubject.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @returns 
 */
export function createDrawSubject(ctx) {
  const drawSubject = createObservableSubject();
  drawSubject.subscribe(
    /**
     * 
     * @param {import("../types").SpriteType[]} sprites 
     * @param {import("../types").DimensionType} canvasDimension 
     */
    (sprites, {width, height}) => {
    ctx.clearRect(0, 0, width, height);
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