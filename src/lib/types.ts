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

export type TimeComplexity =
  | "constant"
  | "logarithmic"
  | "linear"
  | "linearithmic"
  | "quadratic"
  | "cubic"
  | "exponential"
  | "factorial";

export interface SortingAlgorithmInformation {
  name: SortingAlgorithmType;
  description: string;
  worst: TimeComplexity;
  avrage: TimeComplexity;
  best: TimeComplexity;
}
