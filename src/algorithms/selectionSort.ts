import { AnimationArrayType, SortingAlgorithm } from "../lib/types";

export class SelectionSort implements SortingAlgorithm {
  sort(array: number[], animations: AnimationArrayType): void {
    let comparisons: number = 0;
    let arrayAccesses: number = 0;

    for (let i = 0; i < array.length; i++) {
      let minIndex: number = i;
      for (let j = i + 1; j < array.length; j++) {
        arrayAccesses += 2;
        comparisons++;
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
        animations.push([[i, j, minIndex], false, comparisons, arrayAccesses]);
      }
      if (minIndex !== i) {
        arrayAccesses += 2;
        animations.push([
          [i, array[minIndex]],
          true,
          comparisons,
          arrayAccesses,
        ]);
        animations.push([
          [minIndex, array[i]],
          true,
          comparisons,
          arrayAccesses,
        ]);
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }
    console.log(array);
  }
}
