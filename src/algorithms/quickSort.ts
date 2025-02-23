import { SortingAlgorithm, AnimationArrayType } from "../lib/types";

export class QuickSort implements SortingAlgorithm {
  private comparisons: number = 0;
  private arrayAccesses: number = 0;

  sort(array: number[], animations: AnimationArrayType): void {
    this.comparisons = 0;
    this.arrayAccesses = 0;
    this.quickSort(array, 0, array.length - 1, animations);
    console.log(array);
  }

  private quickSort(
    array: number[],
    left: number,
    right: number,
    animations: AnimationArrayType
  ): void {
    if (left < right) {
      this.comparisons++
      const pivotIndex = this.partition(array, left, right, animations);
      this.quickSort(array, left, pivotIndex, animations);
      this.quickSort(array, pivotIndex + 1, right, animations);
    }
  }

  private partition(
    array: number[],
    left: number,
    right: number,
    animations: AnimationArrayType
  ): number {
    const mid = Math.floor((left + right) / 2);
    const pivot = array[mid];
    this.arrayAccesses++;
    let i = left - 1;
    let j = right + 1;
    animations.push([[i, j, mid], false, this.comparisons, this.arrayAccesses]);

    while (true) {
      do {
        i++;
        this.comparisons++;
        this.arrayAccesses++;
        // Add comparison animation
        animations.push([[i, j], false, this.comparisons, this.arrayAccesses])
      } while (array[i] < pivot);
      
      do {
        j--;
        this.comparisons++;
        this.arrayAccesses++;
        // Add comparison animation
        animations.push([[j, i], false, this.comparisons, this.arrayAccesses])
      } while (array[j] > pivot);
      
      if (i >= j) {
        return j;
      }
      
      // Add swap animation
      // Perform the swap
      this.arrayAccesses += 2;
      animations.push([[i, array[j]], true, this.comparisons, this.arrayAccesses]);
      animations.push([[j, array[i]], true, this.comparisons, this.arrayAccesses]);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
