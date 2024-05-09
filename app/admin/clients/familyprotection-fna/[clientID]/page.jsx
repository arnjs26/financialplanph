'use client'
import FinancialPlanningSolutions from '@/app/components/FNA/FinancialPlanningSolutions'
import { API_BASE_URL, agent_id, api, webUser } from '@/app/lib/libapi'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AiFillCalculator } from 'react-icons/ai'
import { FaPlusCircle, FaSyncAlt } from 'react-icons/fa'
import { MdAdd, MdLibraryAdd } from 'react-icons/md'
import SubmitModalFNA from '@/app/components/FNA/SubmitModalFNA'

const debtsAndFinalList = [
    {
        id: 5,
        description: 'LOANS NOT COVERED BY MORTGAGE REDEMPTION INSURANCE OR CREDIT LIFE INSURANCE'
    },
    {
        id: 6,
        description: 'DESIRED STANDY BY FUNDS TO PAY OFF FUNERAL AND MEDICAL EXPENSES'
    },
    {
        id: 7,
        description: 'UNFUNDED EDUCATIONAL NEEDS'
    },
    {
        id: 8,
        description: 'GIFT TO PARENTS'
    },
]

const lifeInsuranceCovList = [
    {
        id: 3,
        description: 'SSS/GSIS BENEFIT'
    },
    {
        id: 4,
        description: 'COMPANY BENEFIT'
    }
]

const FamilyProtectionFinancialNeedsAnalysisPage = ({ params }) => {
    const { clientID } = params
    const [fpfnaData, setFPNAData] = useState([])
    const [inputData, setInputData] = useState([])
    const [inputFPSolutionData, setInputFPSolutionData] = useState([])
    const [inputClientToDos, setInputClientToDos] = useState([
        {
            todos_id: 0,
            todos_forClientAgent: 1,
            todo: '',
            date_todo: '',
        }
    ])
    const [inputAgentToDos, setInputAgentToDos] = useState([
        {
            todos_id: 0,
            todos_forClientAgent: 2,
            todo: '',
            date_todo: '',
        }
    ])
    const [inputDebtsExpenseData, setInputDebtsExpenseData] = useState([])
    const [inputDebtsExpenseOthersData, setInputDebtsExpenseOthersData] = useState([])
    const [inputExistingLifeInsuranceData, setInputExistingLifeInsuranceData] = useState([])
    const [inputExistingLifeInsuranceOthersData, setInputExistingLifeInsuranceOthersData] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState('')
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [selectedFinancialPriority, setSelectedFinancialPriority] = useState([])
    const [cashFlowListOutflow, setCashFlowListOutflow] = useState([])

    useEffect(() => {
        fetchFPFNAList()
        fetchSelectedFinancialPriority()
        fetchCashFlowListOutflow()
    }, [])

    const fetchFPFNAList = async () => {
        try {
            const res = await api.getFPFNAList(parseInt(clientID));
            setFPNAData(res?.Family_Protection_FNA.data)
        } catch (error) {
            console.error("Error fetching data from the API FETCH FPFNA: ", error);
        }
    }

    const fetchSelectedFinancialPriority = async () => {
        try {
            const res = await api.getSelectedFinancialPriority(clientID);

            setSelectedFinancialPriority(res?.Selected_Financial_Priorities.find((item) => item.fplist_id === 1))
        } catch (error) {
            console.error("Error fetching data from the API FETCH SELECTED FINANCIAL PRIORITY LIST: ", error);
        }
    }

    const fetchCashFlowListOutflow = async () => {
        try {
            const res = await api.getCashFlowList(1, clientID);

            setCashFlowListOutflow(res?.Family_Cash_Flow_Analysis)
        } catch (error) {
            console.error("Error fetching data from the API FETCH CASH FLOW LIST: ", error);
        }
    }

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleInputChange = (e, index, options, id) => {
        setSubmitButtonDisabled(false)
        const { value, name } = e.target

        if (options === 'inputData') setInputData({ ...inputData, [name]: value })

        //Financial Plan Solutions
        if (options === 'inputFPSolutionData') setInputFPSolutionData({ ...inputFPSolutionData, [name]: value })

        //Debts and Final Expenses
        if (options === 'debtsExpenses') {

            // Make a copy of the existing formData array
            const updatedFormData = [...inputDebtsExpenseData];

            // Check if formData already has an item with the same sfp_id
            const existingItemIndex = inputDebtsExpenseData.findIndex((item) => item.debFinList_id === id);

            if (existingItemIndex !== -1) {
                // If an item with the same sfp_id exists, update its values
                updatedFormData[existingItemIndex][name] = value;
            } else {
                // If an item with the same sfp_id doesn't exist, create a new object and push it
                const newItem = {
                    debFin_id: 0,
                    debFinList_id: id,
                    debFinList_description: '',
                    amount_on_client: 0,
                    amount_on_spouse: 0,
                };

                // Update the value of the specified property in the object
                newItem[name] = value;

                // Push the new object to the array
                updatedFormData.push(newItem);
            }

            // Update the state with the new formData
            setInputDebtsExpenseData(updatedFormData);
        }
        if (options === 'debtsExpensesOthers') {
            let data = [...inputDebtsExpenseOthersData];
            data[index][name] = value;
            setInputDebtsExpenseOthersData(data);
        }

        //Existing Life Insurance Coverage

        if (options === 'existingLifeInsurance') {

            // Make a copy of the existing formData array
            const updatedFormData = [...inputExistingLifeInsuranceData];

            // Check if formData already has an item with the same sfp_id
            const existingItemIndex = inputExistingLifeInsuranceData.findIndex((item) => item.exLifeInsCovList_id === id);

            if (existingItemIndex !== -1) {
                // If an item with the same sfp_id exists, update its values
                updatedFormData[existingItemIndex][name] = value;
            } else {
                // If an item with the same sfp_id doesn't exist, create a new object and push it
                const newItem = {
                    exLifeInsCov_id: 0,
                    exLifeInsCovList_id: id,
                    exLifeInsCovList_description: '',
                    amount_on_client: 0,
                    amount_on_spouse: 0,
                };

                // Update the value of the specified property in the object
                newItem[name] = value;

                // Push the new object to the array
                updatedFormData.push(newItem);
            }

            // Update the state with the new formData
            setInputExistingLifeInsuranceData(updatedFormData);
        }
        if (options === 'existingLifeInsuranceOthers') {
            let data = [...inputExistingLifeInsuranceOthersData];
            data[index][name] = value;
            setInputExistingLifeInsuranceOthersData(data);
        }

        if (options === 'clientToDos') {
            let data = [...inputClientToDos];
            data[index][name] = value;
            setInputClientToDos(data);
        }

        if (options === 'agentToDos') {
            let data = [...inputAgentToDos];
            data[index][name] = value;
            setInputAgentToDos(data);
        }
    }

    const handleAddInputForm = (options) => {
        if (options === 'debtsExpensesOthers') {
            const debtsExpensesOthers = {
                debFin_id: 0,
                debFinList_id: 0,
                debFinList_description: '',
                amount_on_client: 0,
                amount_on_spouse: 0,
            }
            setInputDebtsExpenseOthersData([...inputDebtsExpenseOthersData, debtsExpensesOthers])
        }

        if (options === 'existingLifeInsuranceOthers') {
            const lifeInsuranceOthers = {
                exLifeInsCov_id: 0,
                exLifeInsCovList_id: 0,
                exLifeInsCovList_description: '',
                amount_on_client: 0,
                amount_on_spouse: 0,
            }
            setInputExistingLifeInsuranceOthersData([...inputExistingLifeInsuranceOthersData, lifeInsuranceOthers])
        }

        if (options === 'clientToDos') {
            const toDosClientData = {
                todos_id: 0,
                todos_forClientAgent: 1,
                todo: '',
                date_todo: '',
            }
            setInputClientToDos([...inputClientToDos, toDosClientData])
        }

        if (options === 'agentToDos') {
            const toDosAgentData = {
                todos_id: 0,
                todos_forClientAgent: 2,
                todo: '',
                date_todo: '',
            }
            setInputAgentToDos([...inputAgentToDos, toDosAgentData])
        }

    }

    const removeOtherInputFields = (index, options) => {
        if (options === 'debtsExpensesOthers') {
            let debtsExpenseData = [...inputDebtsExpenseOthersData];
            debtsExpenseData.splice(index, 1)
            setInputDebtsExpenseOthersData(debtsExpenseData)
        }

        if (options === 'existingLifeInsuranceOthers') {
            let lifeInsuranceData = [...inputExistingLifeInsuranceOthersData];
            lifeInsuranceData.splice(index, 1)
            setInputExistingLifeInsuranceOthersData(lifeInsuranceData)
        }

        if (options === 'clientToDos') {
            let toDosClientData = [...inputClientToDos];
            toDosClientData.splice(index, 1)
            setInputClientToDos(toDosClientData)
        }

        if (options === 'agentToDos') {
            let toDosAgentData = [...inputAgentToDos];
            toDosAgentData.splice(index, 1)
            setInputAgentToDos(toDosAgentData)
        }
    }

    const submitData = async (e, submitType) => {

        let submitDebtsEpenseData = [...inputDebtsExpenseData]
        if (inputDebtsExpenseOthersData.length !== 0) {
            submitDebtsEpenseData.push(...inputDebtsExpenseOthersData)
        }

        let submitExistingLifeInsuranceCov = [...inputExistingLifeInsuranceData]

        if (inputExistingLifeInsuranceOthersData.length !== 0) {
            submitExistingLifeInsuranceCov.push(...inputExistingLifeInsuranceOthersData)
        }

        let clientTodosFilteredData = inputClientToDos.filter((item) => item.todo !== '' && item.date_todo !== '');
        let agentTodosFilteredData = inputAgentToDos.filter((item) => item.todo !== '' && item.date_todo !== '');
        let toDosData = clientTodosFilteredData
        if (agentTodosFilteredData.length !== 0) {
            toDosData.push(...agentTodosFilteredData)
        }

        let fpfnaData =
            [
                {
                    "data":
                        [
                            [
                                { "fpfna_id": 0 },
                                { "selected_financial_priority_id": selectedFinancialPriority.sfp_id }, // if 0, no Selected and Added Financial Priority yet.
                                { "selected_financial_priority_rank": selectedFinancialPriority.rank },
                                { "reason_family_protect_important": inputData.family_protect_important ?? selectedFinancialPriority.reason },
                                { "financial_impact_deceased": inputData.financial_impact_disceased ?? '' },
                                { "average_infla_rate": inputData.average_infla_rate ?? 0 },
                                { "annual_outflows_cl": inputData.annual_outflows_cl ?? sumOfCfdaClientAmountExpense * 12 },
                                { "annual_outflows_sp": inputData.annual_support_from_sp ?? sumOfCfdaSpouseAmountExpense * 12 },
                                { "years_family_support": inputData.years_family_support ?? 0 },
                                { "annual_support_from_cl": inputData.annual_support_from_cl ?? 0 },
                                { "annual_support_from_sp": inputData.annual_support_from_sp ?? 0 },
                                { "years_support_cl": inputData.years_support_cl ?? 0 },
                                { "years_support_sp": inputData.years_support_sp ?? 0 },
                                { "addx_life_insurance_cl": inputData.addx_life_insurance_cl ?? 0 },
                                { "addx_life_insurance_sp": inputData.addx_life_insurance_sp ?? 0 }
                            ]
                        ]
                },
                {
                    "debts_and_final_expenses": submitDebtsEpenseData.map((item) => (
                        [
                            { "debFin_id": item.debFin_id },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                            { "client_id": clientID },
                            { "debFinList_id": item.debFinList_id },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                            { "debFinList_description": item.debFinList_description }, // include value if debFinList_id is 0
                            { "amount_on_client": item.amount_on_client },
                            { "amount_on_spouse": item.amount_on_spouse }
                        ]
                    ))
                },
                {
                    "existing_life_insurance_coverage": submitExistingLifeInsuranceCov.map((item) => (
                        [
                            { "exLifeInsCov_id": item.exLifeInsCov_id },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                            { "client_id": clientID },
                            { "exLifeInsCovList_id": item.exLifeInsCovList_id },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                            { "exLifeInsCovList_description": item.exLifeInsCovList_description },
                            { "amount_on_client": item.amount_on_client },
                            { "amount_on_spouse": item.amount_on_spouse }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": agent_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        let fpSolutionData = [
            {
                "data": [[
                    { "plansol_id": 0 }, // Make it zero to add this record for the first time.
                    { "monthy_budget1": inputFPSolutionData.monthly_budget1 },
                    { "monthy_budget2": inputFPSolutionData.monthly_budget2 },
                    { "actual_net_cash_flow1": inputFPSolutionData.actual_net_cash_flow1 ?? 0 }, // put 0 if none because this field is somehow required
                    { "actual_net_cash_flow2": inputFPSolutionData.actual_net_cash_flow2 ?? 0 }, // put 0 if none because this field is somehow required
                    { "advisor_suggestion": inputFPSolutionData.advisor_suggestion ?? '' },
                    { "status": inputFPSolutionData.status },
                    { "goal_review": inputFPSolutionData.goal_review },
                    { "meet_advisor_on": inputFPSolutionData.meet_advisor_on } // yyyy-mm-dd
                ]]
            },
            {
                "todos": toDosData.map((item) => (
                    [
                        { "todos_id": item.todos_id },
                        { "todos_forClientAgent": item.todos_forClientAgent }, // 1 - Client, 2 - Agent
                        { "todo": item.todo },
                        { "date_todo": item.date_todo } // yyyy-mm-dd
                    ]
                ))
            },
            { "client_id": 8 },
            { "fromTable": "Family Protection - FNA" },
            {
                "web_user":
                    [
                        [
                            { "user_id": 2 },
                            { "user_token": "69dj1029ufmakwjd2190udj01i2ndokanskgawjkid019250912jfgiygj0sada0xa0m13k2mgawkh2i1e01dmazggjwaawd" }
                        ]
                    ]
            }
        ]

        if (submitType === 'fpfna') {
            setSubmitLoading('fpfna')
            const resFPFNA = await axios.post(`${API_BASE_URL}/familyProtectionFNA`, fpfnaData);
            if (resFPFNA.status === 200) {
                setSubmitLoading('success')
                setSubmitButtonDisabled(true)
                alert('Family Protection FNA Successfully Saved!')
            }
        }

        if (submitType === 'fpSolutions') {
            setSubmitLoading('fpSolutions')
            const resFPSolutions = await axios.post(`${API_BASE_URL}/financialPlanningSolutions`, fpSolutionData);
            if (resFPSolutions.status === 200) {
                setSubmitLoading('success')
                setSubmitButtonDisabled(true)
                alert('Financial Planning Solutions Successfully Saved!')
            }
        }

        if (submitType === 'submitAll') {
            setSubmitLoading('submitAll')
            const resFPFNA = await axios.post(`${API_BASE_URL}/familyProtectionFNA`, fpfnaData);
            const resFPSolutions = await axios.post(`${API_BASE_URL}/financialPlanningSolutions`, fpSolutionData);
            if (resFPFNA.status === 200 && resFPSolutions.status === 200) {
                setSubmitLoading('success')
                setSubmitButtonDisabled(true)
                alert('Family Protection FNA Successfully Saved!')
                alert('Financial Planning Solutions Successfully Saved!')
            }
        }
    }

    //OUTFLOW
    const sumOfCfdaClientAmountExpense = cashFlowListOutflow.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
        const cfdaClientAmount = cashFlow.Cash_Flow_Data?.cfda_client_amount_expense || 0;
        return sum + cfdaClientAmount;
    }, 0);

    //Calculate all cfda_spouse_amount_expense
    const sumOfCfdaSpouseAmountExpense = cashFlowListOutflow.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
        const cfdaSpouseAmount = cashFlow.Cash_Flow_Data?.cfda_spouse_amount_expense || 0;
        return sum + cfdaSpouseAmount;
    }, 0);

    //Calculate Debts and Funal Expense
    const sumOfDebtsAndFinalClientAmount = fpfnaData.Debts_And_Final_Expenses_in_List?.data.reduce((sum, item) => {
        const clientAmount = parseInt(item.Debts_And_Final_Expenses.amount_on_client) || 0;
        return sum + clientAmount;
    }, 0);

    const sumOfDebtsAndFinalSpouseAmount = fpfnaData.Debts_And_Final_Expenses_in_List?.data.reduce((sum, item) => {
        const spouseAmount = parseInt(item.Debts_And_Final_Expenses.amount_on_spouse) || 0;
        return sum + spouseAmount;
    }, 0);

    //Calculate Debts and Final Expenses RealTime with input data 
    let dataDebtsAndFinal = [...inputDebtsExpenseData, ...inputDebtsExpenseOthersData]

    const sumOfDebtsAndFinalClientAmountOnChange = dataDebtsAndFinal.reduce((sum, item) => {
        const clientAmount = parseInt(item.amount_on_client) || 0;
        return sum + clientAmount;
    }, 0);

    const sumOfDebtsAndFinalSpouseAmountOnChange = dataDebtsAndFinal.reduce((sum, item) => {
        const spouseAmount = parseInt(item.amount_on_spouse) || 0;
        return sum + spouseAmount;
    }, 0);

    //Calculate Debts and Funal Expense
    const sumOfExistingInsuranceClientAmount = fpfnaData.Existing_Life_Insurance_Coverage_in_List?.data.reduce((sum, item) => {
        const clientAmount = parseInt(item.Existing_Life_Insurance_Coverage.amount_on_client) || 0;
        return sum + clientAmount;
    }, 0);

    const sumOfExistingInsuranceSpouseAmount = fpfnaData.Existing_Life_Insurance_Coverage_in_List?.data.reduce((sum, item) => {
        const spouseAmount = parseInt(item.Existing_Life_Insurance_Coverage.amount_on_spouse) || 0;
        return sum + spouseAmount;
    }, 0);

    //Calculate Existing Life Insurance Coverage Realtime with input data
    let dataExistingLifeInsurance = [...inputExistingLifeInsuranceData, ...inputExistingLifeInsuranceOthersData]

    const sumOfExistingInsuranceClientAmountOnChange = dataExistingLifeInsurance.reduce((sum, item) => {
        const clientAmount = parseInt(item.amount_on_client) || 0;
        return sum + clientAmount;
    }, 0);

    const sumOfExistingInsuranceSpouseAmountOnChange = dataExistingLifeInsurance.reduce((sum, item) => {
        const spouseAmount = parseInt(item.amount_on_spouse) || 0;
        return sum + spouseAmount;
    }, 0);

    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
                <p className="mt-2 text-sm">
                    Life insurance is crucial for family protection as it provides financial support to your loved ones in the event of your death. It replaces lost income, pays off debts, covers funeral expenses, and helps with future expenses like education. It ensures that your family can maintain their standard of living and have peace of mind during difficult times.
                </p>
            </div>
            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">
                FAMILY PROTECTION- FINANCIAL NEEDS ANALYSIS
            </div>

            <div className='mt-2 flex flex-col'>
                <label className="uppercase font-semibold" htmlFor="family_protect_important">
                    Family Protection/ Clean up fund is important to me because
                </label>
                <textarea
                    className="mt-2 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="Type your answer here"
                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].family_protection_important : selectedFinancialPriority.reason ?? ''}
                    name='family_protect_important'
                    id="family_protect_important"
                    rows={4}
                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                />
            </div>

            <div className='mt-8 flex flex-col'>
                <label className="uppercase font-semibold" htmlFor="financial_impact_disceased">
                    If in the event that you untimely pass away, what would be the financial impact of this event to your family?
                </label>
                <textarea
                    className="mt-2 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="Type your answer here"
                    name='financial_impact_disceased'
                    rows={4}
                    id="financial_impact_disceased"
                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].financial_impact_disceased : ''}
                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                />
            </div>

            <div className='mt-8 w-full'>
                <div className='bg-gray-200 p-2'>
                    {/* LIFE INSURANCE COVERAGE FOR LIVING EXPENSES */}
                    <div>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4 flex items-center justify-center gap-4">
                            LIFE INSURANCE COVERAGE FOR LIVING EXPENSES <FaSyncAlt />
                        </div>

                        <div className='mt-4'>
                            <div className='grid grid-cols-3 gap-4 items-center'>
                                <label className="uppercase font-semibold text-right" htmlFor="average_infla_rate">AVERAGE INFLATION RATE</label>
                                <input
                                    className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                    placeholder="Inflation Rate"
                                    type='number'
                                    name='average_infla_rate'
                                    id="average_infla_rate"
                                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].average_infla_rate : ''}
                                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                />
                            </div>
                        </div>

                        <div className='mt-4'>
                            <div className="overflow-x-auto ">
                                <table className="table-fixed mx-auto">
                                    <thead className="">
                                        <tr className="text-sm">
                                            <td className="px-4 py-2 font-medium text-gray-900"></td>
                                            <td className="px-4 py-2 font-medium text-gray-900 text-center">Name of Client</td>
                                            <td className="px-4 py-2 font-medium text-gray-900 text-center">Spouse</td>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                Total Annual Cash Outflows
                                            </td>
                                            <td className="p-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                    name='annual_outflows_cl'
                                                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].annual_outflows_cl : sumOfCfdaClientAmountExpense ? (sumOfCfdaClientAmountExpense * 12) : 0}
                                                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                                />
                                            </td>
                                            <td className="p-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                    name='annual_outflows_sp'
                                                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].annual_outflows_sp : sumOfCfdaSpouseAmountExpense ? (sumOfCfdaSpouseAmountExpense * 12) : 0}
                                                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                                />
                                            </td>
                                            <td>
                                                {/* Go to Cash Outflow */}
                                                <Link
                                                    href={`/admin/clients/cash-flow/cash-outflow/${clientID}`}
                                                >
                                                    <AiFillCalculator className='cursor-pointer text-green-900' size={25} />

                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                NO. OF YEARS YOUR FAMILY NEEDS YOUR SUPPORT (AVERAGE OF 10 YRS OR 23 MINUS AGE OF THE YOUNGEST CHILD WHICHEVER IS LONGER
                                            </td>
                                            <td colSpan={2} className="p-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    className='w-full rounded border border-gray-300 p-2'
                                                    name='years_family_support'
                                                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].years_family_support : ''}
                                                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                                />
                                            </td>
                                        </tr>
                                        <tr className='font-bold'>
                                            <td className="px-4 py-2 text-gray-900">
                                                TOTAL LIFE INSURANCE COVERAGE NEEDED FOR FAMILY LIVING EXPENSES</td>
                                            {fpfnaData.Family_Protection_FNA?.data.length !== 0 ?
                                                <>
                                                    <td className="px-4 py-2 text-gray-700">
                                                        ₱ {(fpfnaData.Family_Protection_FNA?.data[0].annual_outflows_cl * fpfnaData.Family_Protection_FNA?.data[0].years_family_support)?.toLocaleString('en-US')}
                                                    </td>
                                                    <td className="px-4 py-2 text-gray-700">
                                                        ₱ {(fpfnaData.Family_Protection_FNA?.data[0].annual_outflows_sp * fpfnaData.Family_Protection_FNA?.data[0].years_family_support)?.toLocaleString('en-US')}
                                                    </td>
                                                </>
                                                :
                                                <>
                                                    <td className="px-4 py-2 text-gray-700">
                                                        ₱ {(inputData.annual_outflows_cl ? (parseInt(inputData.annual_outflows_cl) * parseInt(inputData.years_family_support) ?? 0) : ((sumOfCfdaClientAmountExpense * 12) * parseInt(inputData.years_family_support ?? 0)))?.toLocaleString('en-US')}
                                                    </td>
                                                    <td className="px-4 py-2 text-gray-700">
                                                        ₱ {(inputData.annual_outflows_sp ? (parseInt(inputData.annual_outflows_sp) * parseInt(inputData.years_family_support) ?? 0) : ((sumOfCfdaSpouseAmountExpense * 12) * parseInt(inputData.years_family_support ?? 0)))?.toLocaleString('en-US')}
                                                    </td>
                                                </>

                                            }
                                        </tr>

                                        {/* LIFE INSURANCE COVERAGE FOR SUPPORT GIVEN TO OTHERS (EX. NEPHEWS/NIECES, MISSIONARIES) */}
                                        <tr>
                                            <td colSpan={3} className='text-center'>
                                                <div className="text-sm font-bold text-slate-600 uppercase mt-4">
                                                    LIFE INSURANCE COVERAGE FOR SUPPORT GIVEN TO OTHERS (EX. NEPHEWS/NIECES, MISSIONARIES)
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                ANNUAL SUPPORT GIVEN
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                    name='annual_support_from_cl'
                                                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].annual_support_from_cl : ''}
                                                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                    name='annual_support_from_sp'
                                                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].annual_support_from_sp : ''}
                                                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                NO. OF YEARS YOU PLAN TO CONTINUE GIVING SUPPORT AFTER YOU'RE GONE
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                    name='years_support_cl'
                                                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].years_support_cl : ''}
                                                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                    name='years_support_sp'
                                                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].years_support_sp : ''}
                                                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                                />
                                            </td>
                                        </tr>
                                        <tr className='font-bold'>
                                            <td className="px-4 py-2 text-gray-900">
                                                TOTAL LIFE INSURANCE COVERAGE NEEDED FOR SUPPORT GIVEN TO OTHERS
                                            </td>
                                            {fpfnaData.Family_Protection_FNA?.data.length !== 0 ?
                                            <>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ {(fpfnaData.Family_Protection_FNA?.data[0].annual_support_from_cl * fpfnaData.Family_Protection_FNA?.data[0].years_support_cl)?.toLocaleString('en-US')}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ {(fpfnaData.Family_Protection_FNA?.data[0].annual_support_from_sp * fpfnaData.Family_Protection_FNA?.data[0].years_support_sp)?.toLocaleString('en-US')}
                                                </td>
                                            </>
                                            :
                                            <>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ {(inputData.annual_support_from_cl ? parseInt(inputData.annual_support_from_cl) * (inputData.years_support_cl ? parseInt(inputData.years_support_cl) : 1) : 0)?.toLocaleString('en-US')}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ {(inputData.annual_support_from_sp ? parseInt(inputData.annual_support_from_sp) * (inputData.years_support_sp ? parseInt(inputData.years_support_sp) : 1) : 0)?.toLocaleString('en-US')}
                                                </td>
                                            </>


                                            }
                                        </tr>

                                        {/* ONE TIME NEEDS TO CLEAR OUT DEBTS AND FINAL EXPENSES */}
                                        <tr>
                                            <td colSpan={3} className='text-center'>
                                                <div className="text-sm font-bold text-slate-600 uppercase mt-4 text-center">
                                                    ONE TIME NEEDS TO CLEAR OUT DEBTS AND FINAL EXPENSES
                                                </div>
                                            </td>
                                        </tr>

                                        {debtsAndFinalList.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-2 font-medium text-gray-900">
                                                    {item.description}
                                                </td>
                                                <td className="whitespace-nowrap p-2 text-gray-700">
                                                    ₱ <input
                                                        type="number"
                                                        className='w-32 rounded border border-gray-300 p-2'
                                                        name='amount_on_client'
                                                        defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Debts_And_Final_Expenses_in_List?.data[idx].Debts_And_Final_Expenses.amount_on_client : ''}
                                                        onChange={(e) => handleInputChange(e, idx, 'debtsExpenses', item.id)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap p-2 text-gray-700">
                                                    ₱ <input
                                                        type="number"
                                                        className='w-32 rounded border border-gray-300 p-2'
                                                        name='amount_on_spouse'
                                                        defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Debts_And_Final_Expenses_in_List?.data[idx].Debts_And_Final_Expenses.amount_on_spouse : ''}
                                                        onChange={(e) => handleInputChange(e, idx, 'debtsExpenses', item.id)}
                                                    />
                                                </td>
                                                {idx === 0 &&
                                                    <td>
                                                        {/* Go to Cash Networth Inventory */}
                                                        <Link
                                                            href={`/admin/clients/networth-inventory-summary/networth-inventory/${clientID}`}
                                                        >
                                                            <AiFillCalculator className='cursor-pointer text-green-900' size={25} />
                                                        </Link>
                                                    </td>
                                                }
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={3} className='px-4 py-2'>
                                                <MdLibraryAdd className='cursor-pointer' size={20} onClick={() => handleAddInputForm('debtsExpensesOthers')} />
                                            </td>
                                        </tr>

                                        {/* Input debts others  form */}
                                        {inputDebtsExpenseOthersData.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    <input
                                                        type="text"
                                                        className='rounded border border-gray-300 p-2'
                                                        name='debFinList_description'
                                                        value={item.debFinList_description}
                                                        onChange={(e) => handleInputChange(e, idx, 'debtsExpensesOthers', 0)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    <input
                                                        type="number"
                                                        className='w-32 rounded border border-gray-300 p-2'
                                                        name='amount_on_client'
                                                        value={item.amount_on_client}
                                                        onChange={(e) => handleInputChange(e, idx, 'debtsExpensesOthers', 0)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input
                                                    type="number"
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                    name='amount_on_spouse'
                                                    value={item.amount_on_spouse}
                                                    onChange={(e) => handleInputChange(e, idx, 'debtsExpensesOthers', 0)}
                                                /></td>
                                                <td>
                                                    <button
                                                        onClick={() => removeOtherInputFields(idx, 'debtsExpensesOthers')}
                                                        className="group relative inline-block text-xs mb-2 text-red-600 focus:outline-none focus:ring active:text-red-500"
                                                    >
                                                        <span
                                                            className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                                        ></span>

                                                        <span className="relative block border border-current bg-white py-1 px-3 cursor-pointer">  Delete </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        <tr className='font-bold'>
                                            <td className="px-4 py-2 text-gray-900">
                                                TOTAL LIFE INSURANCE COVERAGE NEEDED
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ {(sumOfDebtsAndFinalClientAmountOnChange ? sumOfDebtsAndFinalClientAmountOnChange : sumOfDebtsAndFinalClientAmount)?.toLocaleString('en-US')}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ {(sumOfDebtsAndFinalSpouseAmountOnChange ? sumOfDebtsAndFinalSpouseAmountOnChange : sumOfDebtsAndFinalSpouseAmount)?.toLocaleString('en-US')}
                                            </td>
                                        </tr>

                                        {/* EXISTING LIFE INSURANCE COVERAGE */}
                                        <tr>
                                            <td colSpan={3}>
                                                <div className="text-sm px-4 py-2 font-bold text-slate-600 uppercase mt-8 ">
                                                    EXISTING LIFE INSURANCE COVERAGE
                                                </div>
                                            </td>
                                        </tr>

                                        {lifeInsuranceCovList.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-2 font-medium text-gray-900">
                                                    {item.description}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ <input
                                                        type="number"
                                                        className='w-32 rounded border border-gray-300 p-2'
                                                        name='amount_on_client'
                                                        defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Existing_Life_Insurance_Coverage_in_List?.data[idx].Existing_Life_Insurance_Coverage.amount_on_client : ''}
                                                        onChange={(e) => handleInputChange(e, idx, 'existingLifeInsurance', item.id)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ <input
                                                        type="number"
                                                        className='w-32 rounded border border-gray-300 p-2'
                                                        name='amount_on_spouse'
                                                        defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Existing_Life_Insurance_Coverage_in_List?.data[idx].Existing_Life_Insurance_Coverage.amount_on_spouse : ''}
                                                        onChange={(e) => handleInputChange(e, idx, 'existingLifeInsurance', item.id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}

                                        <tr>
                                            <td colSpan={3} className='px-4 py-2'>
                                                <MdLibraryAdd className='cursor-pointer' size={20} onClick={() => handleAddInputForm('existingLifeInsuranceOthers')} />
                                            </td>
                                        </tr>

                                        {inputExistingLifeInsuranceOthersData.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ <input
                                                        type="text"
                                                        className='rounded border border-gray-300 p-2'
                                                        name='exLifeInsCovList_description'
                                                        value={item.exLifeInsCovList_description}
                                                        onChange={(e) => handleInputChange(e, idx, 'existingLifeInsuranceOthers', 0)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ <input
                                                        type="number"
                                                        className='w-32 rounded border border-gray-300 p-2'
                                                        name='amount_on_client'
                                                        value={item.amount_on_client}
                                                        onChange={(e) => handleInputChange(e, idx, 'existingLifeInsuranceOthers', 0)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ <input
                                                        type="number"
                                                        className='w-32 rounded border border-gray-300 p-2'
                                                        name='amount_on_spouse'
                                                        value={item.amount_on_spouse}
                                                        onChange={(e) => handleInputChange(e, idx, 'existingLifeInsuranceOthers', 0)}
                                                    /></td>
                                                <td>
                                                    <button
                                                        onClick={() => removeOtherInputFields(idx, 'existingLifeInsuranceOthers')}
                                                        className="group relative inline-block text-xs mb-2 text-red-600 focus:outline-none focus:ring active:text-red-500"
                                                    >
                                                        <span
                                                            className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                                        ></span>

                                                        <span className="relative block border border-current bg-white py-1 px-3 cursor-pointer">  Delete </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        <tr className='font-bold'>
                                            <td className="px-4 py-2 text-gray-900">
                                                TOTAL LIFE INSURANCE COVERAGE (NON-GOVERNMENT & NON COMPANY PAID)
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ 0
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ 0
                                            </td>
                                        </tr>
                                        <tr className='font-bold'>
                                            <td className="px-4 py-2 text-gray-900">
                                                TOTAL EXISTING LIFE INSURANCE COVERAGE
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ {(sumOfExistingInsuranceClientAmountOnChange ? sumOfExistingInsuranceClientAmountOnChange : sumOfExistingInsuranceClientAmount)?.toLocaleString('en-US')}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ {(sumOfExistingInsuranceSpouseAmountOnChange ? sumOfExistingInsuranceSpouseAmountOnChange : sumOfExistingInsuranceSpouseAmount)?.toLocaleString('en-US')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-bold text-gray-900">
                                                ADDITIONAL LIFE INSURANCE COVERAGE NEEDED
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                    name='addx_life_insurance_cl'
                                                    defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].addx_life_insurance_cl : ''}
                                                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input
                                                type="number"
                                                className='w-32 rounded border border-gray-300 p-2'
                                                name='addx_life_insurance_sp'
                                                defaultValue={fpfnaData.Family_Protection_FNA?.data.length !== 0 ? fpfnaData.Family_Protection_FNA?.data[0].addx_life_insurance_sp : ''}
                                                onChange={(e) => handleInputChange(e, 0, 'inputData')}
                                            /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-8'>
                <FinancialPlanningSolutions handleInputChange={handleInputChange} inputClientToDos={inputClientToDos} inputAgentToDos={inputAgentToDos} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} />
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
                        onClick={openModal}
                        disabled={submitButtonDisabled}
                        className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                    >
                        Submit
                    </button>
                </div>
            </div>

            <SubmitModalFNA isOpen={isModalOpen} onClose={closeModal} submitData={submitData} submitLoading={submitLoading} submitButtonDisabled={submitButtonDisabled} />

        </div>
    )
}

export default FamilyProtectionFinancialNeedsAnalysisPage