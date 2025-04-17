import { SortingAlgorithm } from "../lib/types";

export class InsertionSort implements SortingAlgorithm {
  sort(array: number[]): void {
    for (let i = 1; i < array.length; i++) {
      let currentIndex = i;

      while (currentIndex > 0 && array[currentIndex - 1] > array[currentIndex]) {
        [array[currentIndex - 1], array[currentIndex]] = [array[currentIndex], array[currentIndex - 1]];
        currentIndex--;
      }
    }
    console.log(array);
  }
}