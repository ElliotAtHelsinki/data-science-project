'use client'
// ChatGPT-generated
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { Entry } from '@/constants'

// Register required chart components
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export const TripCountChart = ({ data }: { data: Entry[] }) => {
  const chartData = {
    labels: data.map((entry) => entry.time),
    datasets: [
      {
        label: 'Trip Count',
        data: data.map((entry) => entry.trip_count),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
        segment: {
          borderColor: (ctx: any) => {
            const dataIndex = ctx.p0DataIndex // Starting index of the segment
            const totalPoints = data.length
            const threeQuarterIndex = Math.floor(totalPoints * 0.75)

            // Use a different color after 3/4 of the x-axis
            return dataIndex >= threeQuarterIndex
              ? 'rgba(255,99,132,1)' // Different color after 3/4
              : 'rgba(75,192,192,1)' // Default color for the first 3/4
          },
        },
      },
    ],
  }

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          tooltipFormat: 'PPpp',
          displayFormats: {
            hour: 'MMM d, yyyy HH:mm',
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
          label: function (context: any) {
            return `Trip Count: ${context.raw}`
          },
        },
      },
    },
  }

  return <Line data={chartData} options={options as any} />
}

export default TripCountChart