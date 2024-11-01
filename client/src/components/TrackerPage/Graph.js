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

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const GoalProgressChart = ({ goalProgress }) => {
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
        borderColor: 'blue',
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
        display: true,
        position: 'top',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default GoalProgressChart;
