//@ts-check
import { createObservableSubject } from "../utils/ObservableSubject.js";

/**
 * 
 * @param {import("../types").SpriteType[]} sprites 
 * @param {import("../types").SpriteType} player 
 * @param {import("../types").DimensionType} canvasDimension 
 * @returns {import("../utils/types").ObservableSubjectType}
 */
export function createCollisionSubject(sprites, player, canvasDimension) {
  const collisionSubject = createObservableSubject();
  collisionSubject.subscribe(() => resetTargetPositionIfColliding(sprites, player, canvasDimension));

  return collisionSubject;
}

/**
 * 
 * @param {import("../types").SpriteType[]} sprites 
 * @param {import("../types").SpriteType} player 
 * @param {import("../types").DimensionType} canvasDimension 
 */
function resetTargetPositionIfColliding(sprites, player, canvasDimension) {
  for(let y = 0; y < (sprites.length - 1); y++) {
    const gameObject = sprites[y];

    if (collision(gameObject, player))
      do
        resetPosition(gameObject, canvasDimension);
      while (collision(gameObject, player));
  }
}

/**
 * 
 * @param {import("../types").SpriteType} sprite 
 * @param {import("../types").DimensionType} canvasDimension 
 */
export function resetPosition(sprite, {width, height}) {
  sprite.x = Math.floor((Math.random() * width*10) % (width - sprite.width));
  sprite.y = Math.floor((Math.random() * height*10) % (height - sprite.height));
}

/**
 * 
 * @param {import("../types").SpriteType} sprite 
 * @param {import("../types").SpriteType} sprite2 
 */
function collision(sprite, sprite2) {
  return sprite.visible && sprite2.visible
    && (sprite.x + sprite.width) >= sprite2.x && sprite.x <= (sprite2.x + sprite2.width)
    && (sprite.y + sprite.height) >= sprite2.y && sprite.y <= (sprite2.y + sprite2.height);
}