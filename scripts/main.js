//@ts-check
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
    const player = createSprite("green", 0, 0, 50, 50);
    const target = createSprite("red", 225, 225, 50, 50);
    control(player, 10);
    update([target,player], ctx);
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
 * @param {import("./types").SpriteType[]} sprites 
 * @param {CanvasRenderingContext2D} ctx 
 */
function update(sprites, ctx) {
  const player = sprites[sprites.length-1];
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for(let x = 0; x < sprites.length; x++) {
    const gameObject = sprites[x];
    turnInvisibleTargetIfColliding(sprites, player);
    drawSprite(gameObject, ctx);
  }

  requestAnimationFrame(() => update(sprites, ctx));
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
 */
function turnInvisibleTargetIfColliding(sprites, player) {
  for(let y = 0; y < (sprites.length - 1); y++) {
    const gameObject = sprites[y];

    if (collision(gameObject, player))
      gameObject.visible = false;
  }
}