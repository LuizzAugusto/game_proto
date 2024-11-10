//@ts-check
import { randomSpritePosition } from "../game_core/logic.js";
import { createSprite } from "../game_core/view.js";
import { doRandomTargetPositionWhileColliding } from "./logic.js";

/**
 * 
 * @param {import("../game_core/logic.js").DimensionType} canvasDimension 
 */
export function createPlayer(canvasDimension) {
    const player = createSprite("green", 0, 0, 50, 50, true, false);
    randomSpritePosition(player, canvasDimension);
    return player;
}

/**
 * 
 * @param {import("../game_core/logic.js").DimensionType} canvasDimension 
 * @param {import("../game_core/logic.js").SpriteType} player 
 */
export function createTarget(canvasDimension, player) {
    const target = createSprite("red", 0, 0, 50, 50);
    doRandomTargetPositionWhileColliding(target, player, canvasDimension);
    return target;
}

/**
 * 
 * @typedef {Object} SpriteObject 
 * @property {import("../game_core/logic.js").SpriteType} player 
 * @property {import("../game_core/logic.js").SpriteType[]} targets 
 */

/**
 * @typedef {Object} Sprites 
 * @property {import("../game_core/logic.js").SpriteType[]} spritesArray 
 * @property {SpriteObject} spritesObject 
 */

/**
 * 
 * @param {import("../game_core/logic.js").SpriteType} player 
 * @param {import("../game_core/logic.js").SpriteType[]} targets 
 * @returns {Sprites}
 */
export function createSpritesWrapper(player, targets) {
    return {
        spritesArray: [ ...targets, player ],
        spritesObject: { player, targets },
    };
}