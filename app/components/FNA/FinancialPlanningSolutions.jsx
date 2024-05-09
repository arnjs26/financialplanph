'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { MdLibraryAdd } from 'react-icons/md';

const FinancialPlanningSolutions = ({ handleInputChange, inputClientToDos, inputAgentToDos, handleAddInputForm, removeOtherInputFields }) => {
    
    return (
        <div className='max-w-[1000px] mx-auto bg-gray-200 p-2'>
            <div className="text-sm sm:py-2 font-bold text-slate-600 uppercase text-center">
                FINANCIAL PLANNING SOLUTIONS
            </div>

            <button className='bg-green-700 px-2 py-1 text-white uppercase'>
                View Personal Details
            </button>

            <div className='mt-4'>
                <ol className='list-decimal list-inside'>
                    <li className='text-xs'>
                        <span className='text-xs font-bold text-slate-600 uppercase'>
                            Set Budget for Family Protection
                        </span>

                        <div className='mt-2'>
                            <div className="ml-4 overflow-x-auto ">
                                <table className="table-fixed">
                                    <thead className="">
                                        <tr className="text-sm">
                                            <td className=" px-4 py-2 font-medium text-gray-900"></td>
                                            <td className=" px-4 py-2 font-medium text-gray-900 text-center">Name of Client</td>
                                            <td className=" px-4 py-2 font-medium text-gray-900 text-center">Spouse</td>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                Monthly Budget for Education Fund
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    name='monthly_budget1'
                                                    onChange={(e) => handleInputChange(e, 0, 'inputFPSolutionData')}
                                                    className='w-32 rounded border border-gray-300 p-2' />
                                            </td>
                                            <td className=" px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    name='monthly_budget2'
                                                    onChange={(e) => handleInputChange(e, 0, 'inputFPSolutionData')}
                                                    className='w-32 rounded border border-gray-300 p-2' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                Total Monthly Actual Net Cash Flow (Optional)
                                            </td>
                                            <td className=" px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    name='actual_net_cash_flow1'
                                                    onChange={(e) => handleInputChange(e, 0, 'inputFPSolutionData')}
                                                    className='w-32 rounded border border-gray-300 p-2' />
                                            </td>
                                            <td className=" px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    name='actual_net_cash_flow2'
                                                    onChange={(e) => handleInputChange(e, 0, 'inputFPSolutionData')}
                                                    className='w-32 rounded border border-gray-300 p-2' />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </li>

                    <li className='mt-4 text-xs'>
                        <span className='text-xs font-bold text-slate-600 uppercase'>
                            SELECT THE PRODUCT SOLUTIONS FOR YOUR CLIENT'S NEEDS
                        </span>
                        <button className='text-xs bg-green-700 px-2 py-1 ml-2 text-white uppercase'>
                            View Products
                        </button>
                        <button className='text-xs bg-green-700 px-2 py-1 ml-2 text-white uppercase'>
                            View Funds
                        </button>
                    </li>

                    <li className='mt-4 text-xs'>
                        <span className='text-xs font-bold text-slate-600 uppercase'>
                            NEXT STEPS
                        </span>

                        <div className='mt-4 ml-4 space-y-4'>
                            <div className='grid grid-flow-col auto-cols-max gap-4'>
                                <div className='flex items-center gap-2'>
                                    <label className="uppercase font-semibold whitespace-nowrap" htmlFor="mode_of_payment">
                                        Mode of Payment
                                    </label>
                                    <select
                                        name="mode_of_payment"
                                        id="mode_of_payment"
                                        className=" p-1 w-[150px] rounded-md border border-gray-300 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value="retirement">MO</option>
                                        <option value="education">Q</option>
                                        <option value="others">SA</option>
                                        <option value="others">A</option>
                                    </select>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label className="uppercase font-semibold whitespace-nowrap" htmlFor="mode_of_payment">
                                        INITIAL APPLICATION FORM
                                    </label>
                                    <button className='text-xs bg-green-700 px-2 py-1 ml-2 text-white uppercase'>
                                        SEND INITIAL APPLICATION FORM
                                    </button>
                                </div>
                            </div>

                            <div className='grid grid-flow-col auto-cols-max gap-4'>
                                <div className='flex items-center gap-2'>
                                    <label className="uppercase font-semibold whitespace-nowrap" htmlFor="form_of_payment">
                                        Form of Payment
                                    </label>
                                    <select
                                        name="form_of_payment"
                                        id="form_of_payment"
                                        className="p-1 w-[150px] rounded-md border border-gray-300 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value="cash">Cash</option>
                                        <option value="check">Check</option>
                                        <option value="credit card">Credit Card</option>
                                        <option value="autodebit arrgangement">Autodebit Arrangement</option>
                                        <option value="bills payment">Bills Payment</option>
                                    </select>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label className="uppercase font-semibold whitespace-nowrap" htmlFor="mode_of_payment">
                                        FEEDBACK FORM
                                    </label>
                                    <button className='text-xs bg-green-700 px-2 py-1 ml-2 text-white uppercase'>
                                        GENERATE FEEDBACK FORM
                                    </button>
                                </div>
                            </div>

                            <div className='grid grid-flow-col auto-cols-max items-center gap-4'>
                                <div className=''>
                                    <label className="uppercase font-semibold whitespace-nowrap" htmlFor="form_of_payment">
                                        SUGGESTIONS FROM ADVISOR
                                    </label>
                                    <p>(If applicable, include product name, face amount, premium, etc)</p>

                                </div>
                                <div>
                                    <textarea
                                        className="rounded-md w-60 border border-gray-300 p-1 text-sm"
                                        placeholder="Type your suggestions"
                                        name='advisor_suggestion'
                                        type='text'
                                        onChange={(e) => handleInputChange(e, 0, 'inputFPSolutionData')}
                                        id="suggestions"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="uppercase font-semibold whitespace-nowrap flex items-center gap-4">
                                    CLIENT TO DO'S
                                    <MdLibraryAdd className='text-xl cursor-pointer' onClick={() => handleAddInputForm('clientToDos')} />
                                </label>
                                {inputClientToDos.map((item, idx) => (
                                    <div key={idx} className='flex items-center gap-2'>
                                        <input
                                            className="rounded-md w-60 border border-gray-300 p-2 text-sm"
                                            placeholder="Write Client's TO DO'S"
                                            type='text'
                                            name='todo'
                                            value={item.todo}
                                            onChange={(e) => handleInputChange(e, idx, 'clientToDos', 0)}
                                            id="todo"
                                        />
                                        <input
                                            className="rounded-md w-60 border border-gray-300 p-2 text-sm"
                                            type='date'
                                            name='date_todo'
                                            value={item.date_todo}
                                            onChange={(e) => handleInputChange(e, idx, 'clientToDos', 0)}
                                            id="date_todo"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="flex items-center gap-4 uppercase font-semibold whitespace-nowrap" >
                                    ADVISORS TO DO'S
                                    <MdLibraryAdd className='text-xl cursor-pointer' onClick={() => handleAddInputForm('agentToDos')} />
                                </label>
                                {inputAgentToDos.map((item, idx) => (
                                    <div key={idx} className='flex items-center gap-2'>
                                        <input
                                            className="rounded-md w-60 border border-gray-300 p-2 text-sm"
                                            placeholder="Write Client's TO DO'S"
                                            type='text'
                                            name='todo'
                                            value={item.todo}
                                            onChange={(e) => handleInputChange(e, idx, 'agentToDos', 0)}
                                            id="todo"
                                        />
                                        <input
                                            className="rounded-md w-60 border border-gray-300 p-2 text-sm"
                                            type='date'
                                            name='date_todo'
                                            value={item.date_todo}
                                            onChange={(e) => handleInputChange(e, idx, 'agentToDos', 0)}
                                            id="date_todo"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='grid grid-cols-2 gap-4 items-center'>
                                <div className='flex items-center gap-4'>
                                    <label className="uppercase font-semibold whitespace-nowrap" htmlFor="status">
                                        STATUS
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        onChange={(e) => handleInputChange(e, 0, 'inputFPSolutionData')}
                                        className="p-2 w-[150px] rounded-md border border-gray-300 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value="1">For Proposal Generation</option>
                                        <option value="2">Proposal For Review</option>
                                        <option value="3">Application Form Submitted- For Payment</option>
                                        <option value="4">Application Form Submitted- Paid</option>
                                    </select>

                                </div>
                                <div>

                                </div>
                            </div>

                        </div>
                    </li>

                    <li className='mt-4 text-xs'>
                        <span className='text-xs font-bold text-slate-600 uppercase'>
                            LIFE INSURANCE GOAL REVIEW
                        </span>

                        <div className='mt-4 ml-4 flex items-center gap-2'>
                            Since there is a life insurance deficit would it be ok to review your insurance needs in the future?
                            <div className='flex items-center '>
                                <input
                                    id='yes'
                                    name='goal_review'
                                    onChange={(e) => handleInputChange(e, 0, 'inputFPSolutionData')}
                                    value={1}
                                    type="radio" />
                                <label htmlFor="yes">YES</label>
                                <input
                                    id='no'
                                    name='goal_review'
                                    value={0}
                                    onChange={(e) => handleInputChange(e, 0, 'inputFPSolutionData')}
                                    type="radio"
                                    className='ml-4' />
                                <label htmlFor="no">NO</label>
                            </div>
                        </div>

                        <div className='mt-4 ml-4 flex gap-4 items-center'>
                            I agree to meet with my Aetos Financial advisor on
                            <input
                                type="date"
                                name='meet_advisor_on'
                                onChange={(e) => handleInputChange(e, 0, 'inputFPSolutionData')}
                                className='rounded-md border border-gray-300 p-2 text-sm' />
                        </div>
                    </li>
                </ol>

            </div>

            {/* <div className='mt-8 flex justify-between'>
                <Link
                    className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-2 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    href={"/admin/clients"}

                >
                    <span className="absolute -start-full transition-all group-hover:start-4">
                        <svg
                            className="w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16l-4-4m0 0 4-4m-4 4h18"
                            />
                        </svg>
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        {" "}
                        Back{" "}
                    </span>
                </Link>

                <button
                    // type="submit"
                    className="inline-block w-full rounded-lg bg-blue-800 px-8 py-2 font-medium text-white sm:w-auto"
                >
                    Save
                </button>

            </div>

            <div role="alert" className="mt-8 rounded border-s-4 border-yellow-500 bg-yellow-50 p-4">
                <p className="mt-2 text-sm">
                    The value of the advise that we will give you will highly depend on the amount and value of information that you will provide us. Rest assure that all the information you will share will be kept confidential.
                </p>
            </div> */}


        </div>
    )
}

export default FinancialPlanningSolutions