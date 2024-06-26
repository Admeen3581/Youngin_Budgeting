"use client"

import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}: DoughnutChartProps) => {
  const data = {
    datasets: [
        {
            label: "Accounts",
            data: [8063, 13001, 59650, 67],
            backgroundColor: ["#074704", "#226544", "2f3f9a", "#0a0a0a"]
        }
    ],
    labels: ["Schwab", "Wells Fargo Checking", "Captial Funds - 529", "Cash"]
  }

  return <Doughnut 
    data={data}
    options={
        {
            cutout: "50%",
            plugins:
            {
                legend: 
                {
                    display: false
                }
            }

        }
    } />

}

export default DoughnutChart