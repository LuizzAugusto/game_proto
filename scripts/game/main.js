//@ts-check
import { createControlSubject } from "./input.js";
import { createCollisionSubject, resetPosition } from "./logic.js";
import { createDrawSubject } from "./view.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function createGame(ctx) {
    const canvasDimension = { get width() { return ctx.canvas.width; }, get height() { return ctx.canvas.height; } };
    const player = createTarget(canvasDimension, "green");
    const targets = [createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), createTarget(canvasDimension), player];

    const controlSubject = createControlSubject(player, 10);
    window.addEventListener("keydown", (ev) => controlSubject.notifyAll(ev));

    const textState = { score: 0, timeLeft: 3 };

    const collisionSubject = createCollisionSubject(player, textState);
    const drawSubject = createDrawSubject(ctx);
    const subjects = [collisionSubject, drawSubject];
    
    update([targets, canvasDimension, textState], subjects);
}

/**
 * 
 * @param {string} color 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {boolean|undefined} visible 
 * @returns {import("../types").SpriteType}
 */
function createSprite(color, x, y, width, height, visible = true, active = true) {
    return { color, x, y, width, height, visible, active };
}

/**
 * 
 * @param {import("../types").DimensionType} canvasDimension 
 * @param {string|undefined} color 
 */
function createTarget(canvasDimension, color = "red") {
    const target = createSprite(color, 0, 0, 50, 50);
    resetPosition(target, canvasDimension);
    return target;
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