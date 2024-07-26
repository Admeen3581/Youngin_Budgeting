"use client"

import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}: DoughnutChartProps) => 
{
    const accountNames = accounts.map((a) => a.name);
    const accountBalances = accounts.map((b) => b.currentBalance);

    const data = {
        datasets: [
            {
                label: "Accounts",
                data: accountBalances,
                backgroundColor: ["#074704", "#226544", "2f3f9a", "#0a0a0a"]
            }
        ],
        labels: accountNames
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