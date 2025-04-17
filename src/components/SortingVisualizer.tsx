import { useSortingAlgorithmContext } from "../context/Visulizer";
import { LINE_MARGIN } from "../lib/utils";
import Controls from "./Controls";
import Counter from "./Counter";
import timeComplexityData from "../lib/sortingAlgorithms.json";
import { SortingAlgorithmInformation } from "../lib/types";
import TimeComplexity from "./TimeComplexity";
import { useEffect } from "react";

const getSelectedAlgorithm = (
  algorithms: SortingAlgorithmInformation[],
  selectedAlgorithm: string
): SortingAlgorithmInformation | undefined => {
  return algorithms.find(
    (algo) => algo.name.toLowerCase() === selectedAlgorithm.toLowerCase()
  );
};

const SortingVisualizer = () => {
  const {
    arrayToSort,
    numberOfArrayAcceses,
    numberOfComparisons,
    lineWidth,
    setLineWidth,
    resetArrayAndAnimation,
    selectedAlgorithm,
  } = useSortingAlgorithmContext();

  useEffect(resetArrayAndAnimation, [lineWidth]);
  const sortingAlgorithmInformation: SortingAlgorithmInformation[] =
    timeComplexityData as SortingAlgorithmInformation[];

  const selectedAlgorithmInformation: SortingAlgorithmInformation | undefined =
    getSelectedAlgorithm(sortingAlgorithmInformation, selectedAlgorithm);

  if (!selectedAlgorithmInformation) {
    return <div>Error: Selected algorithm not found</div>;
  }

  return (
    <div className="absolute top-0 h-screen w-screen bg-[#151515]">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex w-full flex-col lg:px-0 px-4"
        >
          <div className="h-[66px] relative flex items-center justify-between gap-2 w-full">
            <h1 className="text-3xl font-light">
              ALDA Sorting Algorithm Visualizer
            </h1>
            <Controls />
          </div>
          <div className="flex w-full gap-20">
            <div className="flex justify-between flex-1 text-left">
              <div>
                <h1 className="font-bold text-xl">{selectedAlgorithm}</h1>
                <p>{selectedAlgorithmInformation.description}</p>
              </div>
            </div>
            <div className="flex flex-col font-light items-end">
              <h1 className="font-bold text-xl">Time Complexity</h1>
              <div className="flex gap-2">
                <h1>Worst case: </h1>
                <TimeComplexity id={selectedAlgorithmInformation.worst} />
              </div>
              <div className="flex gap-2">
                <h1>Avrage case:</h1>
                <TimeComplexity id={selectedAlgorithmInformation.avrage} />
              </div>
              <div className="flex gap-2">
                <h1>Best case:</h1>
                <TimeComplexity id={selectedAlgorithmInformation.best} />
              </div>
            </div>
            <div className="flex flex-col items-end w-44">
              <p className="">{numberOfComparisons} : Comparisons</p>
              <p className="">{numberOfArrayAcceses} : Array Accesses</p>
              <Counter
                minValue={1}
                defaultValue={4}
                maxValue={20}
                stepValue={1}
                label="Arraysize"
                onChange={(count) => {
                  setLineWidth(count);
                }}
              />
            </div>
          </div>
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-0 w-full mx-auto left-0 right-0 flex justift-center items-end">
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative shadow-lg opacity-70 default-line-color"
                  style={{
                    height: `${value}px`,
                    width: `${lineWidth}px`,
                    margin: `0 ${LINE_MARGIN}px`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
