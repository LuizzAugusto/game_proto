//@ts-check

/**
 * 
 * @typedef {Object} DimensionType
 * 
 * @property {number} width
 * @property {number} height
 */

/**
 * 
 * @typedef {Object} SpriteType
 * @property {number} x
 * @property {number} y
 * 
 * @property {number} width
 * @property {number} height
 * 
 * @property {string} color
 * @property {boolean} visible
 * @property {boolean} active
 */

/**
 * 
 * @param {SpriteType} sprite 
 * @param {SpriteType} sprite2 
 */
export function areSpritesColliding(sprite, sprite2) {
    return (sprite.x + sprite.width ) > sprite2.x && sprite.x < (sprite2.x + sprite2.width )
        && (sprite.y + sprite.height) > sprite2.y && sprite.y < (sprite2.y + sprite2.height);
}

/**
 * 
 * @param {SpriteType} sprite 
 * @param {DimensionType} canvasDimension 
 */
export function randomSpritePosition(sprite, { width, height }) {
    sprite.x = Math.floor((Math.random() * width  * 10) % (width  - sprite.width ));
    sprite.y = Math.floor((Math.random() * height * 10) % (height - sprite.height));
}