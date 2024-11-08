//@ts-check

/**
 * 
 * @param {KeyboardEvent} ev
 * @param {import("../types").SpriteType} player 
 * @param {number} speed 
 */
function playerControl({ key }, player, speed) {
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

/**
 * 
 * @param {import("../types").SpriteType} player 
 * @param {number} speed 
 */
export function bindPlayerControlToKeyboard(player, speed) {
    window.addEventListener("keydown", (ev) => playerControl(ev, player, speed));
}