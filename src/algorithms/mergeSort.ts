import { AnimationArrayType, SortingAlgorithm } from "../lib/types";

export class MergeSort implements SortingAlgorithm {
  private comparisons: number = 0;
  private arrayAccesses: number = 0;

  sort(array: number[], animations: AnimationArrayType): void {
    this.comparisons = 0;
    this.arrayAccesses = 0;

    this.mergeSort(array, 0, array.length - 1, animations);
    console.log(array);
  }

  private mergeSort(
    array: number[],
    left: number,
    right: number,
    animations: AnimationArrayType
  ): void {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);

    this.mergeSort(array, left, middle, animations);
    this.mergeSort(array, middle + 1, right, animations);

    this.merge(array, left, middle, right, animations);
  }

  private merge(
    array: number[],
    left: number,
    middle: number,
    right: number,
    animations: AnimationArrayType
  ): void {
    const leftArr = array.slice(left, middle + 1);
    const rightArr = array.slice(middle + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      this.comparisons++;
      animations.push([[left + i, middle + 1 + j], false, this.comparisons, this.arrayAccesses]);
      this.arrayAccesses += 4;
      if (leftArr[i] <= rightArr[j]) {
        animations.push([[k, leftArr[i]], true, this.comparisons, this.arrayAccesses])
        array[k++] = leftArr[i++];
      } else {
        animations.push([[k, rightArr[j]], true, this.comparisons, this.arrayAccesses])
        array[k++] = rightArr[j++];
      }
    }
    
    while (i < leftArr.length) {
      this.arrayAccesses += 2;
      animations.push([[k, leftArr[i]], true, this.comparisons, this.arrayAccesses])
      array[k++] = leftArr[i++];
    }
    
    while (j < rightArr.length) {
      this.arrayAccesses += 2;
      animations.push([[k, rightArr[j]], true, this.comparisons, this.arrayAccesses])
      array[k++] = rightArr[j++];
    }
  }
}
