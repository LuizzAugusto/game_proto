//@ts-check

import { drawHorizontalGuideLine, drawVeritcalGuideLine } from "../game_core/view.js";

/**
 * 
 * @param {import("./main.js").GameState} gameState
 */
export function drawAll(gameState) {
    const { ctx, spritesWrapper, score, timeLeft } = gameState;
    const { width, height } = ctx.canvas;
    const player = spritesWrapper.spritesObject.player;

    ctx.clearRect(0, 0, width, height);
    for(const sprite of gameState.spritesWrapper.spritesArray)
        drawSprite(sprite, ctx);

    drawScore(score, ctx);
    drawTimeLeft(timeLeft, ctx);

    const deactivePlayerMsg = timeLeft > 0 ? "Paused" : "Game Over";

    if (!player.active)
        drawText(deactivePlayerMsg, ctx, 
            ctx.canvas.width / 2 - deactivePlayerMsg.length * 3, 
            ctx.canvas.height / 2 + 3);

    if (sessionStorage.getItem("dev")) {
        drawHorizontalGuideLine(ctx.canvas.height / 2, "red", ctx);
        drawVeritcalGuideLine(ctx.canvas.width / 2, "red", ctx);
    }
}

/**
 * 
 * @param {import("../game_core/logic.js").SpriteType} sprite 
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
 * @param {string} text 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number|undefined} maxWidth 
 */
function drawText(text, ctx, x, y, maxWidth = undefined) {
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y, maxWidth);
}

/**
 * 
 * @param {number} score 
 * @param {CanvasRenderingContext2D} ctx 
 */
function drawScore(score, ctx) {
    drawText("Score: " + score, ctx, ctx.canvas.width - 60, 20);
}

/**
 * 
 * @param {number} timeLeft 
 * @param {CanvasRenderingContext2D} ctx 
 */
function drawTimeLeft(timeLeft, ctx) {
    drawText("Time left: " + timeLeft, ctx, 10, 20);
}