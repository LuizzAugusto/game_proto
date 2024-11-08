//@ts-check
import { createObservableSubject } from "../utils/ObservableSubject.js";

/**
 * 
 * @param {import("../types").SpriteType} player 
 * @param {{score: number, timeLeft: number}} textState 
 * @returns {import("../utils/types").ObservableSubjectType}
 */
export function createCollisionSubject(player, textState) {
    const id = window.setInterval(() => {
        textState.timeLeft -= 1;
        if (textState.timeLeft == 0) {
            player.active = false;
            window.clearInterval(id);
        }
    }, 1000);

    const collisionSubject = createObservableSubject();
    collisionSubject.subscribe(
        /**
         * 
         * @param {import("../types").SpriteType[]} sprites 
         * @param {import("../types").DimensionType} canvasDimension 
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
 * @param {import("../types").SpriteType} target 
 * @param {import("../types").SpriteType} player 
 * @param {import("../types").DimensionType} canvasDimension 
 * @param {{score: number, timeLeft: number}} textState 
 */
function verifyCollision(target, player, canvasDimension, textState) {
    if (collision(target, player)) {
        scoreIfColliding(textState);
        resetTargetPositionWhileColliding(target, player, canvasDimension);
    }
}

/**
 * 
 * @param {import("../types").SpriteType} target 
 * @param {import("../types").SpriteType} player 
 * @param {import("../types").DimensionType} canvasDimension 
 */
function resetTargetPositionWhileColliding(target, player, canvasDimension, usindgDo = true) {
    if (usindgDo)
        do
            resetPosition(target, canvasDimension);
        while (collision(target, player));
    else
        while (collision(target, player))
            resetPosition(target, canvasDimension);
}

/**
 * 
 * @param {import("../types").SpriteType} sprite 
 * @param {import("../types").DimensionType} canvasDimension 
 */
export function resetPosition(sprite, { width, height }) {
    sprite.x = Math.floor((Math.random() * width * 10) % (width - sprite.width));
    sprite.y = Math.floor((Math.random() * height * 10) % (height - sprite.height));
}

/**
 * 
 * @param {import("../types").SpriteType} sprite 
 * @param {import("../types").SpriteType} sprite2 
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
function scoreIfColliding(textState) {
    textState.score += 1;
    textState.timeLeft += 1;
}