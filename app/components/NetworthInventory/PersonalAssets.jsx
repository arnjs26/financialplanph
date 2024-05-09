'use client'
import React, { useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import { IoIosInformationCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import Link from 'next/link';

const PersonalAssets = ({ personalAssetsList, familyCompositionList, clientID, handleInputChange, handleAddInputForm, removeOtherInputFields, totalPersonalAssetsEstimatedValue }) => {
    const [showAddRow, setShowAddRow] = useState(false)

    return (
        <div className='mt-8 ml-2'>
            <div className='flex items-center gap-4'>
                <button className='px-4 py-2 bg-gray-200 flex items-center gap-4 font-bold text-slate-600'>
                    PERSONAL ASSETS <IoIosInformationCircle className='text-lg' />
                </button>
                <FaSyncAlt />
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto divide-y divide-gray-200 text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr className='text-center'>
                            <th scope='col' className="p-2 font-bold text-slate-600">ITEM</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">ESTIMATED VALUE*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">PURPOSE*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">WITH GUARANTEED PAYOUT?*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">EXCLUSIVE / CONJUGAL</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">SHARE (Self)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">SHARE (Spouse)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">DESIGNATED HEIR</th>
                            <th scope='col' className="p-2 font-bold text-slate-600"><FaPlusCircle onClick={() => handleAddInputForm('personalAssets')} className='text-lg cursor-pointer' /></th>

                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 '>
                    {personalAssetsList.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-100 text-xs text-gray-700">
                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    <input
                                        type="text"
                                        name={'item_name'}
                                        value={item.item_name}
                                        onChange={(e) => handleInputChange(e, idx, 'personalAssets', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />
                                </th>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'estimated_value'}
                                        value={item.estimated_value}
                                        onChange={(e) => handleInputChange(e, idx, 'personalAssets', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        name="purpose"
                                        value={item.purpose}
                                        id="purpose"
                                        onChange={(e) => handleInputChange(e, idx, 'personalAssets', null)}
                                        className="p-2 w-[150px] rounded-md border border-gray-500 text-gray-700 text-xs"
                                    >
                                        <option value="">Please select</option>
                                        <option value='1'>Retirement</option>
                                        <option value="2">Education</option>
                                        <option value="3">Others</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        id="guaranteedPayoutAccept"
                                        checked={parseInt(item.with_guaranteed_payout) === 1}
                                        name="with_guaranteed_payout"
                                        onChange={(e) => handleInputChange(e, idx, 'personalAssets', null)}
                                        value="1"
                                        className="h-4 w-4 rounded-md border-gray-200 bg-white shadow-sm"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        name="exclusive_conjugal"
                                        id="exclusive_conjugal"
                                        value={item.exclusive_conjugal}
                                        onChange={(e) => handleInputChange(e, idx, 'personalAssets', null)}
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
                                        onChange={(e) => handleInputChange(e, idx, 'personalAssets', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'share_spouse'}
                                        value={item.share_spouse}
                                        onChange={(e) => handleInputChange(e, idx, 'personalAssets', null)}
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
                                                    onChange={(e) => handleInputChange(e, idx, 'heirsPersonalAssets', heirIndex)}
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
                                                    onChange={(e) => handleInputChange(e, idx, 'heirsPersonalAssets', heirIndex)}
                                                    className='h-10 w-10 rounded-md border p-2 border-gray-500 text-center' />

                                            </span>

                                        ))
                                    }
                                </td>

                                {familyCompositionList.length !== 0 &&
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleAddInputForm('heirsPersonalAssets', idx)}
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
                            <th scope="row" className="text-xs px-6 py-3">Total Personal Assets</th>
                            <td className="px-6 py-3 text-xs font-bold">{totalPersonalAssetsEstimatedValue}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default PersonalAssets