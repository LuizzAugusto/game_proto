//@ts-check
import { bindPlayerControlToKeyboard } from "./input.js";
import { createCollisionSubject, setTimerForGameOver } from "./logic.js";
import { createPlayer, createTarget } from "./utils/spriteUtils.js";
import { createDrawSubject } from "./view.js";

/**
 * 
 * @typedef {Object} TextState
 * @property {number} score
 * @property {number} timeLeft
 */

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function createGame(ctx) {
    const canvasDimension = { get width() { return ctx.canvas.width; }, get height() { return ctx.canvas.height; } };
    const player = createPlayer(canvasDimension);
    const sprites = [createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), player];
    const playerSpeed = 10;
    /**
     * 
     * @type {TextState}
     */
    const textState = { score: 0, timeLeft: 3 };

    bindPlayerControlToKeyboard(player, playerSpeed);
    setTimerForGameOver(player, textState);
    const collisionSubject = createCollisionSubject(player);
    const drawSubject = createDrawSubject(ctx);
    const subjects = [collisionSubject, drawSubject];
    
    update([sprites, canvasDimension, textState], subjects);
}

/**
 * 
 * @param {[sprites: import("./utils/spriteUtils.js").SpriteType[], canvasDimension: import("./utils/spriteUtils.js").DimensionType, TextState]} state 
 * @param {import("../utils/ObservableSubject.js").ObservableSubjectType[]} subjects 
 */
function update(state, subjects) {
    subjects.forEach(subject => subject.notifyAll(...state));

    if (state[0][state[0].length - 1].active)
        requestAnimationFrame(() => update(state, subjects));
}