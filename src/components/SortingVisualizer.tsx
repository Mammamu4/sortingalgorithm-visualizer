import { useSortingAlgorithmContext } from "../context/Visulizer";
import { LINE_MARGIN, LINE_WIDTH } from "../lib/utils";
import Controls from "./Controls";

const SortingVisualizer = () => {
  const { arrayToSort, numberOfArrayAcceses, numberOfComparisons } =
    useSortingAlgorithmContext();

  return (
    <div className="absolute top-0 h-screen w-screen bg-[#151515]">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4"
        >
          <div className="h-[66px] relative flex items-center justify-between gap-2 w-full">
            <h1 className="text-3xl font-light">
              ALDA Sorting Algorithm Visualizer
            </h1>
            <Controls />
          </div>
          <div className="flex w-full">
            <div className="flex-1 text-left">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
              iste sunt, eaque quae quam praesentium aspernatur repellat
              assumenda aut magnam fuga, esse consectetur ipsum qui deserunt
              unde mollitia et natus?
            </div>
            <div className="flex flex-col items-end shrink-0">
              <p>{numberOfComparisons} : Comparisons</p>
              <p>{numberOfArrayAcceses} : Array Accesses</p>
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
                    width: `${LINE_WIDTH}px`,
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
