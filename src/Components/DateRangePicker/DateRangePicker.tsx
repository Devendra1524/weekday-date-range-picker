import React, { useState } from 'react';
import { getMonthDays, isWeekend, formatDate } from '../../Utils/dateUtils';
import { DateRange } from '../../Types/dateTypes';
import PredefinedRanges from './PredefinedRanges';
import CalendarGrid from './CalendarGrid';
import MonthYearSelector from './MonthYearSelector';

interface Props {
  predefinedRanges?: { label: string; range: DateRange }[];
  onChange: (range: DateRange, weekends: string[]) => void;
}

const DateRangePicker: React.FC<Props> = ({ predefinedRanges = [], onChange }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);

  const monthDays = getMonthDays(currentYear, currentMonth);

  const handleDateClick = (dateStr: string) => {
    if (!selectedRange) {
      setSelectedRange([dateStr, dateStr]);
    } else {
      const [start] = selectedRange;
      setSelectedRange([start, dateStr]);
    }
  };

  const getWeekendsInRange = (range: DateRange): string[] => {
    const [startStr, endStr] = range;
    const weekends: string[] = [];
    let current = new Date(startStr);
    const end = new Date(endStr);
    while (current <= end) {
      if (isWeekend(current)) weekends.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }
    return weekends;
  };

  const applySelection = () => {
    if (selectedRange) {
      const weekends = getWeekendsInRange(selectedRange);
      onChange(selectedRange, weekends);
    }
  };

  return (
    <div className="date-range-picker">
      <MonthYearSelector
        year={currentYear}
        month={currentMonth}
        onYearChange={setCurrentYear}
        onMonthChange={setCurrentMonth}
      />

      <CalendarGrid
        days={monthDays}
        selectedRange={selectedRange}
        onDateClick={handleDateClick}
      />

      <button onClick={applySelection}>Apply</button>

      <PredefinedRanges ranges={predefinedRanges} onSelect={(range) => {
        setSelectedRange(range);
        const weekends = getWeekendsInRange(range);
        onChange(range, weekends);
      }} />
    </div>
  );
};

export default DateRangePicker;
