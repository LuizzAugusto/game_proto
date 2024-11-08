//@ts-check
import { resetPosition } from "../logic.js";

/**
 * 
 * @typedef {Object} PositionType
 * @property {number} x
 * @property {number} y
 */

/**
 * 
 * @typedef {Object} DimensionType
 * @property {number} width
 * @property {number} height
 */

/**
 * 
 * @typedef {PositionType & DimensionType & { color: string, visible: boolean, active: boolean }} SpriteType
 */

/**
 * 
 * @param {string} color 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {boolean|undefined} visible 
 * @returns {SpriteType}
 */
export function createSprite(color, x, y, width, height, visible = true, active = true) {
    return { color, x, y, width, height, visible, active };
}

/**
 * 
 * @param {DimensionType} canvasDimension 
 */
export function createPlayer(canvasDimension) {
    const player = createSprite("green", 0, 0, 50, 50);
    resetPosition(player, canvasDimension);
    return player;
}

/**
 * 
 * @param {DimensionType} canvasDimension 
 */
export function createTarget(canvasDimension) {
    const target = createSprite("red", 0, 0, 50, 50);
    resetPosition(target, canvasDimension);
    return target;
}