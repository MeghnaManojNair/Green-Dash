// Import necessary components and hooks from React and local files
import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';

// Define the main App component
function App() {
  // Initialize state variables for the data, metrics, and selected metric
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('');

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Define an async function to fetch data from the API
  const fetchData = async () => {
  try {
    // Fetch data from the API
    const response = await fetch('http://localhost:5000/api/data');
    // Parse the JSON data from the response
    const jsonData = await response.json();
    // Log the fetched data
    console.log('Data:', jsonData);
    // Update the data state variable with the fetched data
    setData(jsonData);
    // Extract the metric names from the first column of the data and update the metrics state variable
    setMetrics(jsonData.slice(1).map(row => row[0]));
    // Set the default metric
    const defaultMetric = 'Solar KWh'; // Replace 'Your Default Metric' with your actual default metric
    // Check if the default metric exists in the metrics array
    if (metrics.includes(defaultMetric)) {
      // Update the selectedMetric state variable with the default metric
      setSelectedMetric(defaultMetric);
    } else {
      // If the default metric does not exist, log an error and set the selectedMetric to the first metric in the metrics array
      console.error('Default metric not found in data');
      setSelectedMetric(metrics[0]);
    }
  } catch (error) {
    // Log any errors that occur when fetching data
    console.error('Error fetching data:', error);
  }
};

  // Define a function to handle changes to the selected metric
  const handleMetricChange = (event) => {
    // Update the selectedMetric state variable with the new value
    setSelectedMetric(event.target.value);
  };

  // Render the App component
  return (
    <div className="App">
      <header className="App-header hideable">
        <h1>Green Dash</h1>
        <p className="padded-paragraph">Welcome to this environmental data visualization tool for small-scale food processing plants! In today's era, prioritizing environmental sustainability is paramount, and this web application serves as a powerful tool for promoting eco-friendly practices. By offering clear insights into key environmental metrics such as water consumption, natural gas usage, grid electricity consumption, steam usage, food waste generation, solar energy production, and water recycling throughout the months of 2023, this line chart component, built using the recharts library, facilitates informed decision-making. The intuitive interface allows users to select specific metrics from a dropdown menu, enabling detailed analysis of trends and fluctuations. With a design that emphasizes clarity and usability, including organized x-axis labels for months and y-axis labels for selected metrics, this tool empowers plant managers and stakeholders to make data-driven decisions for a greener, more sustainable future.</p>
        <div className="dropdown-container">
          {/* Render a dropdown menu for selecting a metric */}
          <select className="dropdown" value={selectedMetric} onChange={handleMetricChange}>
            {/* Render an option for each metric */}
            {metrics.map((metric, index) => (
              <option key={index} value={metric}>{metric}</option>
            ))}
          </select>
        </div>
      </header>
      <div className="container content">
        <div className="chart-container">
          {/* Render the Chart component with the selected metric and data */}
          <Chart data={data.slice(1)} metric={selectedMetric} />
        </div>
      </div>
    </div>
  );
}

// Export the App component
export default App;