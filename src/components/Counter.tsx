import React, { useEffect, useState } from "react";

interface CounterProps {
  defaultValue: number;
  minValue: number;
  maxValue: number;
  stepValue: number;
  label: string;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  defaultValue,
  minValue,
  maxValue,
  stepValue,
  label,
  onChange,
}) => {
  const [count, setCount] = useState<number>(defaultValue);

  useEffect(() => {
    onChange?.(count);
  }, [count]);

  const handleIncrement = () => {
    if (count < maxValue) {
      setCount(count + stepValue);
    }
  };

  const handleDecrement = () => {
    if (count > minValue) {
      setCount(count - stepValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 99999) {
      setCount(value);
    }
  };

  return (
    <form className="max-w-xs">
      <label
        htmlFor="quantity-input"
        className="block mt-1 text-sm font-medium text-right text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={handleDecrement}
          id="decrement-button"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          value={count}
          onChange={handleInputChange}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="00000"
          required
        />
        <button
          type="button"
          onClick={handleIncrement}
          id="increment-button"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Counter;
