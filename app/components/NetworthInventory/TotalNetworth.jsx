import React from 'react'
import { FaCamera } from "react-icons/fa";

const TotalNetworth = () => {
    return (
        <div className='mt-8 px-36 py-2'>
            <div className='grid grid-cols-2 bg-gray-200 p-2 rounded-md items-center'>
                <div className='flex items-center gap-4' >
                    <FaCamera className='text-base text-slate-600 cursor-pointer' />
                    <h2 className='font-bold uppercase text-base text-slate-600'>TOTAL NETWORTH</h2>
                </div>
                <div >
                    <h2 className='font-bold uppercase text-base text-slate-600'>P2,000,000</h2>

                </div>
            </div>

        </div>
    )
}

export default TotalNetworth