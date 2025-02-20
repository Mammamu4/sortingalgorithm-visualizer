import { AnimationArrayType, SortingAlgorithm } from "../lib/types";

export class InsertionSort implements SortingAlgorithm {
  sort(array: number[], animations: AnimationArrayType): void {
    let comparisons: number = 0;
    let arrayAccesses: number = 0;

    for (let i = 1; i < array.length; i++) {
      let currentIndex = i;

      
      while (
        currentIndex > 0 &&
        array[currentIndex - 1] > array[currentIndex]
      ) {
        animations.push([[currentIndex, currentIndex - 1], false, ++comparisons, arrayAccesses]);
        // Swap adjacent elements
        animations.push([[currentIndex - 1, array[currentIndex]], true, comparisons, arrayAccesses]);
        animations.push([[currentIndex, currentIndex - 1], false, comparisons, arrayAccesses]);
        animations.push([[currentIndex, array[currentIndex - 1]], true, comparisons, arrayAccesses]);
        [array[currentIndex - 1], array[currentIndex]] = [
          array[currentIndex],
          array[currentIndex - 1],
        ];
        arrayAccesses += 2;

        currentIndex--;
      }
    }
    console.log(array)
  }
}
