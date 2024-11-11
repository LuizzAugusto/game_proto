//@ts-check
import { createObservableSubject } from "../game_core/utils/ObservableSubject.js";
import { activeDeactivePlayerWhenClickPauseButton, bindPlayerControlToKeyboard } from "./input.js";
import { verifyTargetIsCollidingWithPlayer, setTimerForGameOver } from "./logic.js";
import { createPlayer, createSpritesWrapper, createTarget } from "./SpritesWrapper.js";
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
 * @property {import("./SpritesWrapper.js").Sprites} spritesWrapper
 * @property {number} score
 * @property {number} timeLeft
 */

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {import("./SpritesWrapper.js").Sprites} spritesWrapper 
 * @param {number} score 
 * @param {number} timeLeft 
 * @returns {GameState}
 */
function createGameState(ctx, spritesWrapper, score = 0, timeLeft = 3) {
    return {
        ctx,
        spritesWrapper,
        score,
        timeLeft,
    }
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLElement|null} pauseButtonEl 
 */
export function createGame(ctx, pauseButtonEl = null) {
    const player = createPlayer(ctx.canvas);
    const playerSpeed = 10;
    const targets = [
        createTarget(ctx.canvas, player),
        createTarget(ctx.canvas, player),
        createTarget(ctx.canvas, player),
        createTarget(ctx.canvas, player),
    ];
    const spritesWrapper = createSpritesWrapper(player, targets);
    const gameState = createGameState(ctx, spritesWrapper);

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