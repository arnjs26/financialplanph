'use client'
import FinancialPlanningSolutions from '@/app/components/FNA/FinancialPlanningSolutions'
import HealthFNAModal from '@/app/components/HealthFNA/HealthFNAModal'
import React, { useState } from 'react'
import { GoPencil } from 'react-icons/go'

const HealthFNAPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
                <p className="mt-2 text-sm">
                    Health funds are essential for protecting individuals from high medical costs, ensuring access to healthcare services, improving health outcomes, promoting preventive care, and reducing healthcare burdens. They contribute to a more equitable and inclusive healthcare system, providing financial security and better health outcomes for individuals and communities.
                </p>
            </div>

            <h1 className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">
                HEATH FUND PLANNING
            </h1>

            <div className='mt-8 flex flex-col gap-2'>
                <label className="uppercase font-medium" htmlFor="Reason">
                    Having a health fund is important to me because
                </label>
                <textarea
                    className="mt-2 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="Reason"
                    id="Reason"
                />
            </div>

            <div className='mt-2 flex flex-col gap-2'>
                <label className="uppercase font-medium" htmlFor="Reason2">
                    Have you had any family member, relative, or close friend that experienced a serious illness (ex., stroke, cancer, heart attack)? What happened? How was their financial situation during and after the event?
                </label>
                <textarea
                    className="mt-2 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="Type your answer here"
                    id="Reason2"
                />
            </div>

            <div className='mt-8 flex flex-col gap-2'>
                <label className="uppercase font-medium" htmlFor="Reason">
                    If in the event you or your spouse (if married) become seriously ill and need to spend 10 to 20 million, what would be the financial impact of this event to your family? Do you see yourself selling some properties, borrowing money, etc.?
                </label>
                <textarea
                    className="mt-2 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="Reason"
                    id="Reason"
                />
            </div>

            {/* CLIENT */}
            <div className='max-w-[1000px] mt-8 mx-auto'>
                <div className="bg-gray-200 py-2 px-8">
                    <div className="text-sm font-bold text-slate-600 uppercase text-center">
                        HEALTH COVERAGE FOR &lt;NAME OF CLIENT&gt;
                    </div>

                    {/* Health Coverage From Aetos' Advisor */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Health Coverage From Aetos' Advisor
                        </div>

                        <div className='flex justify-center gap-4 w-full'>
                            <div className="overflow-x-auto w-full">
                                <table className="divide-y w-full  divide-gray-700 text-sm text-left text-gray-500">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr className='text-center'>
                                            <th scope='col' className="p-2 font-bold text-white text-center">HMO/ Insurance Company</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Policy Number</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Type</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Year Issued</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Fund Value</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Payor</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Insured</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 '>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <GoPencil onClick={openModal} className='mt-2 cursor-pointer' />
                        </div>
                    </div>

                    {/* Health Coverage From Other Advisors */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Health Coverage From Other Advisors
                        </div>

                        <div className='flex justify-center gap-4 w-full'>
                            <div className="overflow-x-auto w-full">
                                <table className="divide-y w-full  divide-gray-700 text-sm text-left text-gray-500">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr className='text-center'>
                                            <th scope='col' className="p-2 font-bold text-white text-center">HMO/ Insurance Company</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Policy Number</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Type</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Year Issued</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Fund Value</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Payor</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Insured</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 '>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <GoPencil onClick={openModal} className='mt-2 cursor-pointer' />
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Summary
                        </div>
                        <div className="overflow-x-auto ">
                            <table className="divide-y w-full mx-auto divide-gray-700 text-sm text-left text-gray-500">
                                <thead className="text-xs uppercase bg-gray-700">
                                    <tr className='text-center'>
                                        <th scope='col' className="p-2 font-bold text-white text-center"></th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">Total Value</th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">Target Limits</th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">To Go</th>
                                    </tr>
                                    <tr className='text-center'>
                                        <th scope='col' className="p-2 font-bold text-white text-center"></th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-700 '>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* SPOUSE */}
            <div className='max-w-[1000px] mt-8 mx-auto'>
                <div className="bg-gray-200 py-2 px-8">
                    <div className="text-sm font-bold text-slate-600 uppercase text-center">
                        HEALTH COVERAGE FOR &lt;NAME OF SPOUSE&gt;
                    </div>

                    {/* Health Coverage From Aetos' Advisor */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Health Coverage From Aetos' Advisor
                        </div>

                        <div className='flex justify-center gap-4 w-full'>
                            <div className="overflow-x-auto w-full">
                                <table className="divide-y w-full  divide-gray-700 text-sm text-left text-gray-500">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr className='text-center'>
                                            <th scope='col' className="p-2 font-bold text-white text-center">HMO/ Insurance Company</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Policy Number</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Type</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Year Issued</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Fund Value</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Payor</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Insured</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 '>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <GoPencil onClick={openModal} className='mt-2 cursor-pointer' />
                        </div>
                    </div>

                    {/* Health Coverage From Other Advisors */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Health Coverage From Other Advisors
                        </div>

                        <div className='flex justify-center gap-4 w-full'>
                            <div className="overflow-x-auto w-full">
                                <table className="divide-y w-full  divide-gray-700 text-sm text-left text-gray-500">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr className='text-center'>
                                            <th scope='col' className="p-2 font-bold text-white text-center">HMO/ Insurance Company</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Policy Number</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Type</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Year Issued</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Fund Value</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Payor</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Insured</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 '>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <GoPencil onClick={openModal} className='mt-2 cursor-pointer' />
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Summary
                        </div>
                        <div className="overflow-x-auto ">
                            <table className="divide-y w-full mx-auto divide-gray-700 text-sm text-left text-gray-500">
                                <thead className="text-xs uppercase bg-gray-700">
                                    <tr className='text-center'>
                                        <th scope='col' className="p-2 font-bold text-white text-center"></th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">Total Value</th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">Target Limits</th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">To Go</th>
                                    </tr>
                                    <tr className='text-center'>
                                        <th scope='col' className="p-2 font-bold text-white text-center"></th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-700 '>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* CHILD */}
            <div className='max-w-[1000px] mt-8 mx-auto'>
                <div className="bg-gray-200 py-2 px-8">
                    <div className="text-sm font-bold text-slate-600 uppercase text-center">
                        HEALTH COVERAGE FOR &lt;NAME OF CHILD&gt;
                    </div>

                    {/* Health Coverage From Aetos' Advisor */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Health Coverage From Aetos' Advisor
                        </div>

                        <div className='flex justify-center gap-4 w-full'>
                            <div className="overflow-x-auto w-full">
                                <table className="divide-y w-full  divide-gray-700 text-sm text-left text-gray-500">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr className='text-center'>
                                            <th scope='col' className="p-2 font-bold text-white text-center">HMO/ Insurance Company</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Policy Number</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Type</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Year Issued</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Fund Value</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Payor</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Insured</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 '>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <GoPencil onClick={openModal} className='mt-2 cursor-pointer' />
                        </div>
                    </div>

                    {/* Health Coverage From Other Advisors */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Health Coverage From Other Advisors
                        </div>

                        <div className='flex justify-center gap-4 w-full'>
                            <div className="overflow-x-auto w-full">
                                <table className="divide-y w-full  divide-gray-700 text-sm text-left text-gray-500">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr className='text-center'>
                                            <th scope='col' className="p-2 font-bold text-white text-center">HMO/ Insurance Company</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Policy Number</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Type</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Year Issued</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Fund Value</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Payor</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Insured</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 '>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <GoPencil onClick={openModal} className='mt-2 cursor-pointer' />
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Summary
                        </div>
                        <div className="overflow-x-auto ">
                            <table className="divide-y w-full mx-auto divide-gray-700 text-sm text-left text-gray-500">
                                <thead className="text-xs uppercase bg-gray-700">
                                    <tr className='text-center'>
                                        <th scope='col' className="p-2 font-bold text-white text-center"></th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">Total Value</th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">Target Limits</th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">To Go</th>
                                    </tr>
                                    <tr className='text-center'>
                                        <th scope='col' className="p-2 font-bold text-white text-center"></th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-700 '>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* PARENT */}
            <div className='max-w-[1000px] mt-8 mx-auto'>
                <div className="bg-gray-200 py-2 px-8">
                    <div className="text-sm font-bold text-slate-600 uppercase text-center">
                        HEALTH COVERAGE FOR &lt;NAME OF PARENT&gt;
                    </div>

                    {/* Health Coverage From Aetos' Advisor */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Health Coverage From Aetos' Advisor
                        </div>

                        <div className='flex justify-center gap-4 w-full'>
                            <div className="overflow-x-auto w-full">
                                <table className="divide-y w-full  divide-gray-700 text-sm text-left text-gray-500">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr className='text-center'>
                                            <th scope='col' className="p-2 font-bold text-white text-center">HMO/ Insurance Company</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Policy Number</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Type</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Year Issued</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Fund Value</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Payor</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Insured</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 '>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <GoPencil onClick={openModal} className='mt-2 cursor-pointer' />
                        </div>
                    </div>

                    {/* Health Coverage From Other Advisors */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Health Coverage From Other Advisors
                        </div>

                        <div className='flex justify-center gap-4 w-full'>
                            <div className="overflow-x-auto w-full">
                                <table className="divide-y w-full  divide-gray-700 text-sm text-left text-gray-500">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr className='text-center'>
                                            <th scope='col' className="p-2 font-bold text-white text-center">HMO/ Insurance Company</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Policy Number</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Type</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Year Issued</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Fund Value</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Payor</th>
                                            <th scope='col' className="p-2 font-bold text-white text-center">Insured</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700 '>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            </th>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2">
                                            </td>
                                            <td className="px-4 py-2 text-center ">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <GoPencil onClick={openModal} className='mt-2 cursor-pointer' />
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                            Summary
                        </div>
                        <div className="overflow-x-auto ">
                            <table className="divide-y w-full mx-auto divide-gray-700 text-sm text-left text-gray-500">
                                <thead className="text-xs uppercase bg-gray-700">
                                    <tr className='text-center'>
                                        <th scope='col' className="p-2 font-bold text-white text-center"></th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">Total Value</th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">Target Limits</th>
                                        <th scope='col' colSpan={3} className="p-2 font-bold text-white text-center">To Go</th>
                                    </tr>
                                    <tr className='text-center'>
                                        <th scope='col' className="p-2 font-bold text-white text-center"></th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">MBL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">ABL</th>
                                        <th scope='col' className="p-2 font-bold text-white text-center">LBL</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-700 '>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 text-xs text-gray-700">
                                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        </th>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2">
                                        </td>
                                        <td className="px-4 py-2 text-center ">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* FINANCIAL PLANNING SOLUTION */}
            <div className='mt-16'>
                {/* <FinancialPlanningSolutions /> */}

            </div>

            <HealthFNAModal isOpen={isModalOpen} onClose={closeModal} />

        </div>
    )
}

export default HealthFNAPage