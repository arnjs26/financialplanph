import React from 'react'
import { IoEye } from 'react-icons/io5'

const EducationTablePage = () => {
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
                            <th scope='col' className="p-2 font-bold text-slate-600">Age(Parent)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">Age(Child)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">Yearly Expenses (without inflation)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 flex items-center flex-col">Yearly Expenses with Inflation (A) <IoEye className='tex-lg cursor-pointer'/></th>
                            <th scope='col' className="p-2 font-bold text-slate-600">Total Guaranteed Cash Payout (B)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">Unfunded Retirement Expense (A)- (B)</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 '>
                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                               
                            </th>
                            <td className="px-4 py-2">
                                
                            </td>
                            <td className="px-4 py-2">
                                
                            </td>
                            <td className="px-4 py-2">
                                
                            </td>
                            <td className="px-4 py-2">
                                
                            </td>
                            <td className="px-4 py-2 text-center">
                                
                            </td>
                            <td className="px-4 py-2">
                                
                            </td>

                        </tr>
                        <tr className="hover:bg-gray-100 text-xs text-gray-700">
                            <th scope="row" colSpan={6} className="px-4 py-2 font-bold text-gray-900 whitespace-nowrap text-right">
                            Total Education Fund Needed
                            </th>
                            
                            <td className="px-4 py-2 text-center ">
                            325+345+325+345
                            </td>

                        </tr>
                    </tbody>
                    <tfoot className='divide-y divide-gray-200'>
                        <tr className=" text-gray-900">
                            <th colSpan={1} scope="row" className="text-xs px-6 py-3">Total Accumulated Education Expense</th>
                            <td colSpan={6} className="px-6 py-3 text-xs font-bold">21,000</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default EducationTablePage