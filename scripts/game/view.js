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
         * @param {{score: number, timeLeft: number}} textState 
         */
        (sprites, { width, height }, { score, timeLeft }) => {
            ctx.clearRect(0, 0, width, height);
            sprites.forEach(sprite => drawSprite(sprite, ctx));

            drawScore(score, ctx);
            drawTimeLeft(timeLeft, ctx);

            if (!sprites[sprites.length - 1].active)
                drawText("Game Over", ctx, ctx.canvas.width / 2 - 30, ctx.canvas.height / 2 - 5);
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