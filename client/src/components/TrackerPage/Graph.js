import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const GoalProgressChart = ({ goalProgress }) => {
  console.log(goalProgress, "GOAL PROGRESS");
  const dataPoints = Object.keys(goalProgress).map((timestamp) => ({
    x: new Date(Number(timestamp)),
    y: goalProgress[timestamp],
  }));

  dataPoints.sort((a, b) => a.x - b.x);

  const data = {
    datasets: [
      {
        label: 'Goal Progress',
        data: dataPoints,
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          callback: function(value, index, values) {
            return format(new Date(value), 'MMM dd, yyyy');
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Progress',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default GoalProgressChart;
