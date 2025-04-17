import { SortingAlgorithm } from "../lib/types";

export class RadixSort implements SortingAlgorithm {
  sort(array: number[]): void {
    const max = this.getMax(array);
    if (max === undefined) return;

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      this.countingSort(array, array.length, exp);
    }
  }

  private countingSort(array: number[], n: number, exp: number): void {
    const output: number[] = new Array<number>(n);
    const count: number[] = new Array<number>(10).fill(0);

    for (let i = 0; i < n; i++) {
      count[Math.floor(array[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(array[i] / exp) % 10;
      output[count[digit] - 1] = array[i];
      count[digit]--;
    }

    for (let i = 0; i < n; i++) {
      array[i] = output[i];
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
