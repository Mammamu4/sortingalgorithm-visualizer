import React, { createContext, useContext, useState, useEffect } from "react";
import { AnimationArrayType, SortingAlgorithmType } from "../lib/types";
import {
  DEFAULT_ANIMATION_SPEED,
  generateRandomNumberFromInterval,
} from "../lib/utils";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  setArrayToSort: (array: number[]) => void;
  selectedAlgorithm: SortingAlgorithmType;
  setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (animationSpeed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isAnimationComplete: boolean) => void;
  numberOfComparisons: number;
  setNumberOfComparisons: (numberOfComparisons: number) => void;
  numberOfArrayAcceses: number;
  setNumberOfArrayAcceses: (numberOfArrayAcceses: number) => void;
  resetArrayAndAnimation: () => void;
  runAnimation: (animations: AnimationArrayType) => void;
  requiresReset: boolean;
}

const SortingAlgorithmContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

export const SortingAlgorithmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlgorithmType>("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(
    DEFAULT_ANIMATION_SPEED
  );
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);
  const [numberOfComparisons, setNumberOfComparisons] = useState<number>(0);
  const [numberOfArrayAcceses, setNumberOfArrayAcceses] = useState<number>(0);

  const requiresReset: boolean = isAnimationComplete || isSorting;

  useEffect(() => {
    resetArrayAndAnimation();
    window.addEventListener("resize", resetArrayAndAnimation);
    return () => {
      window.removeEventListener("rezise", resetArrayAndAnimation);
    };
  }, []);

  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;
    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: number[] = []; // using a temparray to avoid refreshing on every setArrayToSort state change
    const numLines = contentContainerWidth / 12; // line is 8 px wide and 2px margin on x axis => every line is total 12px
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);
    for (let i = 0; i < numLines; i++) {
      tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight));
    }
    setArrayToSort(tempArray);
    setIsAnimationComplete(false);
    setIsSorting(false);
    setNumberOfArrayAcceses(0);
    setNumberOfComparisons(0);

    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearTimeout(i);
      }
    }, 0);
    setTimeout(() => {
      const arrayLines = document.getElementsByClassName(
        "array-line"
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < arrayLines.length; i++) {
        arrayLines[i].classList.remove("changed-line-color");
        arrayLines[i].classList.add("default-line-color");
      }
    }, 0);
  };

  const runAnimation = (animations: AnimationArrayType) => {
    setIsSorting(true);

    const inverseSpeed = (1 / animationSpeed) * 200;
    const arrayLines = document.getElementsByClassName(
      "array-line"
    ) as HTMLCollectionOf<HTMLElement>;

    const updateHeightValue = (
      lineIndex: number,
      newHeight: number | undefined
    ) => {
      if (newHeight === undefined) return;
      arrayLines[lineIndex].style.height = `${newHeight}px`;
    };

    const updateClassList = (
      indexes: number[],
      addClassName: string,
      removeClassName: string
    ) => {
      indexes.forEach((index) => {
        arrayLines[index].classList.add(addClassName);
        arrayLines[index].classList.remove(removeClassName);
      });
    };

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [values, isSwap, comparisons, arrayAcceses] = animation;
        setNumberOfComparisons(comparisons);
        setNumberOfArrayAcceses(arrayAcceses);
        if (!isSwap) {
          updateClassList(values, "changed-line-color", "default-line-color");
          setTimeout(() => {
            updateClassList(values, "default-line-color", "changed-line-color");
          }, inverseSpeed);
        } else {
          const [lineIndex, newHeight] = values;
          updateHeightValue(lineIndex, newHeight);
        }
      }, index * inverseSpeed); // index is used to enqueue each animation in a sequence, example: 1000ms, 2000ms, 3000ms for index 1, 2, 3 if inverseSpeed is 1000ms
      // witohut index all would run at the same time
    });

    const finalTimeout = animations.length * inverseSpeed;

    setTimeout(() => {
      Array.from(arrayLines).forEach((line, index) => {
        setTimeout(() => {
          line.classList.add("complete-animation", "complete-line-color");
          line.classList.remove("default-line-color");
        }, 10 * index);
      });

      setTimeout(() => {
        Array.from(arrayLines).forEach((line, index) => {
          line.classList.remove("complete-animation", "complete-line-color");
          line.classList.add("default-line-color");
        });
        setIsSorting(false);
        setIsAnimationComplete(true);
      }, 2000);
    }, finalTimeout);
  };

  const value = {
    arrayToSort,
    setArrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    numberOfComparisons,
    setNumberOfComparisons,
    numberOfArrayAcceses,
    setNumberOfArrayAcceses,
    setIsAnimationComplete,
    resetArrayAndAnimation,
    runAnimation,
    requiresReset,
  };

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
  const context = useContext(SortingAlgorithmContext);
  if (!context) {
    throw new Error(
      "useSortingAlgorithmContext must be used within a SortingAlgorithmProvider"
    );
  }
  return context;
};
