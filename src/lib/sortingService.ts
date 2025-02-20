import { BubbleSort } from "../algorithms/bubbleSort";
import { InsertionSort } from "../algorithms/insertionSort";
import { SelectionSort } from "../algorithms/selectionSort";
import {
  AnimationArrayType,
  SortingAlgorithm,
  SortingAlgorithmType,
} from "./types";

class SortingService {
  private algorithms: Map<SortingAlgorithmType, SortingAlgorithm> = new Map();

  constructor() {
    this.algorithms.set("bubble", new BubbleSort());
    this.algorithms.set("selection", new SelectionSort());
    this.algorithms.set("insertion", new InsertionSort());
  }
  generateAnimationArray(
    selectedAlgorithm: SortingAlgorithmType,
    isSorting: boolean,
    array: number[],
    runAnimation: (animations: AnimationArrayType) => void
  ): void {
    if (isSorting || array.length <= 1) return;
    const algorithm: SortingAlgorithm | undefined =
      this.algorithms.get(selectedAlgorithm);
    if (!algorithm) {
      console.error("That algorithm is no yet implemented");
      return;
    }

    // auxiliary = hjälpmedel <= google translate
    const animations: AnimationArrayType = []; // copy of array since we dont want to mutate state and cause refreshes on page
    const auxiliaryArray = array.slice();
    algorithm.sort(auxiliaryArray, animations); // polymorphism hehe 😎
    runAnimation(animations);
  }
}

const sortingService = new SortingService();

export const generateAnimationArray = (
  selectedAlgorithm: SortingAlgorithmType,
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
): void => {
  sortingService.generateAnimationArray(
    selectedAlgorithm,
    isSorting,
    array,
    runAnimation
  );
};
