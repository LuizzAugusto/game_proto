//@ts-check
import { createObservableSubject } from "../game_core/utils/ObservableSubject.js";
import { activeDeactivePlayerWhenClickPauseButton, bindPlayerControlToKeyboard } from "./input.js";
import { verifyTargetIsCollidingWithPlayer, setTimerForGameOver } from "./logic.js";
import { createPlayer, createTarget } from "./utils/spriteUtils.js";
import { drawAll } from "./view.js";

/**
 * 
 * @typedef {Object} TextState
 * @property {number} score
 * @property {number} timeLeft
 */

/**
 * 
 * @typedef {Object} GameState
 * @property {CanvasRenderingContext2D} ctx
 * @property {import("../game_core/logic.js").SpriteType[]} sprites
 * @property {number} score
 * @property {number} timeLeft
 */

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLElement|null} pauseButtonEl 
 */
export function createGame(ctx, pauseButtonEl = null) {
    const player = createPlayer(ctx.canvas);
    const playerSpeed = 10;
    const sprites = [
        player,
        createTarget(ctx.canvas, player),
        createTarget(ctx.canvas, player),
        createTarget(ctx.canvas, player),
        createTarget(ctx.canvas, player)
    ];

    /** @type {GameState} */
    const gameState = { ctx, sprites, score: 0, timeLeft: 3 };

    setTimerForGameOver(player, gameState);
    bindPlayerControlToKeyboard(player, playerSpeed);
    activeDeactivePlayerWhenClickPauseButton(player, gameState, pauseButtonEl);

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
 * @param {import("../game_core/utils/ObservableSubject.js").ObservableSubjectType[]} subjects 
 */
function update(gameState, subjects) {
    for (const sub of subjects)
        sub.notifyAll(gameState);

    requestAnimationFrame(() => update(gameState, subjects));
}