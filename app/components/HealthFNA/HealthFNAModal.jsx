'use client'
import React from 'react'

const HealthFNAModal = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-0 z-50  ${isOpen ? 'block' : 'hidden'}`}>
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center ">
                <div className="bg-white h-[600px] p-8 rounded-md shadow-lg overflow-y-auto">
                    <div className='flex items-center gap-2'>
                        <h3 className='text-sm font-medium text-gray-700'>HEALTH BENEFITS FOR  POLICY/ REFERENCE NO.</h3>
                        <button className='p-2 border border-gray-200 rounde-md bg-gray-200 font-bold' disabled>A1E001234567</button>

                    </div>

                    <form action="" className='mt-4 space-y-4'>
                        <div className='grid grid-cols-4 gap-2'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> IN PATIENT LIMIT </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                placeholder='Amount'
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                            <select
                                name="mode_of_payment"
                                id="mode_of_payment"
                                className=" p-1 rounded-md border border-gray-300 text-gray-700 text-xs"
                            >
                                <option value="">Please select</option>
                                <option value="retirement">Maximum Benefit Limit</option>
                                <option value="education">Annual Benefit Limit</option>
                                <option value="others">Lifetime Benefit Limit</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> OUT PATIENT LIMIT </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                placeholder='Amount'
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                            <select
                                name="mode_of_payment"
                                id="mode_of_payment"
                                className=" p-1 rounded-md border border-gray-300 text-gray-700 text-xs"
                            >
                                <option value="">Please select</option>
                                <option value="retirement">Maximum Benefit Limit</option>
                                <option value="education">Annual Benefit Limit</option>
                                <option value="others">Lifetime Benefit Limit</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> CRITICIAL ILLNESS LIMIT </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                placeholder='Amount'
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                            <select
                                name="mode_of_payment"
                                id="mode_of_payment"
                                className=" p-1 rounded-md border border-gray-300 text-gray-700 text-xs"
                            >
                                <option value="">Please select</option>
                                <option value="retirement">Maximum Benefit Limit</option>
                                <option value="education">Annual Benefit Limit</option>
                                <option value="others">Lifetime Benefit Limit</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> LABORATORY LIMIT </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                placeholder='Amount'
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> HOSPITAL INCOME </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                placeholder='Amount Per Day'
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <div></div>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                placeholder='Maximum Number of Days'
                                className="w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                            />
                        </div>

                        <div className='mt-8 flex flex-col gap-2'>
                            <label className="uppercase font-medium" htmlFor="Reason">
                            Notes:
                            </label>
                            <textarea
                                className="mt-2 rounded-lg border border-gray-200 p-1 text-sm"
                                placeholder="Notes Here"
                                id="Reason"
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

export default HealthFNAModal