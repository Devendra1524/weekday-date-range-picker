import React from 'react';

interface Props {
  year: number;
  month: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

const MonthYearSelector: React.FC<Props> = ({ year, month, onYearChange, onMonthChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="month-year-selector">
      <select value={month} onChange={(e) => onMonthChange(Number(e.target.value))}>
        {months.map((m, idx) => (
          <option key={idx} value={idx}>{m}</option>
        ))}
      </select>
      <input type="number" value={year} onChange={(e) => onYearChange(Number(e.target.value))} />
    </div>
  );
};

export default MonthYearSelector;
