'use client'
// ChatGPT-generated
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import 'chartjs-adapter-date-fns' // Adapter for date handling
import { Entry } from '@/constants'

// Register required chart components
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export const TripCountChart = ({ data }: { data: Entry[] }) => {
  const chartData = {
    labels: data.map(entry => entry.time), // X-axis: time (Date objects)
    datasets: [
      {
        label: 'Trip Count',
        data: data.map(entry => entry.trip_count), // Y-axis: trip_count
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  }

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',  // Specify the unit as 'hour' for hour-specific data
          tooltipFormat: 'PPpp', // 'PPpp' formats as "Oct 4, 2023, 2:00 PM"
          displayFormats: {
            hour: 'MMM d, yyyy HH:mm', // Format for x-axis (hour granularity)
          },
        },
        title: {
          display: true,
          text: 'Time (Hour)',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Trip Count',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          // @ts-ignore
          label: function (context) {
            return `Trip Count: ${context.raw}`
          },
        },
      },
    },
  }

  // @ts-ignore
  return <Line data={chartData} options={options} />
}

export default TripCountChart
