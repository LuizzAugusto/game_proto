//@ts-check
import { bindPlayerControlToKeyboard } from "./input.js";
import { createCollisionSubject, setTimerForGameOver } from "./logic.js";
import { createPlayer, createTarget } from "./utils/spriteUtils.js";
import { createDrawSubject } from "./view.js";

/**
 * 
 * @typedef {Object} GameState
 * @property {CanvasRenderingContext2D} ctx
 * @property {import("./utils/spriteUtils.js").SpriteType[]} sprites
 * @property {number} score
 * @property {number} timeLeft
 */

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function createGame(ctx) {
    const player = createPlayer(ctx.canvas);
    const sprites = [ player, createTarget(ctx.canvas, player), createTarget(ctx.canvas, player), createTarget(ctx.canvas, player), createTarget(ctx.canvas, player) ];
    const playerSpeed = 10;

    /** @type {GameState} */
    const gameState = { ctx, sprites, score: 0, timeLeft: 3 };
    
    const collisionSubject = createCollisionSubject();
    const drawSubject = createDrawSubject();
    const subjects = [collisionSubject, drawSubject];

    setTimerForGameOver(player, gameState);
    bindPlayerControlToKeyboard(player, playerSpeed);
    
    update(gameState, subjects);
}

/**
 * 
 * @param {GameState} gameState
 * @param {import("../utils/ObservableSubject.js").ObservableSubjectType[]} subjects 
 */
function update(gameState, subjects) {
    for (const sub of subjects)
        sub.notifyAll(gameState);

    requestAnimationFrame(() => update(gameState, subjects));
}