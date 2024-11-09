//@ts-check
import { createObservableSubject } from "../utils/ObservableSubject.js";
import { bindPlayerControlToKeyboard } from "./input.js";
import { verifyTargetIsCollidingWithPlayer, setTimerForGameOver } from "./logic.js";
import { createPlayer, createTarget } from "./utils/spriteUtils.js";
import { drawAll } from "./view.js";

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

    setTimerForGameOver(player, gameState);
    bindPlayerControlToKeyboard(player, playerSpeed);

    const collisionSubject = createObservableSubject();
    const drawSubject = createObservableSubject();
    const subjects = [ collisionSubject, drawSubject ];

    collisionSubject.subscribe((gameState) => verifyTargetIsCollidingWithPlayer(gameState));
    drawSubject.subscribe((gameState) => drawAll(gameState));
    
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