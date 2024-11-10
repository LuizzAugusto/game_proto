//@ts-check
import { areSpritesColliding, randomSpritePosition } from "../game_core/logic.js";

/**
 * 
 * @param {import("../game_core/logic.js").SpriteType} player 
 * @param {{score: number, timeLeft: number}} textState 
 */
export function setTimerForGameOver(player, textState) {
    const id = window.setInterval(() => {
        if (!player.active)
            return;
    
        textState.timeLeft -= 1;
        if (textState.timeLeft == 0) {
            player.active = false;
            window.clearInterval(id);
        }
    }, 1000);
}

/**
 * 
 * @param {import("./main.js").GameState} gameState
 */
export function verifyTargetIsCollidingWithPlayer(gameState) {
    const { ctx, sprites } = gameState;
    const player = sprites[0];
    const targets = sprites.slice(1);

    for (const target of targets)
        verifyCollision(target, player, ctx.canvas, gameState);
}

/**
 * 
 * @param {import("../game_core/logic.js").SpriteType} target 
 * @param {import("../game_core/logic.js").SpriteType} player 
 * @param {import("../game_core/logic.js").DimensionType} canvasDimension 
 */
function verifyCollision(target, player, canvasDimension, gameState) {
    if (areSpritesColliding(target, player)) {
        score(gameState);
        doRandomTargetPositionWhileColliding(target, player, canvasDimension);
    }
}

/**
 * 
 * @param {import("../game_core/logic.js").SpriteType} target 
 * @param {import("../game_core/logic.js").SpriteType} player 
 * @param {import("../game_core/logic.js").DimensionType} canvasDimension 
 */
export function doRandomTargetPositionWhileColliding(target, player, canvasDimension) {
    do randomSpritePosition(target, canvasDimension);
    while (areSpritesColliding(target, player));
}

/**
 * 
 * @param {{score: number, timeLeft: number}} textState 
 */
function score(textState) {
    textState.score += 1;
    textState.timeLeft += 1;
}