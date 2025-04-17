import { SortingAlgorithm } from "../lib/types";

export class BubbleSort implements SortingAlgorithm {
  sort(array: number[]): void {
    let lastIndex: number = array.length - 1;
    let swapped: boolean;

    do {
      swapped = false;
      for (let i = 0; i < lastIndex; i++) {
        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
        }
      }
      lastIndex--;
    } while (swapped);
  }
}
