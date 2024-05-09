import FinancialPlanningSolutions from '@/app/components/FNA/FinancialPlanningSolutions'
import React from 'react'

const EstateConservationPage = () => {
    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">
                ESTATE CONSERVATION
            </div>
            <div className='mt-8'>
                <label className="uppercase font-medium" htmlFor="Reason">
                    ESTATE CONSERVATION PLANNING IS IMPORTANT FOR ME BECAUSE
                </label>
                <textarea
                    className="w-full mt-2 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="Reason"
                    id="Reason"
                />
            </div>

            <div className="max-w-[1000px] mt-8 mx-auto">
                <div className="bg-gray-200 py-2 px-8">
                    <h2 className="text-sm font-bold text-slate-600 uppercase mt-4 flex items-center justify-center gap-4">
                        INITIAL ESTATE TAX COMPUTATION
                    </h2>

                    <div className="overflow-x-auto mt-4">
                        <table className="table-auto w-full mx-auto divide-y divide-gray-700 text-sm text-left text-gray-500">
                            <thead className="text-xs uppercase bg-gray-700">
                                <tr className='text-center'>
                                    <th scope='col' className="p-2 font-bold text-white"></th>
                                    <th scope='col' className="p-2 font-bold text-white">CONJUGAL</th>
                                    <th scope='col' className="p-2 font-bold text-white">EXCLUSIVE</th>
                                    <th scope='col' className="p-2 font-bold text-white">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-700 '>
                                <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                    <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        GROSS ESTATE
                                    </th>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                    <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        LESS: SHARE OF SURVIVING SPOUSE
                                    </th>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                    <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        NET ESTATE
                                    </th>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                    <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        CURRENT ESTATE TAX RATE
                                    </th>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                    <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        ESTATE TAX DUE
                                    </th>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                    <td className="px-4 py-2">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 space-y-2">
                        <h2 className="text-sm font-bold text-slate-600 uppercase  flex items-center justify-center gap-4">
                            ESTATE SETTLEMENT EXPENSES
                        </h2>

                        <div className='grid grid-cols-2 gap-2 items-center'>
                            <div className='text-right'>
                                <label htmlFor="InsuranceCompany" className="text-xs font-medium text-gray-700 ">
                                    Regular Payout Amount
                                </label>

                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="InsuranceCompany"
                                    name="insurance_company"
                                    className="rounded-md w-52 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 items-center'>
                            <div className='text-right'>
                                <input
                                    type="text"
                                    id="InsuranceCompany"
                                    name="insurance_company"
                                    placeholder='Other Incidental Expenses'
                                    className="rounded-md w-52 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                                />

                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="InsuranceCompany"
                                    name="insurance_company"
                                    className="rounded-md w-52 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 items-center'>
                            <div className='text-right'>
                                <label htmlFor="InsuranceCompany" className="text-xs font-bold text-gray-700 ">
                                    TOTAL ESTATE SETTLEMENT EXPENSE
                                </label>

                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="InsuranceCompany"
                                    name="insurance_company"
                                    className="rounded-md w-52 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 col-span-2"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="mt-8 space-y-4">
                        <h2 className="text-sm font-bold text-slate-600 uppercase  flex items-center justify-center gap-4">
                            ESTATE SETTLEMENT OPTIONS
                        </h2>

                        <iframe
                            className="w-full aspect-video"
                            src="https://www.youtube.com/embed/Hmof1vfH8TI?si=IndtV6iZ8pSF9HKj"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>

                        <div className='flex flex-col'>
                            <label htmlFor="InsuranceCompany" className="text-sm font-medium text-gray-700 ">
                                SELECT YOUR PREFERRED ESTATE SETTLEMENT OPTIONS (ONE OR MORE)
                            </label>
                            <span className='flex items-center gap-2'>
                                <input type="checkbox" id="new_state" name="new_state" value="Bike" />
                                <label htmlFor="new_state"> Creation of New Estate Thru Life Insurance</label>
                            </span>
                            <span className='flex items-center gap-2'>
                                <input type="checkbox" id="liquidity_plan" name="liquidity_plan" value="Bike" />
                                <label htmlFor="liquidity_plan"> Liquidity Plan</label>
                            </span>
                            <span className='flex items-center gap-2'>
                                <input type="checkbox" id="others" name="others" value="Bike" />
                                <label htmlFor="others"> Others</label>
                            </span>
                            <span className='flex items-center gap-2'>
                                <input type="text" id="others" name="others" />
                            </span>
                        </div>
                    </div>

                    <div className='mt-8 space-y-2'>
                        <div className='grid grid-cols-2 gap-2 items-center'>
                            <label htmlFor="InsuranceCompany" className="text-sm font-bold uppercase text-gray-700 text-center">
                                TOTAL ESTATE SETTLEMENT EXPENSE
                            </label>
                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                className="rounded-md w-52 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-2 items-center'>
                            <label htmlFor="InsuranceCompany" className="text-sm font-bold uppercase text-gray-700 text-center">
                                TOTAL EXISTING FACE AMOUNT FOR ESTATE  SETTLEMENT EXPENSE
                            </label>
                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                className="rounded-md w-52 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-2 items-center'>
                            <label htmlFor="InsuranceCompany" className="text-sm font-bold uppercase text-gray-700 text-center">
                                TOTAL EXISTING FACE AMOUNT FOR ﻿ ESTATE  SETTLEMENT EXPENSE
                            </label>
                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                className="rounded-md w-52 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className='mt-8'>
                {/* <FinancialPlanningSolutions /> */}
            </div>


        </div>
    )
}

export default EstateConservationPage