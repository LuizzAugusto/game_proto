//@ts-check
import { createObservableSubject } from "./utils/ObservableSubject.js";

/**
 * 
 * @type {HTMLCanvasElement|null}
 */
//@ts-ignore
const canvas = document.getElementById("game");
if (canvas?.tagName == "CANVAS") {
  const ctx = canvas.getContext("2d", { alpha: false });

  if (ctx != null) {
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.border = "1px solid #ccc";
    
    const canvasDimension = {width: ctx.canvas.width, height: ctx.canvas.height};
    const player = createSprite("green", 0, 0, 50, 50);
    resetPosition(player, canvasDimension);
    const sprites = [createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), player];
    
    const controlSubject = createObservableSubject();
    controlSubject.subscribe(() => control(player, 10));
    const collisionSubject = createObservableSubject();
    collisionSubject.subscribe(() => resetTargetPositionIfColliding(sprites, player, canvasDimension));
    const viewSubject = createObservableSubject();
    viewSubject.subscribe(() => {
      ctx.clearRect(0, 0, canvasDimension.width, canvasDimension.height);
      sprites.forEach(sprite => drawSprite(sprite, ctx));
    });
    const subjects = [controlSubject, collisionSubject, viewSubject];

    update(subjects);
  }
  else
    alert("error, can't get canvas context");
}

/**
 * 
 * @param {string} color 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {boolean|undefined} visible 
 * @returns {import("./types").SpriteType}
 */
function createSprite(color, x, y, width, height, visible = true) {
  return { color, x, y, width, height, visible };
}

/**
 * 
 * @param {import("./types").DimensionType} canvasDimension 
 */
function createTarget(canvasDimension) {
  const target = createSprite("red", 0, 0, 50, 50);
  resetPosition(target, canvasDimension);
  return target;
}

/**
 * 
 * @param {import("./types").SpriteType} sprite 
 * @param {CanvasRenderingContext2D} ctx 
 */
function drawSprite({ color, x, y, width, height, visible }, ctx) {
  if (visible) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }
}

/**
 * 
 * @param {import("./utils/types.js").ObservableSubjectType[]} subjects 
 */
function update(subjects) {
  subjects.forEach(subject => subject.notifyAll());
  requestAnimationFrame(() => update(subjects));
}

/**
 * 
 * @param {import("./types").SpriteType} player 
 * @param {number} speed 
 */
function control(player, speed) {
  window.onkeydown = ({key}) => {
    if (key == "ArrowUp") {
      player.y -= speed;
    }
    else
    if (key == "ArrowDown") {
      player.y += speed;
    }

    if (key == "ArrowLeft") {
      player.x -= speed;
    }
    else
    if (key == "ArrowRight") {
      player.x += speed;
    }
  };
}

/**
 * 
 * @param {import("./types").SpriteType} sprite 
 * @param {import("./types").SpriteType} sprite2 
 */
function collision(sprite, sprite2) {
  return sprite.visible && sprite2.visible
    && (sprite.x + sprite.width) >= sprite2.x && sprite.x <= (sprite2.x + sprite2.width)
    && (sprite.y + sprite.height) >= sprite2.y && sprite.y <= (sprite2.y + sprite2.height);
}

/**
 * 
 * @param {import("./types").SpriteType[]} sprites 
 * @param {import("./types").SpriteType} player 
 * @param {import("./types").DimensionType} canvasDimension 
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
 * @param {import("./types").SpriteType} sprite 
 * @param {import("./types").DimensionType} canvasDimension 
 */
function resetPosition(sprite, {width, height}) {
  sprite.x = Math.floor((Math.random() * width*10) % (width - sprite.width));
  sprite.y = Math.floor((Math.random() * height*10) % (height - sprite.height));
}