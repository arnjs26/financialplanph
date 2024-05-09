'use client'
import { API_BASE_URL, api, webUser } from '@/app/lib/libapi';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaSpinner, FaSyncAlt } from "react-icons/fa";
import { MdLibraryAdd, MdRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const TargetBudgetCashOutflowPage = ({ params }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const agent_id = useSelector((state) => state.StateController.agent_id);
    const token = useSelector((state) => state.StateController.token)
    const { clientID } = params
    const [cashFlowList, setCashFlowList] = useState([])
    const [spouseDetails, setSpouseDetails] = useState('')
    const [clientDetails, setClientDetails] = useState({})
    const [inputRecommendations, setInputRecommendations] = useState([{
        recommendation_id: 0,
        description: ''
    }])
    const [inputEditRecommendations, setInputEditRecommendations] = useState([])
    const [inputData, setInputData] = useState([])
    const [expectedSavings, setExpectedSavings] = useState([]);
    const [goesWell, setGoesWell] = useState([]);
    const [showOthersAddForm, setShowOthersAddForm] = useState(false)
    const [inputOthers, setInputOthers] = useState([
        {
            cfl_id: 0,
            cfl_description: '',
            isWant: 0,
            cfda_client_amount_expense: 0,
            cfda_spouse_amount_expense: 0,
            cfdb_client_amount: 0,
            cfdb_spouse_amount: 0,
        }
    ])
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [showInputRecommendations, setShowInputRecommendations] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [unsavedEditError, setUnsavedEditError] = useState(false)

    useEffect(() => {
        fetchCashFlowList()
    }, [])

    const fetchCashFlowList = async () => {
        try {
            const res = await api.getCashFlowList(1, clientID);

            setCashFlowList(res?.Family_Cash_Flow_Analysis)
            setSpouseDetails(res.Family_Cash_Flow_Analysis.Spouse_FN)
            setClientDetails(res.Family_Cash_Flow_Analysis.Client_FN)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching data from the API FETCH CASH FLOW LIST: ", error);
        }
    }

    const handleChangeInput = (e, cfl_id, cfd_id, cfda_client_amount_expense, cfda_spouse_amount_expense, cfl_description, isWant) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)
        const { name, value, checked } = e.target;

        // Make a copy of the existing inputData array
        const updatedFormData = [...inputData];

        // Check if inputData already has an item with the same cfl_id
        const existingItemIndex = inputData.findIndex((item) => item.cfl_id === cfl_id);

        if (existingItemIndex !== -1) {
            // If an item with the same cfl_id exists, update its values
            if (name == 'isWant') {
                if (checked) {
                    updatedFormData[existingItemIndex][name] = value;
                }
                if (!checked) {
                    updatedFormData[existingItemIndex][name] = 0;
                }
            } else {
                updatedFormData[existingItemIndex][name] = value;
            }
        } else {
            // If an item with the same cfl_id doesn't exist, create a new object and push it
            const newItem = {
                cfl_id,
                cfd_id,
                cfl_description,
                isWant,
                cfda_client_amount_expense,
                cfda_spouse_amount_expense,
                cfdb_client_amount: 0,
                cfdb_spouse_amount: 0,
                cfdb_total: 0
            };

            // Update the value of the specified property in the object
            newItem[name] = value;

            // Push the new object to the array
            updatedFormData.push(newItem);
        }

        // Calculate total
        updatedFormData.forEach(item => {
            item.cfdb_total = parseInt(item.cfdb_client_amount) + parseInt(item.cfdb_spouse_amount);
        });

        // Update the state with the new formData
        setInputData(updatedFormData);

        // Append total inside cashFlowList.CashFlowList_Outfolw with the same cfl_id
        cashFlowList.CashFlowList_OutFlow.forEach(item => {
            if (item.cfl_id === cfl_id) {
                const formDataItem = updatedFormData.find(formDataItem => formDataItem.cfl_id === cfl_id);
                if (formDataItem) {
                    item.cfdb_total = formDataItem.cfdb_total;
                }
            }
        });
    }

    const handleChangeInputRecommendations = (e, recommendation_id) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)
        const { name, value } = e.target
        // setInputRecommendations({ ...inputRecommendations, [name]: value, 'recommendation_id': recommendation_id })

        // Make a copy of the existing formData array
        const updatedFormData = [...inputEditRecommendations];

        // Check if formData already has an item with the same sfp_id
        const existingItemIndex = inputRecommendations.findIndex((item) => item.recommendation_id === recommendation_id);

        if (existingItemIndex !== -1) {
            // If an item with the same sfp_id exists, update its values
            updatedFormData[existingItemIndex][name] = value;
        } else {
            // If an item with the same sfp_id doesn't exist, create a new object and push it
            const newItem = {
                recommendation_id,
                description: '',
            };

            // Update the value of the specified property in the object
            newItem[name] = value;

            // Push the new object to the array
            updatedFormData.push(newItem);
        }

        // Update the state with the new formData
        setInputEditRecommendations(updatedFormData);
    }

    const handleOnChangeInputNewRecommendations = (event, index) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)
        let data = [...inputRecommendations];
        data[index][event.target.name] = event.target.value;
        setInputRecommendations(data);
    }

    const handleAddRecommendation = () => {
        const newItem = {
            recommendation_id: 0,
            description: ''
        }

        setInputRecommendations([...inputRecommendations, newItem])
    }

    const removeOtherRecommendationFields = (index) => {
        let data = [...inputRecommendations];
        data.splice(index, 1)
        setInputRecommendations(data)
    }

    const handleChangeExpectedSavings = (e) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)
        const { name, value } = e.target

        setExpectedSavings({ ...expectedSavings, [name]: value })
    }

    const handleChangeGoesWell = (e) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)
        const { name, value } = e.target

        setGoesWell({ ...goesWell, [name]: value })
    }

    const handleChangeInputOthers = (event, index) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)

        let data = [...inputOthers];

        if (event.target.name === 'isWant') {
            if (event.target.checked) {
                data[index][event.target.name] = event.target.value;
            }
            if (!event.target.checked) {
                data[index][event.target.name] = 0;
            }
        } else {
            data[index][event.target.name] = event.target.value;
        }
        setInputOthers(data);
    }

    const handleAddOthers = () => {

        const newItem = {
            cfl_id: 0,
            cfl_description: '',
            isWant: 0,
            cfda_client_amount_expense: 0,
            cfda_spouse_amount_expense: 0,
            cfdb_client_amount: 0,
            cfdb_spouse_amount: 0,
        };

        setInputOthers([...inputOthers, newItem])
    }

    const removeOtherFields = (index) => {
        let data = [...inputOthers];
        data.splice(index, 1)
        setInputOthers(data)
    }

    const handleNewSubmitDataOutflow = async () => {

        let submitData = [...inputData]

        let inputOthersUpdated = inputOthers.filter((item) => {
            return item.cfl_description !== '';
        });

        let inputRecommendationsUpdated = inputRecommendations.filter((item) => {
            return item.description !== '';
        });

        if (inputEditRecommendations !== 0) inputRecommendationsUpdated.push(...inputEditRecommendations)

        if (inputOthersUpdated.length !== 0) submitData.push(...inputOthers)


        const updatedSubmitData = submitData.map((inputEditData) => {
            const matchingCFD = cashFlowList.CashFlowList_OutFlow.find(
                (item) => item.Cash_Flow_Data?.cfd_id === inputEditData.cfd_id
            );

            if (matchingCFD) {
                return {
                    ...inputEditData,
                    cfdb_client_amount: inputEditData.cfdb_client_amount !== 0 ? inputEditData.cfdb_client_amount : matchingCFD.Cash_Flow_Data.cfdb_client_amount,
                    cfdb_spouse_amount: inputEditData.cfdb_spouse_amount !== 0 ? inputEditData.cfdb_spouse_amount : matchingCFD.Cash_Flow_Data.cfdb_spouse_amount === null ? 0 : matchingCFD.Cash_Flow_Data.cfdb_spouse_amount,
                };
            }
            return inputEditData;
        });



        let data =
            [
                {
                    "data": updatedSubmitData.length !== 0 ?
                        updatedSubmitData.map((item) => (
                            [
                                { "cfl_id": item.cfl_id },
                                { "cfl_description": item.cfl_description },
                                { "cfd_id": item.cfd_id ?? 0 },  // << – Make it zero if first time to add, otherwise indicate ID to perform the update process. This applies to succeeding records.
                                { "client_id": clientID },
                                { "isWant": item.isWant ?? 0 },
                                { "cfdb_clientAmt": item.cfdb_client_amount },
                                { "cfdb_spouseAmt": item.cfdb_spouse_amount ?? 0 },
                                { "cfda_client_amount_expense": item.cfda_client_amount_expense ?? 0 },
                                { "cfda_spouse_amount_expense": item.cfda_spouse_amount_expense ?? 0 },
                            ]
                        ))
                        :
                        cashFlowList.CashFlowList_OutFlow.filter((item) => item.Cash_Flow_Data.length !== 0).map((item) => (
                            [
                                { "cfl_id": item.cfl_id },
                                { "cfl_description": item.cfl_description },
                                { "cfd_id": item.Cash_Flow_Data.cfd_id },  // << – Make it zero if first time to add, otherwise indicate ID to perform the update process. This applies to succeeding records.
                                { "client_id": clientID },
                                { "isWant": item.Cash_Flow_Data.isWant ?? 0 },
                                { "cfdb_clientAmt": item.Cash_Flow_Data.cfdb_client_amount ?? 0 },
                                { "cfdb_spouseAmt": item.Cash_Flow_Data.cfdb_spouse_amount ?? 0 },
                                { "cfda_client_amount_expense": item.Cash_Flow_Data.cfda_client_amount_expense ?? 0 },
                                { "cfda_spouse_amount_expense": item.Cash_Flow_Data.cfda_spouse_amount_expense ?? 0 },
                            ]
                        ))

                },
                {
                    "recommendations":
                        inputRecommendationsUpdated.length !== 0 ?
                            inputRecommendationsUpdated.map((item) => (
                                [
                                    { "recommendation_id": item.recommendation_id },
                                    { "description": item.description }
                                ]
                            ))
                            :
                            cashFlowList.Recommendations.map((item) => (
                                [
                                    { "recommendation_id": item.recommendation_id },
                                    { "description": item.description }
                                ]
                            ))
                },
                { "expected_savings": expectedSavings.length !== 0 ? expectedSavings.expected_savings : cashFlowList.Cash_Flow_Analysis[0]?.expected_savings ?? '' },
                { "goes_well": goesWell.length !== 0 ? goesWell.goes_well : cashFlowList.Cash_Flow_Analysis[0]?.goes_well ?? '' },
                { "CashFlowType": 2 },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": agent_id },
                                { "user_token": token }
                            ]
                        ]
                }
            ]

        const res = await axios.post(`${API_BASE_URL}/newCashFlowData`, data);

        if (res.status === 200) {
            toast.success("Successfully Saved");
            setUnsavedEditError(false)
            fetchCashFlowList();
            setSubmitButtonDisabled(true)
        }
    }

    //Calculate all cfda_client_amount expense
    const sumOfCfdaClientAmountExpense = cashFlowList.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
        const cfdaClientAmount = cashFlow.Cash_Flow_Data?.cfda_client_amount_expense || 0;
        return sum + cfdaClientAmount;
    }, 0);

    //Calculate all cfda_spouse_amount expense
    const sumOfCfdaSpouseAmountExpense = cashFlowList.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
        const cfdaSpouseAmount = cashFlow.Cash_Flow_Data?.cfda_spouse_amount_expense || 0;
        return sum + cfdaSpouseAmount;
    }, 0);

    //Calculate all cfdb_client_amount
    const sumOfCfdbClientAmount = cashFlowList.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
        const cfdbClientAmount = cashFlow.Cash_Flow_Data?.cfdb_client_amount || 0;
        return sum + cfdbClientAmount;
    }, 0);

    //Calculate all cfdb_spouse_amount
    const sumOfCfdbSpouseAmount = cashFlowList.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
        const cfdbSpouseAmount = cashFlow.Cash_Flow_Data?.cfdb_spouse_amount || 0;
        return sum + cfdbSpouseAmount;
    }, 0);

    //Compute Realtime Sum of Client and Spouse Budget
    let data = [...inputData, ...inputOthers]

    const sumOfCfdbClientAmountBudgetOnChange = data.reduce((sum, cashFlow) => {
        const cfdbClientAmountBudget = parseInt(cashFlow.cfdb_client_amount) || 0;
        return sum + cfdbClientAmountBudget;
    }, 0);

    const sumOfCfdbSpouseAmountBudgetOnChange = data.reduce((sum, cashFlow) => {
        const cfdaSpouseAmountExepense = parseInt(cashFlow.cfdb_spouse_amount) || 0;
        return sum + cfdaSpouseAmountExepense;
    }, 0);

    const totalOfClientAndSpouseBudgetOnchange = sumOfCfdbClientAmountBudgetOnChange + sumOfCfdbSpouseAmountBudgetOnChange

    if (isLoading) return (
        <div className={`fixed inset-0 z-50 block`}>
            <div className="fixed inset-0 bg-black opacity-5"></div>
            <div className="fixed inset-0 flex items-center justify-center ">
                Fetching Data. Please wait... &nbsp; &nbsp; &nbsp;
                <FaSpinner className="animate-spin text-green-900" size={30} />
            </div>
        </div>
    )

    return (
        <div className='mt-4 mb-4 bg-white p-2 border rounded-lg'>
            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">Family Cash Flow Annalysis</div>
            <div>
                <div className="text-base sm:py-2 font-bold text-slate-600 uppercase mt-4 flex items-center gap-4">Cash Outflow (Expenses) - Monthly <FaSyncAlt /></div>
                <div className="rounded-lg w-full ">
                    <div className="overflow-x-auto ">
                        <table className="min-w-full bg-white w-full">
                            <thead className='font-bold'>
                                {spouseDetails !== 'No Spouse' ?
                                    <tr className="text-xs">
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-900" ></td>
                                        <td className="text-center px-4 py-2 text-white w-[35%] bg-gray-500" colSpan={5}>Actual </td>
                                        <td className="text-center px-4 py-2 text-white w-[35%] bg-green-700" colSpan={5}>Budget</td>
                                    </tr>
                                    :
                                    <tr className="text-xs">
                                        <td className="text-center px-4 py-2 text-gray-900" ></td>
                                        <td className="text-center px-4 py-2 text-white w-[35%] bg-gray-500" colSpan={3}>Actual</td>
                                        <td className="text-center px-4 py-2 text-white w-[35%] bg-green-700" colSpan={3}>Budget</td>
                                    </tr>

                                }
                                <tr className="text-xs border-b-2 border-b-gray-700">
                                    <td className="p-2 text-gray-900" ></td>
                                    <td className="whitespace-nowrap p-2 text-gray-900" >Needs ?</td>
                                    <td className="p-2 text-gray-900 w-[15%] capitalize">{clientDetails.client_FirstName} {clientDetails.client_LastName} (Client)</td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <>
                                            <td className="whitespace-nowrap p-2 text-gray-900" >Needs ?</td>
                                            <td className="p-2 text-gray-900 w-[15%] capitalize">{spouseDetails.client_FirstName} {spouseDetails.client_LastName} (Spouse)</td>
                                        </>
                                    }
                                    <td className="p-2 text-gray-900 w-[10%]">Total</td>
                                    <td className="p-2 text-gray-900 w-[15%] capitalize"> {clientDetails.client_FirstName} {clientDetails.client_LastName} (Client)</td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="p-2 text-gray-900 w-[15%] capitalize">{spouseDetails.client_FirstName} {spouseDetails.client_LastName} (Spouse)</td>
                                    }
                                    <td className="p-2 text-gray-900 w-[15%]">Total</td>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {cashFlowList.CashFlowList_OutFlow?.filter((cfl) => cfl.is_other === "No")?.map((cashflow, idx) => (
                                    cashflow.Cash_Flow_Data.length !== 0 &&
                                    <tr key={idx}>
                                        {/* <td className="px-4 py-2 font-medium text-gray-900">
                                                <input
                                                    type="checkbox"
                                                    name={'isWant'}
                                                    defaultChecked={cashflow.Cash_Flow_Data.isWant === 1}
                                                    value={1}
                                                    onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description, cashflow.Cash_Flow_Data.isWant)}
                                                    className='rounded border border-gray-300 p-2'
                                                />
                                            </td> */}

                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{cashflow.cfl_description}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            <input
                                                type="checkbox"
                                                name={'isWant'}
                                                defaultChecked={cashflow.Cash_Flow_Data.isWant === 0}
                                                value={1}
                                                onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description, cashflow.Cash_Flow_Data.isWant)}
                                                className='rounded border border-gray-300 p-2'
                                            />
                                        </td>
                                        <td className="p-2 text-gray-700">
                                            ₱ {cashflow.Cash_Flow_Data.cfda_client_amount_expense?.toLocaleString('en-US')}
                                        </td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <>
                                                <td className="px-4 py-2 font-medium text-gray-900">
                                                    <input
                                                        type="checkbox"
                                                        name={'isWant'}
                                                        defaultChecked={cashflow.Cash_Flow_Data.isWant === 0}
                                                        value={1}
                                                        onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description, cashflow.Cash_Flow_Data.isWant)}
                                                        className='rounded border border-gray-300 p-2'
                                                    />
                                                </td>
                                                <td className="p-2 text-gray-700">
                                                    ₱ {cashflow.Cash_Flow_Data.cfda_spouse_amount_expense?.toLocaleString('en-US')}
                                                </td>
                                            </>
                                        }
                                        <td className="p-2 text-gray-700 font-bold">
                                            ₱ {((cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense)?.toLocaleString('en-US')) === NaN ? 0 : (cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense)?.toLocaleString('en-US')}

                                        </td>
                                        <td className="p-2 text-gray-700">
                                            ₱ <input
                                                type="number"
                                                name={'cfdb_client_amount'}
                                                defaultValue={cashflow.Cash_Flow_Data.cfdb_client_amount}
                                                onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description)}
                                                className='w-24 rounded border border-gray-300 p-2'
                                            />

                                        </td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <td className="p-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    name={'cfdb_spouse_amount'}
                                                    defaultValue={cashflow.Cash_Flow_Data.cfdb_spouse_amount}
                                                    onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description)}
                                                    className='w-24 rounded border border-gray-300 p-2' />

                                            </td>
                                        }
                                        <td className="p-2 text-gray-700 font-bold">
                                            ₱ {(cashflow.cfdb_total ? cashflow.cfdb_total : (cashflow.Cash_Flow_Data.cfdb_client_amount + cashflow.Cash_Flow_Data.cfdb_spouse_amount))?.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan={4} className="whitespace-nowrap px-4 py-5 font-bold uppercase text-gray-900 text-center">Other Expenses:</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                                    }
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"><MdLibraryAdd className='cursor-pointer text-base' onClick={() => setShowOthersAddForm(!showOthersAddForm)} /></td>
                                </tr>

                                {showOthersAddForm &&
                                    <>
                                        {inputOthers.map((item, idx) => (
                                            <tr key={idx}>
                                                {/* <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                    <input
                                                        type="checkbox"
                                                        name={'isWant'}
                                                        defaultChecked={item.isWant === 1}
                                                        value={1}
                                                        onChange={(e) => handleChangeInputOthers(e, idx)}
                                                        className='rounded border border-gray-300 p-2'
                                                    />
                                                </td> */}
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                                                    <input
                                                        type="text"
                                                        name={'cfl_description'}
                                                        value={item.cfl_description}
                                                        onChange={(e) => handleChangeInputOthers(e, idx)}
                                                        className='w-full rounded border border-gray-300 p-2' />

                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                    <input
                                                        type="checkbox"
                                                        name={'isWant'}
                                                        defaultChecked={item.isWant === 1}
                                                        value={1}
                                                        onChange={(e) => handleChangeInputOthers(e, idx)}
                                                        className='rounded border border-gray-300 p-2'
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">

                                                    ₱ <input
                                                        type="number"
                                                        name={'cfda_client_amount_expense'}
                                                        value={item.cfda_client_amount_expense}
                                                        onChange={(e) => handleChangeInputOthers(e, idx)}
                                                        className='w-24 rounded border border-gray-300 p-2' />
                                                </td>
                                                {spouseDetails !== 'No Spouse' &&
                                                    <>
                                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                            <input
                                                                type="checkbox"
                                                                name={'isWant'}
                                                                defaultChecked={item.isWant === 1}
                                                                value={1}
                                                                onChange={(e) => handleChangeInputOthers(e, idx)}
                                                                className='rounded border border-gray-300 p-2'
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                            ₱ <input
                                                                type="number"
                                                                name={'cfda_spouse_amount_expense'}
                                                                value={item.cfda_spouse_amount_expense}
                                                                onChange={(e) => handleChangeInputOthers(e, idx)}
                                                                className='w-24 rounded border border-gray-300 p-2' />
                                                        </td>
                                                    </>
                                                }
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-bold">
                                                    ₱ {(parseInt(item.cfda_client_amount_expense) + parseInt(item.cfda_spouse_amount_expense)).toLocaleString('en-US')}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ <input
                                                        type="number"
                                                        name={'cfdb_client_amount'}
                                                        value={item.cfdb_client_amount}
                                                        onChange={(e) => handleChangeInputOthers(e, idx)}
                                                        className='w-24 rounded border border-gray-300 p-2' />

                                                </td>
                                                {spouseDetails !== 'No Spouse' &&

                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                        ₱ <input
                                                            type="number"
                                                            name={'cfdb_spouse_amount'}
                                                            value={item.cfdb_spouse_amount}
                                                            onChange={(e) => handleChangeInputOthers(e, idx)}
                                                            className='w-24 rounded border border-gray-300 p-2' />
                                                    </td>
                                                }
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    <span className='font-bold'>

                                                        ₱ {(parseInt(item.cfdb_client_amount) + parseInt(item.cfdb_spouse_amount)).toLocaleString('en-US')}
                                                    </span>
                                                    <button
                                                        onClick={removeOtherFields}
                                                        className="group relative ml-2 inline-block text-xs text-red-600 focus:outline-none focus:ring active:text-red-500"
                                                    >
                                                        <span
                                                            className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                                        ></span>

                                                        <span className="relative block border border-current bg-white py-1 px-3 cursor-pointer">  Delete </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <button
                                                    onClick={handleAddOthers}
                                                    className="group relative inline-block text-xs text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                                >
                                                    <span
                                                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                                    ></span>

                                                    <span className="relative block border border-current bg-white py-1 px-3 cursor-pointer">  Add </span>
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                }

                                {/* Others */}
                                {cashFlowList.CashFlowList_OutFlow?.filter((cfl) => cfl.is_other === "Yes")?.map((cashflow, idx) => (
                                    cashflow.Cash_Flow_Data.length !== 0 &&
                                    <tr key={idx}>
                                        {/* <td className="px-4 py-2 font-medium text-gray-900">
                                            <input
                                                type="checkbox"
                                                name={'isWant'}
                                                defaultChecked={cashflow.Cash_Flow_Data.isWant === 1}
                                                value={1}
                                                onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description, cashflow.Cash_Flow_Data.isWant)}
                                                className='rounded border border-gray-300 p-2'
                                            />
                                        </td> */}
                                        <td className="px-4 py-2 font-medium text-gray-900">{cashflow.cfl_description}</td>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            <input
                                                type="checkbox"
                                                name={'isWant'}
                                                defaultChecked={cashflow.Cash_Flow_Data.isWant === 1}
                                                value={1}
                                                onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description, cashflow.Cash_Flow_Data.isWant)}
                                                className='rounded border border-gray-300 p-2'
                                            />
                                        </td>
                                        <td className="p-2 text-gray-700">
                                            ₱ {cashflow.Cash_Flow_Data.cfda_client_amount_expense?.toLocaleString('en-US')}

                                        </td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <>
                                                <td className="px-4 py-2 font-medium text-gray-900">
                                                    <input
                                                        type="checkbox"
                                                        name={'isWant'}
                                                        defaultChecked={cashflow.Cash_Flow_Data.isWant === 1}
                                                        value={1}
                                                        onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description, cashflow.Cash_Flow_Data.isWant)}
                                                        className='rounded border border-gray-300 p-2'
                                                    />
                                                </td>
                                                <td className="p-2 text-gray-700">
                                                    ₱ {cashflow.Cash_Flow_Data.cfda_spouse_amount_expense?.toLocaleString('en-US')}
                                                </td>
                                            </>
                                        }
                                        <td className="p-2 text-gray-700 font-bold">
                                            ₱ {((cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense)?.toLocaleString('en-US')) === NaN ? 0 : (cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense)?.toLocaleString('en-US')}

                                        </td>
                                        <td className="p-2 text-gray-700">
                                            ₱ <input
                                                type="number"
                                                name={'cfdb_client_amount'}
                                                defaultValue={cashflow.Cash_Flow_Data.cfdb_client_amount}
                                                onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description, cashflow.Cash_Flow_Data.isWant)}
                                                className='w-24 rounded border border-gray-300 p-2' />

                                        </td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <td className="whitespace-nowrap p-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    name={'cfdb_spouse_amount'}
                                                    defaultValue={cashflow.Cash_Flow_Data.cfdb_spouse_amount}
                                                    onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id, cashflow.Cash_Flow_Data.cfda_client_amount_expense, cashflow.Cash_Flow_Data.cfda_spouse_amount_expense, cashflow.cfl_description, cashflow.Cash_Flow_Data.isWant)}
                                                    className='w-24 rounded border border-gray-300 p-2' />
                                            </td>
                                        }
                                        <td className="p-2 text-gray-700 font-bold">
                                            ₱ {(cashflow.Cash_Flow_Data.cfdb_client_amount + cashflow.Cash_Flow_Data.cfdb_spouse_amount)?.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                                ))}

                                {/* Total Mothly Outflow */}
                                <tr className='font-bold'>
                                    <td className="px-4 py-2 text-gray-900 text-center">TOTAL MONTHLY CASH OUTFLOW</td>
                                    <td className="px-4 py-2 text-gray-900 text-center border-t-2 border-gray-700"></td>
                                    <td className="p-2 text-gray-700 border-t-2 border-gray-700">
                                        ₱{sumOfCfdaClientAmountExpense?.toLocaleString('en-US')}
                                    </td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <>
                                            <td className="px-4 py-2 text-gray-900 text-center border-t-2 border-gray-700"></td>
                                            <td className="p-2 text-gray-700 border-t-2 border-gray-700">
                                                ₱{sumOfCfdaSpouseAmountExpense?.toLocaleString('en-US')}
                                            </td>
                                        </>
                                    }
                                    <td className="p-2 text-gray-700 border-t-2 border-gray-700">
                                        ₱{(sumOfCfdaClientAmountExpense + sumOfCfdaSpouseAmountExpense)?.toLocaleString('en-US')}
                                    </td>
                                    <td className="p-2 text-gray-700 border-t-2 border-gray-700">
                                        ₱{(sumOfCfdbClientAmountBudgetOnChange ? sumOfCfdbClientAmountBudgetOnChange : sumOfCfdbClientAmount)?.toLocaleString('en-US')}
                                    </td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="p-2 text-gray-700 border-t-2 border-gray-700">
                                            ₱ {(sumOfCfdbSpouseAmountBudgetOnChange ? sumOfCfdbSpouseAmountBudgetOnChange : sumOfCfdbSpouseAmount)?.toLocaleString('en-US')}
                                        </td>
                                    }
                                    <td className="p-2 text-gray-700 border-t-2 border-gray-700">
                                        ₱{(totalOfClientAndSpouseBudgetOnchange ? totalOfClientAndSpouseBudgetOnchange : (sumOfCfdbClientAmount + sumOfCfdbSpouseAmount))?.toLocaleString('en-US')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Total Actual Annual Cashflow, Total Budget Annual Cashflow  */}
                    <div className='overflow-x-auto mt-10'>
                        <table className="min-w-full bg-white table-fixed w-full">
                            <thead>

                            </thead>
                            <tbody className='className="text-xs"'>
                                <tr className='font-bold'>
                                    <td className="text-right px-4 py-2 text-gray-900 w-[30%]">Total ACTUAL ANNUAL Cash Outflows</td>
                                    <td className="p-2 text-gray-700">
                                        ₱ {(sumOfCfdaClientAmountExpense * 12)?.toLocaleString('en-US')}
                                    </td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="p-2 text-gray-700">
                                            ₱ {(sumOfCfdaSpouseAmountExpense * 12)?.toLocaleString('en-US')}
                                        </td>
                                    }
                                    <td className="p-2 text-gray-700">
                                        ₱ {((sumOfCfdaClientAmountExpense + sumOfCfdaSpouseAmountExpense) * 12)?.toLocaleString('en-US')}
                                    </td>
                                    <td className="p-2 text-gray-700"></td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="p-2 text-gray-700">
                                        </td>
                                    }
                                    <td className="p-2 text-gray-700"></td>
                                </tr>
                                <tr className='font-bold'>
                                    <td className="text-right p-2 text-gray-900">Total BUDGET ANNUAL Cash Outflows</td>
                                    <td className="p-2 text-gray-700">
                                        ₱ {((sumOfCfdbClientAmountBudgetOnChange ? sumOfCfdbClientAmountBudgetOnChange : sumOfCfdbClientAmount) * 12)?.toLocaleString('en-US')}
                                    </td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="p-2 text-gray-700">
                                            ₱ {((sumOfCfdbSpouseAmountBudgetOnChange ? sumOfCfdbSpouseAmountBudgetOnChange : sumOfCfdbSpouseAmount) * 12)?.toLocaleString('en-US')}

                                        </td>
                                    }
                                    <td className="p-2 text-gray-700">
                                        ₱ {((totalOfClientAndSpouseBudgetOnchange ? totalOfClientAndSpouseBudgetOnchange : (sumOfCfdbClientAmount + sumOfCfdbSpouseAmount)) * 12)?.toLocaleString('en-US')}

                                    </td>
                                    <td className="p-2 text-gray-700"></td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="p-2 text-gray-700">
                                        </td>
                                    }
                                    <td className="p-2 text-gray-700"></td>
                                </tr>
                                <tr className='font-bold'>
                                    <td className="text-right p-2 text-gray-900">EXCESS OF ACTUAL OVER BUDGET (ANNUAL)</td>
                                    <td className="p-2 text-gray-700">
                                        ₱ {(((sumOfCfdbClientAmountBudgetOnChange ? sumOfCfdbClientAmountBudgetOnChange : sumOfCfdbClientAmount) * 12) - (sumOfCfdaClientAmountExpense * 12))?.toLocaleString('en-US')}
                                    </td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="p-2 text-gray-700">
                                            ₱ {(((sumOfCfdbSpouseAmountBudgetOnChange ? sumOfCfdbSpouseAmountBudgetOnChange : sumOfCfdbSpouseAmount) * 12) - (sumOfCfdaSpouseAmountExpense * 12))?.toLocaleString('en-US')}
                                        </td>
                                    }
                                    <td className=" p-2 text-gray-700">
                                        ₱ {((((sumOfCfdbClientAmountBudgetOnChange ? sumOfCfdbClientAmountBudgetOnChange : sumOfCfdbClientAmount) * 12) - (sumOfCfdaClientAmountExpense * 12)) + ((sumOfCfdbSpouseAmountBudgetOnChange ? sumOfCfdbSpouseAmountBudgetOnChange : sumOfCfdbSpouseAmount * 12) - (sumOfCfdaSpouseAmountExpense * 12)))?.toLocaleString('en-US')}
                                    </td>
                                    <td className="p-2 text-gray-700"></td>
                                    <td className="p-2 text-gray-700"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='my-4'>
                <div>
                    <label className="flex items-center gap-4" htmlFor="message">Recommendations: <MdLibraryAdd className='cursor-pointer text-base' onClick={handleAddRecommendation} /></label>

                    {inputRecommendations.map((item, idx) => (
                        <div key={idx}>
                            <textarea
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="Message"
                                name='description'
                                value={item.description}
                                rows="2"
                                id="message"
                                onChange={(e) => handleOnChangeInputNewRecommendations(e, idx)}
                            ></textarea>
                            <button
                                onClick={removeOtherRecommendationFields}
                                className="group relative inline-block text-xs mb-2 text-red-600 focus:outline-none focus:ring active:text-red-500"
                            >
                                <span
                                    className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                ></span>

                                <span className="relative block border border-current bg-white py-1 px-3 cursor-pointer">  Delete </span>
                            </button>
                        </div>
                    ))}

                    {cashFlowList.Recommendations?.length !== 0 &&

                        cashFlowList.Recommendations?.map((item, idx) => (
                            <div key={idx}>

                                <textarea
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    placeholder="Message"
                                    name='description'
                                    defaultValue={item.description}
                                    rows="2"
                                    id="message"
                                    onChange={(e) => handleChangeInputRecommendations(e, item.recommendation_id)}
                                ></textarea>
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className='my-4'>
                <div>
                    <label className="flex items-center gap-4" htmlFor="expectedSavings">EXPECTED SAVINGS IF RECOMMENDATION IS IMPLEMENTED</label>

                    <textarea
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="Expected Savings"
                        rows="2"
                        id="expectedSavings"
                        name='expected_savings'
                        defaultValue={cashFlowList?.Cash_Flow_Analysis?.[0]?.expected_savings}
                        onChange={handleChangeExpectedSavings}
                    ></textarea>
                </div>
            </div>

            <div className='my-4'>
                <div>
                    <label className="flex items-center gap-4" htmlFor="goesWell">IF ALL GOES WELL, WHAT WILL FINANCIAL ADVISOR DO WITH SAVINGS?</label>

                    <textarea
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="Message"
                        rows="2"
                        id="goesWell"
                        name='goes_well'
                        defaultValue={cashFlowList?.Cash_Flow_Analysis?.[0]?.goes_well}
                        onChange={handleChangeGoesWell}
                    ></textarea>
                </div>
            </div>

            <div className='sticky bottom-0 bg-white py-4 flex justify-between items-center mt-5'>
                <div>
                    <Link
                        className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
                        href={`/admin/clients/cash-flow/cash-outflow/${clientID}`}
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

                    {unsavedEditError &&
                        <span className='text-red-500 ml-4'>Changes not yet saved </span>
                    }

                </div>

                <div>
                    <button
                        type="submit"
                        disabled={submitButtonDisabled}
                        onClick={handleNewSubmitDataOutflow}
                        className="inline-block w-full rounded-lg ml-4 bg-green-900 px-8 py-3 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                    >
                        Save
                    </button>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default TargetBudgetCashOutflowPage