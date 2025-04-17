import { SortingAlgorithm } from "../lib/types";

export class SelectionSort implements SortingAlgorithm {
  sort(array: number[]): void {
    for (let i = 0; i < array.length; i++) {
      let minIndex: number = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }
    console.log(array);
  }
}
