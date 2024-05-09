import React from 'react'

const TotalAssets = () => {
    return (
        <div className='mt-8 px-36 py-2'>
            <div className='grid grid-cols-2 bg-gray-200 p-2 rounded-t-md  items-center'>
                <div >
                    <h2 className='font-bold uppercase text-base text-slate-600'>TOTAL ASSETS (Self + Spouse)</h2>
                </div>
                <div >
                    <h2 className='font-bold uppercase text-base text-slate-600'>P2,000,000</h2>

                </div>
            </div>

            <div className='grid grid-cols-2 bg-gray-200 p-2 rounded-b-md items-center'>
                <div >
                    <h2 className='font-bold uppercase text-base text-slate-600'>TOTAL ASSETS (Self )</h2>
                </div>
                <div >
                    <h2 className='font-bold uppercase text-base text-slate-600'>P2,000,000</h2>

                </div>
            </div>

        </div>
    )
}

export default TotalAssets