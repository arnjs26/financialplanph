'use client'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const Charts = ({ title }) => {

    const data = {
        labels: ['Needs', 'Wants'],
        datasets: [
            {
                label: '',
                data: [12, 19],
                backgroundColor: [
                    'rgba(50, 168, 82)',
                    'rgba(88, 184, 114)',
                ],
                borderColor: [
                    'rgba(50, 168, 82)',
                    'rgba(88, 184, 114)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='text-center w-full'>

            <h2 className='text-center font-bold '>{title}</h2>
            <div className='w-[200px]' >
                <Pie data={data} width='10' height='10' options={{ maintainaspectratio: false }} />
            </div>
        </div>
    )
}

export default Charts