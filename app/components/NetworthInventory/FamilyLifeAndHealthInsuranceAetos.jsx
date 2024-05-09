'use client'
import React, { useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import { IoIosInformationCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import ModalLifeInsurance from './ModalLifeInsurance';
import EditModalLifeInsurance from './EditModalLifeInsurance';
import axios from 'axios';
import { API_BASE_URL, webUser } from '@/app/lib/libapi';
import { CiEdit } from 'react-icons/ci';

const FamilyLifeAndHealthInsuranceAetos = ({ familyInsuranceAdviserList, setFamilyInsuranceAdviserList, clientID,  totalFamilyInsuranceCurrentAccountValue }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [inputForm, setInputForm] = useState([])
    const [inputBeneficiariesForm, setInputBeneficiariesForm] = useState([{
        beneficiaries_id: 0,
        full_name: '',
        percent_share: 0,
        designation: 0,
        priority: 0,
    }])
    const [editData, setEditData] = useState(
        {
            flahi_id: 0,
            insurance_company: '',
            policy_owner: 0,
            policy_number: '',
            type_of_policy: 0,
            month_year_issued: '',
            insured: 0,
            purpose: '',
            with_guaranteed_payout: 0,
            faceamount_fpcf: 0,
            faceamount_etax: 0,
            faceamount_edistribution: 0,
            faceamount_total: 0,
            current_account_value: 0,
            beneficiaries: [{
                beneficiaries_id: 0,
                full_name: '',
                percent_share: 0,
                designation: 0,
                priority: 0,
            }]
        }
    )

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const openEditModal = (flahi_id) => {
        setEditModalOpen(true)
        setEditData(familyInsuranceAdviserList.find((item)=>item.flahi_id === flahi_id))
    };
    const closeEditModal = () => setEditModalOpen(false);

    const handleChangeInputForm = (e) => {
        const { name, value } = e.target
        setInputForm({ ...inputForm, [name]: value })
    }

    const handleBeneficiariesInputForm = (event, index) => {
        let data = [...inputBeneficiariesForm];
        data[index][event.target.name] = event.target.value;
        setInputBeneficiariesForm(data);
    }

    const addBeneficiariesForm = () => {
        let newItem = {
            beneficiaries_id: 0,
            full_name: '',
            percent_share: 0,
            designation: 0,
            priority: 0,
        }

        setInputBeneficiariesForm([...inputBeneficiariesForm, newItem])
    }

    const removeBeneficiariesInputForm = (index) => {
        let beneficiariesData = [...inputBeneficiariesForm];
        beneficiariesData.splice(index, 1)
        setInputBeneficiariesForm(beneficiariesData)
    }

    const handleChangeEditDataInputForm = (e) => {
        const { name, value } = e.target

        setEditData({ ...editData, [name]: value })
    }

    const handleBeneficiariesEditDataInputForm = (event, index) => {
        let editBeneficiariesData = { ...editData };
        editBeneficiariesData.beneficiaries[index][event.target.name] = event.target.value;
        setEditData(editBeneficiariesData);
    }

    const addBeneficiariesEditDataForm = (e) => {
        let updatedBeneficiaries = { ...editData }
        updatedBeneficiaries.beneficiaries.push({
            beneficiaries_id: 0,
            full_name: '',
            percent_share: 0,
            designation: 0,
            priority: 0,
        })

        setEditData({ ...editData, updatedBeneficiaries })
    }

    const removeBeneficiariesEditDataInputForm = (e, index) => {
        e.preventDefault()
        let beneficiariesData = { ...editData };
        beneficiariesData.beneficiaries.splice(index, 1)
        setEditData(beneficiariesData)
    }

    const submitEditData = async (e) => {
        e.preventDefault()
        // return console.log('edit data to submit', editData)        
        let data =
            [
                {
                    "data":
                        [
                            [
                                { "flahi_id": editData.flahi_id },
                                { "client_id": clientID },
                                { "insurance_company": editData.insurance_company },
                                { "policy_owner": editData.policy_owner },
                                { "policy_number": editData.policy_number },
                                { "type_of_policy": editData.type_of_policy },
                                { "month_year_issued": editData.month_year_issued },
                                { "insured": editData.insured },
                                { "purpose": editData.purpose },
                                { "with_guaranteed_payout": editData.with_guaranteed_payout },
                                { "faceamount_fpcf": editData.faceamount_fpcf },
                                { "faceamount_etax": editData.faceamount_etax },
                                { "faceamount_edistribution": editData.faceamount_edistribution },
                                { "faceamount_total": editData.faceamount_total },
                                { "current_account_value": editData.current_account_value }
                            ]
                        ]
                },
                {
                    "beneficiaries":
                        editData.beneficiaries.map((item) => (
                            [
                                { "beneficiaries_id": item.beneficiaries_id },
                                { "full_name": item.full_name },
                                { "percent_share": item.percent_share },
                                { "designation": item.designation },
                                { "priority": item.priority }
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

        const res = await axios.post(`${API_BASE_URL}/newLifeHealthInsuranceAdviser`, data);

        if (res.status === 200) {
            setFamilyInsuranceAdviserList(res.data.Life_And_Health_Insurance)
        }
    }



    const submitdata = async (e) => {
        e.preventDefault()

       let data =
            [
                {
                    "data":
                        [
                            [
                                { "flahi_id": 0 },
                                { "client_id": clientID },
                                { "insurance_company": inputForm.insurance_company },
                                { "policy_owner": inputForm.policy_owner },
                                { "policy_number": inputForm.policy_number },
                                { "type_of_policy": inputForm.type_of_policy },
                                { "month_year_issued": inputForm.month_year_issued },
                                { "insured": inputForm.insured },
                                { "purpose": inputForm.purpose },
                                { "with_guaranteed_payout": inputForm.with_guaranteed_payout },
                                { "faceamount_fpcf": inputForm.faceamount_fpcf },
                                { "faceamount_etax": inputForm.faceamount_etax },
                                { "faceamount_edistribution": inputForm.faceamount_edistribution },
                                { "faceamount_total": inputForm.faceamount_total },
                                { "current_account_value": inputForm.current_account_value }
                            ]
                        ]
                },
                {
                    "beneficiaries":
                        inputBeneficiariesForm.map((item) => (
                            [
                                { "beneficiaries_id": 0 },
                                { "full_name": item.full_name },
                                { "percent_share": item.percent_share },
                                { "designation": item.designation },
                                { "priority": item.priority }
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

        const res = await axios.post(`${API_BASE_URL}/newLifeHealthInsuranceAdviser`, data);
    
        if (res.status === 200) {
            setFamilyInsuranceAdviserList(res.data.Life_And_Health_Insurance)
            setInputForm({
                flahi_id: 0,
                insurance_company: '',
                policy_owner: 0,
                policy_number: '',
                type_of_policy: 0,
                month_year_issued: '',
                insured: 0,
                purpose: '',
                with_guaranteed_payout: 0,
                faceamount_fpcf: 0,
                faceamount_etax: 0,
                faceamount_edistribution: 0,
                faceamount_total: 0,
                current_account_value: 0,
            })
            setInputBeneficiariesForm([{
                beneficiaries_id: 0,
                full_name: '',
                percent_share: 0,
                designation: 0,
                priority: 0,
            }])
            e.target.reset()
            closeModal()
        }
    }

    return (
        <div className="mt-4 ml-2">
            <div className='flex items-center gap-4'>
                <button className='px-4 py-2 bg-gray-200 flex items-center gap-4 font-bold text-slate-600'>
                    FAMILY LIFE AND HEALTH INSURANCE FROM AETOS ADVISOR <IoIosInformationCircle className='text-lg' />
                </button>
                <FaSyncAlt />
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="w-auto table-auto divide-y divide-gray-200 text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr className=''>
                            <th scope='col' className="p-2 font-bold text-slate-600">INSURANCE  COMPANY*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 text-center">POLICY  NUMBER</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 text-center">TYPE OF POLICY*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 text-center">MONTH AND YEAR ISSUED*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 text-center">POLICY OWNER*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 text-center">INSURED*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 text-center">CURRENT FUND VALUE/ CASH SURRENDER VALUES (ESTIMATED)*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 text-center">PURPOSE*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 text-center">WITH GUARANTEED PAYOUT*</th>
                            <th scope='col' className="p-2 font-bold text-slate-600 text-center"><FaPlusCircle onClick={openModal} className='text-lg cursor-pointer' /></th>

                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 '>
                        {familyInsuranceAdviserList.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-100 text-xs text-gray-700">
                                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    {item.insurance_company}
                                </th>
                                <td className="px-4 py-2 text-center">
                                    {item.policy_number}

                                </td>
                                <td className="px-4 py-2 text-center">
                                    {
                                        item.type_of_policy === 1 ? 'VUL'
                                            : item.type_of_policy === 2 ? 'Traditional'
                                                : item.type_of_policy === 3 ? 'HMO'
                                                    : item.type_of_policy === 4 ? 'Preneed'
                                                        : 'Preneed'
                                    }
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {item.month_year_issued}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {item.policy_owner === 1 ? 'No' : 'Yes'}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {
                                        item.insured === 1? 'Self' 
                                        : item.insured === 2 ? 'Spouse'
                                        : item.insured === 3 ? 'Children'
                                        : item.insured === 4 ? 'Parents'
                                        : 'Other Dependents'
                                    }
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {item.current_account_value}
                                </td>
                                <td className="px-4 py-2 text-center capitalize">
                                    {item.purpose}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        id="guaranteedPayoutAccept"
                                        name="with_guaranteed_payout"
                                        value="1"
                                        checked={item.with_guaranteed_payout === 1}
                                        readOnly
                                        className="h-4 w-4 rounded-md border-gray-200 bg-white shadow-sm"
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button className='p-2 hover:bg-green-700 hover:text-white text-center' onClick={()=>openEditModal(item.flahi_id)}>
                                        <CiEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className='divide-y divide-gray-200'>
                        <tr className=" text-gray-900">
                            <th scope="row" className="text-xs px-6 py-3">Total </th>
                            <td className="px-6 py-3 text-xs font-bold">{totalFamilyInsuranceCurrentAccountValue?.toLocaleString('en-US')}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <ModalLifeInsurance isOpen={isModalOpen} onClose={closeModal} inputForm={inputForm} inputBeneficiariesForm={inputBeneficiariesForm} handleChangeInputForm={handleChangeInputForm} handleBeneficiariesInputForm={handleBeneficiariesInputForm} addBeneficiariesForm={addBeneficiariesForm} submitdata={submitdata} removeBeneficiariesInputForm={removeBeneficiariesInputForm} />
            <EditModalLifeInsurance isOpen={isEditModalOpen} onClose={closeEditModal} editData={editData}  handleChangeEditDataInputForm={handleChangeEditDataInputForm} handleBeneficiariesEditDataInputForm={handleBeneficiariesEditDataInputForm} addBeneficiariesEditDataForm={addBeneficiariesEditDataForm} removeBeneficiariesEditDataInputForm={removeBeneficiariesEditDataInputForm} submitEditData={submitEditData}   />

        </div>
    )
}

export default FamilyLifeAndHealthInsuranceAetos