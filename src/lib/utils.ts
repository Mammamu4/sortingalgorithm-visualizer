export const MIN_ANIMATION_SPEED = 1;
export const MAX_ANIMATION_SPEED = 1000;
export const DEFAULT_ANIMATION_SPEED = 250;

// in pixels
export const LINE_WIDTH = 4;
export const LINE_MARGIN = 0;

export function generateRandomNumberFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}