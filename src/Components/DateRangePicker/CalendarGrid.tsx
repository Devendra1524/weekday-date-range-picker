import React from 'react';
import { isWeekend, formatDate } from '../../Utils/dateUtils';
import { DateRange } from '../../Types/dateTypes';

interface Props {
  days: Date[];
  selectedRange: DateRange | null;
  onDateClick: (dateStr: string) => void;
}

const CalendarGrid: React.FC<Props> = ({ days, selectedRange, onDateClick }) => {
  const isInSelectedRange = (dateStr: string) => {
    if (!selectedRange) return false;
    const [start, end] = selectedRange;
    return dateStr >= start && dateStr <= end;
  };

  return (
    <div className="calendar-grid">
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
        <div key={d} className="header-cell">{d}</div>
      ))}

      {days.map((date) => {
        const dateStr = formatDate(date);
        const isWeekendDay = isWeekend(date);
        const isSelected = isInSelectedRange(dateStr) && !isWeekendDay;

        return (
          <div
            key={dateStr}
            onClick={() => !isWeekendDay && onDateClick(dateStr)}
            className={`day-cell ${isWeekendDay ? 'weekend' : ''} ${isSelected ? 'selected' : ''}`}
          >
            {date.getDate()}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
