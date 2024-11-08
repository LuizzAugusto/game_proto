//@ts-check
import { createObservableSubject } from "../utils/ObservableSubject.js";

/**
 * 
 * @param {import("./utils/spriteUtils.js").SpriteType} player 
 * @param {{score: number, timeLeft: number}} textState 
 */
export function setTimerForGameOver(player, textState) {
    const id = window.setInterval(() => {
        textState.timeLeft -= 1;
        if (textState.timeLeft == 0) {
            player.active = false;
            window.clearInterval(id);
        }
    }, 1000);
}

/**
 * 
 * @param {import("./utils/spriteUtils.js").SpriteType} player 
 * @returns {import("../utils/ObservableSubject.js").ObservableSubjectType}
 */
export function createCollisionSubject(player) {
    const collisionSubject = createObservableSubject();
    collisionSubject.subscribe(
        /**
         * 
         * @param {import("./utils/spriteUtils.js").SpriteType[]} sprites 
         * @param {import("./utils/spriteUtils.js").DimensionType} canvasDimension 
         * @param {{score: number, timeLeft: number}} textState 
         */
        (sprites, canvasDimension, textState) => {
            for (let x = 0; x < sprites.length - 1; x++)
                verifyCollision(sprites[x], player, canvasDimension, textState);
        }
    );

    return collisionSubject;
}

/**
 * 
 * @param {import("./utils/spriteUtils.js").SpriteType} target 
 * @param {import("./utils/spriteUtils.js").SpriteType} player 
 * @param {import("./utils/spriteUtils.js").DimensionType} canvasDimension 
 * @param {{score: number, timeLeft: number}} textState 
 */
function verifyCollision(target, player, canvasDimension, textState) {
    if (collision(target, player)) {
        score(textState);
        resetTargetPositionWhileColliding(target, player, canvasDimension);
    }
}

/**
 * 
 * @param {import("./utils/spriteUtils.js").SpriteType} target 
 * @param {import("./utils/spriteUtils.js").SpriteType} player 
 * @param {import("./utils/spriteUtils.js").DimensionType} canvasDimension 
 */
function resetTargetPositionWhileColliding(target, player, canvasDimension) {
    do resetPosition(target, canvasDimension);
    while (collision(target, player));
}

/**
 * 
 * @param {import("./utils/spriteUtils.js").SpriteType} sprite 
 * @param {import("./utils/spriteUtils.js").DimensionType} canvasDimension 
 */
export function resetPosition(sprite, { width, height }) {
    sprite.x = Math.floor((Math.random() * width * 10) % (width - sprite.width));
    sprite.y = Math.floor((Math.random() * height * 10) % (height - sprite.height));
}

/**
 * 
 * @param {import("./utils/spriteUtils.js").SpriteType} sprite 
 * @param {import("./utils/spriteUtils.js").SpriteType} sprite2 
 */
function collision(sprite, sprite2) {
    return sprite.visible && sprite2.visible
        && (sprite.x + sprite.width) >= sprite2.x && sprite.x <= (sprite2.x + sprite2.width)
        && (sprite.y + sprite.height) >= sprite2.y && sprite.y <= (sprite2.y + sprite2.height);
}

/**
 * 
 * @param {{score: number, timeLeft: number}} textState 
 */
function score(textState) {
    textState.score += 1;
    textState.timeLeft += 1;
}