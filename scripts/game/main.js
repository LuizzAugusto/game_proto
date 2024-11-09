//@ts-check
import { bindPlayerControlToKeyboard } from "./input.js";
import { createCollisionSubject, setTimerForGameOver } from "./logic.js";
import { createPlayer, createTarget } from "./utils/spriteUtils.js";
import { createDrawSubject } from "./view.js";

/**
 * 
 * @typedef {Object} GameState
 * @property {number} score
 * @property {number} timeLeft
 */

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function createGame(ctx) {
    const canvasDimension = { width: ctx.canvas.width, height: ctx.canvas.height };
    const player = createPlayer(canvasDimension);
    const targets = [ createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension) ];
    const sprites = [ player, ...targets ];
    const playerSpeed = 10;
    /** @type {GameState} */
    const gameState = { score: 0, timeLeft: 3 };
    const collisionSubject = createCollisionSubject(player, targets, canvasDimension, gameState);
    const drawSubject = createDrawSubject(ctx, player, sprites, canvasDimension, gameState);
    const subjects = [collisionSubject, drawSubject];

    setTimerForGameOver(player, gameState);
    bindPlayerControlToKeyboard(player, playerSpeed);
    
    update(subjects);
}

/**
 * 
 * @param {import("../utils/ObservableSubject.js").ObservableSubjectType[]} subjects 
 */
function update(subjects) {
    for (const sub of subjects)
        sub.notifyAll();

    requestAnimationFrame(() => update(subjects));
}