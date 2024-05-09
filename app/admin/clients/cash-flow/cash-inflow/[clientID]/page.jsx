"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdLibraryAdd } from "react-icons/md";
import { FaSpinner, FaSyncAlt } from "react-icons/fa";
import { API_BASE_URL, api } from '@/app/lib/libapi';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import MissingFields from '@/app/components/Clients/MissingFields';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const CashInflowPage = ({ params }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const agent_id = useSelector((state) => state.StateController.agent_id);
    const token = useSelector((state) => state.StateController.token)
    const { clientID } = params
    const [cashFlowList, setCashFlowList] = useState([])
    const [inputData, setInputData] = useState([])
    const [inputEditData, setInputEditData] = useState([])
    const [showOthersAddForm, setShowOthersAddForm] = useState(false)
    const [spouseDetails, setSpouseDetails] = useState('')
    const [clientDetails, setClientDetails] = useState({})
    const [targetCashInflow, setTargetCashInflow] = useState({
        targetCashInflow_client: 0,
        targetCashInflow_spouse: 0,
    })
    const [inputRecommendations, setInputRecommendations] = useState([])
    const [inputOthers, setInputOthers] = useState([
        {
            cfl_id: 0,
            cfl_description: '',
            cfda_client_amt: 0,
            cfda_spouse_amt: 0,
        }
    ])
    const [disabledSubmitButton, setDisabledSubmitButton] = useState(true)
    const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false)
    const [showAddRecommendation, setShowAddRecommendation] = useState(false)
    const [clientInfo, setClientInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [unsavedEditError, setUnsavedEditError] = useState(false)

    useEffect(() => {
        fetchClienPersonalInfo()
        fetchCashFlowList()
    }, [])

    const fetchClienPersonalInfo = async () => {
        let userID = null;
        let token = null;
        if (Cookies.get("id") && Cookies.get("token")) {
            userID = Cookies.get("id");
            token = Cookies.get("token");
        } else {
            setStatus("Logging out...");
            await api.logout(userID, token);
            router.push("/");
        }

        try {
            const res = await api.getClientInfo(clientID, userID);
            setClientInfo(res.Client?.find((item) => item.Client_ID === clientID))
        } catch (error) {
            console.error("Error fetching data from the API FETCH CLIENT PERSONAL INFO: ", error);
        }
    }

    const fetchCashFlowList = async () => {
        try {
            const res = await api.getCashFlowList(0, clientID);
            setCashFlowList(res.Family_Cash_Flow_Analysis)
            setSpouseDetails(res.Family_Cash_Flow_Analysis.Spouse_FN)
            setClientDetails(res.Family_Cash_Flow_Analysis.Client_FN)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching data from the API FETCH CASH FLOW INFLOW LIST: ", error);
        }
    }

    const handleChangeInput = (e, idx, cfl_id) => {
        const { name, value } = e.target;

        setDisabledSubmitButton(false)
        setUnsavedEditError(true)

        // Make a copy of the existing formData array
        const updatedFormData = [...inputData];

        // Check if formData already has an item with the same sfp_id
        const existingItemIndex = inputData.findIndex((item) => item.cfl_id === cfl_id);

        if (existingItemIndex !== -1) {
            // If an item with the same sfp_id exists, update its values
            updatedFormData[existingItemIndex][name] = value;
            // updatedFormData[existingItemIndex]['cfda_total'] = parseInt(cfda_client_amt) + parseInt(cfda_spouse_amt);
        } else {
            // If an item with the same sfp_id doesn't exist, create a new object and push it
            const newItem = {
                cfl_id,
                cfl_description: '',
                cfda_client_amt: 0,
                cfda_spouse_amt: 0,
                cfda_total: 0
            };

            // Update the value of the specified property in the object
            newItem[name] = value;

            // Push the new object to the array
            updatedFormData.push(newItem);
        }

        // Calculate total
        updatedFormData.forEach(item => {
            item.cfda_total = parseInt(item.cfda_client_amt) + parseInt(item.cfda_spouse_amt);
        });

        // Update the state with the new formData
        setInputData(updatedFormData);

        // Append total inside cashFlowList.CashFlowList_InFlow with the same cfl_id
        cashFlowList.CashFlowList_InFlow.forEach(item => {
            if (item.cfl_id === cfl_id) {
                const formDataItem = updatedFormData.find(formDataItem => formDataItem.cfl_id === cfl_id);
                if (formDataItem) {
                    item.cfda_total = formDataItem.cfda_total;
                }
            }
        });
    }

    const handleEditCashflowData = (e, cfl_id, cfd_id) => {
        const { name, value } = e.target;
        setUnsavedEditError(true)
        setDisabledSubmitButton(false)

        // Make a copy of the existing formData array
        const updatedFormData = [...inputEditData];

        // Check if formData already has an item with the same sfp_id
        const existingItemIndex = inputEditData.findIndex((item) => item.cfl_id === cfl_id);

        if (existingItemIndex !== -1) {
            // If an item with the same sfp_id exists, update its values
            updatedFormData[existingItemIndex][name] = value;
        } else {
            // If an item with the same sfp_id doesn't exist, create a new object and push it
            const newItem = {
                cfl_id,
                cfd_id,
                cfl_description: '',
                cfda_client_amt: 0,
                cfda_spouse_amt: 0,
            };

            // Update the value of the specified property in the object
            newItem[name] = value;

            // Push the new object to the array
            updatedFormData.push(newItem);
        }

        // Update the state with the new formData
        setInputEditData(updatedFormData);
    }

    const handleChangeTargetCashInflow = (e, cfa_id) => {

        const { name, value } = e.target
        setUnsavedEditError(true)
        setDisabledSubmitButton(false)

        setTargetCashInflow({
            ...targetCashInflow,
            cfa_id,
            [name]: value
        })
    }

    const handleChangeInputRecommendations = (e, recommendation_id) => {

        const { name, value } = e.target
        setUnsavedEditError(true)
        setDisabledSubmitButton(false)
        // setInputRecommendations({ ...inputRecommendations, [name]: value, 'recommendation_id': recommendation_id })

        // Make a copy of the existing formData array
        const updatedFormData = [...inputRecommendations];

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
        setInputRecommendations(updatedFormData);
    }

    const handleOnChangeInputOthers = (event, index) => {

        setUnsavedEditError(true)
        setDisabledSubmitButton(false)
        let data = [...inputOthers];
        data[index][event.target.name] = event.target.value;
        setInputOthers(data);
    }

    const handleAddOthers = () => {
        const newItem = {
            cfl_id: 0,
            cfl_description: '',
            cfda_client_amt: 0,
            cfda_spouse_amt: 0,
        }
        setInputOthers([...inputOthers, newItem])
    }

    const removeOtherFields = (index) => {
        let data = [...inputOthers];
        data.splice(index, 1)
        setInputOthers(data)
    }

    const handleSubmitNewDataInflow = async () => {

        let submitData = [...inputData]

        const updatedInputEditData = inputEditData.map((inputEditData) => {
            const matchingCFD = cashFlowList.CashFlowList_InFlow.find(
                (item) => item.Cash_Flow_Data?.cfd_id === inputEditData.cfd_id
            );

            if (matchingCFD) {
                return {
                    ...inputEditData,
                    cfda_client_amt: inputEditData.cfda_client_amt !== 0 ? inputEditData.cfda_client_amt : matchingCFD.Cash_Flow_Data.cfda_client_amount,
                    cfda_spouse_amt: inputEditData.cfda_spouse_amt !== 0 ? inputEditData.cfda_spouse_amt : matchingCFD.Cash_Flow_Data.cfda_spouse_amount,
                };
            }

            return inputEditData;
        });

        //Check in Input others is empty if not merge all values to inputData
        if (!inputOthers.some(e => e.cfl_description === '')) {
            submitData.push(...inputOthers)
        }

        if (inputEditData.length !== 0) {
            submitData.push(...updatedInputEditData)
        }

        const filteredCashInflowData = cashFlowList.CashFlowList_InFlow.filter((item) => item.Cash_Flow_Data.length !== 0)

        let data = [
            {
                // Check if inputData is empty it means no value is being inputted
                "data": submitData.length !== 0 ?
                    submitData.map((item) => (
                        [
                            { "cfl_id": item.cfl_id },
                            { "cfd_id": item.cfd_id ?? 0 },
                            { "client_id": clientID },
                            { "cfl_description": item.cfl_description },
                            { "cfda_client_amt": item.cfda_client_amt === '' ? 0 : item.cfda_client_amt },
                            { "cfda_spouse_amt": item.cfda_spouse_amt === '' ? 0 : item.cfda_spouse_amt }
                        ]
                    ))
                    :
                    filteredCashInflowData.map((item) => (
                        [
                            { "cfl_id": item.cfl_id },
                            { "cfd_id": item.Cash_Flow_Data.cfd_id },
                            { "client_id": clientID },
                            { "cfl_description": item.cfl_description },
                            { "cfda_client_amt": item.Cash_Flow_Data.cfda_client_amount },
                            { "cfda_spouse_amt": item.Cash_Flow_Data.cfda_spouse_amount }
                        ]
                    ))
            },
            {
                "recommendations": inputRecommendations.length !== 0 ?
                    inputRecommendations.map((item) => (
                        [
                            { "recommendation_id": item.recommendation_id ?? 0 },
                            { "description": item.description ?? 0 }
                        ]
                    ))
                    :
                    [
                        [
                            { "recommendation_id": inputRecommendations.recommendation_id ?? 0 },
                            { "description": inputRecommendations.recommendations ?? '' }
                        ]
                    ]
            },
            { "target_cashinflow_client": targetCashInflow.targetCashInflow_client !== 0 ? targetCashInflow.targetCashInflow_client : cashFlowList.Cash_Flow_Analysis.length !== 0 ? cashFlowList.Cash_Flow_Analysis[0]?.target_cashinflow_client : 0 },
            { "target_cashinflow_spouse": targetCashInflow.targetCashInflow_spouse !== 0 ? targetCashInflow.targetCashInflow_spouse : cashFlowList.Cash_Flow_Analysis.length !== 0 ? cashFlowList.Cash_Flow_Analysis[0]?.target_cashinflow_spouse : 0 },
            { "CashFlowType": 0 }, // Cash flow type should be zero (0) for Inflow
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

        setSubmitButtonIsLoading(true)
        const res = await axios.post(`${API_BASE_URL}/newCashFlowData`, data);

        if (res.status === 200) {
            toast.success("Successfully Saved");
            fetchCashFlowList();
            setSubmitButtonIsLoading(false)
            setDisabledSubmitButton(true)
            setShowAddRecommendation(false)
            setInputOthers([])
            setShowOthersAddForm(false)
            setUnsavedEditError(false)
        }
    }

    const sumOfCfdaClientAmount = cashFlowList.CashFlowList_InFlow?.reduce((sum, cashFlow) => {
        const cfdaClientAmount = cashFlow.Cash_Flow_Data?.cfda_client_amount || 0;
        return sum + cfdaClientAmount;
    }, 0);

    //Calculate all cfda_spouse_amount
    const sumOfCfdaSpouseAmount = cashFlowList.CashFlowList_InFlow?.reduce((sum, cashFlow) => {
        const cfdaSpouseAmount = cashFlow.Cash_Flow_Data?.cfda_spouse_amount || 0;
        return sum + cfdaSpouseAmount;
    }, 0);

    let data = [...inputData, ...inputOthers]

    const sumOfCfdaClientAmountOnChange = data.reduce((sum, cashFlow) => {
        const cfdaClientAmount = parseInt(cashFlow.cfda_client_amt) || 0;
        return sum + cfdaClientAmount;
    }, 0);

    const sumOfCfdaSpouseAmountOnChange = data.reduce((sum, cashFlow) => {
        const cfdaSpouseAmount = parseInt(cashFlow.cfda_spouse_amt) || 0;
        return sum + cfdaSpouseAmount;
    }, 0);

    const totalMonthlyOnChange = sumOfCfdaClientAmountOnChange + sumOfCfdaSpouseAmountOnChange

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
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">Family Cash Flow Annalysis</div>
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
                <p className="mt-2 text-sm">
                    Cash flow annalysis is important in financial planning because it helps assess financial stability, enables accurate budgeting and planning, aids in managing luquidity, supports investment decisions, assists in debt mamangement, identifies cash flow issues, and informs financial decision making. <span className='font-bold'>It provides a clear understanding of cash movement and helps individuals and businesses effectively manage their finances and achieve their goals.</span>
                </p>
            </div>

            <div className='mt-4'>
                <div className="overflow-x-auto ">
                    <table className="table-auto bg-white">
                        <thead className='font-bold'>
                            <tr>
                                <td className="whitespace-nowrap pl-4 pr-20 py-2 text-lg text-gray-900 flex items-center gap-4">Cash Inflow (Revenue) - Monthly <FaSyncAlt /></td>
                                <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900 border-b-2 border-gray-700 text-center capitalize">{clientDetails.client_FirstName} {clientDetails.client_LastName}</td>
                                {spouseDetails !== 'No Spouse' &&
                                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900 border-b-2 border-gray-700 text-center capitalize">{spouseDetails.client_FirstName} {spouseDetails.client_LastName}</td>
                                }
                                <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900 border-b-2 border-gray-700 text-center">Total Household Income</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-xs">
                            {cashFlowList.CashFlowList_InFlow?.filter((cfl) => cfl.is_other === "No")?.map((cashflow, idx) => (
                                cashflow.Cash_Flow_Data.length === 0 ?
                                    // Display Input Form when No Cashflow Data Not Others                                        
                                    <tr key={idx}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {cashflow.cfl_description}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            ₱ <input
                                                type="number"
                                                onChange={(e) => handleChangeInput(e, idx, cashflow.cfl_id)}
                                                name={'cfda_client_amt'}
                                                className='rounded border border-gray-300 p-2' />
                                        </td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    onChange={(e) => handleChangeInput(e, idx, cashflow.cfl_id)}
                                                    name={'cfda_spouse_amt'}
                                                    className='rounded border border-gray-300 p-2' />
                                            </td>
                                        }
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-bold">
                                            ₱ {cashflow.cfda_total ? cashflow.cfda_total?.toLocaleString('en-US') : 0}
                                        </td>
                                    </tr>
                                    :
                                    <tr key={idx}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{cashflow.cfl_description}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            ₱ <input
                                                type="number"
                                                defaultValue={cashflow.Cash_Flow_Data.cfda_client_amount}
                                                onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                                name={'cfda_client_amt'}
                                                className='rounded border border-gray-300 p-2' />
                                        </td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    defaultValue={cashflow.Cash_Flow_Data.cfda_spouse_amount}
                                                    onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                                    name={'cfda_spouse_amt'}
                                                    className='rounded border border-gray-300 p-2' />
                                            </td>
                                        }
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-bold">
                                            ₱ {(cashflow.Cash_Flow_Data.cfda_client_amount + cashflow.Cash_Flow_Data.cfda_spouse_amount)?.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                            ))}
                            <tr>
                                <td colSpan={3} className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Other Sources of Income:</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                                    <MdLibraryAdd className='cursor-pointer' size={20} onClick={() => setShowOthersAddForm(!showOthersAddForm)} />
                                </td>
                            </tr>
                            {cashFlowList.CashFlowList_InFlow?.filter((cfl) => cfl.is_other === "Yes")?.map((cashflow, idx) => (
                                // Display Input Form when No Cashflow Data is Others
                                <tr key={idx}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{cashflow.cfl_description}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        ₱ <input
                                            type="number"
                                            defaultValue={cashflow.Cash_Flow_Data.cfda_client_amount}
                                            onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                            name={'cfda_client_amt'} className='rounded border border-gray-300 p-2' />

                                    </td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            ₱ <input
                                                type="number"
                                                defaultValue={cashflow.Cash_Flow_Data.cfda_spouse_amount}
                                                onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                                name={'cfda_spouse_amt'}
                                                className='rounded border border-gray-300 p-2' />
                                        </td>
                                    }
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-bold">
                                        ₱ {(cashflow.Cash_Flow_Data.cfda_client_amount + cashflow.Cash_Flow_Data.cfda_spouse_amount)?.toLocaleString('en-US')}
                                    </td>
                                </tr>
                            ))}
                            {showOthersAddForm &&
                                <>
                                    {inputOthers.map((input, idx) => (
                                        <tr key={idx}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                <input
                                                    type="text"
                                                    value={input.description}
                                                    name={'cfl_description'}
                                                    onChange={(e) => handleOnChangeInputOthers(e, idx)}
                                                    className='h-10 w-full rounded border border-gray-300 p-2' />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    value={input.cfda_client_amt}
                                                    name={'cfda_client_amt'}
                                                    onChange={(e) => handleOnChangeInputOthers(e, idx)}
                                                    className='rounded border border-gray-300 p-2' />
                                            </td>
                                            {spouseDetails !== 'No Spouse' &&
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    ₱ <input
                                                        type="number"
                                                        value={input.cfda_spouse_amt}
                                                        name={'cfda_spouse_amt'}
                                                        onChange={(e) => handleOnChangeInputOthers(e, idx)}
                                                        className='rounded border border-gray-300 p-2' />
                                                </td>
                                            }
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <span className='font-bold'>
                                                    ₱ {(parseInt(input.cfda_client_amt) + parseInt(input.cfda_spouse_amt))?.toLocaleString('en-US')}

                                                </span>
                                                <button
                                                    onClick={() => removeOtherFields(idx)}
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

                            {/* Total Monthly */}
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-right">Total MONTHLY Cash Inflows:</td>
                                <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {(sumOfCfdaClientAmountOnChange ? sumOfCfdaClientAmountOnChange : sumOfCfdaClientAmount)?.toLocaleString('en-US')}</td>
                                {spouseDetails !== 'No Spouse' &&
                                    <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {(sumOfCfdaSpouseAmountOnChange ? sumOfCfdaSpouseAmountOnChange : sumOfCfdaSpouseAmount)?.toLocaleString('en-US')}</td>
                                }
                                <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {(totalMonthlyOnChange ? totalMonthlyOnChange : (sumOfCfdaClientAmount + sumOfCfdaSpouseAmount))?.toLocaleString('en-US')}</td>
                            </tr>

                            {/* Total Annual */}
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-right">Total ANNUAL Cash Inflows:</td>
                                <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {((sumOfCfdaClientAmountOnChange ? sumOfCfdaClientAmountOnChange : sumOfCfdaClientAmount) * 12)?.toLocaleString('en-US')}</td>
                                {spouseDetails !== 'No Spouse' &&
                                    <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {((sumOfCfdaSpouseAmountOnChange ? sumOfCfdaSpouseAmountOnChange : sumOfCfdaSpouseAmount) * 12)?.toLocaleString('en-US')}</td>
                                }
                                <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {(totalMonthlyOnChange ? (totalMonthlyOnChange * 12) : (sumOfCfdaClientAmount + sumOfCfdaSpouseAmount) * 12)?.toLocaleString('en-US')}</td>
                            </tr>
                            {cashFlowList.Cash_Flow_Analysis?.length > 0 ?
                                cashFlowList.Cash_Flow_Analysis?.map((cfa, idx) => (
                                    <tr key={idx}>
                                        <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-right">GOAL Target Cash Inflow Per Year</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            {/* {cfa.target_cashinflow_client?.toLocaleString('en-US')} */}
                                            ₱ <input type="number" defaultValue={cfa.target_cashinflow_client} name='targetCashInflow_client' className='rounded border border-gray-300 p-2' onChange={(e) => handleChangeTargetCashInflow(e, cfa.cfa_id)} />

                                        </td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {/* {cfa.target_cashinflow_spouse?.toLocaleString('en-US')} */}
                                                ₱ <input type="number" defaultValue={cfa.target_cashinflow_spouse} name='targetCashInflow_spouse' className='rounded border border-gray-300 p-2' onChange={(e) => handleChangeTargetCashInflow(e, cfa.cfa_id)} />

                                            </td>
                                        }
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-bold">
                                            ₱ {(cfa.target_cashinflow_client + cfa.target_cashinflow_spouse)?.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-right">GOAL Target Cash Inflow Per Year</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        ₱ <input type="number" name='targetCashInflow_client' className='rounded border border-gray-300 p-2' onChange={(e) => handleChangeTargetCashInflow(e, 0)} />
                                    </td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            ₱ <input type="number" name='targetCashInflow_spouse' className='rounded border border-gray-300 p-2' onChange={(e) => handleChangeTargetCashInflow(e, 0)} />
                                        </td>
                                    }
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        ₱ {(parseInt(targetCashInflow.targetCashInflow_client) + parseInt(targetCashInflow.targetCashInflow_spouse))?.toLocaleString('en-US')}
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-right">GOAL TO GO</td>
                                {cashFlowList.Cash_Flow_Analysis && cashFlowList.Cash_Flow_Analysis.length > 0 ?
                                    <>
                                        <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {((cashFlowList.Cash_Flow_Analysis[0].target_cashinflow_client) - (sumOfCfdaClientAmount * 12))?.toLocaleString('en-US')}</td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {((cashFlowList.Cash_Flow_Analysis[0].target_cashinflow_spouse) - (sumOfCfdaSpouseAmount * 12))?.toLocaleString('en-US')}</td>
                                        }
                                        <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {((cashFlowList.Cash_Flow_Analysis[0].target_cashinflow_client) - (sumOfCfdaClientAmount * 12) + (cashFlowList.Cash_Flow_Analysis[0].target_cashinflow_spouse) - (sumOfCfdaSpouseAmount * 12))?.toLocaleString('en-US')}</td>
                                    </>
                                    :
                                    <>
                                        <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {(targetCashInflow.targetCashInflow_client - (sumOfCfdaClientAmountOnChange * 12))?.toLocaleString('en-US')}</td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {(targetCashInflow.targetCashInflow_spouse - (sumOfCfdaSpouseAmountOnChange * 12))?.toLocaleString('en-US')}</td>
                                        }
                                        <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-700">₱ {((targetCashInflow.targetCashInflow_client - (sumOfCfdaClientAmountOnChange * 12)) + (targetCashInflow.targetCashInflow_spouse - (sumOfCfdaSpouseAmountOnChange * 12)))?.toLocaleString('en-US')}</td>
                                    </>

                                }
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='my-4'>
                    <div >
                        <label className="flex items-center gap-4" >Recommendations: <MdLibraryAdd onClick={() => setShowAddRecommendation(!showAddRecommendation)} className='cursor-pointer text-base' /></label>
                        {cashFlowList.Recommendations?.length > 0 ?
                            cashFlowList.Recommendations?.map((recommendation, idx) => (
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    placeholder="Message"
                                    rows="2"
                                    id="message"
                                    name='description'
                                    key={idx}
                                    defaultValue={recommendation.description}
                                    onChange={(e) => handleChangeInputRecommendations(e, recommendation.recommendation_id)}
                                ></textarea>
                            ))
                            :
                            <textarea
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="Type your recommendation here"
                                rows="2"
                                name='description'
                                id="recommendations"
                                onChange={handleChangeInputRecommendations}
                            ></textarea>
                        }

                        {showAddRecommendation &&
                            <textarea
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="Type your recommendation here"
                                rows="2"
                                name='description'
                                id="recommendations"
                                onChange={handleChangeInputRecommendations}
                            ></textarea>

                        }
                    </div>
                </div>
            </div>

            <div className='sticky bottom-0 bg-white  py-4 flex justify-between mt-5'>
                <div>
                    <Link
                        className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
                        href={`/admin/clients/cash-flow/${clientID}`}
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
                    {clientInfo.Civil_Status === 'Married' && spouseDetails === 'No Spouse' &&
                        <span className='text-yellow-500 ml-4'>
                            (!!) Spouse data is hidden. Please Fill out Family Composition.
                            <Link href={`/admin/clients/family-composition/${clientID}`} target="_blank" className='ml-2 hover:text-green-900'>
                                Click Here
                            </Link>
                        </span>
                    }
                    {unsavedEditError &&
                        <span className='text-red-500 ml-4'>Changes not yet saved </span>
                    }
                </div>

                <div>
                    <Link
                        className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
                        href={`/admin/clients/cash-flow/cash-outflow/${clientID}`}
                    >
                        <span className="absolute -end-full transition-all group-hover:end-4">
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
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </span>

                        <span className="text-sm transition-all group-hover:me-4"> Next </span>
                    </Link>

                    {submitButtonIsLoading ?
                        <button
                            className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto"
                        >
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        </button>
                        :

                        <button
                            type="submit"
                            onClick={handleSubmitNewDataInflow}
                            className="inline-block w-full rounded ml-2 bg-green-900 px-8 py-3 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                            disabled={disabledSubmitButton}
                        >
                            Save
                        </button>
                    }

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CashInflowPage