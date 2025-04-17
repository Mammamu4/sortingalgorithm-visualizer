import { SortingAlgorithm } from "../lib/types";

export class QuickSort implements SortingAlgorithm {
  sort(array: number[]): void {
    this.quickSort(array, 0, array.length - 1);
    console.log(array);
  }

  private quickSort(array: number[], left: number, right: number): void {
    if (left < right) {
      const pivotIndex = this.partition(array, left, right);
      this.quickSort(array, left, pivotIndex);
      this.quickSort(array, pivotIndex + 1, right);
    }
  }

  private partition(array: number[], left: number, right: number): number {
    const mid = Math.floor((left + right) / 2);
    const pivot = array[mid];
    let i = left - 1;
    let j = right + 1;

    while (true) {
      do {
        i++;
      } while (array[i] < pivot);
      
      do {
        j--;
      } while (array[j] > pivot);
      
      if (i >= j) {
        return j;
      }
      
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }
}