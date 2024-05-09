'use client'
import React, { useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import { IoIosInformationCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import Link from 'next/link';
import { months } from '@/app/lib/libapi';

const Receivables = ({ receivablesList, familyCompositionList, clientID, handleInputChange, handleAddInputForm, removeOtherInputFields, totalReceivablesEstimatedValue, showCLIMonth }) => {
    const [showAddRow, setShowAddRow] = useState(false)

    const submitdata = () => {
        let data = [
            {
                "data": [[
                    { "part": 1 },
                    { "receivables_id": 0 },
                    { "client_id": 7 },
                    { "name_of_debtor": "Juan Carlos Miguel Zuberi" },
                    { "loan_purpose": "Lorem Ipsum purpose of loan..." },
                    { "estimated_value": 69128.85 },
                    { "percentage_collectibility": 51 },
                    { "exclusive_conjugal": 2 },
                    { "share_self": 25 },
                    { "share_spouse": 75 },
                    { "with_cli": 1 },
                    { "renewal_month": "January" }
                ]
                ]
            },
            {
                "heirs": [[
                    { "part": 1 },
                    { "heir_id": 0 },
                    { "famComp_id": 176 },
                    { "table_ID": 0 },
                    { "from_table": 1 },
                    { "indicated_percent": 15 }
                ], [
                    { "part": 1 },
                    { "heir_id": 0 },
                    { "famComp_id": 178 },
                    { "table_ID": 0 },
                    { "from_table": 1 },
                    { "indicated_percent": 22 }
                ]]
            },
            { "client_id": 7 }
        ]

    }

    return (
        <div className="mt-8 ml-2">
            <div className='flex items-center gap-4'>
                <button className='px-4 py-2 bg-gray-200 flex items-center gap-4 font-bold text-slate-600'>
                    Receivables <IoIosInformationCircle className='text-lg' />
                </button>
                <FaSyncAlt />
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto divide-y divide-gray-200 text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr className='text-center'>
                            <th scope='col' className="p-2 font-bold text-slate-600">NAME OF DEBTOR</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">PURPOSE OF LOAN</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">ESTIMATED VALUE*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">% of COLLECTIBILITY*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">EXCLUSIVE / CONJUGAL</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">SHARE (Self)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">SHARE (Spouse)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">DESIGNATED HEIR</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">WITH CREDIT LIFE INSURANCE</th>
                            <th scope='col' className="p-2 font-bold text-slate-600"><FaPlusCircle onClick={() => handleAddInputForm('receivables', receivablesList.length)} className='text-lg cursor-pointer' /></th>

                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 '>
                        {receivablesList.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-100 text-xs text-gray-700">
                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    <input
                                        type="text"
                                        name={'name_of_debtor'}
                                        value={item.name_of_debtor}
                                        onChange={(e) => handleInputChange(e, idx, 'receivables', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />
                                </th>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'loan_purpose'}
                                        value={item.loan_purpose}
                                        onChange={(e) => handleInputChange(e, idx, 'receivables', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'estimated_value'}
                                        value={item.estimated_value}
                                        onChange={(e) => handleInputChange(e, idx, 'receivables', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'percentage_collectibility'}
                                        value={item.percentage_collectibility}
                                        onChange={(e) => handleInputChange(e, idx, 'receivables', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        name="exclusive_conjugal"
                                        id="exclusive_conjugal"
                                        value={item.exclusive_conjugal}
                                        onChange={(e) => handleInputChange(e, idx, 'receivables', null)}
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
                                        onChange={(e) => handleInputChange(e, idx, 'receivables', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'share_spouse'}
                                        value={item.share_spouse}
                                        onChange={(e) => handleInputChange(e, idx, 'receivables', null)}
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
                                                    onChange={(e) => handleInputChange(e, idx, 'heirsReceivables', heirIndex)}
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
                                                    onChange={(e) => handleInputChange(e, idx, 'heirsReceivables', heirIndex)}
                                                    className='h-10 w-10 rounded-md border p-2 border-gray-500 text-center' />

                                                <button
                                                    onClick={() => handleAddInputForm('heirsReceivables', idx)}
                                                    className="group relative inline-block text-xs text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                                >
                                                    <span
                                                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                                    ></span>

                                                    <span className="relative block border border-current bg-white p-1 cursor-pointer">  Add Heirs </span>
                                                </button>
                                            </span>
                                        ))
                                    }
                                </td>
                                <td className='px-4 py-2 flex gap-2'>
                                    <span className='flex flex-col'>
                                        <span className='flex items-center'>
                                            <input
                                                type="radio"
                                                id="with_creditLifeInsurance"
                                                name="with_cli"
                                                value="0"
                                                defaultChecked={item.with_cli === 0}
                                                onChange={(e) => handleInputChange(e, idx, 'receivables', null)}
                                                className='mr-1'
                                            />
                                            <label htmlFor="with_creditLifeInsurance" className=" text-sm font-medium text-gray-700">Yes</label>

                                        </span>

                                        <span className='flex items-center'>
                                            <input
                                                type="radio"
                                                id="without_creditLifeInsurance"
                                                name="with_cli"
                                                defaultChecked={item.with_cli === 1}
                                                onChange={(e) => handleInputChange(e, idx, 'receivables', null)}
                                                value="1"
                                                className=' mr-1'
                                            />
                                            <label htmlFor="without_creditLifeInsurance" className=" text-sm font-medium text-gray-700">No</label>
                                        </span>
                                    </span>

                                    {showCLIMonth &&
                                        <span className='flex flex-col items-center'>
                                            <label htmlFor="renewal_month" className=" text-xs font-bold text-gray-700">Renewal Month</label>
                                            <select
                                                name="renewal_month"
                                                id="renewal_month"
                                                value={item.renewal_month}
                                                onChange={e => handleInputChange(e, idx, 'receivables')}
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
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className='divide-y divide-gray-200'>
                        <tr className=" text-gray-900">
                            <th scope="row" className="text-xs px-6 py-3">Total Recievables</th>
                            <td className="px-6 py-3 text-xs font-bold">{totalReceivablesEstimatedValue === 0 ? 0 : totalReceivablesEstimatedValue?.toLocaleString('en-US')}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Receivables