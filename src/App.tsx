import React, { useState } from 'react';
import './index.css';
import DateRangePicker from 'Components/DateRangePicker/DateRangePicker';
import { DateRange } from 'Types/dateTypes';

const dummyData = [
  { "id": 1, "name": "Order X1", "date": "2025-06-01" },
  { "id": 2, "name": "Order X2", "date": "2025-06-15" },
  { "id": 3, "name": "Order Y1", "date": "2025-07-05" },
  { "id": 4, "name": "Order Y2", "date": "2025-07-20" },
  { "id": 5, "name": "Order Z1", "date": "2025-08-10" },
  { "id": 6, "name": "Order Z2", "date": "2025-08-25" },
  { "id": 7, "name": "Order A1", "date": "2025-09-03" },
  { "id": 8, "name": "Order A2", "date": "2025-09-18" },
  { "id": 9, "name": "Order B1", "date": "2025-10-09" },
  { "id": 10, "name": "Order B2", "date": "2025-10-21" },
  { "id": 11, "name": "Order C1", "date": "2025-11-06" },
  { "id": 12, "name": "Order C2", "date": "2025-11-30" },
  { "id": 13, "name": "Order D1", "date": "2025-12-05" },
  { "id": 14, "name": "Order D2", "date": "2025-12-19" },
  { "id": 15, "name": "Order D3", "date": "2025-12-29" }
]

const App: React.FC = () => {
  const [filteredData, setFilteredData] = useState<typeof dummyData>([]);
  const predefined: { label: string; range: DateRange }[] = [
    { label: 'Last 7 Days', range: ['2024-05-01', '2024-05-07'] },
    { label: 'Last 30 Days', range: ['2024-04-01', '2024-04-30'] }
  ];

  const handleDateChange = (range: [string, string], weekends: string[]) => {
    const [startDate, endDate] = range;

    const filtered = dummyData.filter(item => {
      return item.date >= startDate && item.date <= endDate;
    });

    setFilteredData(filtered);
  };
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Custom Weekday Date Range Picker</h1>

      <DateRangePicker
        predefinedRanges={predefined}
        onChange={handleDateChange}
      />

      <h2 style={{ marginTop: '20px' }}>Filtered Data:</h2>
      <table border={1} cellPadding={10} style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>
                No data for selected range.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default App;
