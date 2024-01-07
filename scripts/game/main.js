//@ts-check
import { createControlSubject } from "./input.js";
import { createCollisionSubject, resetPosition } from "./logic.js";
import { createDrawSubject } from "./view.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function createGame(ctx) {
  const canvasDimension = {width: ctx.canvas.width, height: ctx.canvas.height};
  const player = createTarget(canvasDimension, "green");
  const sprites = [createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), player];
  
  const controlSubject = createControlSubject(player, 10);
  const collisionSubject = createCollisionSubject(sprites, player, canvasDimension);
  const drawSubject = createDrawSubject(sprites, ctx, canvasDimension);
  const subjects = [controlSubject, collisionSubject, drawSubject];

  update(subjects);
}

/**
 * 
 * @param {string} color 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {boolean|undefined} visible 
 * @returns {import("../types").SpriteType}
 */
function createSprite(color, x, y, width, height, visible = true) {
  return { color, x, y, width, height, visible };
}

/**
 * 
 * @param {import("../types").DimensionType} canvasDimension 
 * @param {string|undefined} color 
 */
function createTarget(canvasDimension, color = "red") {
  const target = createSprite(color, 0, 0, 50, 50);
  resetPosition(target, canvasDimension);
  return target;
}

/**
 * 
 * @param {import("../utils/types.js").ObservableSubjectType[]} subjects 
 */
function update(subjects) {
  subjects.forEach(subject => subject.notifyAll());
  requestAnimationFrame(() => update(subjects));
}