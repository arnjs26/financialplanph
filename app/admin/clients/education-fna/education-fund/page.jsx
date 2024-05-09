'use client'
import GuaranteedPayoutScheduleModal from '@/app/components/FNA/GuaranteedPayoutScheduleModal';
import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa';

const EducationFundPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [handleCheckbox, setHandleCheckbox] = useState(false)

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleOncheck = (e) => {
        setHandleCheckbox(e.target.checked)
    }

    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>

            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">
                TOTAL FUNDS ALLOCATED FOR EDUCATION FOR &lt; Name of Child &gt;
            </div>

            <div className='mt-8'>
                <div className='flex items-center gap-4'>
                    <label className="uppercase font-medium" htmlFor="Reason">
                        NO. OF YEARS BEFORE CHILD ENTERS COLLEGE*
                    </label>
                    <input
                        className="rounded-lg border border-gray-200 p-1 text-sm"
                        type='text'
                        placeholder="Data from 12.0"
                        id="years"
                        disabled
                    />
                </div>
            </div>

            <div className='mt-8'>
                <div className="text-sm font-bold text-slate-600 uppercase">
                    Investments Allocated for Education without Guaranteed Payout
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="w-full divide-y divide-gray-200 text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr className='text-center'>
                                <th scope='col' className="p-2 font-bold text-slate-600">Policy No./ Account No.</th>
                                <th scope='col' className="p-2 font-bold text-slate-600">Type</th>
                                <th scope='col' className="p-2 font-bold text-slate-600">CURRENT FUND VALUE/ CASH SURRENDER VALUES</th>
                                <th scope='col' className="p-2 font-bold text-slate-600">Is this an insurance product?</th>
                                {!handleCheckbox && (
                                    <th scope='col' className="p-2 font-bold text-slate-600 flex items-center flex-col">Projected Rate of Return (%) - </th>
                                )}

                                <th scope='col' className="p-2 font-bold text-slate-600">Projected Value at Education Age</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 '>
                            <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    W1E001234567
                                </th>
                                <td className="px-4 py-2">
                                    VUL
                                </td>
                                <td className="px-4 py-2">
                                    P100,000.00
                                </td>
                                <td className="px-4 py-2 text-center ">
                                    <input
                                        type="checkbox"
                                        id="isInsurance"
                                        name="isInsurance"
                                        value="true"
                                        onChange={handleOncheck}
                                        className="h-4 w-4 rounded-md border-gray-500 bg-white shadow-sm text-center"
                                    />
                                </td>
                                {!handleCheckbox && (
                                    <td className="px-4 py-2">
                                </td>
                                )}
                                
                                <td className="px-4 py-2 text-center">
                                </td>

                            </tr>
                            <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                <th scope="row" colSpan={handleCheckbox ? '4':'5'} className="px-4 py-2 font-bold text-gray-900 whitespace-nowrap text-right">
                                    Total Education Fund Needed
                                </th>

                                <td className="px-4 py-2 text-center ">
                                    325+345+325+345
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='mt-8'>
                <div className="text-sm font-bold text-slate-600 uppercase">
                    Investments Allocated for Education with Guaranteed Payout (details here come from net worth table)
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="w-full divide-y divide-gray-200 text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr className='text-center'>
                                <th scope='col' className="p-2 font-bold text-slate-600">Policy No./ Account No.</th>
                                <th scope='col' className="p-2 font-bold text-slate-600">Type</th>
                                <th scope='col' className="p-2 font-bold text-slate-600">CURRENT FUND VALUE/ CASH SURRENDER VALUES</th>
                                <th scope='col' className="p-2 font-bold text-slate-600">Guaranteed Cash Payout Schedule</th>
                                <th scope='col' className="p-2 font-bold text-slate-600 flex items-center flex-col">Age of Child for Start Payout</th>
                                <th scope='col' className="p-2 font-bold text-slate-600">Guaranteed Cash Value After College Graduation (Check Policy Contract)</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 '>
                            <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    A1E001234567
                                </th>
                                <td className="px-4 py-2">
                                    Freedom 20
                                </td>
                                <td className="px-4 py-2">
                                    P100,000.00
                                </td>
                                <td className="px-4 py-2 text-center ">
                                    <FaPlusCircle onClick={openModal} className='text-lg cursor-pointer' />
                                </td>
                                <td className="px-4 py-2">
                                </td>
                                <td className="px-4 py-2 text-center">
                                    inputted by client/advisor
                                </td>

                            </tr>
                            <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                <th scope="row" colSpan={5} className="px-4 py-2 font-bold text-gray-900 whitespace-nowrap text-right">
                                    Total Education Fund Needed
                                </th>

                                <td className="px-4 py-2 text-center ">
                                    325+345+325+345
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <GuaranteedPayoutScheduleModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}

export default EducationFundPage