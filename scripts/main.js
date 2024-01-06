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
    drawSprite(player, ctx);
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
