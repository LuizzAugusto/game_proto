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
  controlSubject.subscribe(() => control(player, speed));

  return controlSubject;
}

/**
 * 
 * @param {import("../types").SpriteType} player 
 * @param {number} speed 
 */
function control(player, speed) {
  window.onkeydown = ({key}) => {
    if (key == "ArrowUp") {
      player.y -= speed;
    }
    else
    if (key == "ArrowDown") {
      player.y += speed;
    }

    if (key == "ArrowLeft") {
      player.x -= speed;
    }
    else
    if (key == "ArrowRight") {
      player.x += speed;
    }
  };
}