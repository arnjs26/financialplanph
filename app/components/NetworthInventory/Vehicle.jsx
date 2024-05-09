'use client'
import React, { useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import { IoIosInformationCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { months } from '@/app/lib/libapi';
import Link from 'next/link';

const Vehicle = ({ vehiclesList, familyCompositionList, clientID, handleInputChange, handleAddInputForm, removeOtherInputFields, totalVehiclesEstimatedValue, showRenewalMonth }) => {
    const [showAddRow, setShowAddRow] = useState(false)
    const [showExpiryForm, setShowExpiryForm] = useState(false)

    const handleChange = (e) => {
        if (e.target.value === 'yes') {
            setShowExpiryForm(true)
        } else {
            setShowExpiryForm(false)
        }
    }

    const submitdata = () => {
        [
            {"data": [ [
                        {"part":1},
                        {"vehicles_id":0},
                        {"client_id":7},
                        {"plate_no":"8687587488"},
                        {"vehicle_type":"Vehicle Type Lorem Ipsum part 1..."},
                        {"estimated_value":9618326.85},
                        {"exclusive_conjugal":2},
                        {"share_self":25},
                        {"share_spouse":75},
                        {"with_vehicle_insurance":1},
                        {"renewalMonth":"March"}
                    ], [
                        {"part":2},
                        {"vehicles_id":0},
                        {"client_id":7},
                        {"plate_no":"715125123"},
                        {"vehicle_type":"Vehicle Type Lorem Ipsum part 2..."},
                        {"estimated_value":777135.85},
                        {"exclusive_conjugal":1},
                        {"share_self":25},
                        {"share_spouse":0},
                        {"with_vehicle_insurance":2},
                        {"renewalMonth":""}
                    ] ]
            },
            {"heirs":  [  [
                        {"part":1}, 
                        {"heir_id":0},
                        {"famComp_id":1},
                        {"table_ID":0},
                        {"from_table":7},
                        {"indicated_percent":44}
                    ], [
                        {"part":1},
                        {"heir_id":0},
                        {"famComp_id":2},
                        {"table_ID":0},
                        {"from_table":7},
                        {"indicated_percent":14}
                    ], [                {"part":2},
        
                        {"heir_id":0},
                        {"famComp_id":3},
                        {"table_ID":0},
                        {"from_table":7},
                        {"indicated_percent":24}
                    ] ]
            },
            {"client_id":7}
        ]
        
    }

    return (
        <div className='mt-8 ml-2'>
            <div className='flex items-center gap-4'>
                <button className='px-4 py-2 bg-gray-200 flex items-center gap-4 font-bold text-slate-600'>
                    VEHICLES <IoIosInformationCircle className='text-lg' />
                </button>
                <FaSyncAlt />
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto divide-y divide-gray-200 text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr className='text-center'>
                            <th scope='col' className="p-2 font-bold text-slate-600">PLATE NO.</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">VEHICLE TYPE</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">ESTIMATED VALUE*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">EXCLUSIVE / CONJUGAL</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">SHARE (Self)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">SHARE (Spouse)</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">WITH VEHICLE INSURANCE?</th>
                            <th scope='col' className="p-2 font-bold text-slate-600">DESIGNATED HEIR</th>
                            <th scope='col' className="p-2 font-bold text-slate-600"><FaPlusCircle onClick={() => handleAddInputForm('vehicles')} className='text-lg cursor-pointer' /></th>

                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 '>
                    {vehiclesList.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-100 text-xs text-gray-700">
                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    <input
                                        type="text"
                                        name={'plate_no'}
                                        value={item.plate_no}
                                        onChange={(e) => handleInputChange(e, idx, 'vehicles', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />
                                </th>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'vehicle_type'}
                                        value={item.vehicle_type}
                                        onChange={(e) => handleInputChange(e, idx, 'vehicles', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'estimated_value'}
                                        value={item.estimated_value}
                                        onChange={(e) => handleInputChange(e, idx, 'vehicles', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        name="exclusive_conjugal"
                                        id="exclusive_conjugal"
                                        value={item.exclusive_conjugal}
                                        onChange={(e) => handleInputChange(e, idx, 'vehicles', null)}
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
                                        onChange={(e) => handleInputChange(e, idx, 'vehicles', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        name={'share_spouse'}
                                        value={item.share_spouse}
                                        onChange={(e) => handleInputChange(e, idx, 'vehicles', null)}
                                        className='h-10 w-32 rounded border border-gray-300 p-2' />

                                </td>                              
                                <td className='px-4 py-2 flex gap-2'>
                                    <span className='flex flex-col'>
                                        <span className='flex items-center'>
                                            <input
                                                type="radio"
                                                id="with_vehicle_insurance"
                                                name="with_vehicle_insurance"
                                                value="0"
                                                defaultChecked={parseInt(item.with_vehicle_insurance) === 0}
                                                onChange={(e) => handleInputChange(e, idx, 'vehicles', null)}
                                                className='mr-1'
                                            />
                                            <label htmlFor="with_vehicle_insurance" className=" text-sm font-medium text-gray-700">Yes</label>

                                        </span>

                                        <span className='flex items-center'>
                                            <input
                                                type="radio"
                                                id="withOut_vehicle_insurance"
                                                name="with_vehicle_insurance"
                                                defaultChecked={parseInt(item.with_vehicle_insurance) === 1}
                                                onChange={(e) => handleInputChange(e, idx, 'vehicles', null)}
                                                value="1"
                                                className=' mr-1'
                                            />
                                            <label htmlFor="withOut_vehicle_insurance" className=" text-sm font-medium text-gray-700">None</label>
                                        </span>
                                    </span>

                                    {showRenewalMonth &&
                                        <span className='flex flex-col items-center'>
                                            <label htmlFor="renewalMonth" className=" text-xs font-bold text-gray-700">Renewal Month</label>
                                            <select
                                                name="renewalMonth"
                                                id="renewalMonth"
                                                value={item.renewalMonth}
                                                onChange={e => handleInputChange(e, idx, 'vehicles')}
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
                                                    onChange={(e) => handleInputChange(e, idx, 'heirsVehicles', heirIndex)}
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
                                                    onChange={(e) => handleInputChange(e, idx, 'heirsVehicles', heirIndex)}
                                                    className='h-10 w-10 rounded-md border p-2 border-gray-500 text-center' />

                                            </span>

                                        ))
                                    }
                                </td>

                                {familyCompositionList.length !== 0 &&
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleAddInputForm('heirsVehicles', idx)}
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
                            <th scope="row" className="text-xs px-6 py-3">Total Motor Vehicle</th>
                            <td className="px-6 py-3 text-xs font-bold">{totalVehiclesEstimatedValue?.toLocaleString('en-US')}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Vehicle