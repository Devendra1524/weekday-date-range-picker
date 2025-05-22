import React from 'react';
import { DateRange } from '../../Types/dateTypes';

interface Props {
  ranges: { label: string; range: DateRange }[];
  onSelect: (range: DateRange) => void;
}

const PredefinedRanges: React.FC<Props> = ({ ranges, onSelect }) => {
  return (
    <div className="predefined-ranges">
      {ranges.map(({ label, range }, idx) => (
        <button key={idx} onClick={() => onSelect(range)}>{label}</button>
      ))}
    </div>
  );
};

export default PredefinedRanges;
