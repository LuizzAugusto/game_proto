//@ts-check
import { resetPosition } from "../logic.js";

/**
 * 
 * @param {string} color 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {boolean|undefined} visible 
 * @returns {import("../../types").SpriteType}
 */
export function createSprite(color, x, y, width, height, visible = true, active = true) {
    return { color, x, y, width, height, visible, active };
}

/**
 * 
 * @param {import("../../types").DimensionType} canvasDimension 
 */
export function createPlayer(canvasDimension) {
    const player = createSprite("green", 0, 0, 50, 50);
    resetPosition(player, canvasDimension);
    return player;
}

/**
 * 
 * @param {import("../../types").DimensionType} canvasDimension 
 */
export function createTarget(canvasDimension) {
    const target = createSprite("red", 0, 0, 50, 50);
    resetPosition(target, canvasDimension);
    return target;
}