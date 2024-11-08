//@ts-check
import { bindPlayerControlToKeyboard } from "./input.js";
import { createCollisionSubject, setTimerForGameOver } from "./logic.js";
import { createTarget } from "./utils/spriteUtils.js";
import { createDrawSubject } from "./view.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function createGame(ctx) {
    const canvasDimension = { get width() { return ctx.canvas.width; }, get height() { return ctx.canvas.height; } };
    const player = createTarget(canvasDimension, "green");
    const targets = [createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), player];
    const playerSpeed = 10;
    const textState = { score: 0, timeLeft: 3 };

    bindPlayerControlToKeyboard(player, playerSpeed);
    setTimerForGameOver(player, textState);
    const collisionSubject = createCollisionSubject(player);
    const drawSubject = createDrawSubject(ctx);
    const subjects = [collisionSubject, drawSubject];
    
    update([targets, canvasDimension, textState], subjects);
}

/**
 * 
 * @param {[sprites: import("../types").SpriteType[], canvasDimension: import("../types").DimensionType, {score: number, timeLeft: number}]} state 
 * @param {import("../utils/types.js").ObservableSubjectType[]} subjects 
 */
function update(state, subjects) {
    subjects.forEach(subject => subject.notifyAll(...state));

    if (state[0][state[0].length - 1].active)
        requestAnimationFrame(() => update(state, subjects));
}