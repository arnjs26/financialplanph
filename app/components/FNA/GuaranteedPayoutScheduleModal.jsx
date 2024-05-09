'use client'
import React, { useState } from 'react'

const GuaranteedPayoutScheduleModal = ({ isOpen, onClose }) => {
    const [frequency, setFrequency] = useState('')

    const handleChange = (e) => {
        setFrequency(e.target.value)
    }
    return (
        <div className={`fixed inset-0 z-50  ${isOpen ? 'block' : 'hidden'}`}>
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center ">
                <div className="bg-white h-[600px] p-8 rounded-md shadow-lg overflow-y-auto">
                    <h3 className='text-sm font-medium text-gray-700'>Guaranteed Payout Schedule</h3>
                    <button className='px-2 py-4 mt-4 border border-gray-200 rounde-md bg-gray-200 font-bold' disabled>A1E001234567</button>

                    <form action="" className='mt-4 space-y-4'>
                        <div className='grid grid-cols-3'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> Regular Payout Amount </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                        </div>
                        <div className='grid grid-cols-3'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> Age of Child for Start Payout </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                        </div>
                        <div className='grid grid-cols-3'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> Start Year for Payout </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                        </div>
                        <div className='grid grid-cols-3 items-center'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> Frequency of Payout </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="frequency_payout"
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                                onChange={handleChange}
                            />
                            <p className='ml-2'>
                                {frequency ? (
                                    <>
                                    Every <span className='font-bold border-black border-b-2'>{frequency}</span>  year/s
                                    </>
                                ):'Every ___ year/s'

                                }
                            </p>

                        </div>
                        <div className='grid grid-cols-3'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> Age of Child for End Payout </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                        </div>
                        <div className='grid grid-cols-3'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> End Year for Payout </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                        </div>
                    </form>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={onClose}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GuaranteedPayoutScheduleModal