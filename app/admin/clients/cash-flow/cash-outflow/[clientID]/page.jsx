'use client'
import { API_BASE_URL, api, webUser } from '@/app/lib/libapi';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaSpinner, FaSyncAlt } from "react-icons/fa";
import { MdLibraryAdd, MdRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const CashOutflowPage = ({ params }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const agent_id = useSelector((state) => state.StateController.agent_id);
    const token = useSelector((state) => state.StateController.token)
    const { clientID } = params
    const [cashFlowList, setCashFlowList] = useState([])
    const [spouseDetails, setSpouseDetails] = useState('')
    const [inputData, setInputData] = useState([])
    const [inputEditData, setInputEditData] = useState([])
    const [targetCashInflow, setTargetCashInflow] = useState({
        target_cashoutflow_client: 0,
        target_cashoutflow_spouse: 0
    })
    const [shareRFN, setShareRFN] = useState({
        clientshare_rfn: 0,
        spouseshare_rfn: 0
    })
    const [reduceCfAttempt, setReduceCfAttempt] = useState()
    const [clientDetails, setClientDetails] = useState({})
    const [viewButton, setViewButton] = useState(false)
    const [showOthersAddForm, setShowOthersAddForm] = useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [inputOthers, setInputOthers] = useState([
        {
            cfl_id: 0,
            cfl_description: '',
            cfda_client_amount_expense: 0,
            cfda_spouse_amount_expense: 0,
            target_retirementAmntPercent: 0
        }
    ])
    const [isLoading, setIsLoading] = useState(true)
    const [unsavedEditError, setUnsavedEditError] = useState(false)

    useEffect(() => {
        fetchCashFlowList()
    }, [])

    const fetchCashFlowList = async () => {
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
            const res = await api.getCashFlowList(1, clientID);

            setCashFlowList(res?.Family_Cash_Flow_Analysis)
            setSpouseDetails(res.Family_Cash_Flow_Analysis.Spouse_FN)
            setClientDetails(res.Family_Cash_Flow_Analysis.Client_FN)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching data from the API FETCH CASH FLOW LIST: ", error);
        }
    }

    const handleChangeRadioButton = (e) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)
        setReduceCfAttempt(e.target.value)
        if (e.target.value === '1') {
            setViewButton(true)
        } else {
            setViewButton(false)
        }
    }

    const handleChangeInput = (e, cfl_id, cfd_id) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)

        const { name, value } = e.target;

        // Make a copy of the existing formData array
        const updatedFormData = [...inputData];

        // Check if formData already has an item with the same sfp_id
        const existingItemIndex = inputData.findIndex((item) => item.cfl_id === cfl_id);

        if (existingItemIndex !== -1) {
            // If an item with the same sfp_id exists, update its values
            updatedFormData[existingItemIndex][name] = value;
        } else {
            // If an item with the same sfp_id doesn't exist, create a new object and push it
            const newItem = {
                cfl_id,
                cfd_id,
                cfl_description: '',
                cfda_client_amount_expense: 0,
                cfda_spouse_amount_expense: 0,
                target_retirementAmntPercent: 0,
                cfda_total: 0,
                cfda_totalRetirement: 0
            };

            // Update the value of the specified property in the object
            newItem[name] = value;

            // Push the new object to the array
            updatedFormData.push(newItem);
        }

        // Calculate total
        updatedFormData.forEach(item => {
            item.cfda_total = parseInt(item.cfda_client_amount_expense) + parseInt(item.cfda_spouse_amount_expense);
            item.cfda_totalRetirement = (item.cfda_total) * (parseInt(item.target_retirementAmntPercent) / 100);
        });

        // Update the state with the new formData
        setInputData(updatedFormData);

        // Append total inside cashFlowList.CashFlowList_outflow with the same cfl_id
        cashFlowList.CashFlowList_OutFlow.forEach(item => {
            if (item.cfl_id === cfl_id) {
                const formDataItem = updatedFormData.find(formDataItem => formDataItem.cfl_id === cfl_id);
                if (formDataItem) {
                    item.cfda_total = formDataItem.cfda_total;
                    item.cfda_totalRetirement = formDataItem.cfda_totalRetirement;
                }
            }
        });
    }

    const handleChangeTargetCashOutflow = (e) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)

        const { name, value } = e.target

        setTargetCashInflow({ ...targetCashInflow, [name]: value })
    }

    const handleChangeClientShare = (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value)) value = 0;
        if (value > 100) value = 100;
        setShareRFN({
            clientshare_rfn: value,
            spouseshare_rfn: 100 - value
        });
    };

    const handleChangeSpouseShare = (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value)) value = 0;
        if (value > 100) value = 100;
        setShareRFN({
            clientshare_rfn: 100 - value,
            spouseshare_rfn: value
        });
    };

    const handleChangeShareRFN = (e) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)

        const { name, value } = e.target
        setShareRFN({ ...shareRFN, [name]: value })
    }

    const handleChangeInputOthers = (event, index) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)

        let data = [...inputOthers];
        data[index][event.target.name] = event.target.value;
        setInputOthers(data);
    }

    const handleAddOthers = () => {
        setUnsavedEditError(true)
        const newItem = {
            cfl_id: 0,
            cfl_description: '',
            cfda_client_amount_expense: 0,
            cfda_spouse_amount_expense: 0,
            target_retirementAmntPercent: 0
        };

        setInputOthers([...inputOthers, newItem])
    }

    const removeOtherFields = (index) => {
        let data = [...inputOthers];
        data.splice(index, 1)
        setInputOthers(data)
    }

    const handleEditCashflowData = (e, cfl_id, cfd_id) => {
        setUnsavedEditError(true)
        setSubmitButtonDisabled(false)

        const { name, value } = e.target;

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
                cfda_client_amount_expense: 0,
                cfda_spouse_amount_expense: 0,
                target_retirementAmntPercent: 0,
                cfda_total: 0,
                cfda_totalRetirement: 0
            };

            // Update the value of the specified property in the object
            newItem[name] = value;

            // Push the new object to the array
            updatedFormData.push(newItem);
        }

        // Calculate total
        updatedFormData.forEach(item => {
            item.cfda_total = parseInt(item.cfda_client_amount_expense) + parseInt(item.cfda_spouse_amount_expense);
            item.cfda_totalRetirement = (item.cfda_total) * (parseInt(item.target_retirementAmntPercent) / 100);
        });

        // Update the state with the new formData
        setInputEditData(updatedFormData);

        // Append total inside cashFlowList.CashFlowList_Outfolw with the same cfl_id
        cashFlowList.CashFlowList_OutFlow.forEach(item => {
            if (item.cfl_id === cfl_id) {
                const formDataItem = updatedFormData.find(formDataItem => formDataItem.cfl_id === cfl_id);
                if (formDataItem) {
                    item.cfda_total = formDataItem.cfda_total;
                    item.cfda_totalRetirement = formDataItem.cfda_totalRetirement;
                }
            }
        });
    }

    const handleSubmitNewDataOutflow = async () => {

        const updatedInputEditData = inputEditData.map((inputEditData) => {
            const matchingCFD = cashFlowList.CashFlowList_OutFlow.find(
                (item) => item.Cash_Flow_Data?.cfd_id === inputEditData.cfd_id
            );

            if (matchingCFD) {
                return {
                    ...inputEditData,
                    cfda_client_amount_expense: inputEditData.cfda_client_amount_expense !== 0 ? inputEditData.cfda_client_amount_expense : matchingCFD.Cash_Flow_Data.cfda_client_amount_expense,
                    cfda_spouse_amount_expense: inputEditData.cfda_spouse_amount_expense !== 0 ? inputEditData.cfda_spouse_amount_expense : matchingCFD.Cash_Flow_Data.cfda_spouse_amount_expense,
                    target_retirementAmntPercent: inputEditData.target_retirementAmntPercent !== 0 ? inputEditData.target_retirementAmntPercent : matchingCFD.Cash_Flow_Data.target_retirement
                };
            }
            return inputEditData;
        });

        //Remove the data with cfda_client_amount expnse == '' and cfda_spouse_amount_expnse == ''
        let inputDataUpdated = inputData.filter((item) => {
            return item.cfda_client_amount_expense !== '' && item.cfda_spouse_amount_expense !== '';
        });

        //Remove the data with cfl_description == '' on inputOthers
        let inputOthersUpdated = inputOthers.filter((item) => {
            return item.cfl_description !== '';
        });

        //Check if the Cash Flow Data have values
        let withCashFlowDataValue = cashFlowList.CashFlowList_OutFlow.some((item) => item.Cash_Flow_Data.length !== 0) // false

        if (inputDataUpdated.length === 0 && !withCashFlowDataValue) {
            return toast.error('Must Add Cash OutFlow Expense atleast One ')
        }

        //Check in Input others is empty if not merge all values to inputData
        const isOthersEmpty = inputOthers.some(e => e.cfl_description === '')

        if (inputOthersUpdated.length !== 0) {
            if (isOthersEmpty) {
                return toast.error('Please Fill in the Other Expenses Description')
            }
            inputDataUpdated.push(...inputOthers)
        }

        if (inputEditData.length !== 0) {
            inputDataUpdated.push(...updatedInputEditData)
        }


        //Share RFN Validation
        if (shareRFN.clientshare_rfn !== 0 || shareRFN.spouseshare_rfn !== 0) {
            if (cashFlowList.Cash_Flow_Analysis.length !== 0) {
                console.log('(parseInt(shareRFN.clientshare_rfn) + cashFlowList.Cash_Flow_Analysis[0]?.spouseshare_rfn', parseInt(shareRFN.clientshare_rfn) + cashFlowList.Cash_Flow_Analysis[0]?.spouseshare_rfn)
                console.log('parseInt(shareRFN.spouseshare_rfn) + cashFlowList.Cash_Flow_Analysis[0]?.clientshare_rfn', parseInt(shareRFN.spouseshare_rfn) + cashFlowList.Cash_Flow_Analysis[0]?.clientshare_rfn)
                if ((parseInt(shareRFN.clientshare_rfn) + cashFlowList.Cash_Flow_Analysis[0]?.spouseshare_rfn > 100)) return toast.error('Share RFN should not exceed 100%')
                if ((parseInt(shareRFN.spouseshare_rfn) + cashFlowList.Cash_Flow_Analysis[0]?.clientshare_rfn > 100)) return toast.error('Share RFN should not exceed 100%')
            }
            if (spouseDetails === 'No Spouse') {
                if (parseInt(shareRFN.clientshare_rfn) !== 100) return toast.error('Share RFN should be 100%')
            }
        }

        let data = [
            {
                "data": inputDataUpdated.length !== 0 ?
                    inputDataUpdated.map((item) => (
                        [
                            { "cfl_id": item.cfl_id },
                            { "cfl_description": item.cfl_description },
                            { "cfd_id": item.cfd_id ?? 0 },  // << – Make it zero if first time to add, otherwise indicate ID to perform the update process. This applies to succeeding records.
                            { "client_id": clientID },
                            { "cfda_client_amount_expense": item.cfda_client_amount_expense },
                            { "cfda_spouse_amount_expense": item.cfda_spouse_amount_expense },
                            { "target_retirementAmntPercent": item.target_retirementAmntPercent }
                        ]
                    ))
                    :
                    cashFlowList.CashFlowList_OutFlow?.filter((item) => item.Cash_Flow_Data.length !== 0).map((item) => (
                        [
                            { "cfl_id": item.cfl_id },
                            { "cfl_description": item.cfl_description },
                            { "cfd_id": item.Cash_Flow_Data.cfd_id },
                            { "client_id": clientID },
                            { "cfda_client_amount_expense": item.Cash_Flow_Data.cfda_client_amount_expense },
                            { "cfda_spouse_amount_expense": item.Cash_Flow_Data.cfda_spouse_amount_expense },
                            { "target_retirementAmntPercent": item.Cash_Flow_Data.target_retirement }
                        ]
                    ))
            },
            { "reduce_cf_attempt": cashFlowList.Cash_Flow_Analysis[0]?.reduce_cf_attempt ? cashFlowList.Cash_Flow_Analysis[0]?.reduce_cf_attempt : reduceCfAttempt ?? 0 },
            { "target_cashoutflow_client": cashFlowList.Cash_Flow_Analysis[0]?.target_cashoutflow_client ? cashFlowList.Cash_Flow_Analysis[0]?.target_cashoutflow_client : targetCashInflow.target_cashoutflow_client ?? 0 },
            { "target_cashoutflow_spouse": cashFlowList.Cash_Flow_Analysis[0]?.target_cashoutflow_spouse ? cashFlowList.Cash_Flow_Analysis[0]?.target_cashoutflow_spouse : targetCashInflow.target_cashoutflow_spouse ?? 0 },
            { "CashFlowType": 1 }, // Cash flow type should be one (1) for Outflow
            { "client_id": clientID },
            { "clientshare_rfn": shareRFN.length !== 0 && shareRFN.clientshare_rfn ? shareRFN.clientshare_rfn : cashFlowList.Cash_Flow_Analysis[0]?.clientshare_rfn ?? 0 },
            { "spouseshare_rfn": shareRFN.length !== 0 && shareRFN.spouseshare_rfn ? shareRFN.spouseshare_rfn : cashFlowList.Cash_Flow_Analysis[0]?.spouseshare_rfn ?? 0 },
            {
                "web_user":
                    [
                        [
                            { "user_id": agent_id},
                            { "user_token": token }
                        ]
                    ]
            }
        ]

        setSubmitButtonDisabled(false)
        const res = await axios.post(`${API_BASE_URL}/newCashFlowData`, data);

        if (res.status === 200) {
            toast.success("Successfully Saved");
            fetchCashFlowList();
            setShowOthersAddForm(false)
            setInputOthers([])
            setUnsavedEditError(false)
            setSubmitButtonDisabled(true)
        }
    }

    //Calculate all cfda_client_amount expense
    const sumOfCfdaClientAmount = cashFlowList.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
        const cfdaClientAmount = cashFlow.Cash_Flow_Data?.cfda_client_amount_expense || 0;
        return sum + cfdaClientAmount;
    }, 0);

    //Calculate all cfda_spouse_amount expense
    const sumOfCfdaSpouseAmount = cashFlowList.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
        const cfdaSpouseAmount = cashFlow.Cash_Flow_Data?.cfda_spouse_amount_expense || 0;
        return sum + cfdaSpouseAmount;
    }, 0);

    const totalOfClientAndSpouseExpense = sumOfCfdaClientAmount + sumOfCfdaSpouseAmount

    //((cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense) * ((cashflow.Cash_Flow_Data.target_retirement / 100)))
    const totalRetirement = cashFlowList.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
        const cfdaRetirement = ((cashFlow.Cash_Flow_Data.cfda_client_amount_expense + cashFlow.Cash_Flow_Data.cfda_spouse_amount_expense) * ((cashFlow.Cash_Flow_Data.target_retirement / 100))) || 0;
        return sum + cfdaRetirement;
    }, 0);

    //Compute Realtime Sum of Client and Spouse Expense
    let data = [...inputData, ...inputOthers]

    const sumOfCfdaClientAmountExpenseOnChange = data.reduce((sum, cashFlow) => {
        const cfdaClientAmountExpense = parseInt(cashFlow.cfda_client_amount_expense) || 0;
        return sum + cfdaClientAmountExpense;
    }, 0);

    const sumOfCfdaSpouseAmountExpenseOnChange = data.reduce((sum, cashFlow) => {
        const cfdaSpouseAmountExepense = parseInt(cashFlow.cfda_spouse_amount_expense) || 0;
        return sum + cfdaSpouseAmountExepense;
    }, 0);

    const totalOfClientAndSpouseExpenseOnchange = sumOfCfdaClientAmountExpenseOnChange + sumOfCfdaSpouseAmountExpenseOnChange
    //((cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense) * ((cashflow.Cash_Flow_Data.target_retirement / 100)))
    const totalRetirementOnChange = data.reduce((sum, cashFlow) => {
        const cfdaTotalRetirement = cashFlow.cfda_totalRetirement || 0;
        return sum + cfdaTotalRetirement;
    }, 0);

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

            <div className='mt-4'>
                <div className="overflow-x-auto ">
                    <table className="table-fixed bg-white">
                        <thead className='font-bold' >
                            <tr>
                                <td className="text-center whitespace-nowrap p-8 text-lg text-gray-900" > Cash Outflow (Expenses) - Monthly <FaSyncAlt className='cursor-pointer' /> </td>
                                <td className="text-center p-2 text-sm text-gray-900 border-b-2 border-gray-700 capitalize">{clientDetails.client_FirstName} {clientDetails.client_LastName}</td>
                                {spouseDetails !== 'No Spouse' &&
                                    <td className="text-center  py-2 text-sm text-gray-900 border-b-2 border-gray-700 capitalize">{spouseDetails.client_FirstName} {spouseDetails.client_LastName}</td>
                                }
                                <td className="text-center p-2 text-sm text-gray-900 border-b-2 border-gray-700">Total</td>
                                <td className="text-center p-2 text-sm text-gray-900 border-b-2 border-gray-700 w-40">Retirement Expense % of Current Expense</td>
                                <td className="text-center p-2 text-sm text-gray-900 border-b-2 border-gray-700 w-32">Total Retirement Cashflow Needs</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-xs">
                            {cashFlowList.CashFlowList_OutFlow?.filter((cfl) => cfl.is_other === "No")?.map((cashflow, idx) => (
                                cashflow.Cash_Flow_Data.length === 0 ?
                                    // Display Input Form when No Cashflow Data Not Others                                        
                                    <tr key={idx}>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            {cashflow.cfl_description}
                                        </td>
                                        <td className="p-2 text-gray-700">
                                            ₱ <input
                                                type="number"
                                                name={'cfda_client_amount_expense'}
                                                onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                                className='rounded w-24 border border-gray-300 p-2' />
                                        </td>
                                        {spouseDetails !== 'No Spouse' &&

                                            <td className="p-2 text-gray-700">
                                                ₱ <input
                                                    type="number"
                                                    name={'cfda_spouse_amount_expense'}
                                                    onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                                    className='rounded w-24 border border-gray-300 p-2' />
                                            </td>
                                        }
                                        <td className="p-2 text-gray-700 font-bold">
                                            ₱ {cashflow.cfda_total ? cashflow.cfda_total?.toLocaleString('en-US') : 0}
                                        </td>
                                        <td className="p-2 text-gray-700 text-center">
                                            <input
                                                type="number"
                                                name={'target_retirementAmntPercent'}
                                                onChange={(e) => handleChangeInput(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                                className='rounded w-16 border border-gray-300 p-2' /> %

                                        </td>
                                        <td className="p-2 text-gray-700 font-bold">
                                            ₱ {cashflow.cfda_totalRetirement ? cashflow.cfda_totalRetirement?.toLocaleString('en-US') : 0}
                                        </td>
                                    </tr>
                                    :
                                    <tr key={idx}>
                                        <td className="px-4 py-2 font-medium text-gray-900">{cashflow.cfl_description}</td>
                                        <td className="p-2 text-gray-700">
                                            ₱ <input
                                                type="number"
                                                name={'cfda_client_amount_expense'}
                                                defaultValue={cashflow.Cash_Flow_Data.cfda_client_amount_expense}
                                                onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                                className='rounded w-24 border border-gray-300 p-2' />

                                        </td>
                                        {spouseDetails !== 'No Spouse' &&
                                            <td className="p-2 text-gray-700">
                                                ₱ <input type="number" name={'cfda_spouse_amount_expense'} defaultValue={cashflow.Cash_Flow_Data.cfda_spouse_amount_expense} onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)} className='rounded w-24 border border-gray-300 p-2' />
                                            </td>
                                        }
                                        <td className="p-2 text-gray-700 font-bold">
                                            ₱ {(cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense)?.toLocaleString('en-US')}
                                        </td>
                                        <td className="p-2 text-gray-700 text-center">
                                            <input
                                                type="number"
                                                name={'target_retirementAmntPercent'}
                                                defaultValue={cashflow.Cash_Flow_Data.target_retirement}
                                                onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                                className='rounded w-16 border border-gray-300 p-2' /> %

                                        </td>
                                        <td className="p-2 text-gray-700 font-bold">
                                            ₱ {((cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense) * ((cashflow.Cash_Flow_Data.target_retirement / 100)))?.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                            ))}
                            <tr>
                                <td className="px-4 py-5 font-bold uppercase text-gray-900 text-center">Other Expenses:</td>
                                <td className="px-4 py-2 text-gray-700"></td>
                                <td className="px-4 py-2 text-gray-700"></td>
                                <td className="px-4 py-2 text-gray-700"></td>
                                <td className="px-4 py-2 text-gray-700"></td>
                                <td className="px-4 py-2 text-gray-700"><MdLibraryAdd className='cursor-pointer text-base' onClick={() => setShowOthersAddForm(!showOthersAddForm)} /></td>
                            </tr>
                            {showOthersAddForm &&
                                <>
                                    {inputOthers.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-2 font-medium text-gray-900 text-center">
                                                <input type="text" name={'cfl_description'} value={item.cfl_description} onChange={(e) => handleChangeInputOthers(e, idx)} className='h-10 rounded w-full border border-gray-300 p-2' />

                                            </td>
                                            <td className="p-2 text-gray-700">
                                                ₱ <input type="number" name={'cfda_client_amount_expense'} value={item.cfda_client_amount_expense} onChange={(e) => handleChangeInputOthers(e, idx)} className='rounded w-24 border border-gray-300 p-2' />
                                            </td>
                                            {spouseDetails !== 'No Spouse' &&

                                                <td className="p-2 text-gray-700">
                                                    ₱ <input type="number" name={'cfda_spouse_amount_expense'} value={item.cfda_spouse_amount_expense} onChange={(e) => handleChangeInputOthers(e, idx)} className='rounded w-24 border border-gray-300 p-2' />
                                                </td>
                                            }
                                            <td className="p-2 text-gray-700 font-bold">
                                                ₱ {(parseInt(item.cfda_client_amount_expense) + parseInt(item.cfda_spouse_amount_expense))?.toLocaleString('en-US')}
                                            </td>
                                            <td className="p-2 text-gray-700 text-center">
                                                <input
                                                    type="number"
                                                    name={'target_retirementAmntPercent'}
                                                    value={item.target_retirementAmntPercent}
                                                    onChange={(e) => handleChangeInputOthers(e, idx)}
                                                    className='rounded w-16 border border-gray-300 p-2' /> %
                                            </td>
                                            <td className="p-2 text-gray-700 ">
                                                <span className='font-bold'>
                                                    ₱ {((parseInt(item.cfda_client_amount_expense) + parseInt(item.cfda_spouse_amount_expense)) * (parseInt(item.target_retirementAmntPercent) / 100))?.toLocaleString('en-US')}

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
                                        <td className="px-4 py-2 text-gray-700">
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
                            {cashFlowList.CashFlowList_OutFlow?.filter((cfl) => cfl.is_other === "Yes")?.map((cashflow, idx) => (

                                <tr key={idx}>
                                    <td className="px-4 py-2 font-medium text-gray-900">{cashflow.cfl_description}</td>
                                    <td className="p-2 text-gray-700">
                                        ₱ <input type="number" name={'cfda_client_amount_expense'} defaultValue={cashflow.Cash_Flow_Data.cfda_client_amount_expense} onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)} className='rounded w-24 border border-gray-300 p-2' />

                                    </td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="p-2 text-gray-700">
                                            ₱ <input type="number" name={'cfda_spouse_amount_expense'} defaultValue={cashflow.Cash_Flow_Data.cfda_spouse_amount_expense} onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)} className='rounded w-24 border border-gray-300 p-2' />

                                        </td>
                                    }
                                    <td className="p-2 text-gray-700 font-bold">
                                        ₱ {(cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense)?.toLocaleString('en-US')}
                                    </td>
                                    <td className="p-2 text-gray-700 text-center">
                                        <input
                                            type="number"
                                            name={'target_retirementAmntPercent'}
                                            defaultValue={cashflow.Cash_Flow_Data.target_retirement}
                                            onChange={(e) => handleEditCashflowData(e, cashflow.cfl_id, cashflow.Cash_Flow_Data.cfd_id)}
                                            className='rounded w-16 border border-gray-300 p-2' /> %

                                    </td>
                                    <td className="p-2 text-gray-700 font-bold">
                                        ₱ {((cashflow.Cash_Flow_Data.cfda_client_amount_expense + cashflow.Cash_Flow_Data.cfda_spouse_amount_expense) * ((cashflow.Cash_Flow_Data.target_retirement / 100)))?.toLocaleString('en-US')}
                                    </td>
                                </tr>
                            ))}

                            {/* Total Monthly Cash Outflows */}
                            <tr className='font-bold'>
                                <td className="px-4 py-2 font-bold text-gray-900 text-right">Total MONTHLY Cash Outflows:</td>
                                <td className="p-2 text-gray-700">₱ {(sumOfCfdaClientAmountExpenseOnChange ? sumOfCfdaClientAmountExpenseOnChange : sumOfCfdaClientAmount)?.toLocaleString('en-US')}</td>
                                {spouseDetails !== 'No Spouse' &&
                                    <td className="p-2 text-gray-700">₱ {(sumOfCfdaSpouseAmountExpenseOnChange ? sumOfCfdaSpouseAmountExpenseOnChange : sumOfCfdaSpouseAmount)?.toLocaleString('en-US')}</td>
                                }
                                <td className="p-2 text-gray-700">₱ {(totalOfClientAndSpouseExpenseOnchange ? totalOfClientAndSpouseExpenseOnchange : totalOfClientAndSpouseExpense)?.toLocaleString('en-US')}</td>
                                <td></td>
                                <td className="p-2 text-gray-700">₱ {(totalRetirementOnChange ? totalRetirementOnChange : totalRetirement)?.toLocaleString('en-US')}</td>
                            </tr>
                            {/* Total Annual Cash Outflow */}
                            <tr className='font-bold'>
                                <td className="px-4 py-2 font-bold text-gray-900 text-right">Total ANNUAL Cash Outflows:</td>
                                <td className="p-2 text-gray-700">₱ {((sumOfCfdaClientAmountExpenseOnChange ? sumOfCfdaClientAmountExpenseOnChange : sumOfCfdaClientAmount) * 12)?.toLocaleString('en-US')}</td>
                                {spouseDetails !== 'No Spouse' &&
                                    <td className="p-2 text-gray-700">₱ {((sumOfCfdaSpouseAmountExpenseOnChange ? sumOfCfdaSpouseAmountExpenseOnChange : sumOfCfdaSpouseAmount) * 12)?.toLocaleString('en-US')}</td>
                                }
                                <td className="p-2 text-gray-700">₱ {((totalOfClientAndSpouseExpenseOnchange ? totalOfClientAndSpouseExpenseOnchange : totalOfClientAndSpouseExpense) * 12)?.toLocaleString('en-US')}</td>
                                <td></td>
                                <td className="p-2 text-gray-700">₱ {((totalRetirementOnChange ? totalRetirementOnChange : totalRetirement) * 12)?.toLocaleString('en-US')}</td>
                            </tr>

                            {/* Target CASH OUTFLOW PER YEAR */}
                            {cashFlowList.Cash_Flow_Analysis?.length > 0 && cashFlowList.Cash_Flow_Analysis[0]?.target_cashoutflow_client !== null ?
                                cashFlowList.Cash_Flow_Analysis?.map((cfa, idx) => (
                                    <tr key={idx} className='font-bold'>
                                        <td className="px-4 py-2 font-bold text-gray-900 text-right">Target Cash Outflow Per Year</td>
                                        <td className="px-4 py-2 text-gray-700 text-center">
                                            ₱ <input
                                                type="number"
                                                name='target_cashoutflow_client'
                                                defaultValue={cfa.target_cashoutflow_client}
                                                className='rounded w-24 border border-gray-300 p-2'
                                                onChange={handleChangeTargetCashOutflow} />
                                            {/* ₱ {cfa.target_cashoutflow_client} */}
                                        </td>
                                        {spouseDetails !== 'No Spouse' && cashFlowList.Cash_Flow_Analysis[0]?.target_cashoutflow_spouse !== null &&
                                            <td className="px-4 py-2 text-gray-700 text-center">
                                                ₱ <input
                                                    type="number"
                                                    name='target_cashoutflow_spouse'
                                                    defaultValue={cfa.target_cashoutflow_spouse}
                                                    className='rounded w-24 border border-gray-300 p-2'
                                                    onChange={handleChangeTargetCashOutflow} />
                                                {/* ₱ {cfa.target_cashoutflow_spouse} */}
                                            </td>
                                        }
                                        <td className="px-4 py-2 text-gray-700 text-center">
                                            ₱ {(targetCashInflow.target_cashoutflow_client !== 0 || targetCashInflow.target_cashoutflow_spouse !== 0 ? parseInt(targetCashInflow.target_cashoutflow_client) + parseInt(targetCashInflow.target_cashoutflow_spouse) : cfa.target_cashoutflow_client + cfa.target_cashoutflow_spouse)?.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr className='font-bold'>
                                    <td className="px-4 py-2 font-bold text-gray-900 text-right">Target Cash Outflow Per Year</td>
                                    <td className="px-4 py-2 text-gray-700 text-center">
                                        ₱ <input
                                            type="number"
                                            name='target_cashoutflow_client'
                                            className='rounded w-24 border border-gray-300 p-2'
                                            onChange={handleChangeTargetCashOutflow} />
                                    </td>
                                    {spouseDetails !== 'No Spouse' &&
                                        <td className="px-4 py-2 text-gray-700 text-center">
                                            ₱ <input
                                                type="number"
                                                name='target_cashoutflow_spouse'
                                                className='rounded w-24 border border-gray-300 p-2'
                                                onChange={handleChangeTargetCashOutflow} />
                                        </td>
                                    }
                                    <td className="px-4 py-2 text-gray-700 text-center">
                                        ₱ {targetCashInflow.target_cashoutflow_client !== 0 || targetCashInflow.target_cashoutflow_spouse !== 0 ? (parseInt(targetCashInflow.target_cashoutflow_client) + parseInt(targetCashInflow.target_cashoutflow_spouse))?.toLocaleString('en-US') : 0}
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>

                <div className='flex my-14'>
                    <p>Would you like your financial advisor to suggest ways to reduce your cashflows?</p>
                    <div className='ml-8 flex item-center'>
                        {cashFlowList.Cash_Flow_Analysis?.length > 0 ?
                            <>
                                <label htmlFor="yesRadio" className='mr-1'>Yes</label>
                                <input id='yesRadio' defaultChecked={cashFlowList.Cash_Flow_Analysis[0]?.reduce_cf_attempt && cashFlowList.Cash_Flow_Analysis[0]?.reduce_cf_attempt === 1} type="radio" name="reduce_cf_attempt" value={1} className='mr-5' onChange={handleChangeRadioButton} />
                                <label htmlFor="noRadio" className='mr-1'>No</label>
                                <input id='noRadio' defaultChecked={cashFlowList.Cash_Flow_Analysis[0]?.reduce_cf_attempt && cashFlowList.Cash_Flow_Analysis[0]?.reduce_cf_attempt === 0} type="radio" name="reduce_cf_attempt" value={0} onChange={handleChangeRadioButton} />

                                {cashFlowList.Cash_Flow_Analysis[0]?.reduce_cf_attempt === 1 && (
                                    <Link href={`/admin/clients/cash-flow/cash-outflow/target-budget-co/${clientID}`}>
                                        <MdRemoveRedEye className='ml-5 text-lg cursor-pointer' />
                                    </Link>
                                )}
                            </>
                            :
                            <>
                                <label htmlFor="yesRadio" className='mr-1'>Yes</label>
                                <input id='yesRadio' type="radio" name="reduce_cf_attempt" value={1} className='mr-5' onChange={handleChangeRadioButton} />
                                <label htmlFor="noRadio" className='mr-1'>No</label>
                                <input id='noRadio' type="radio" name="reduce_cf_attempt" value={0} onChange={handleChangeRadioButton} />

                                {cashFlowList.Cash_Flow_Analysis[0]?.reduce_cf_attempt === 1 && (
                                    <Link href={`/admin/clients/cash-flow/cash-outflow/target-budget-co/${clientID}`}>
                                        <MdRemoveRedEye className='ml-5 text-lg cursor-pointer' />
                                    </Link>
                                )}
                            </>
                        }
                    </div>
                </div>

                <div className='my-5'>
                    <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">
                        Retirement Cash Flow Needs
                    </div>
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr className='font-bold'>
                                <td className='px-4 py-2'>Total Projected Annual Retirement Expenses (Client and spouse (if applicable)</td>
                                <td className='px-4 py-2'>₱ {((totalOfClientAndSpouseExpenseOnchange ? totalOfClientAndSpouseExpenseOnchange : totalOfClientAndSpouseExpense) * 12)?.toLocaleString('en-US')}</td>
                            </tr>
                            <tr>
                                <td className='px-4 py-2'>Share of client in Retirement Fund Needs</td>
                                {cashFlowList.Cash_Flow_Analysis?.length > 0 && cashFlowList.Cash_Flow_Analysis[0]?.clientshare_rfn !== null
                                    ?
                                    <>
                                        <td className='px-4 py-2 text-center'>
                                            <input
                                                type="number"
                                                name={'clientshare_rfn'}
                                                onChange={handleChangeShareRFN}
                                                defaultValue={cashFlowList.Cash_Flow_Analysis[0]?.clientshare_rfn}
                                                className='rounded w-14 border border-gray-300 p-2' /> %
                                        </td>
                                        <td className='px-4 py-2 text-center font-bold'>₱ {(((sumOfCfdaClientAmount + sumOfCfdaSpouseAmount) * 12) * (cashFlowList.Cash_Flow_Analysis[0].clientshare_rfn / 100))?.toLocaleString('en-US')}</td>
                                    </>
                                    :
                                    <>
                                        <td className='px-4 py-2 text-center'>
                                            <input
                                                type="number"
                                                name={'clientshare_rfn'}
                                                onChange={handleChangeClientShare}
                                                value={shareRFN.clientshare_rfn}
                                                className='rounded w-14 border border-gray-300 p-2' /> %
                                        </td>
                                        <td className='px-4 py-2 text-center font-bold'>₱ {(((sumOfCfdaClientAmountExpenseOnChange + sumOfCfdaSpouseAmountExpenseOnChange) * 12) * (shareRFN.clientshare_rfn / 100))?.toLocaleString('en-US')}</td>
                                    </>

                                }
                            </tr>
                            {spouseDetails !== 'No Spouse' &&
                                <tr>
                                    <td className='px-4 py-2'>Share of spouse in Retirement Fund Needs</td>
                                    {cashFlowList.Cash_Flow_Analysis?.length > 0 && cashFlowList.Cash_Flow_Analysis[0]?.spouseshare_rfn !== null
                                        ?
                                        <>
                                            <td className='px-4 py-2 text-center'>
                                                <input
                                                    type="number"
                                                    name={'spouseshare_rfn'}
                                                    onChange={handleChangeShareRFN}
                                                    defaultValue={cashFlowList.Cash_Flow_Analysis[0]?.spouseshare_rfn}
                                                    className='rounded w-14 border border-gray-300 p-2' /> %
                                            </td>
                                            <td className='px-4 py-2 text-center font-bold'>₱ {(((sumOfCfdaClientAmount + sumOfCfdaSpouseAmount) * 12) * (cashFlowList.Cash_Flow_Analysis[0].spouseshare_rfn / 100))?.toLocaleString('en-US')}</td>
                                        </>
                                        :
                                        <>
                                            <td className='px-4 py-2 text-center'>
                                                <input
                                                    type="number"
                                                    name={'spouseshare_rfn'}
                                                    value={shareRFN.spouseshare_rfn}
                                                    onChange={handleChangeSpouseShare}
                                                    className='rounded w-14 border border-gray-300 p-2' /> %
                                            </td>
                                            <td className='px-4 py-2 text-center font-bold'>₱ {(((sumOfCfdaClientAmountExpenseOnChange + sumOfCfdaSpouseAmountExpenseOnChange) * 12) * (shareRFN.spouseshare_rfn / 100))?.toLocaleString('en-US')}</td>

                                        </>
                                    }
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='sticky bottom-0 bg-white  py-4 flex justify-between items-center mt-5'>
                <div>
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
                    {unsavedEditError &&
                        <span className='text-red-500 ml-4'>Changes not yet saved </span>
                    }

                </div>

                <div>
                    <button
                        type="submit"
                        onClick={handleSubmitNewDataOutflow}
                        disabled={submitButtonDisabled}
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

export default CashOutflowPage