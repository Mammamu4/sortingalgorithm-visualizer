export const MIN_ANIMATION_SPEED = 10;
export const MAX_ANIMATION_SPEED = 500;
export const DEFAULT_ANIMATION_SPEED = 150;

// in pixels
export const LINE_WIDTH = 4;
export const LINE_MARGIN = 1;

export function generateRandomNumberFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}