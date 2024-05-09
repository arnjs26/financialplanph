'use client'
import FinancialPlanningSolutions from '@/app/components/FNA/FinancialPlanningSolutions'
import { API_BASE_URL, api, webUser } from '@/app/lib/libapi'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { GoPencil } from 'react-icons/go'
import { IoEye } from 'react-icons/io5'
import { MdLibraryAdd } from 'react-icons/md'

const Retirement_Expenses_in_List = [
    {
        id: 1,
        description: 'ESTIMATED EXPENSES FROM CASHFLOW (ANNUAL)'
    }
]

const RetirementFNAPage = ({ params }) => {
    const { clientID } = params
    const [retirementFNAData, setRetirementFNAData] = useState([])
    const [retirementExpenseData, setRetirementExpenseData] = useState([])
    const [inputRetirementFNAData, setInputRetirementFNAData] = useState([])
    const [inputRetirementExpenseData, setInputRetirementExpenseData] = useState([])
    const [inputRetirementExpenseOthersData, setInputRetirementExpenseOthersData] = useState([])

    useEffect(() => {
        fetchRetirementFNAList()
    }, [])

    const fetchRetirementFNAList = async () => {
        try {
            const res = await api.getRetirementFNAList(clientID);
            setRetirementFNAData(res?.Retirement_Planning_FNA.data?.Retirement_Planning_FNA?.data ?? [])
            setRetirementExpenseData(res?.Retirement_Planning_FNA.data?.Retirement_Expenses_in_List?.data ?? [])
        } catch (error) {
            console.error("Error fetching data from the API FETCH CASH FLOW LIST: ", error);
        }
    }

    const handleInputChange = (e, index, options, id) => {
        const { value, name } = e.target

        if (options === 'RetirementFNA') {
            // Make a copy of the existing formData array
            const updatedFormData = [...retirementFNAData];

            // Check if formData already has an item with the same retPFNA_id
            const existingItemIndex = retirementFNAData.findIndex((item) => item.retPFNA_id === id);

            if (existingItemIndex !== -1) {
                // If an item with the same retPFNA_id exists, update its values
                updatedFormData[existingItemIndex][name] = value;
            } else {
                // If an item with the same retPFNA_id doesn't exist, create a new object and push it
                const newItem = {
                    retPFNA_id: id,
                    reason_retirement_plann: '',
                    how_retirement_looks: '',
                    current_age_cl: 0,
                    current_age_sp: 0,
                    age_retirement_cl: 0,
                    age_retirement_sp: 0,
                    life_span_cl: 0,
                    life_span_sp: 0,
                    avg_inflation_rate: 0,
                    interest_retirement: 0,
                    sss_anual_cl: 0,
                    sss_anual_sp: 0,
                    yrs_sss_benefit_cl: 0,
                    yrs_sss_benefit_sp: 0,
                    comp_benefit_ret_cl: 0,
                    comp_benefit_ret_sp: 0,
                    yrs_comp_benefit_cl: 0,
                    yrs_comp_benefit_sp: 0,
                };

                // Update the value of the specified property in the object
                newItem[name] = value;

                // Push the new object to the array
                updatedFormData.push(newItem);
            }

            // Update the state with the new formData
            setRetirementFNAData(updatedFormData);
        }

        if (options === 'RetirementExpense') {
            // Make a copy of the existing formData array
            const updatedFormData = [...retirementExpenseData];

            // Check if formData already has an item with the same retPFNA_id
            const existingItemIndex = retirementExpenseData.findIndex((item) => item.retExpList_id === id);

            if (existingItemIndex !== -1) {
                // If an item with the same retPFNA_id exists, update its values
                updatedFormData[existingItemIndex].Retirement_Expenses[name] = value;
            } else {
                // If an item with the same retPFNA_id doesn't exist, create a new object and push it
                const newItem = {
                    retExpList_id: id,
                    description: '',
                    Retirement_Expenses: {
                        dr_id: 0,
                        retExpList_id: id,
                        presentVal_amt_cl: 0,
                        presentVal_amt_sp: 0,
                    },

                };

                // Update the value of the specified property in the object
                newItem.Retirement_Expenses[name] = value;

                // Push the new object to the array
                updatedFormData.push(newItem);
            }

            // Update the state with the new formData
            setRetirementExpenseData(updatedFormData);
        }

        if (options === 'RetirementExpenseInputData') {
            // Make a copy of the existing formData array
            const updatedFormData = [...inputRetirementExpenseData];

            // Check if formData already has an item with the same retPFNA_id
            const existingItemIndex = inputRetirementExpenseData.findIndex((item) => item.retExpList_id === id);

            if (existingItemIndex !== -1) {
                // If an item with the same retPFNA_id exists, update its values
                updatedFormData[existingItemIndex][name] = value;
            } else {
                // If an item with the same retPFNA_id doesn't exist, create a new object and push it
                const newItem = {
                    retExpList_id: id,
                    dr_id: 0,
                    retExpList_description: '',
                    presentVal_amt_cl: 0,
                    presentVal_amt_sp: 0,
                };

                // Update the value of the specified property in the object
                newItem[name] = value;

                // Push the new object to the array
                updatedFormData.push(newItem);
            }

            // Update the state with the new formData
            setInputRetirementExpenseData(updatedFormData);
        }

        if (options === 'retirementExpenseOthers') {
            let data = [...inputRetirementExpenseOthersData];
            data[index][name] = value;
            setInputRetirementExpenseOthersData(data);
        }
    }

    const handleAddInputForm = () => {
        const retirementExpenseOthers = {
            dr_id: 0,
            retExpList_id: 0,
            presentVal_amt_cl: 0,
            presentVal_amt_sp: 0,
            retExpList_description: ''
        }
        setInputRetirementExpenseOthersData([...inputRetirementExpenseOthersData, retirementExpenseOthers])
    }

    const removeOtherInputFields = (index) => {
        let retirementExpenseOthers = [...inputRetirementExpenseOthersData];
        retirementExpenseOthers.splice(index, 1)
        setInputRetirementExpenseOthersData(retirementExpenseOthers)
    }

    const submitData = async() => {

        let submitRetirementExpenseData = [...inputRetirementExpenseData]

        if (inputRetirementExpenseOthersData.length !== 0) {
            submitRetirementExpenseData.push(...inputRetirementExpenseOthersData)
        }

        let FNAData = [
            {
                "data": retirementFNAData.map((item) => (
                    [
                        { "retPFNA_id": item.retPFNA_id }, // Make it zero to add this record for the first time.
                        { "reason_retirement_plann": item.reason_retirement_plann },
                        { "how_retirement_looks": item.how_retirement_looks },
                        { "current_age_cl": item.current_age_cl }, // 'cl' means Client
                        { "current_age_sp": item.current_age_sp }, // 'sp' means Spouse
                        { "age_retirement_cl": item.age_retirement_cl }, // avoid this field to go below the value of 'current_age_cl'
                        { "age_retirement_sp": item.age_retirement_sp }, // avoid this field to go below the value of 'current_age_sp'
                        { "life_span_cl": item.life_span_cl },
                        { "life_span_sp": item.life_span_sp },
                        { "avg_inflation_rate": item.avg_inflation_rate },
                        { "interest_retirement": item.interest_retirement },
                        { "sss_anual_cl": item.sss_anual_cl },
                        { "sss_anual_sp": item.sss_anual_sp },
                        { "yrs_sss_benefit_cl": item.yrs_sss_benefit_cl },
                        { "yrs_sss_benefit_sp": item.yrs_sss_benefit_sp },
                        { "comp_benefit_ret_cl": item.comp_benefit_ret_cl },
                        { "comp_benefit_ret_sp": item.comp_benefit_ret_sp },
                        { "yrs_comp_benefit_cl": item.yrs_comp_benefit_cl },
                        { "yrs_comp_benefit_sp": item.yrs_comp_benefit_sp }
                    ]
                ))
            },
            {
                "retirement_expenses": submitRetirementExpenseData.map((item) => (
                    [
                        { "dr_id": item.dr_id },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        { "client_id": clientID },
                        { "retExpList_id": item.retExpList_id },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        { "retExpList_description": item.retExpList_description }, // include value if retExpList_id is 0
                        { "presentVal_amt_cl": item.presentVal_amt_cl }, // Make this 0 (zero) if no value/amount. This applies to succeeding section of data.
                        { "presentVal_amt_sp": item.presentVal_amt_sp }
                    ]
                ))
            },
            { "client_id": clientID },
            {
                "web_user":
                    [
                        [
                            { "user_id": webUser.user_id },
                            { "user_token": webUser.user_token }
                        ]
                    ]
            }
        ]

        console.log('submit data', FNAData)
        console.log('retirement data', retirementFNAData)
        const resRetirementFNA = await axios.post(`${API_BASE_URL}/retirementPlanningFNA`, FNAData);
            if (resRetirementFNA.status === 200) {
                // setSubmitLoading('success')
                // setSubmitButtonDisabled(true)
                alert('Family Protection FNA Successfully Saved!')
            }
    }

    // console.log('retirement fna data', retirementFNAData)
    // console.log('retirement expense data', retirementExpenseData)
    // console.log('retirement expense input data', inputRetirementExpenseData)
    // console.log('retirement expense others', inputRetirementExpenseOthersData)

    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
                <p className="mt-2 text-sm">
                    Retirement planning refers to the process of setting financial goals and making strategic decisions to ensure a comfortable and secure retirement. It involves estimating future expenses, determining how much money is needed to cover those expenses, and developing a plan to accumulate the necessary funds. Retirement planning also includes considering factors like investment strategies, tax implications, and healthcare needs during retirement. The goal is to have sufficient income and assets to support your desired lifestyle and financial security after you stop working.
                </p>
            </div>

            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">
                RETIREMENT PLANNING
            </div>

            <div className='mt-8 flex flex-col gap-2'>
                <label className="uppercase font-medium" htmlFor="Reason">
                    Retirement Planning is important for me because
                </label>
                <textarea
                    className="mt-2 w-96 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="Reason"
                    id="Reason"
                    name='reason_retirement_plann'
                    onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                    value={retirementFNAData.length !== 0 ? retirementFNAData[0].reason_retirement_plann : ''}
                />
            </div>

            <div className='mt-2 flex flex-col gap-2'>
                <label className="uppercase font-medium" htmlFor="Reason2">
                    Can you paint a picture of how retirement looks like for you?
                </label>
                <textarea
                    className="mt-2 w-96 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="Type your answer here"
                    id="Reason2"
                    name='how_retirement_looks'
                    onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                    value={retirementFNAData.length !== 0 ? retirementFNAData[0].how_retirement_looks : ''}
                />
            </div>

            <div className='mt-8'>
                <div className="bg-gray-200 p-2">
                    <div className="text-sm font-bold text-slate-600 uppercase text-center">
                        RETIREMENT FUNDS NEEDED TO ACHIEVE YOUR DREAM RETIREMENT
                    </div>

                    <div className='mt-4'>
                        <div className="overflow-x-auto ">
                            <table className="w-[800px]">
                                <thead className="">
                                    <tr className="text-sm">
                                        <td className="px-4 py-2 font-medium text-gray-900"></td>
                                        <td className="px-4 py-2 font-medium text-gray-900">First Name of Client</td>
                                        <td className="px-4 py-2 font-medium text-gray-900">Name of Spouse</td>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            CURRENT AGE
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <span className='flex items-center gap-4 '>
                                                <input
                                                    type="text"
                                                    placeholder='from info'
                                                    name='current_age_cl'
                                                    onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                                                    value={retirementFNAData.length !== 0 ? retirementFNAData[0].current_age_cl : ''}
                                                    className='h-7 w-32 rounded border border-gray-300 p-1'
                                                />
                                                <GoPencil className='cursor-pointer' />

                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <span className='flex items-center gap-4 '>
                                                <input
                                                    type="text"
                                                    placeholder='from info'
                                                    name='current_age_sp'
                                                    onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                                                    value={retirementFNAData.length !== 0 ? retirementFNAData[0].current_age_sp : ''}
                                                    className='h-7 w-32 rounded border border-gray-300 p-1'
                                                />
                                                <GoPencil className='cursor-pointer' />
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            START AGE OF RETIREMENT
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='age_retirement_cl'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].age_retirement_cl : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='age_retirement_sp'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].age_retirement_sp : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            NO. OF YRS REMAINING BEFORE RETIREMENT
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            target age - curr age
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            target age - curr age
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            ESTIMATED LIFE SPAN
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='life_span_cl'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].life_span_cl : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='life_span_sp'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].life_span_sp : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            EST. NO. OF YEARS AFTER RETIREMENT
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            est life span - target ret age
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            est life span - target ret age
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            AVERAGE INFLATION RATE
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='avg_inflation_rate'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].avg_inflation_rate : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            INTEREST RATE AT RETIREMENT
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='interest_retirement'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : 0)}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].interest_retirement : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Retirement Expense */}
                    <div className="mt-4">
                        <h3 className="text-xs font-bold text-slate-600 uppercase">
                            RETIREMENT EXPENSES (ANNUAL)
                        </h3>

                        <div className="overflow-x-auto ">
                            <table className="w-[800px]">
                                <thead className="">
                                    <tr className="text-sm">
                                        <td className="px-4 py-2 font-medium text-gray-900"></td>
                                        <td className="px-4 py-2 font-medium text-gray-900">PRESENT VALUE</td>
                                        <td className="px-4 py-2 font-medium text-gray-900">PRESENT VALUE</td>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    {retirementExpenseData.length !== 0 ?
                                        retirementExpenseData.map((item, idx, { length }) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-2 font-medium text-gray-900">
                                                    {item.description}
                                                </td>
                                                <td className="px-4 py-2 text-gray-700">
                                                    <span className='flex items-center gap-4 '>
                                                        <input
                                                            type="text"
                                                            name='presentVal_amt_cl'
                                                            onChange={e => handleInputChange(e, idx, 'RetirementExpense', item.retExpList_id)}
                                                            value={item.Retirement_Expenses.presentVal_amt_cl}
                                                            className='h-7 w-32 rounded border border-gray-300 p-1'
                                                        />
                                                        <IoEye className='cursor-pointer' />
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 text-gray-700">
                                                    <span className='flex items-center gap-4 '>
                                                        <input
                                                            type="text"
                                                            name='presentVal_amt_sp'
                                                            onChange={e => handleInputChange(e, idx, 'RetirementExpense', item.retExpList_id)}
                                                            value={item.Retirement_Expenses.presentVal_amt_sp}
                                                            className='h-7 w-32 rounded border border-gray-300 p-1'
                                                        />
                                                        <IoEye className='cursor-pointer' />
                                                        {idx + 1 === length &&
                                                            <MdLibraryAdd className='cursor-pointer' size={20} onClick={handleAddInputForm} />
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        ))

                                        :

                                        Retirement_Expenses_in_List.map((item, idx, { length }) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-2 font-medium text-gray-900">
                                                    {item.description}
                                                </td>
                                                <td className="px-4 py-2 text-gray-700">
                                                    <span className='flex items-center gap-4 '>
                                                        <input
                                                            type="text"
                                                            name='presentVal_amt_cl'
                                                            onChange={e => handleInputChange(e, idx, 'RetirementExpenseInputData', item.id)}
                                                            className='h-7 w-32 rounded border border-gray-300 p-1'
                                                        />
                                                        <IoEye className='cursor-pointer' />
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 text-gray-700">
                                                    <span className='flex items-center gap-4 '>
                                                        <input
                                                            type="text"
                                                            name='presentVal_amt_sp'
                                                            onChange={e => handleInputChange(e, idx, 'RetirementExpenseInputData', item.id)}
                                                            className='h-7 w-32 rounded border border-gray-300 p-1'
                                                        />
                                                        <IoEye className='cursor-pointer' />
                                                        {idx + 1 === length &&
                                                            <MdLibraryAdd className='cursor-pointer' size={20} onClick={handleAddInputForm} />
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                    {inputRetirementExpenseOthersData.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                <input
                                                    type="text"
                                                    placeholder='Description'
                                                    name='retExpList_description'
                                                    value={item.retExpList_description}
                                                    onChange={e => handleInputChange(e, idx, 'retirementExpenseOthers')}
                                                    className='h-7 w-32 rounded border border-gray-300 p-1'
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <input
                                                    type="text"
                                                    name='presentVal_amt_cl'
                                                    value={item.presentVal_amt_cl}
                                                    onChange={e => handleInputChange(e, idx, 'retirementExpenseOthers')}
                                                    className='h-7 w-32 rounded border border-gray-300 p-1'
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <span className='flex items-center gap-4 '>
                                                    <input
                                                        type="text"
                                                        name='presentVal_amt_sp'
                                                        value={item.presentVal_amt_sp}
                                                        onChange={e => handleInputChange(e, idx, 'retirementExpenseOthers')}
                                                        className='h-7 w-32 rounded border border-gray-300 p-1'
                                                    />
                                                    <button
                                                        onClick={() => removeOtherInputFields(idx)}
                                                        className="group relative ml-2 inline-block text-xs text-red-600 focus:outline-none focus:ring active:text-red-500"
                                                    >
                                                        <span
                                                            className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                                        ></span>

                                                        <span className="relative block border border-current bg-white py-1 px-3 cursor-pointer">  Delete </span>
                                                    </button>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            TOTAL RETIREMENT FUND NEEDED (ANNUAL)
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            TOTAL
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            TOTAL
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xs font-bold text-slate-600 uppercase">
                            EMPLOYEE BENEFITS FOR RETIREMENT
                        </h3>

                        <div className="overflow-x-auto ">
                            <table className="w-[800px]">
                                <thead className="">
                                    <tr className="text-sm">
                                        <td className="px-4 py-2 font-medium text-gray-900"></td>
                                        <td className="px-4 py-2 font-medium text-gray-900 text-center" colSpan={2}>ESTIMATED VALUE (EXCLUDE GUARANTEED PAYOUTS)</td>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            SSS BENEFIT (ANNUAL)
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <span className='flex items-center gap-4 '>
                                                <input
                                                    type="text"
                                                    placeholder='from info'
                                                    name='sss_anual_cl'
                                                    onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : '')}
                                                    value={retirementFNAData.length !== 0 ? retirementFNAData[0].sss_anual_cl : ''}
                                                    className='h-7 w-32 rounded border border-gray-300 p-1'
                                                />
                                                <IoEye className='cursor-pointer' />
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <span className='flex items-center gap-4 '>
                                                <input
                                                    type="text"
                                                    placeholder='from info'
                                                    name='sss_anual_sp'
                                                    onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : '')}
                                                    value={retirementFNAData.length !== 0 ? retirementFNAData[0].sss_anual_sp : ''}
                                                    className='h-7 w-32 rounded border border-gray-300 p-1'
                                                />
                                                <IoEye className='cursor-pointer' />
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            HOW MANY YRS WILL YOU RECEIVE BENEFIT?
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='yrs_sss_benefit_cl'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : '')}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].yrs_sss_benefit_cl : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='yrs_sss_benefit_sp'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : '')}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].yrs_sss_benefit_sp : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            COMPANY BENEFIT RETIREMENT (ANNUAL)
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='comp_benefit_ret_cl'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : '')}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].comp_benefit_ret_cl : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='comp_benefit_ret_sp'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : '')}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].comp_benefit_ret_sp : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            HOW MANY YRS WILL YOU RECEIVE BENEFIT?
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='yrs_comp_benefit_cl'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : '')}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].yrs_comp_benefit_cl : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='from info'
                                                name='yrs_comp_benefit_sp'
                                                onChange={e => handleInputChange(e, 0, 'RetirementFNA', retirementFNAData.length !== 0 ? retirementFNAData[0].retPFNA_id : '')}
                                                value={retirementFNAData.length !== 0 ? retirementFNAData[0].yrs_comp_benefit_sp : ''}
                                                className='h-7 w-32 rounded border border-gray-300 p-1'
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            TOTAL EXPECTED EMPLOYEE BENEFIT PAYOUTS FOR ENTIRE LIFETIME
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            FORMULA = (SSS ANNUAL BENEFIT * SSS YEAR RECEIVE) + (COMPANY BENEFIT * COMPANY YEARS BENEFITS)
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            FORMULA = (SSS ANNUAL BENEFIT * SSS YEAR RECEIVE) + (COMPANY BENEFIT * COMPANY YEARS BENEFITS)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-4">

                        <div className="overflow-x-auto ">
                            <table className="w-[800px]">
                                <thead className="">
                                    <tr className="text-sm">
                                        <td className="px-4 py-2 font-medium text-gray-900"></td>
                                        <td className="px-4 py-2 font-medium text-gray-900">FUTURE VALUE</td>
                                        <td className="px-4 py-2 font-medium text-gray-900">FUTURE VALUE</td>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    <tr>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            UNFUNDED RETIREMENT EXPENSES (NO PREPARATIONS DONE YET)
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <span className='flex items-center gap-4 '>
                                                <input type="text" placeholder='from info' className='h-7 w-32 rounded border border-gray-300 p-1' /> <IoEye className='cursor-pointer' />
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <span className='flex items-center gap-4 '>
                                                <input type="text" placeholder='from info' className='h-7 w-32 rounded border border-gray-300 p-1' /> <IoEye className='cursor-pointer' />
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-8">
                {/* <FinancialPlanningSolutions /> */}
            </div>

            <div className='sticky bottom-0 bg-white py-4 flex justify-between mt-5'>
                <Link
                    className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
                    href={`/admin/clients/cash-flow/cash-inflow/${clientID}`}
                >
                    <span className="absolute -start-full transition-all group-hover:start-4">
                        <svg
                            className="h-5 w-5 rtl:rotate-180"
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

                <div>

                    <button
                        onClick={submitData}
                        // disabled={submitButtonDisabled}
                        className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RetirementFNAPage