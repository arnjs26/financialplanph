'use client'
import { API_BASE_URL, agent_id, api, webUser } from '@/app/lib/libapi'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdLibraryAdd } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const FamilyCompositionPage = ({ params }) => {
    const { clientID } = params

    const [clientInfo, setClientInfo] = useState([])
    const [inputData, setInputData] = useState([])
    const [showFatherMotherForm, setShowFatherMotherForm] = useState(false)
    const [showGrandChildrensForm, setShowGrandChildrensForm] = useState(false)
    const [showPartnerOrSpouse, setShowPartnerOrSpouse] = useState(true)
    const [showChildrensForm, setShowChildrensForm] = useState(false)
    const [showChildrensAddForm, setShowChildrensAddForm] = useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [familyCompositionList, setFamilyCompositionList] = useState([])
    const [childrenDetails, setChildrenDetails] = useState([{
        fc_id: 0,
        first_name: '',
        last_name: '',
        middle_initial: '',
        type: 2,
        withWithout_children: null,
        birthday: '',
        health_condition: 0,
        status: 0,
        revocable_living: '',
        revocable_last: '',
    }])

    useEffect(() => {
        fetchFamilyCompositionList()
        fetchClienPersonalInfo()
    }, [])

    const fetchFamilyCompositionList = async () => {
        try {
            const res = await api.getFamilyCompositionList(clientID);
            setFamilyCompositionList(res?.Family_Composition)
        } catch (error) {
            console.error("Error fetching data from the API FETCH FAMILY COMPOSITION LIST: ", error);
        }
    }

    const fetchClienPersonalInfo = async () => {

        try {
            const res = await api.getClientInfo(clientID, agent_id);
            setClientInfo(res.Client?.find((item) => item.Client_ID === clientID))
        } catch (error) {
            console.error("Error fetching data from the API FETCH CLIENT PERSONAL INFO: ", error);
        }
    }
    const handleChangeInput = (e, fc_id, type) => {
        setSubmitButtonDisabled(false)
        const { name, value } = e.target;


        // Make a copy of the existing formData array
        const updatedFormData = [...inputData];

        // Check if formData already has an item with the same sfp_id
        const existingItemIndex = inputData.findIndex((item) => item.type === type);

        if (existingItemIndex !== -1) {
            // If an item with the same sfp_id exists, update its values
            updatedFormData[existingItemIndex][name] = value;
        } else {
            // If an item with the same sfp_id doesn't exist, create a new object and push it
            const newItem = {
                fc_id,
                first_name: '',
                last_name: '',
                middle_initial: '',
                type,
                withWithout_children: null,
                birthday: '',
                health_condition: 0,
                status: 0,
                revocable_living: '',
                revocable_last: '',
            };

            // Update the value of the specified property in the object
            newItem[name] = value;

            // Push the new object to the array
            updatedFormData.push(newItem);
        }

        // Clear partner fields if spouse is enabled
        if (showPartnerOrSpouse) {
            const partnerIndex = updatedFormData.findIndex((item) => item.type === 0);
            if (partnerIndex !== -1) {
                updatedFormData.splice(partnerIndex, 1);
            }
        }

        // Clear spouse fields if partner is enabled
        if (!showPartnerOrSpouse) {
            const spouseIndex = updatedFormData.findIndex((item) => item.type === 1);
            if (spouseIndex !== -1) {
                updatedFormData.splice(spouseIndex, 1);
            }
        }

        // Update the state with the new formData
        setInputData(updatedFormData);
    }

    const handleChangeEditFamilyCompositionData = (e, fc_id, type) => {
        setSubmitButtonDisabled(false)
        const { name, value } = e.target;

        // Make a copy of the existing formData array
        const updatedFormData = [...familyCompositionList];

        // Check if formData already has an item with the same sfp_id
        const existingItemIndex = familyCompositionList.findIndex((item) => item.fc_id === fc_id);

        if (existingItemIndex !== -1) {
            // If an item with the same sfp_id exists, update its values
            updatedFormData[existingItemIndex][name] = value;
        } else {
            // If an item with the same sfp_id doesn't exist, create a new object and push it
            const newItem = {
                fc_id,
                first_name: '',
                last_name: '',
                middle_initial: '',
                type,
                withWithout_children: null,
                birthday: '',
                health_condition: 0,
                status: 0,
                revocable_living: '',
                revocable_last: '',
            };

            // Update the value of the specified property in the object
            newItem[name] = value;

            // Push the new object to the array
            updatedFormData.push(newItem);
        }

        // Update the state with the new formData
        setFamilyCompositionList(updatedFormData);
    }

    const handleChange = (e) => {
        const { value } = e.target

        // deceased

        if (value === "no") {
            setShowFatherMotherForm(true)
        } else {
            setShowFatherMotherForm(false)
        }

        if (value === 'deceased') {
            setShowGrandChildrensForm(true)
        } else {
            setShowGrandChildrensForm(false)
        }

    }

    const handleChangeCivilStatusHaveChildren = (e) => {

        const { name, value } = e.target

        if (name === 'Civil_Status') {
            setClientInfo({ ...clientInfo, [name]: value })
            if (value === 'single') setShowPartnerOrSpouse(true)
            if (value === 'married') setShowPartnerOrSpouse(false)
        }


        if (name === 'have_children') {
            if (value === 'yes') setShowChildrensForm(true)
            if (value === 'no') setShowChildrensForm(false)
        }

    }

    const handleChangeInputChildrensDetails = (event, index) => {
        setSubmitButtonDisabled(false)

        let data = [...childrenDetails];
        data[index][event.target.name] = event.target.value;
        setChildrenDetails(data);
    }

    const AddChildrenForm = () => {
        let newItem = {
            fc_id: 0,
            first_name: '',
            last_name: '',
            middle_initial: '',
            type: 2,
            withWithout_children: null,
            birthday: '',
            health_condition: 0,
            status: 0,
            revocable_living: '',
            revocable_last: '',
        }

        setChildrenDetails([...childrenDetails, newItem])
    }

    const removeOtherChildrenFields = (e, index) => {
        e.preventDefault()
        let data = [...childrenDetails];
        data.splice(index, 1)
        setChildrenDetails(data)
    }

    const handleSubmitFamilyComposition = async () => {
        // 0 - Spouse, 1 - Partner, 2 - Children, 3 - Father, 4 - Mother
        // 1 - Healthy, 2 - With Medical Condition, 3 - Person with Disability, 4 - Deceased
        // 1 - Legitimate, 2 - Illegitimate

        let submitData = [...inputData]

        let childrenDetailsUpdated = childrenDetails.filter((item) => {
            return item.first_name !== '' || item.last_name !== '' || item.middle_initial !== '';
        });


        if (childrenDetailsUpdated.length !== 0) {

            submitData.unshift(...childrenDetailsUpdated)

            if (inputData.length === 0) {
                familyCompositionList.unshift(...childrenDetailsUpdated)
            }
        }
        let submitDataWithEmptyFields = submitData.some((item) => {
            return item.first_name === '' || item.last_name === '' || item.middle_initial === '' || item.health_condition === '';
        });

        if (submitDataWithEmptyFields) {
            return toast.error('There are Empty fields')
        }

        // console.log('input data', inputData)
        // console.log('input Childrens Details', childrenDetails)
        // console.log('submit data', submitData)

        let data = [
            {
                "data":
                    familyCompositionList.length === 0 ?
                        submitData.map((item, idx) => (
                            [
                                { "fc_id": 0 },
                                { "client_id": clientID },
                                { "first_name": item.first_name },
                                { "last_name": item.last_name },
                                { "middle_initial": item.middle_initial },
                                { "type": item.type },
                                { "withWithout_children": item["withWithout_children" + idx] ?? 1 },
                                { "birthday": item.birthday },
                                { "date_married": item.married_date ?? '' },
                                { "health_condition": item.health_condition },
                                { "status": item.status },
                                { "revocable_living": item.revocable_living ?? '' },
                                { "revocable_last": item.revocable_last ?? '' }
                            ]
                        ))
                        :
                        familyCompositionList.map((item, idx) => (
                            [
                                { "fc_id": item.fc_id },
                                { "client_id": clientID },
                                { "first_name": item.first_name },
                                { "last_name": item.last_name },
                                { "middle_initial": item.middle_initial },
                                { "type": item.type },
                                { "withWithout_children": item["withWithout_children" + idx] ?? 1 },
                                { "birthday": item.birthday },
                                { "date_married": item.date_married ?? '' },
                                { "health_condition": item.health_condition },
                                { "status": item.status },
                                { "revocable_living": item.revocable_living ?? '' },
                                { "revocable_last": item.revocable_last ?? '' }
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

        // return console.log('data', data)

        const res = await axios.post(`${API_BASE_URL}/newFamilyComposition`, data);

        if (res.status === 200) {
            toast.success("Successfully Saved");
            setFamilyCompositionList(res.data.Family_Composition)
            setSubmitButtonDisabled(true)
        }

    }

    return (
        <div className='mt-4 bg-white p-2 rounded-lg'>

            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
                <p className="mt-2 text-sm">
                    Family composition is important in drafting a financial plan because it helps determine the financial needs and goals of the family. Factors such as the number of dependents, their ages, and individual circumstances impact expenses, income sources, insurance needs, education planning, retirement goals, and estate planning. Understanding the family composition allows for tailored financial strategies to meet the specific needs and priorities of the family members.
                </p>
            </div>
            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">FAMILY COMPOSITION</div>

            <div className="mt-8 px-2  grid grid-cols-6 gap-6 items-center">
                <div className="col-span-3">
                    <label htmlFor="civil_status" className="flex items-center gap-4">
                        <span className="text-sm text-gray-700">
                            Civil Status *
                        </span>
                        <select
                            name="Civil_Status"
                            id="civil_status"
                            value={clientInfo.Civil_Status}
                            className="p-2 rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                            onChange={handleChangeCivilStatusHaveChildren}
                        >
                            <option value="">Please select</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </label>
                </div>
                <div className="col-span-3">
                    <label htmlFor="MarketingAccept" className="flex items-center gap-4">
                        <span className="text-sm text-gray-700">
                            Does Client have Children *
                        </span>

                        <div className='flex flex-col'>
                            <span>
                                <input
                                    type="radio"
                                    id="yes"
                                    name="have_children"
                                    value="yes"
                                    className='mr-1'
                                    defaultChecked={'no'}
                                    onChange={handleChangeCivilStatusHaveChildren}
                                />
                                <label htmlFor="yes" className=" text-sm font-medium text-gray-700">With Children</label>
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    id="no"
                                    name="have_children"
                                    value="no"
                                    className='mr-1'
                                    defaultChecked={'no'}
                                    onChange={handleChangeCivilStatusHaveChildren}
                                />
                                <label htmlFor="no" className=" text-sm font-medium text-gray-700">Without Children</label>
                            </span>
                        </div>
                    </label>
                </div>
                <div className='col-span-6'>
                    <p>YOUR LEGAL HEIRS ARE YOUR SPOUSE AND CHILDREN (IF ANY) OR PARENTS, PLEASE INPUT THEIR DETAILS BELOW:</p>
                </div>

                {familyCompositionList.length !== 0 ?

                    familyCompositionList.map((fam, idx) => (
                        <section className='col-span-6' key={idx}>
                            {
                                fam.type === 1 ?
                                    <section key={idx} className='col-span-6'>
                                        {/* Partners Details 1 */}
                                        <div className='col-span-6'>
                                            <h2 className='text-base font-medium '>Partner Details</h2>
                                        </div>

                                        <div className="col-span-6 ml-2">

                                            <div className='grid grid-cols-6 gap-2'>
                                                <div>
                                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                        First Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="FirstName"
                                                        name="first_name"
                                                        value={fam.first_name}
                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 1)}
                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                    />
                                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                        Last Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="LastName"
                                                        name="last_name"
                                                        value={fam.last_name}
                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 1)}
                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                    />
                                                    <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                                        Middle Initial
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="MiddleInitial"
                                                        name="middle_initial"
                                                        value={fam.middle_initial}
                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 1)}
                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="Birthdate" className="block text-sm font-medium text-gray-700">
                                                        Birthday
                                                    </label>

                                                    <input
                                                        type="date"
                                                        id="Birthdate"
                                                        name="birthday"
                                                        value={fam.birthday}
                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 1)}
                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                                    <select
                                                        name="health_condition"
                                                        id="health_condition"
                                                        value={fam.health_condition}
                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 1)}
                                                        className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                                    >
                                                        <option value="">Please select</option>
                                                        <option value="1">Healthy</option>
                                                        <option value="2">With Medical Condition</option>
                                                        <option value="3">Person with Disability</option>
                                                        <option value="4">Deceased</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                        Distribution Rule - Revocable Living Trust
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="RevocableLivingTrust"
                                                        name="revocable_living"
                                                        value={fam.revocable_living}
                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 1)}
                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                        Distribution Rule - Revocable Last Will and Testament
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="RevocableLastWillandTestament"
                                                        name="revocable_last"
                                                        value={fam.revocable_last}
                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 1)}
                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </section>
                                    : fam.type === 0 ?
                                        <section className='col-span-6'>
                                            {/* Spouse Details 0 */}
                                            <div className='col-span-6'>
                                                <h2 className='text-base font-medium '>Spouse Details</h2>
                                            </div>

                                            <div className="col-span-6 ml-2">

                                                <div className='grid grid-cols-6 gap-2'>
                                                    <div>
                                                        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                            First Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="FirstName"
                                                            name="first_name"
                                                            value={fam.first_name}
                                                            onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 0)}
                                                            className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                        />
                                                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                            Last Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="LastName"
                                                            name="last_name"
                                                            value={fam.last_name}
                                                            onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 0)}
                                                            className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                        />
                                                        <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                                            Middle Initial
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="MiddleInitial"
                                                            name="middle_initial"
                                                            value={fam.middle_initial}
                                                            onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 0)}
                                                            className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="Marrieddate" className="block text-sm font-medium text-gray-700">
                                                            Date Married
                                                        </label>

                                                        <input
                                                            type="date"
                                                            id="Marrieddate"
                                                            value={fam.date_married}
                                                            name="married_date"
                                                            onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 0)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                                            Birthday
                                                        </label>

                                                        <input
                                                            type="date"
                                                            id="Birthday"
                                                            name="birthday"
                                                            value={fam.birthday}
                                                            onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 0)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                                        <select
                                                            name="health_condition"
                                                            id="health_condition"
                                                            value={fam.health_condition}
                                                            onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 0)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                                        >
                                                            <option value="">Please select</option>
                                                            <option value="1">Healthy</option>
                                                            <option value="2">With Medical Condition</option>
                                                            <option value="3">Person with Disability</option>
                                                            <option value="4">Deceased</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                            Distribution Rule - Revocable Living Trust
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="RevocableLivingTrust"
                                                            name="revocable_living"
                                                            value={fam.revocable_living}
                                                            onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 0)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                            Distribution Rule - Revocable Last Will and Testament
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="RevocableLastWillandTestament"
                                                            name="revocable_last"
                                                            value={fam.revocable_last}
                                                            onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 0)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </section>
                                        : fam.type === 2 ?
                                            <section className='col-span-6'>
                                                {/* Children 2 */}
                                                <div className='col-span-6 flex gap-2'>
                                                    <h2 className='text-base font-medium '>Childrens Details </h2>
                                                    <span><MdLibraryAdd size={20} onClick={AddChildrenForm} className='cursor-pointer' /></span>
                                                </div>

                                                <div className="col-span-6 ml-2 space-y-4">
                                                    {/* Add Childrens Form */}
                                                    {showChildrensAddForm &&
                                                        childrenDetails.map((item, idx) => (
                                                            <div key={idx} className='grid grid-cols-7 gap-2'>
                                                                <div>
                                                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                                        First Name
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="FirstName"
                                                                        name="first_name"
                                                                        value={item.first_name}
                                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                                        Last Name
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="LastName"
                                                                        name="last_name"
                                                                        value={item.last_name}
                                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                    <label htmlFor="MiddleName" className="block text-sm font-medium text-gray-700">
                                                                        Middle Initial
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="MiddleName"
                                                                        name="middle_initial"
                                                                        value={item.middle_initial}
                                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>

                                                                <div className='flex flex-col ml-4'>
                                                                    <span>
                                                                        <input
                                                                            type="radio"
                                                                            id={`have_childrenchildren${idx}`}
                                                                            name={`withWithout_children${idx}`}
                                                                            value={0}
                                                                            onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                            className='mr-1'
                                                                        />
                                                                        <label htmlFor={`have_childrenchildren${idx}`} className=" text-sm font-medium text-gray-700">With Children</label>

                                                                    </span>

                                                                    <span>
                                                                        <input
                                                                            type="radio"
                                                                            id={`without_childrenchildren${idx}`}
                                                                            name={`withWithout_children${idx}`}
                                                                            value={1}
                                                                            onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                            className='mr-1'
                                                                        />
                                                                        <label htmlFor={`without_childrenchildren${idx}`} className=" text-sm font-medium text-gray-700">Without Children</label>

                                                                    </span>

                                                                </div>

                                                                <div>
                                                                    <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                                                        Birthday
                                                                    </label>

                                                                    <input
                                                                        type="date"
                                                                        id="Birthday"
                                                                        name="birthday"
                                                                        value={item.birthday}
                                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                                                    <select
                                                                        id="health_condition"
                                                                        name="health_condition"
                                                                        value={item.health_condition}
                                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"

                                                                    >
                                                                        <option value="">Please select</option>
                                                                        <option value="1">Healthy</option>
                                                                        <option value="2">With Medical Condition</option>
                                                                        <option value="3">Person with Disability</option>
                                                                        <option value="4">Deceased</option>
                                                                    </select>
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700"> Status </label>

                                                                    <select
                                                                        name="status"
                                                                        id="status"
                                                                        value={item.status}
                                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"

                                                                    >
                                                                        <option value="">Please select</option>
                                                                        <option value="1">Legitimate</option>
                                                                        <option value="2">Illegitimate</option>
                                                                    </select>
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                                        Distribution Rule - Revocable Living Trust
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="RevocableLivingTrust"
                                                                        name="revocable_living"
                                                                        value={item.revocable_living}
                                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                                        Distribution Rule - Revocable Last Will and Testament
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="RevocableLastWillandTestament"
                                                                        name="revocable_last"
                                                                        value={item.revocable_last}
                                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                    <div key={idx} className='grid grid-cols-7 gap-2'>
                                                        <div>
                                                            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                                First Name
                                                            </label>

                                                            <input
                                                                type="text"
                                                                id="FirstName"
                                                                name="first_name"
                                                                value={fam.first_name}
                                                                onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                            />
                                                            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                                Last Name
                                                            </label>

                                                            <input
                                                                type="text"
                                                                id="LastName"
                                                                name="last_name"
                                                                value={fam.last_name}
                                                                onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                            />
                                                            <label htmlFor="MiddleName" className="block text-sm font-medium text-gray-700">
                                                                Middle Initial
                                                            </label>

                                                            <input
                                                                type="text"
                                                                id="MiddleName"
                                                                name="middle_initial"
                                                                value={fam.middle_initial}
                                                                onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                            />
                                                        </div>

                                                        <div className='flex flex-col ml-4'>
                                                            <span>
                                                                <input
                                                                    type="radio"
                                                                    id={`have_childrenchildren${idx}`}
                                                                    name="withWithout_children"
                                                                    value={0}
                                                                    defaultChecked={fam.withWithout_children === 0}
                                                                    onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                    className='mr-1'
                                                                />
                                                                <label htmlFor={`have_childrenchildren${idx}`} className=" text-sm font-medium text-gray-700">With Children</label>

                                                            </span>

                                                            <span>
                                                                <input
                                                                    type="radio"
                                                                    id={`without_childrenchildren${idx}`}
                                                                    name="withWithout_children"
                                                                    value={1}
                                                                    defaultChecked={fam.withWithout_children === 1}
                                                                    onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                    className='mr-1'
                                                                />
                                                                <label htmlFor={`without_childrenchildren${idx}`} className=" text-sm font-medium text-gray-700">Without Children</label>

                                                            </span>

                                                        </div>

                                                        <div>
                                                            <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                                                Birthday
                                                            </label>

                                                            <input
                                                                type="date"
                                                                id="Birthday"
                                                                name="birthday"
                                                                value={fam.birthday}
                                                                onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                                            <select
                                                                id="health_condition"
                                                                name="health_condition"
                                                                value={fam.health_condition}
                                                                onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"

                                                            >
                                                                <option value="">Please select</option>
                                                                <option value="1">Healthy</option>
                                                                <option value="2">With Medical Condition</option>
                                                                <option value="3">Person with Disability</option>
                                                                <option value="4">Deceased</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700"> Status </label>

                                                            <select
                                                                name="status"
                                                                id="status"
                                                                value={fam.status}
                                                                onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"

                                                            >
                                                                <option value="">Please select</option>
                                                                <option value="1">Legitimate</option>
                                                                <option value="2">Illegitimate</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                                Distribution Rule - Revocable Living Trust
                                                            </label>

                                                            <input
                                                                type="text"
                                                                id="RevocableLivingTrust"
                                                                name="revocable_living"
                                                                value={fam.revocable_living}
                                                                onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                                Distribution Rule - Revocable Last Will and Testament
                                                            </label>

                                                            <input
                                                                type="text"
                                                                id="RevocableLastWillandTestament"
                                                                name="revocable_last"
                                                                value={fam.revocable_last}
                                                                onChange={(e) => handleChangeEditFamilyCompositionData(e, fam.fc_id, fam.type)}
                                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            : fam.type === 3 ?
                                                <section className='col-span-6'>

                                                    {/* Father's Details 3*/}
                                                    <div className='col-span-6'>
                                                        <h2 className='text-base font-medium '>Fathers Details</h2>
                                                    </div>

                                                    <div className="col-span-6 ml-2">

                                                        <div className='grid grid-cols-6 gap-2'>
                                                            <div>
                                                                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                                    First Name
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    id="FirstName"
                                                                    name="first_name"
                                                                    value={fam.first_name}
                                                                    onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 3)}
                                                                    className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                />
                                                                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                                    Last Name
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    id="LastName"
                                                                    name="last_name"
                                                                    value={fam.last_name}
                                                                    onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 3)}
                                                                    className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                />
                                                                <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                                                    Middle Initial
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    id="MiddleInitial"
                                                                    name="middle_initial"
                                                                    value={fam.middle_initial}
                                                                    onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 3)}
                                                                    className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                                                    Birthday
                                                                </label>

                                                                <input
                                                                    type="date"
                                                                    id="Birthday"
                                                                    name="birthday"
                                                                    value={fam.birthday}
                                                                    onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 3)}
                                                                    className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                                                <select
                                                                    name="health_condition"
                                                                    id="health_condition"
                                                                    value={fam.health_condition}
                                                                    onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 3)}
                                                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                                                >
                                                                    <option value="">Please select</option>
                                                                    <option value="1">Healthy</option>
                                                                    <option value="2">With Medical Condition</option>
                                                                    <option value="3">Person with Disability</option>
                                                                    <option value="4">Deceased</option>
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                                    Distribution Rule - Revocable Living Trust
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    id="RevocableLivingTrust"
                                                                    name="revocable_living"
                                                                    value={fam.revocable_living}
                                                                    onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 3)}
                                                                    className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                                    Distribution Rule - Revocable Last Will and Testament
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    id="RevocableLastWillandTestament"
                                                                    name="revocable_last"
                                                                    value={fam.revocable_last}
                                                                    onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 3)}
                                                                    className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </section>
                                                : fam.type === 4 ?
                                                    <section className='col-span-6'>
                                                        {/* Mother's Details 4*/}
                                                        <div className='col-span-6'>
                                                            <h2 className='text-base font-medium '>Mother's Details</h2>
                                                        </div>

                                                        <div className="col-span-6 ml-2">

                                                            <div className='grid grid-cols-6 gap-2'>
                                                                <div>
                                                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                                        First Name
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="FirstName"
                                                                        name="first_name"
                                                                        value={fam.first_name}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 4)}
                                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                                        Last Name
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="LastName"
                                                                        name="last_name"
                                                                        value={fam.last_name}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 4)}
                                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                    <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                                                        Middle Initial
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="MiddleInitial"
                                                                        name="middle_initial"
                                                                        value={fam.middle_initial}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 4)}
                                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                                                        Birthday
                                                                    </label>

                                                                    <input
                                                                        type="date"
                                                                        id="Birthday"
                                                                        name="birthday"
                                                                        value={fam.birthday}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 4)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                                                    <select
                                                                        id="health_condition"
                                                                        name="health_condition"
                                                                        value={fam.health_condition}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 4)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                                                    >
                                                                        <option value="">Please select</option>
                                                                        <option value="1">Healthy</option>
                                                                        <option value="2">With Medical Condition</option>
                                                                        <option value="3">Person with Disability</option>
                                                                        <option value="4">Deceased</option>
                                                                    </select>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </section>
                                                    :
                                                    <section className='col-span-6'>
                                                        <div className='col-span-6'>
                                                            <h2 className='text-base font-medium '>Grand Children's Details from Deceased Child (name of child)</h2>
                                                        </div>

                                                        <div className="col-span-6 ml-2">

                                                            <div className='grid grid-cols-6 gap-2'>
                                                                <div>
                                                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                                        First Name
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="FirstName"
                                                                        name="first_name"
                                                                        value={fam.first_name}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 5)}
                                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                                        Last Name
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="LastName"
                                                                        name="last_name"
                                                                        value={fam.last_name}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 5)}
                                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                    <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                                                        Middle Initial
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="MiddleInitial"
                                                                        name="middle_initial"
                                                                        value={fam.middle_initial}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 5)}
                                                                        className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                                                        Birthday
                                                                    </label>

                                                                    <input
                                                                        type="date"
                                                                        id="Birthday"
                                                                        name="birthday"
                                                                        value={fam.birthday}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 5)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                                                    <select
                                                                        id="health_condition"
                                                                        name="health_condition"
                                                                        value={fam.health_condition}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 5)}
                                                                    >
                                                                        <option value="">Please select</option>
                                                                        <option value="1">Healthy</option>
                                                                        <option value="2">With Medical Condition</option>
                                                                        <option value="3">Person with Disability</option>
                                                                        <option value="4">Deceased</option>
                                                                    </select>
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700"> Status </label>

                                                                    <select
                                                                        id="status"
                                                                        name="status"
                                                                        value={fam.status}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 5)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"

                                                                    >
                                                                        <option value="">Please select</option>
                                                                        <option value="1">Legitimate</option>
                                                                        <option value="2">Illegitimate</option>
                                                                    </select>
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                                        Distribution Rule - Revocable Living Trust
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="RevocableLivingTrust"
                                                                        name="revocable_living"
                                                                        value={fam.revocable_living}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 5)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                                        Distribution Rule - Revocable Last Will and Testament
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        id="RevocableLastWillandTestament"
                                                                        name="revocable_last"
                                                                        value={fam.revocable_last}
                                                                        onChange={e => handleChangeEditFamilyCompositionData(e, fam.fc_id, 5)}
                                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                            }
                        </section>
                    ))
                    :
                    <>
                        {showPartnerOrSpouse ?
                            <section className='col-span-6'>
                                {/* 1 */}
                                <div className='col-span-6'>
                                    <h2 className='text-base font-medium '>Partner Details</h2>
                                </div>

                                <div className="col-span-6 ml-2 mt-4">

                                    <div className='grid grid-cols-4 gap-2'>
                                        <div>
                                            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>

                                            <input
                                                type="text"
                                                id="FirstName"
                                                name="first_name"
                                                onChange={e => handleChangeInput(e, 0, 1)}
                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>

                                            <input
                                                type="text"
                                                id="LastName"
                                                name="last_name"
                                                onChange={e => handleChangeInput(e, 0, 1)}
                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                            <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                                Middle Initial
                                            </label>

                                            <input
                                                type="text"
                                                id="MiddleInitial"
                                                name="middle_initial"
                                                onChange={e => handleChangeInput(e, 0, 1)}
                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="Birthdate" className="block text-sm font-medium text-gray-700">
                                                Birthday
                                            </label>

                                            <input
                                                type="date"
                                                id="Birthdate"
                                                name="birthday"
                                                onChange={e => handleChangeInput(e, 0, 1)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                            <select
                                                name="health_condition"
                                                id="health_condition"
                                                onChange={e => handleChangeInput(e, 0, 1)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                            >
                                                <option value="">Please select</option>
                                                <option value="1">Healthy</option>
                                                <option value="2">With Medical Condition</option>
                                                <option value="3">Person with Disability</option>
                                                <option value="4">Deceased</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                Distribution Rule - Revocable Living Trust
                                            </label>

                                            <input
                                                type="text"
                                                id="RevocableLivingTrust"
                                                name="revocable_living"
                                                onChange={e => handleChangeInput(e, 0, 1)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />

                                            <div className='mt-4'>
                                                <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                    Distribution Rule - Revocable Last Will and Testament
                                                </label>

                                                <input
                                                    type="text"
                                                    id="RevocableLastWillandTestament"
                                                    name="revocable_last"
                                                    onChange={e => handleChangeInput(e, 0, 1)}
                                                    className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>
                            :
                            <section className='col-span-6'>
                                {/* 0 */}
                                <div className='col-span-6'>
                                    <h2 className='text-base font-medium '>Spouse Details</h2>
                                </div>

                                <div className="col-span-6 ml-2">

                                    <div className='grid grid-cols-4 gap-2'>
                                        <div>
                                            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>

                                            <input
                                                type="text"
                                                id="FirstName"
                                                name="first_name"
                                                onChange={e => handleChangeInput(e, 0, 0)}
                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>

                                            <input
                                                type="text"
                                                id="LastName"
                                                name="last_name"
                                                onChange={e => handleChangeInput(e, 0, 0)}
                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                            <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                                Middle Initial
                                            </label>

                                            <input
                                                type="text"
                                                id="MiddleInitial"
                                                name="middle_initial"
                                                onChange={e => handleChangeInput(e, 0, 0)}
                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="Marrieddate" className="block text-sm font-medium text-gray-700">
                                                Date Married
                                            </label>

                                            <input
                                                type="date"
                                                id="Marrieddate"
                                                name="married_date"
                                                onChange={e => handleChangeInput(e, 0, 0)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                            <div className='mt-4'>
                                                <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                                    Birthday
                                                </label>

                                                <input
                                                    type="date"
                                                    id="Birthday"
                                                    name="birthday"
                                                    onChange={e => handleChangeInput(e, 0, 0)}
                                                    className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                            <select
                                                name="health_condition"
                                                id="health_condition"
                                                onChange={e => handleChangeInput(e, 0, 0)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                            >
                                                <option value="">Please select</option>
                                                <option value="1">Healthy</option>
                                                <option value="2">With Medical Condition</option>
                                                <option value="3">Person with Disability</option>
                                                <option value="4">Deceased</option>
                                            </select>
                                        </div>


                                        <div>
                                            <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                Distribution Rule - Revocable Living Trust
                                            </label>

                                            <input
                                                type="text"
                                                id="RevocableLivingTrust"
                                                name="revocable_living"
                                                onChange={e => handleChangeInput(e, 0, 0)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                            <div className='mt-4'>
                                                <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                    Distribution Rule - Revocable Last Will and Testament
                                                </label>

                                                <input
                                                    type="text"
                                                    id="RevocableLastWillandTestament"
                                                    name="revocable_last"
                                                    onChange={e => handleChangeInput(e, 0, 0)}
                                                    className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </section>
                        }

                        {showChildrensForm &&
                            <section className='col-span-6'>
                                {/* Children 2 */}
                                <div className='col-span-6 flex gap-2'>
                                    <h2 className='text-base font-medium '>Childrens Details </h2>
                                    <span><MdLibraryAdd size={20} onClick={AddChildrenForm} /></span>
                                </div>

                                <div className="col-span-6 ml-2 space-y-4 mt-4">
                                    {childrenDetails.map((item, idx) => (
                                        <div key={idx} className='grid grid-cols-4 gap-2'>
                                            <div>
                                                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                    First Name
                                                </label>

                                                <input
                                                    type="text"
                                                    id="FirstName"
                                                    name="first_name"
                                                    value={item.first_name}
                                                    onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                    className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                />
                                                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                    Last Name
                                                </label>

                                                <input
                                                    type="text"
                                                    id="LastName"
                                                    name="last_name"
                                                    value={item.last_name}
                                                    onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                    className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                />
                                                <label htmlFor="MiddleName" className="block text-sm font-medium text-gray-700">
                                                    Middle Initial
                                                </label>

                                                <input
                                                    type="text"
                                                    id="MiddleName"
                                                    name="middle_initial"
                                                    value={item.middle_initial}
                                                    onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                    className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                />
                                            </div>

                                            <div className='flex flex-col ml-4'>
                                                <span>
                                                    <input
                                                        type="radio"
                                                        id={`have_childrenchildren${idx}`}
                                                        name={`withWithout_children${idx}`}
                                                        value={0}
                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                        className='mr-1'
                                                    />
                                                    <label htmlFor={`have_childrenchildren${idx}`} className=" text-sm font-medium text-gray-700">With Children</label>

                                                </span>

                                                <span>
                                                    <input
                                                        type="radio"
                                                        id={`without_childrenchildren${idx}`}
                                                        name={`withWithout_children${idx}`}
                                                        value={1}
                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                        className='mr-1'
                                                    />
                                                    <label htmlFor={`without_childrenchildren${idx}`} className=" text-sm font-medium text-gray-700">Without Children</label>

                                                </span>

                                                <div className='mt-4'>
                                                    <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                                        Birthday
                                                    </label>

                                                    <input
                                                        type="date"
                                                        id="Birthday"
                                                        name="birthday"
                                                        value={item.birthday}
                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                                <select
                                                    id="health_condition"
                                                    name="health_condition"
                                                    value={item.health_condition}
                                                    onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"

                                                >
                                                    <option value="">Please select</option>
                                                    <option value="1">Healthy</option>
                                                    <option value="2">With Medical Condition</option>
                                                    <option value="3">Person with Disability</option>
                                                    <option value="4">Deceased</option>
                                                </select>
                                                <div className='mt-4'>
                                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700"> Status </label>

                                                    <select
                                                        name="status"
                                                        id="status"
                                                        value={item.status}
                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                        className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"

                                                    >
                                                        <option value="">Please select</option>
                                                        <option value="1">Legitimate</option>
                                                        <option value="2">Illegitimate</option>
                                                    </select>
                                                </div>
                                            </div>


                                            <div>
                                                <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                    Distribution Rule - Revocable Living Trust
                                                </label>

                                                <input
                                                    type="text"
                                                    id="RevocableLivingTrust"
                                                    name="revocable_living"
                                                    value={item.revocable_living}
                                                    onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                    className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                />
                                                <div className='mt-4'>
                                                    <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                        Distribution Rule - Revocable Last Will and Testament
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="RevocableLastWillandTestament"
                                                        name="revocable_last"
                                                        value={item.revocable_last}
                                                        onChange={(e) => handleChangeInputChildrensDetails(e, idx)}
                                                        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                    />
                                                </div>
                                            </div>


                                            <div>
                                                <button
                                                    onClick={(e) => removeOtherChildrenFields(e, idx)}
                                                    className="group relative inline-block text-xs text-red-600 focus:outline-none focus:ring active:text-red-500"
                                                >
                                                    <span
                                                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                                    ></span>

                                                    <span className="relative block border border-current bg-white py-1 px-3 cursor-pointer">  Delete </span>
                                                </button>
                                            </div>
                                        </div>
                                    ))

                                    }
                                </div>
                            </section>

                        }

                        {/* Grand Childrens Details 5 */}
                        {showGrandChildrensForm && (
                            <section className='col-span-6'>
                                <div className='col-span-6'>
                                    <h2 className='text-base font-medium '>Grand Children's Details from Deceased Child (name of child)</h2>
                                </div>

                                <div className="col-span-6 ml-2">

                                    <div className='grid grid-cols-6 gap-2'>
                                        <div>
                                            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>

                                            <input
                                                type="text"
                                                id="FirstName"
                                                name="first_name"
                                                onChange={e => handleChangeInput(e, 0, 5)}
                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>

                                            <input
                                                type="text"
                                                id="LastName"
                                                name="last_name"
                                                onChange={e => handleChangeInput(e, 0, 5)}
                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                            <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                                Middle Initial
                                            </label>

                                            <input
                                                type="text"
                                                id="MiddleInitial"
                                                name="middle_initial"
                                                onChange={e => handleChangeInput(e, 0, 5)}
                                                className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                                Birthday
                                            </label>

                                            <input
                                                type="date"
                                                id="Birthday"
                                                name="birthday"
                                                onChange={e => handleChangeInput(e, 0, 5)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                            <select
                                                name="health_condition"
                                                id="health_condition"
                                                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                                onChange={e => handleChangeInput(e, 0, 5)}
                                            >
                                                <option value="">Please select</option>
                                                <option value="1">Healthy</option>
                                                <option value="2">With Medical Condition</option>
                                                <option value="3">Person with Disability</option>
                                                <option value="4">Deceased</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700"> Status </label>

                                            <select
                                                name="status"
                                                id="status"
                                                onChange={e => handleChangeInput(e, 0, 5)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"

                                            >
                                                <option value="">Please select</option>
                                                <option value="1">Legitimate</option>
                                                <option value="2">Illegitimate</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                                Distribution Rule - Revocable Living Trust
                                            </label>

                                            <input
                                                type="text"
                                                id="RevocableLivingTrust"
                                                name="revocable_living"
                                                onChange={e => handleChangeInput(e, 0, 5)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                Distribution Rule - Revocable Last Will and Testament
                                            </label>

                                            <input
                                                type="text"
                                                id="RevocableLastWillandTestament"
                                                name="revocable_last"
                                                onChange={e => handleChangeInput(e, 0, 5)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </section>
                        )

                        }

                        <section className='col-span-6'>
                            {/* Father's Details 3*/}
                            <div className='col-span-6'>
                                <h2 className='text-base font-medium '>Fathers Details</h2>
                            </div>

                            <div className="col-span-6 ml-2 mt-4">
                                <div className='grid grid-cols-4 gap-2'>
                                    <div>
                                        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            id="FirstName"
                                            name="first_name"
                                            onChange={e => handleChangeInput(e, 0, 3)}
                                            className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        />
                                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            id="LastName"
                                            name="last_name"
                                            onChange={e => handleChangeInput(e, 0, 3)}
                                            className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        />
                                        <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                            Middle Initial
                                        </label>

                                        <input
                                            type="text"
                                            id="MiddleInitial"
                                            name="middle_initial"
                                            onChange={e => handleChangeInput(e, 0, 3)}
                                            className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                            Birthday
                                        </label>

                                        <input
                                            type="date"
                                            id="Birthday"
                                            name="birthday"
                                            onChange={e => handleChangeInput(e, 0, 3)}
                                            className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                        <select
                                            name="health_condition"
                                            id="health_condition"
                                            onChange={e => handleChangeInput(e, 0, 3)}
                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                        >
                                            <option value="">Please select</option>
                                            <option value="1">Healthy</option>
                                            <option value="2">With Medical Condition</option>
                                            <option value="3">Person with Disability</option>
                                            <option value="4">Deceased</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="RevocableLivingTrust" className="block text-sm font-medium text-gray-700 text-center">
                                            Distribution Rule - Revocable Living Trust
                                        </label>

                                        <input
                                            type="text"
                                            id="RevocableLivingTrust"
                                            name="revocable_living"
                                            onChange={e => handleChangeInput(e, 0, 3)}
                                            className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        />

                                        <div className='mt-4'>
                                            <label htmlFor="RevocableLastWillandTestament" className="block text-sm font-medium text-gray-700 text-center">
                                                Distribution Rule - Revocable Last Will and Testament
                                            </label>

                                            <input
                                                type="text"
                                                id="RevocableLastWillandTestament"
                                                name="revocable_last"
                                                onChange={e => handleChangeInput(e, 0, 3)}
                                                className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                        <section className='col-span-6'>
                            {/* Mother's Details 4*/}
                            <div className='col-span-6'>
                                <h2 className='text-base font-medium '>Mother's Details</h2>
                            </div>

                            <div className="col-span-6 ml-2 mt-4">
                                <div className='grid grid-cols-4 gap-2'>
                                    <div>
                                        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            id="FirstName"
                                            name="first_name"
                                            onChange={e => handleChangeInput(e, 0, 4)}
                                            className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        />
                                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            id="LastName"
                                            name="last_name"
                                            onChange={e => handleChangeInput(e, 0, 4)}
                                            className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        />
                                        <label htmlFor="MiddleInitial" className="block text-sm font-medium text-gray-700">
                                            Middle Initial
                                        </label>

                                        <input
                                            type="text"
                                            id="MiddleInitial"
                                            name="middle_initial"
                                            onChange={e => handleChangeInput(e, 0, 4)}
                                            className="mt-1 w-full p-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700">
                                            Birthday
                                        </label>

                                        <input
                                            type="date"
                                            id="Birthday"
                                            name="birthday"
                                            onChange={e => handleChangeInput(e, 0, 4)}
                                            className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700"> Health Condition </label>

                                        <select
                                            name="health_condition"
                                            id="health_condition"
                                            onChange={e => handleChangeInput(e, 0, 4)}
                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                        >
                                            <option value="">Please select</option>
                                            <option value="1">Healthy</option>
                                            <option value="2">With Medical Condition</option>
                                            <option value="3">Person with Disability</option>
                                            <option value="4">Deceased</option>
                                        </select>
                                    </div>

                                </div>

                            </div>
                        </section>
                    </>
                }
            </div>

            <div className='sticky bottom-0 bg-white  py-4 flex justify-between items-center mt-5'>
                <div>
                    <Link
                        className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
                        href={`/admin/clients/networth-inventory-summary/networth-inventory/${clientID}`}
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
                <button
                    // type="submit"
                    onClick={handleSubmitFamilyComposition}
                    disabled={submitButtonDisabled}
                    className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                >
                    Save
                </button>
            </div>

            <div role="alert" className="mt-8 rounded border-s-4 border-yellow-500 bg-yellow-50 p-4">
                <p className="mt-2 text-sm">
                    The value of the advise that we will give you will highly depend on the amount and value of information that you will provide us. Rest assure that all the information you will share will be kept confidential.
                </p>
            </div>

            <ToastContainer />
        </div>
    )
}

export default FamilyCompositionPage