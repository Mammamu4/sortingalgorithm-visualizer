import { SortingAlgorithm, AnimationArrayType } from "../lib/types";

export class RadixSort implements SortingAlgorithm {
  private comparisons: number = 0;
  private arrayAccesses: number = 0;

  sort(array: number[], animations: AnimationArrayType): void {
    this.comparisons = 0;
    this.arrayAccesses = 0;
    
    const max = this.getMax(array);
    if (max === undefined) return;
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      this.countingSort(array, array.length, exp, animations);
    }
  }
  private countingSort(array: number[], n: number, exp: number, animations: AnimationArrayType): void {
    const output: number[] = new Array<number>(n);
    const count: number[] = new Array<number>(10).fill(0);

    for (let i = 0; i < n; i++) {
      count[Math.floor(array[i] / exp) % 10]++;
      this.arrayAccesses+= 2;
      animations.push([[i, i], false, this.comparisons, this.arrayAccesses]);
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
      this.arrayAccesses += 2;
    }
    
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(array[i] / exp) % 10;
      output[count[digit] - 1] = array[i];
      this.arrayAccesses++;
      animations.push([[count[digit] - 1, array[i]], true, this.comparisons, this.arrayAccesses]);
      animations.push([[i, array[count[digit] - 1]], true, this.comparisons, this.arrayAccesses]);
      count[digit]--;
    }

    for (let i = 0; i < n; i++) {
      array[i] = output[i];
      this.arrayAccesses++;
      animations.push([[i, output[i]], true, this.comparisons, this.arrayAccesses]);
    }
  }
  private getMax(array: number[]): number | undefined {
    let max: number = 0;
    for (let i = 0; i < array.length; i++) {
      const numOfDigits = array[i].toString().length;
      if (numOfDigits > max) {
        max = numOfDigits;
      }
      return Math.pow(10, max);
    }
  }
}
