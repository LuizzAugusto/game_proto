//@ts-check

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

/**
 * 
 * @param {import("../types").SpriteType} player 
 * @param {number} speed 
 */
export function bindPlayerControlToKeyboard(player, speed) {
    window.addEventListener("keydown", (ev) => playerControl(player, speed, ev));
}