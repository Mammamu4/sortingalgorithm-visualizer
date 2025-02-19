import { AnimationArrayType, SortingAlgorithm } from "../lib/types";

export class SelectionSort implements SortingAlgorithm {
  sort(array: number[], animations: AnimationArrayType): void {
    let lastIndex: number = array.length - 1;
    let swapped: boolean;
    let comparisons: number = 0;
    let arrayAccesses: number = 0;

    do {
      swapped = false;
      for (let i = 0; i < lastIndex; i++) {
        animations.push([[i, i + 1], false, comparisons, arrayAccesses]);
        if (array[i] > array[i + 1]) {
          comparisons++;
          arrayAccesses += 6; // 2 reads + 4 writes
          animations.push([[i, array[i + 1]], true, comparisons, arrayAccesses]);
          animations.push([[i + 1, array[i]], true, comparisons, arrayAccesses]);
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
        }
      }
      lastIndex--;
    } while (swapped);
  }
}
