'use client'
import React, { useState } from 'react'
import { IoEye } from 'react-icons/io5'

const RetirementTablePage = () => {
    const data = []

    for (let i = 0; i <= 56; i++) {
        let yearly_expenses_shared = 1200000;
        let yearly_expenses_inflation = 1236000;
        let total_guaranteed_payout = 100000;

        data.push({
            year: i,
            age: 34 + i,
            yearly_expenses_shared: yearly_expenses_shared,
            yearly_expenses_inflation: yearly_expenses_inflation,
            total_guaranteed_payout: total_guaranteed_payout,
            annual_net_retirement: yearly_expenses_inflation - total_guaranteed_payout,
            annual_net_retirement_invested: -100000
        })
    }

    // console.log(data)

    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">
                Future Value of Education Expense Less Guaranteed Cash Payout
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto divide-y divide-gray-200 text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr className='text-center'>
                            <th scope='col' className="p-2 font-bold text-slate-600">Year</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">Age</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">Yearly Expenses (Husband & Wife)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">Yearly Expenses with Inflation (A)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">Total Guaranteed Cash Payout (B)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 flex items-center flex-col">Annual Net Retirement Expense (A)- (B) <IoEye className='tex-lg cursor-pointer' /></th>
                            <th scope='col' className="p-2 font-bold text-slate-600">Annual Net Retirement Expense if Invested at &lt;4% p.a.&gt; on age &lt;61&gt;</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 '>
                        {data.map((item, idx) => {
                            return (
                                <tr className="hover:bg-gray-100 text-xs text-gray-700" key={idx}>
                                    <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                        {item.year}
                                    </th>
                                    <td className="px-4 py-2">
                                        {item.age}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.yearly_expenses_shared}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.yearly_expenses_inflation}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.total_guaranteed_payout}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.annual_net_retirement}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.annual_net_retirement_invested}
                                    </td>
                                </tr>
                            )
                        })

                        }

                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                            <th scope="row" colSpan={5} className="px-4 py-8 font-bold text-gray-900 whitespace-nowrap">
                                Total Net Retirement Expenses from Age  &lt;61&gt; to  &lt;90&gt;
                            </th>

                            <td className="px-4 py-8 text-center font-bold">
                                124,014,497
                            </td>
                            <td className="px-4 py-8 text-center ">
                            </td>

                        </tr>
                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                            <th scope="row" colSpan={6} className="px-4 py-8 font-bold text-gray-900 whitespace-nowrap">
                                Total Retirement Funds Needed at Age &lt;61&gt; to be able to spend &lt;124,014,497&gt; until Age &lt;90&gt;
                            </th>

                            <td className="px-4 py-8 text-center font-bold">
                                67,539,172
                            </td>

                        </tr>
                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                            <th scope="row" colSpan={6} className="px-4 py-8 font-bold text-gray-900 whitespace-nowrap">
                                Total Expected Employee Benefits (Entire Lifetime)
                            </th>

                            <td className="px-4 py-8 text-center font-bold">
                                7,200,000
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                            <th scope="row" colSpan={6} className="px-4 py-8 font-bold text-gray-900 whitespace-nowrap">
                                Final Retirement Funds Needed (Net of Total Expected Employee Benefits)
                            </th>

                            <td className="px-4 py-8 text-center font-bold">
                                60,339,172
                            </td>

                        </tr>
                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                            <th scope="row" colSpan={7} className="px-4 py-8 font-bold text-gray-900 whitespace-nowrap">
                            </th>

                        </tr>
                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                            <th scope="row" colSpan={5} className="px-4 py-8 font-bold text-gray-900 whitespace-nowrap">
                                Total Retirement Funds Needed for &lt;Mark&gt; (Client)
                            </th>

                            <td className="px-4 py-8 text-center font-bold">
                                60.0%
                            </td>
                            <td className="px-4 py-8 text-center font-bold">
                                36,203,503
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                            <th scope="row" colSpan={5} className="px-4 py-8 font-bold text-gray-900 whitespace-nowrap">
                                Total Retirement Funds Needed for &lt;Mica&gt; (Partner)
                            </th>

                            <td className="px-4 py-8 text-center font-bold">
                                40.0%
                            </td>
                            <td className="px-4 py-8 text-center font-bold">
                                24,135,669
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RetirementTablePage