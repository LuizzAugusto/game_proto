//@ts-check
import { createObservableSubject } from "../utils/ObservableSubject.js";

/**
 * 
 * @param {import("../types").SpriteType} player 
 * @param {number} speed 
 * @returns 
 */
export function createControlSubject(player, speed) {

    const controlSubject = createObservableSubject();
    controlSubject.subscribe((ev) => {
        playerControl(player, speed, ev);
    });

    return controlSubject;
}

/**
 * 
 * @param {import("../types").SpriteType} player 
 * @param {number} speed 
 * @param {KeyboardEvent} ev
 */
function playerControl(player, speed, { key }) {
    if (!player.active)
        return;
    
    if (key == "ArrowUp")
        player.y -= speed;
    else if (key == "ArrowDown")
        player.y += speed;

    if (key == "ArrowLeft")
        player.x -= speed;
    else if (key == "ArrowRight")
        player.x += speed;
}