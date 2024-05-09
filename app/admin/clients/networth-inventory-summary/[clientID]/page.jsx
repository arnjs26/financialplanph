import Charts from '@/app/components/Charts'
import LineChart from '@/app/components/LineChart'
import Link from 'next/link'
import React from 'react'
import { IoEye } from "react-icons/io5";

const NetworthInventorySummaryPage = ({ params }) => {
    const { clientID } = params

    return (
        <div className='mt-4 bg-white justify-between border rounded-lg p-2'>
            <h2 className='text-2xl font-bold text-slate-600 mb-4 flex items-center justify-center gap-4'>
                NET WORTH HISTORY AND SUMMARY 
                <Link href={`/admin/clients/networth-inventory-summary/networth-inventory/${clientID}`}>
                    <IoEye className='cursor-pointer'/>
                </Link>
            </h2>

            <div className="overflow-x-auto border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="">
                        <tr className='bg-gray-200'>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">HISTORICAL DATES</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ASSETS</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">LIABILITIES</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">NETWORTH</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">INC (DEC)</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">%INC (DEC)</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                        </tr>

                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                        </tr>

                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='mt-4'>
                <LineChart />
            </div>

            {/* Networth Goal */}
            <div className="mt-4">
                <h2 className='text-center text-2xl font-bold text-slate-600 mb-4'>NETWORTH GOAL</h2>

                <div className='mt-4'>
                    <p>Age &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &ensp; 35</p>
                    <span className='flex gap-5'>
                        <p>CURRENT NETWORTH &emsp;&emsp;&emsp; P xxx  xxxx xxx </p>
                        <p>TARGET INCREASE PER YEAR &emsp;&emsp;&emsp; P xxx  xxxx xxx</p>
                    </span>
                </div>

                <div className="overflow-x-auto border border-gray-200 mt-4">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="">
                            <tr className='bg-gray-200'>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Age</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Previous Networth Goal</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Current Networth Goal</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Current</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Excess/ Deficit</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">% Excess/ Defict</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Current age </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Current age  +1</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Current age  +2</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Current age  +3</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Current age  +4</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recommendations */}
            <div className="mt-4">
                <div>
                    <label className="font-bold" htmlFor="message">Recommendations:</label>

                    <textarea
                        className="w-full rounded-lg border border-gray-500 p-3 text-sm mt-4"
                        placeholder="Recommendations..."
                        rows="8"
                        id="message"
                    ></textarea>
                </div>
            </div>

            {/* ASSET COMPOSITION */}
            <div className="mt-4">
                <h2 className='text-center text-2xl font-bold text-slate-600 mb-4'>ASSET COMPOSITION</h2>
                <div className='grid grid-cols-2'>
                    <div>
                        <Charts />
                    </div>
                    <div className="overflow-x-auto border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="">
                                <tr className='bg-gray-200'>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ASSET CATEGORY</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">AMOUNT</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">%</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">CASH (LIQUID)</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">RECEIVABLES</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">FINANCIAL ASSETS</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">FAMILY HOME</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">REAL ESTATE</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">VEHICLES</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">PERSONAL ASSETS</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* SUMMARY OF UNSECURED ASSETS AND LOANS */}
            <div className="mt-4">
                <h2 className='text-center text-2xl font-bold text-slate-600 mb-4'>SUMMARY OF UNSECURED ASSETS AND LOANS</h2>

                <div className='grid grid-cols-2 gap-4'>
                    <div className="overflow-x-auto border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="">
                                <tr className='bg-gray-200'>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ASSET</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">AMOUNT</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="overflow-x-auto border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="">
                                <tr className='bg-gray-200'>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">LOANS</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">AMOUNT</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* SUMMARY OF UNSECURED ASSETS AND LOANS */}
            <div className="mt-4">
                <h2 className='text-center text-2xl font-bold text-slate-600 mb-4'>SUMMARY OF SECURED ASSETS AND LOANS</h2>

                <div className="overflow-x-auto border border-gray-200">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="">
                            <tr className='bg-gray-200'>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ASSET</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">AMOUNT</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">RENEWAL DATE</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="overflow-x-auto border border-gray-200 mt-4">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="">
                            <tr className='bg-gray-200'>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">LIABILITIES</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">AMOUNT</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">RENEWAL DATE</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='grid grid-cols-2 mt-8'>

                <div >
                    <Link
                        className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-2 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        href={"/admin/clients"}

                    >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                            <svg
                                className="h-5 w-5"
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

                </div>
                <div className=' text-right'>
                    <button
                        // type="submit"
                        className="inline-block w-full rounded-lg bg-blue-800 px-8 py-2 font-medium text-white sm:w-auto"
                    >
                        Save
                    </button>

                </div>
            </div>

            <div role="alert" className="mt-8 rounded border-s-4 border-yellow-500 bg-yellow-50 p-4">
                <p className="mt-2 text-sm">
                The value of the advise that we will give you will highly depend on the amount and value of information that you will provide us. Rest assure that all the information you will share will be kept confidential.
                </p>
            </div>

        </div>
    )
}

export default NetworthInventorySummaryPage