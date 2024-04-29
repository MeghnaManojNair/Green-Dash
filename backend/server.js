// Import necessary modules
const express = require('express');
const excel = require('exceljs');
const cors = require('cors');

// Initialize express app
const app = express();
// Use cors middleware to handle Cross-Origin Resource Sharing
app.use(cors());

// Create a new workbook instance
const workbook = new excel.Workbook();
// Path to the Excel file
const filePath = './data/data.xlsx';

// Define a route to fetch data from the Excel file
app.get('/api/data', (req, res) => {
  // Read the Excel file
  workbook.xlsx.readFile(filePath)
    .then(() => {
      // Get the first worksheet in the workbook
      const worksheet = workbook.getWorksheet(1);
      // Initialize an empty array to hold the data
      const data = [];

      // Iterate over each row in the worksheet, excluding the header row
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber !== 1) {
          // Initialize an empty array to hold the data for this row
          const rowData = [];
          // Iterate over each cell in the row
          row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
            // Add the cell's value to the rowData array
            rowData.push(cell.value);
          });
          // Add the rowData array to the data array
          data.push(rowData);
        }
      });

      // Send the data array as a JSON response
      res.json(data);
    })
    .catch(err => {
      // Log any errors that occur when reading the Excel file
      console.error('Error reading Excel file:', err);
      // Send a 500 status code and an error message as the response
      res.status(500).send('Error reading Excel file');
    });
});

// Define the port the server will listen on
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));