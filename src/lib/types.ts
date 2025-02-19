export type SortingAlgorithmType =
  | "bubble"
  | "selection"
  | "insertion"
  | "quick"
  | "merge"
  | "bucket";
export const sortingAlgorithmTypes: SortingAlgorithmType[] = [
  "bubble",
  "selection",
  "insertion",
  "quick",
  "merge",
  "bucket",
];
export type AnimationArrayType = [number[], boolean, number, number][];

export interface SortingAlgorithm {
  sort: (array: number[], animations: AnimationArrayType) => void;
}