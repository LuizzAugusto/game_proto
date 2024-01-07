//@ts-check
import { createObservableSubject } from "../utils/ObservableSubject.js";

/**
 * 
 * @param {import("../types").SpriteType} player 
 * @returns {import("../utils/types").ObservableSubjectType}
 */
export function createCollisionSubject(player) {
  const collisionSubject = createObservableSubject();
  collisionSubject.subscribe(
    /**
     * 
     * @param {import("../types").SpriteType[]} sprites 
     * @param {import("../types").DimensionType} canvasDimension 
     */
    (sprites, canvasDimension) => {
      for(let x = 0; x < sprites.length - 1; x++)
        resetTargetPositionIfColliding(sprites[x], player, canvasDimension);
    }
  );

  return collisionSubject;
}

/**
 * 
 * @param {import("../types").SpriteType} target 
 * @param {import("../types").SpriteType} player 
 * @param {import("../types").DimensionType} canvasDimension 
 */
function resetTargetPositionIfColliding(target, player, canvasDimension) {
  if (collision(target, player))
    do
      resetPosition(target, canvasDimension);
    while (collision(target, player));
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