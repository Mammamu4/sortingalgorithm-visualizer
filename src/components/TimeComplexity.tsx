import React from 'react'
import { TimeComplexity as TimeComplexityId} from '../lib/types';

const complexityMap: Record<TimeComplexityId, string> = {
  constant: '1',
  logarithmic: 'log n',
  linear: 'n',
  linearithmic: 'n log n',
  quadratic: 'n²',
  cubic: 'n³',
  exponential: '2ⁿ',
  factorial: 'n!'
};

interface TimeComplexityProps {
  id: TimeComplexityId,
  className?: string;
}

const TimeComplexity: React.FC<TimeComplexityProps> = ({ 
  id, 
  className = '' 
}) => {
  const getComplexityNotation = (id: TimeComplexityId): React.ReactNode => {
    const notation = complexityMap[id];
    if (!notation) return null;

    if (notation.includes('²') || notation.includes('³')) {
      const base = 'n';
      const power = notation.slice(-1);
      return (
        <>
          {base}<sup>{power === '²' ? '2' : '3'}</sup>
        </>
      );
    }

    return notation;
  };

  const notation = getComplexityNotation(id);
  if (!notation) return null;

  return (
    <span className={`font-serif ${className}`}>
      O({notation})
    </span>
  );
};

export default TimeComplexity