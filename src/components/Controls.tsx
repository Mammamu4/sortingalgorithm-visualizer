import { useSortingAlgorithmContext } from "../context/Visulizer";
import { SortingAlgorithmType, sortingAlgorithmTypes } from "../lib/types";
import { MAX_ANIMATION_SPEED, MIN_ANIMATION_SPEED } from "../lib/utils";
import { generateAnimationArray } from "../lib/sortingService";

const Controls = () => {
  const {
    arrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    animationSpeed,
    setAnimationSpeed,
    isSorting,
    runAnimation,
    resetArrayAndAnimation,
    requiresReset,
  } = useSortingAlgorithmContext();

  const handlePlay = () => {
    if (requiresReset) {
      resetArrayAndAnimation();
      return;
    }
    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAnimation
    );
  };

  return (
    <div className="flex gap-4 items-center justify-evenly">
      <div className="flex flex-col items-center justify-center">
        <label htmlFor="animation-speed">Animation Speed</label>
        <input
          id="animation-speed"
          type="range"
          min={MIN_ANIMATION_SPEED}
          max={MAX_ANIMATION_SPEED}
          value={animationSpeed}
          step={1}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          disabled={isSorting}
          className="w-[200px]"
        />
        <div>
          <label htmlFor="animation-speed"></label>
        </div>
      </div>
      <select
        name="algorithm"
        id="algorithm-select"
        value={selectedAlgorithm}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) =>
          setSelectedAlgorithm(e.target.value as SortingAlgorithmType)
        }
        disabled={isSorting}
      >
        {sortingAlgorithmTypes.map((sortingAlgorithmType, index) => (
          <option key={index} className="" value={sortingAlgorithmType}>
            {sortingAlgorithmType}
          </option>
        ))}
      </select>
      <button onClick={handlePlay} className="bg-white p-1 rounded-3xl">
        {requiresReset ? (
          <img
            src="/sorting/restart.svg"
            alt=""
            className="hover:scale-110 active:scale-90 transition-all duration-100"
            width={48}
            height={48}
          />
        ) : (
          <img
            src="/sorting/play.svg"
            alt=""
            className="hover:scale-110 active:scale-90 transition-all duration-100"
            width={48}
            height={48}
          />
        )}
      </button>
    </div>
  );
};

export default Controls;
