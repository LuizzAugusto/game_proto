//@ts-check

/**
 * 
 * @param {KeyboardEvent} ev
 * @param {import("../game_core/logic.js").SpriteType} player 
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
 * @param {import("../game_core/logic.js").SpriteType} player 
 * @param {number} speed 
 */
export function bindPlayerControlToKeyboard(player, speed) {
    window.addEventListener("keydown", (ev) => playerControl(ev, player, speed));
}


/**
 * 
 * @param {import("../game_core/logic.js").SpriteType} player 
 * @param {{ timeLeft }} gameState
 * @param {HTMLElement|null} pauseButtonEl 
 */
export function activeDeactivePlayerWhenClickPauseButton(player, gameState, pauseButtonEl) {
    if(pauseButtonEl)
        pauseButtonEl.addEventListener("click", () => {
            const { timeLeft } = gameState;
            player.active = timeLeft > 0 && !player.active;
        });
}