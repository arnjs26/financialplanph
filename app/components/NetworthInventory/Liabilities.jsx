'use client'
import React, { useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import { IoIosInformationCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";

const Liabilities = ({ liabilitiesList, clientID, handleInputChange, handleAddInputForm, removeOtherInputFields }) => {
    const [showAddRow, setShowAddRow] = useState(false)

    const months =
        [
            { value: 'January', month: 'January' },
            { value: 'February', month: 'February' },
            { value: 'March', month: 'March' },
            { value: 'April', month: 'April' },
            { value: 'May', month: 'May' },
            { value: 'June', month: 'June' },
            { value: 'July', month: 'July' },
            { value: 'August', month: 'August' },
            { value: 'September', month: 'September' },
            { value: 'October', month: 'October' },
            { value: 'November', month: 'November' },
            { value: 'December', month: 'December' },
        ]

    //Calculate all unpaid liabilities
    const sumOfUnpaidLiabilities = liabilitiesList?.reduce((sum, liabilities) => {
        const unpaidAmount = liabilities.total_unpaid_amount || 0;
        return sum + unpaidAmount;
    }, 0);

    //Calculate all total mri
    const sumOfMRICLI = liabilitiesList?.reduce((sum, liabilities) => {
        const mricri = liabilities.amount_of_mri || 0;
        return sum + mricri;
    }, 0);

    return (
        <div className="mt-2 ">

            <div className="overflow-x-auto mt-4 ml-2">
                <table className="w-full table-auto divide-y divide-gray-200 text-sm text-center text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr className='text-center'>
                            <th scope='col' className="p-2 font-bold text-slate-600">NAME OF CREDITOR</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">TYPE OF LIABILITY*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">TOTAL UNPAID AMOUNT (INC. INTERESTS)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">ANNUAL INTEREST RATE</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">AMOUNT OF MRI/ CREDIT LIFE INSURANCE</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">SPOUSES PARTICIPATION</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">PROPERTY ASSOCIATION</th>
                            <th scope='col' className="p-2 font-bold text-slate-600"><FaPlusCircle onClick={() => handleAddInputForm('liabilities')} className='text-lg cursor-pointer' /></th>

                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 '>
                        {liabilitiesList.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-100 text-xs">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                    <input
                                        type="text"
                                        name='name_of_creditor'
                                        value={item.name_of_creditor}
                                        onChange={e => handleInputChange(e, idx, 'liabilities')}
                                        className='p-2 rounded-md border border-gray-500'
                                    />
                                </th>
                                <td className="px-4 py-2">
                                    <select
                                        name="type_of_liability"
                                        id="liability_type"
                                        value={item.type_of_liability}
                                        onChange={e => handleInputChange(e, idx, 'liabilities')}
                                        className="p-2 w-[150px] rounded-md border border-gray-500 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value="1">Personal</option>
                                        <option value="2">Business</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name='total_unpaid_amount'
                                        value={item.total_unpaid_amount}
                                        onChange={e => handleInputChange(e, idx, 'liabilities')}
                                        className='p-2 rounded-md border border-gray-500'
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        placeholder='%'
                                        name='annual_interest_rate'
                                        value={item.annual_interest_rate}
                                        onChange={e => handleInputChange(e, idx, 'liabilities')}
                                        className='w-10 text-center p-2 rounded-md border border-gray-500'
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name='amount_of_mri'
                                        value={item.amount_of_mri}
                                        onChange={e => handleInputChange(e, idx, 'liabilities')}
                                        className='p-2 rounded-md border border-gray-500'
                                    />
                                    {item.amount_of_mri !== 0 &&
                                        <span className='flex flex-col mt-5 items-center'>
                                            <label htmlFor="renewal_month" className=" text-xs font-bold text-gray-700">Renewal Month</label>
                                            <select
                                                name="renewal_month"
                                                id="renewal_month"
                                                defaultValue={item.renewal_month}
                                                onChange={e => handleInputChange(e, idx, 'liabilities')}
                                                className="p-2 w-[180px] rounded-md border border-gray-500 "
                                            >
                                                <option value="">Please select</option>
                                                {months.map((item, idx) => (
                                                    <option key={idx} value={item.value}>{item.month}</option>
                                                ))}
                                            </select>
                                        </span>

                                    }
                                </td>
                                <td className="px-4 py-2 flex flex-col w-28 text-left">
                                    <span>
                                        <input
                                            type="radio"
                                            id={`Joint${idx}`}
                                            // name='spouse_participation'
                                            name={`spouse_participation${idx}`}
                                            value="1"
                                            defaultChecked={item.spouse_participation === 1}
                                            onChange={e => handleInputChange(e, idx, 'liabilities')}
                                            className='mr-1'
                                        /> 
                                        <label htmlFor={`Joint${idx}`} className=" text-sm font-medium text-gray-700">Joint</label>

                                    </span>
                                    <span>
                                        <input
                                            type="radio"
                                            id={`Exclusive${idx}`}
                                            // name='spouse_participation'
                                            name={`spouse_participation${idx}`}
                                            value="2"
                                            defaultChecked={item.spouse_participation === 2}
                                            onChange={e => handleInputChange(e, idx, 'liabilities')}
                                            className='mr-1'
                                        />
                                        <label htmlFor={`Exclusive${idx}`} className=" text-sm font-medium text-gray-700">Exclusive</label>

                                    </span>
                                </td>

                                <td className="px-4 py-2">
                                    <select
                                        name="property_association"
                                        id="property_association"
                                        value={item.property_association}
                                        onChange={e => handleInputChange(e, idx, 'liabilities')}
                                        className="p-2 w-[150px] rounded-md border border-gray-500 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value="1">Exclusive of Wife</option>
                                        <option value="2">Exclusive of Husband</option>
                                        <option value="3">Joint</option>
                                        <option value="4">Not Applicable</option>
                                    </select>
                                </td>
                                {item.liabilities_id === 0 &&
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => removeOtherInputFields(idx, 'liabilities')}
                                            className="group relative inline-block text-xs mb-2 text-red-600 focus:outline-none focus:ring active:text-red-500"
                                        >
                                            <span
                                                className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                            ></span>

                                            <span className="relative block border border-current bg-white py-1 px-3 cursor-pointer">  Delete </span>
                                        </button>
                                    </td>
                                }

                            </tr>

                        ))}
                        {showAddRow && (
                            <tr className="hover:bg-gray-100 text-xs">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                    <input type="text" name='creditor_name' className='p-2 rounded-md border border-gray-500' />
                                </th>
                                <td className="px-4 py-2">
                                    <select
                                        name="liability_type"
                                        id="liability_type"
                                        className="p-2 w-[150px] rounded-md border border-gray-500 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value="personal">Personal</option>
                                        <option value="business">Business</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" name='unpaid_amount' className='p-2 rounded-md border border-gray-500' />
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" placeholder='%' name='annual_interest_rate' className='w-10 text-center p-2 rounded-md border border-gray-500' />
                                </td>
                                <td className="px-4 py-2">
                                    <input type="text" name='amount_mri' className='p-2 rounded-md border border-gray-500' />
                                </td>
                                <td className="px-4 py-2 flex flex-col w-28">
                                    <span>
                                        <input
                                            type="radio"
                                            id="Joint"
                                            name="spouse_participation"
                                            value="joint"
                                            className='mr-1'
                                        />
                                        <label htmlFor="Joint" className=" text-sm font-medium text-gray-700">Joint</label>

                                    </span>
                                    <span>
                                        <input
                                            type="radio"
                                            id="Exclusive"
                                            name="spouse_participation"
                                            value="exclusive"
                                            className='mr-1'
                                        />
                                        <label htmlFor="Exclusive" className=" text-sm font-medium text-gray-700">Exclusive</label>

                                    </span>
                                </td>

                                <td className="px-4 py-2">
                                    <select
                                        name="property_association"
                                        id="property_association"
                                        className="p-2 w-[150px] rounded-md border border-gray-500 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value="exclusive of wife">Exclusive of Wife</option>
                                        <option value="exclusive of husband">Exclusive of Husband</option>
                                        <option value="joint">Joint</option>
                                        <option value="not applicable">Not Applicable</option>
                                    </select>
                                </td>

                                <td className="px-4 py-2">
                                    <button className='p-2 hover:bg-green-700 hover:text-white'>Save</button>
                                </td>

                            </tr>
                        )

                        }
                    </tbody>
                    <tfoot className='divide-y divide-gray-200'>
                        <tr className=" text-gray-900">
                            <th scope="row" className="text-xs px-6 py-3">TOTAL UNPAID LIABILITIES</th>
                            <td className="px-6 py-3 text-xs font-bold">{(sumOfUnpaidLiabilities).toLocaleString('en-US')}</td>
                        </tr>
                        <tr className=" text-gray-900">
                            <th scope="row" className="text-xs px-6 py-3">TOTAL MRI/CLI</th>
                            <td className="px-6 py-3 text-xs font-bold">{(sumOfMRICLI).toLocaleString('en-US')}</td>
                        </tr>
                        <tr className=" text-gray-900">
                            <th scope="row" className="text-xs px-6 py-3">TOTAL UNCOVERED LIABILITIES</th>
                            <td className="px-6 py-3 text-xs font-bold">21,000</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className='mt-8 px-36 py-2'>
                <div className='grid grid-cols-2 bg-gray-200 p-2 rounded-t-md  items-center'>
                    <div >
                        <h2 className='font-bold uppercase text-base text-slate-600'>TOTAL LIABILITIES (Self + Spouse)</h2>
                    </div>
                    <div >
                        <h2 className='font-bold uppercase text-base text-slate-600'>P2,000,000</h2>

                    </div>
                </div>

                <div className='grid grid-cols-2 bg-gray-200 p-2 rounded-b-md items-center'>
                    <div >
                        <h2 className='font-bold uppercase text-base text-slate-600'>TOTAL LIABILITIES (Self )</h2>
                    </div>
                    <div >
                        <h2 className='font-bold uppercase text-base text-slate-600'>P2,000,000</h2>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Liabilities