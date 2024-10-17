const React = require('react');
const { useEffect, useRef, useState } = require('react'); // Import hooks
const { Chart } = require('chart.js/auto');

const Graph = ({ userInfo }) => {
  // props from user upon login
  const user = userInfo?.user_id;

  const [goals, setGoals] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [progressData, setProgressData] = useState([0]);
  const [graphId, setGraphId] = useState(localStorage.getItem('graphId'));

  const pollStorage = () => {
    const newGraphId = localStorage.getItem('graphId');
    if (newGraphId !== graphId) {
      setGraphId(newGraphId);
      console.log('storage has been polled', graphId);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(pollStorage, 1000); // Poll localStorage every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [graphId]);

  const fetchGoals = async () => {
    const endpoint = `http://localhost:3000/api/fetchgoal?id=${user}`; // Adjust the endpoint based on your API
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setTotalData(data);
        setGoals(data[0]);
        console.log('response from fetch call, inside of graph', data);
        console.log('goal after set', goals);
      } else {
        const errorData = await response.json();
        console.error('Error fetching accounts:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const changeGraph = (totalData) => {
    for (let i = 0; i < totalData.length; i++) {
      console.log('total data', totalData);
      if (totalData[i].goal_id === graphId) {
        setGoals(totalData[i]);
        console.log('udpatedgoals', goals);
      }
    }
  };

  useEffect(() => {
    if (graphId) {
      changeGraph(totalData); // Fetch goals or update graph when graphId exists or changes
    }
  }, [graphId]);

  // const fetchProgress = async () => {
  //   const endpoint = `http://localhost:3000/api/fetchprogress?id=${goalId}`;
  //   try {
  //     const response = await fetch(endpoint);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setGoals(data[0]);
  //       console.log('data[0', data[0]);
  //       console.log('response from fetch call, inside of graph', data);
  //       console.log('goal after set', goals);
  //     } else {
  //       const errorData = await response.json();
  //       console.error('Error fetching accounts:', errorData);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  useEffect(() => {
    if (user) {
      fetchGoals(); // Fetch goals only if graphId exists in localStorage
    }
  }, [user]);

  const generateEvenIncrements = (number) => {
    const increments = [];
    const step = number / 9; // Divide the number into 9 steps to get 10 points

    for (let i = 0; i <= 9; i++) {
      const value = step * i;

      // Round to nearest half of 10, ensuring correct behavior for large numbers
      const roundedValue = Math.round(value / 5) * 5;

      // Prevent overshooting above the original number
      increments.push(roundedValue > number ? number : roundedValue);
    }

    return increments;
  };

  const graphData = {
    label: `${goals.measurable}`,
    data: [], // Y-axis data
    backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
    borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
    borderWidth: 1, // Border width
  };

  const chartRef = useRef(null); // Create a reference for the canvas element

  useEffect(() => {
    // Get the canvas context using the ref
    const ctx = chartRef.current.getContext('2d');
    console.log('measurable in graph', goals);
    // Define chart data and options
    const chartData = {
      labels: generateEvenIncrements(goals.target_completion_date), // X-axis labels
      datasets: [graphData],
    };

    const chartOptions = {
      responsive: true, // Make the chart responsive
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true, // Enable the title
            text: 'Progress', // Label for the Y-axis
            font: {
              size: 16, // Adjust font size
            }, // Ensure y-axis starts at 0
          },
        },
        x: {
          beginAtZero: true,
          title: {
            display: true, // Enable the title
            text: 'Time (in days)', // Label for the X-axis
            font: {
              size: 16, // Adjust font size
            },
          },
        },
      },
    };
    // Create the chart instance
    const myChart = new Chart(ctx, {
      type: 'line', // Specify chart type
      data: chartData, // Data for the chart
      options: chartOptions, // Options for the chart
    });

    // Check if chart already exists to update or create a new one
    if (myChart) {
      myChart.data.datasets[0].data = progressData; // Update the dataset with new data
      myChart.update(); // Update the chart in real-time
    } else {
      createChart(); // If no chart exists, create a new one
    }

    return () => {
      if (myChart) {
        myChart.destroy(); // Clean up when component unmounts
      }
    };
  }, [goals]); // Re-run effect when goals or progressData changes

  return (
    <div>
      <h2>{goals.sar}</h2>
      <canvas ref={chartRef}></canvas> {/* Render the canvas element */}
    </div>
  );
};
module.exports = Graph;
