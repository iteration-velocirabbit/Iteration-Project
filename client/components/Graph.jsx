const React = require('react');
const { useEffect, useRef } = require('react'); // Import hooks
const { Chart } = require('chart.js/auto');


const Graph = () => {
    const chartRef = useRef(null); // Create a reference for the canvas element

    useEffect(() => {
        // Get the canvas context using the ref
        const ctx = chartRef.current.getContext('2d'); 
    
        // Define chart data and options
        const chartData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
          datasets: [
            {
              label: 'Dollars',
              data: [0, 65, 59, 80, 81, 56, 55], // Y-axis data
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
              borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
              borderWidth: 1, // Border width
            },
          ],
        };
    
        const chartOptions = {
          responsive: true, // Make the chart responsive
          scales: {
            y: {
              beginAtZero: true, // Ensure y-axis starts at 0
            },
          },
        };
    
        // Create the chart instance
        const myChart = new Chart(ctx, {
          type: 'line', // Specify chart type
          data: chartData, // Data for the chart
          options: chartOptions, // Options for the chart
        });
    
        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
          myChart.destroy();
        };
      }, []); // Empty dependency array means the effect runs once, after initial render
    
      return (
        <div>
          <h2>Money Saved</h2>
          <canvas ref={chartRef}></canvas> {/* Render the canvas element */}
        </div>
      );
}
module.exports = Graph;