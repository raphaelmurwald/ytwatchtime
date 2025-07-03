import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function WatchtimeChart({ entries }) {
  const counts = {};

  entries.forEach((e) => {
    const year = new Date(e.time).getFullYear();
    counts[year] = (counts[year] || 0) + 1;
  });

  const labels = Object.keys(counts).sort();
  const data = labels.map((y) => counts[y] * 5);

  return (
    <div className="bg-white p-4 rounded shadow">
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Watchtime (Minuten pro Jahr)',
              data,
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
          ],
        }}
        options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
      />
    </div>
  );
}
