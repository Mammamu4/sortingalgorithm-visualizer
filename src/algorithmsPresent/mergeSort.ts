import { SortingAlgorithm } from "../lib/types";

export class MergeSort implements SortingAlgorithm {
  sort(array: number[]): void {
    this.mergeSort(array, 0, array.length - 1);
    console.log(array);
  }

  private mergeSort(array: number[], left: number, right: number): void {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);

    this.mergeSort(array, left, middle);
    this.mergeSort(array, middle + 1, right);

    this.merge(array, left, middle, right);
  }

  private merge(
    array: number[],
    left: number,
    middle: number,
    right: number
  ): void {
    const leftArr = array.slice(left, middle + 1);
    const rightArr = array.slice(middle + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        array[k++] = leftArr[i++];
      } else {
        array[k++] = rightArr[j++];
      }
    }

    while (i < leftArr.length) {
      array[k++] = leftArr[i++];
    }

    while (j < rightArr.length) {
      array[k++] = rightArr[j++];
    }
  }
}
