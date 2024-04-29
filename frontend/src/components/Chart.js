// Import necessary components from 'recharts' library
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Define a custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }) => {
  // If the tooltip is active and there is data, render the tooltip
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#f5f5f5', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label" style={{ color: 'green' }}>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

// Define the main Chart component
const Chart = ({ data, metric }) => {
  // If there is no data, don't render anything
  if (!data || data.length === 0) {
    return null;
  }

  // Define the months for the x-axis of the chart
  const months = ['Jan', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // Remove the header row from the data
  const metricsData = data.slice(1);
  // Find the index of the selected metric in the data
  const metricIndex = metricsData.findIndex(row => row[0] === metric);

  // If the selected metric is not found in the data, don't render anything
  if (metricIndex === -1) {
    return null;
  }

  // Get the values for the selected metric from the data
  const metricValues = metricsData[metricIndex].slice(1);
  // Prepare the data for the chart
  const chartData = months.map((month, index) => ({
    month,
    [metric]: metricValues[index]
  }));

  // Render the chart
  return (
    <div className="container">
      <LineChart width={1100} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis 
          dataKey="month" 
          label={{ 
            value: 'Months (2023)', 
            position: 'insideBottom', 
            offset: -20,
            dy: 20,
            dx: -20,
            style: { fill: 'white' }
          }} 
          stroke="#000" 
          tick={{ fill: '#000', fontWeight: 'bold', textAnchor: 'middle' }} 
        />
        <YAxis 
          stroke="#000" 
          tick={{ fill: '#000', fontWeight: 'bold' }} 
          label={{ 
            value: metric, 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle', fill:'white' }
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey={metric} stroke={'#fff'} strokeWidth={3} activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

// Export the Chart component
export default Chart;