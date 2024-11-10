//@ts-check

/**
 * 
 * @param {string} color 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {boolean|undefined} visible 
 * @returns {import("./logic").SpriteType}
 */
export function createSprite(color, x, y, width, height, visible = true, active = true) {
    return { color, x, y, width, height, visible, active };
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {string} text 
 * @param {number} x 
 * @param {number} y 
 * @param {string} color
 * @param {number|undefined} maxWidth 
 */
export function drawText(text, ctx, x, y, color = "white", maxWidth = undefined) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y, maxWidth);
}

/**
 * 
 * @param {import("./logic").SpriteType} sprite 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function drawSprite({ color, x, y, width, height, visible }, ctx) {
    if (visible) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {import("./logic").SpriteType[]} sprites 
 */
export function drawSprites(sprites, ctx) {
    for (const sprite of sprites)
        drawSprite(sprite, ctx);
}

/**
 * 
 * @param {number} x 
 * @param {string} color 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function drawVeritcalGuideLine(x, color, ctx) {
    for(let y = 0; y < ctx.canvas.height; y++)
        drawSprite(createSprite(color, x, y, 1, 1), ctx);
}

/**
 * 
 * @param {number} y 
 * @param {string} color 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function drawHorizontalGuideLine(y, color, ctx) {
    for(let x = 0; x < ctx.canvas.width; x++)
        drawSprite(createSprite(color, x, y, 1, 1), ctx);
}