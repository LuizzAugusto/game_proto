export type PositionType = { x: number, y: number };
export type DimensionType = { width: number, height: number };
export type SpriteType = PositionType & DimensionType & { color: string, visible: boolean };