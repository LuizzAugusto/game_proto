//@ts-check
import { createControlSubject } from "./input.js";
import { createCollisionSubject, resetPosition } from "./logic.js";
import { createDrawSubject } from "./view.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function createGame(ctx) {
  const canvasDimension = {get width() { return ctx.canvas.width; }, get height() { return ctx.canvas.height; }};
  const player = createTarget(canvasDimension, "green");
  const sprites = [createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), player];

  const controlSubject = createControlSubject(player, 10);
  window.addEventListener("keydown", (ev) => controlSubject.notifyAll(ev));
  const collisionSubject = createCollisionSubject(player);
  const drawSubject = createDrawSubject(ctx);
  const subjects = [collisionSubject, drawSubject];

  update([sprites, canvasDimension], subjects);
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
 * @param {[sprites: import("../types").SpriteType[], canvasDimension: import("../types").DimensionType]} state 
 * @param {import("../utils/types.js").ObservableSubjectType[]} subjects 
 */
function update(state, subjects) {
  subjects.forEach(subject => subject.notifyAll(...state));
  requestAnimationFrame(() => update(state, subjects));
}