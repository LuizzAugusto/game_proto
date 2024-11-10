//@ts-check
import { randomSpritePosition } from "../../game_core/logic.js";
import { createSprite } from "../../game_core/view.js";
import { doRandomTargetPositionWhileColliding } from "../logic.js";

/**
 * 
 * @param {import("../../game_core/logic.js").DimensionType} canvasDimension 
 */
export function createPlayer(canvasDimension) {
    const player = createSprite("green", 0, 0, 50, 50, true, false);
    randomSpritePosition(player, canvasDimension);
    return player;
}

/**
 * 
 * @param {import("../../game_core/logic.js").DimensionType} canvasDimension 
 * @param {import("../../game_core/logic.js").SpriteType} player 
 */
export function createTarget(canvasDimension, player) {
    const target = createSprite("red", 0, 0, 50, 50);
    doRandomTargetPositionWhileColliding(target, player, canvasDimension);
    return target;
}