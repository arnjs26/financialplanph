'use client'
import React, { useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import { IoIosInformationCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import Link from 'next/link';

const StocksInListedCompany = ({ stocksInListedList, familyCompositionList, clientID, handleInputChange, handleAddInputForm, removeOtherInputFields, totalStocksInListedEstimatedValue }) => {
    const [showAddRow, setShowAddRow] = useState(false)
    const submitdata = () => {
        let data =
            [
                {
                    "data": [[
                        { "part": 1 },
                        { "sic_id": 0 },
                        { "client_id": 7 },
                        { "company_alias": "Alias part 1..." },
                        { "no_of_shares": 3 },
                        { "current_book_value": 61235.59 },
                        { "estimated_value": 72212.85 },
                        { "purpose": 2 },
                        { "exclusive_conjugal": 2 },
                        { "share_self": 14 },
                        { "share_spouse": 34 }
                    ], [
                        { "part": 2 },
                        { "sic_id": 0 },
                        { "client_id": 7 },
                        { "company_alias": "Alias part 2..." },
                        { "no_of_shares": 2 },
                        { "current_book_value": 11135.59 },
                        { "estimated_value": 442212.85 },
                        { "purpose": 2 },
                        { "exclusive_conjugal": 1 },
                        { "share_self": 12 },
                        { "share_spouse": 0 }
                    ]]
                },
                {
                    "heirs": [[
                        { "part": 1 },
                        { "heir_id": 0 },
                        { "famComp_id": 175 },
                        { "table_ID": 0 },
                        { "from_table": 5 },
                        { "indicated_percent": 17 }
                    ], [
                        { "part": 2 },
                        { "heir_id": 0 },
                        { "famComp_id": 176 },
                        { "table_ID": 0 },
                        { "from_table": 5 },
                        { "indicated_percent": 9 }
                    ], [
                        { "part": 2 },
                        { "heir_id": 0 },
                        { "famComp_id": 177 },
                        { "table_ID": 0 },
                        { "from_table": 5 },
                        { "indicated_percent": 15 }
                    ]]
                },
                { "client_id": 7 }
            ]

    }

    return (
        <div className="mt-4 ml-2">
            <div className='flex items-center gap-4'>
                <button className='px-4 py-2 bg-gray-200 flex items-center gap-4 font-bold text-slate-600'>
                    Stocks In Listed Companies <IoIosInformationCircle className='text-lg' />
                </button>
                <FaSyncAlt />
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto divide-y divide-gray-200 text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr className='text-center'>
                            <th scope='col' className="p-2 font-bold text-slate-600">COMPANY ALIAS*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">NO. OF SHARES</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">CURRENT BOOK VALUE / SHARE</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">ESTIMATED VALUE*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">PURPOSE*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">EXCLUSIVE / CONJUGAL</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">SHARE (Self)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">SHARE (Spouse)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">DESIGNATED HEIR</th>
                            <th scope='col' className="p-2 font-bold text-slate-600"><FaPlusCircle onClick={() => handleAddInputForm('stocksInListed')}className='text-lg cursor-pointer' /></th>

                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 '>
                        {stocksInListedList.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-100 text-xs text-gray-700">
                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    <input
                                        type="text"
                                        name={'company_alias'}
                                        value={item.company_alias}
                                        onChange={(e) => handleInputChange(e, idx, 'stocksInListed', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />
                                </th>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'no_of_shares'}
                                        value={item.no_of_shares}
                                        onChange={(e) => handleInputChange(e, idx, 'stocksInListed', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'current_book_value'}
                                        value={item.current_book_value}
                                        onChange={(e) => handleInputChange(e, idx, 'stocksInListed', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'estimated_value'}
                                        value={item.estimated_value}
                                        onChange={(e) => handleInputChange(e, idx, 'stocksInListed', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        name="purpose"
                                        value={item.purpose}
                                        id="purpose"
                                        onChange={(e) => handleInputChange(e, idx, 'stocksInListed', null)}
                                        className="p-2 w-[150px] rounded-md border border-gray-500 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value='1'>Retirement</option>
                                        <option value="2">Education</option>
                                        <option value="3">Others</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        name="exclusive_conjugal"
                                        id="exclusive_conjugal"
                                        value={item.exclusive_conjugal}
                                        onChange={(e) => handleInputChange(e, idx, 'stocksInListed', null)}
                                        className="p-2 w-[150px] rounded-md border border-gray-500 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value="1">Exclusive</option>
                                        <option value="2">Conjugal</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'share_self'}
                                        value={item.share_self}
                                        onChange={(e) => handleInputChange(e, idx, 'stocksInListed', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'share_spouse'}
                                        value={item.share_spouse}
                                        onChange={(e) => handleInputChange(e, idx, 'stocksInListed', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    {familyCompositionList.length === 0 ?
                                        <span className='text-center'>
                                            <p className='text-center'>
                                                No Designated Heir Info. Please complete family Composition data

                                            </p>
                                            <Link href={`/admin/clients/family-composition/${clientID}`}>
                                                Click Here
                                            </Link>

                                        </span>
                                        :
                                        item.heirs.map((heir, heirIndex) => (
                                            <span key={heirIndex} className='flex items-center gap-2'>
                                                <select
                                                    name="famComp_id"
                                                    id="famComp_id"
                                                    value={heir.famComp_id}
                                                    onChange={(e) => handleInputChange(e, idx, 'heirsStocksInListed', heirIndex)}
                                                    className="p-2 w-[150px] rounded-md border border-gray-500 text-gray-700 text-xs"
                                                >
                                                    <option value="">Please select</option>
                                                    {familyCompositionList.filter((fc) => fc.type === 0 || fc.type === 2 && fc.health_condition !== 4).map((item, idx) => (
                                                        <option key={idx} value={item.fc_id}>{item.first_name} {item.last_name}</option>
                                                    ))}
                                                </select>

                                                <input
                                                    type="text"
                                                    placeholder='%'
                                                    name='indicated_percent'
                                                    value={heir.indicated_percent}
                                                    onChange={(e) => handleInputChange(e, idx, 'heirsStocksInListed', heirIndex)}
                                                    className='h-10 w-10 rounded-md border p-2 border-gray-500 text-center' />

                                            </span>

                                        ))
                                    }
                                </td>

                                {familyCompositionList.length !== 0 &&
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleAddInputForm('heirsStocksInListed', idx)}
                                            className="group relative inline-block text-xs text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                        >
                                            <span
                                                className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                            ></span>

                                            <span className="relative block border border-current bg-white p-1 cursor-pointer">  Add Heirs </span>
                                        </button>
                                    </td>
                                }

                            </tr>
                        ))}
                    </tbody>
                    <tfoot className='divide-y divide-gray-200'>
                        <tr className=" text-gray-900">
                            <th scope="row" className="text-xs px-6 py-3">Total Stocks in Listed Companies</th>
                            <td className="px-6 py-3 text-xs font-bold">{totalStocksInListedEstimatedValue?.toLocaleString('en-US')}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default StocksInListedCompany