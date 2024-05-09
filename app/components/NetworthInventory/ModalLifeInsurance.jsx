'use client'
import React, { useEffect } from 'react'
import { FaPlusCircle, FaRegTrashAlt } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

const ModalLifeInsurance = ({ isOpen, onClose, inputForm, inputBeneficiariesForm, handleChangeInputForm, handleBeneficiariesInputForm, addBeneficiariesForm, submitdata, removeBeneficiariesInputForm }) => {

    return (
        <div className={`fixed inset-0 z-50  ${isOpen ? 'block' : 'hidden'}`}>
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            >x</div>
            <div className="fixed inset-0 flex items-center justify-center py-16">
                <div className="bg-white h-full p-8 rounded-md shadow-lg overflow-y-auto">
                    <div
                        className="px-4 py-2 rounded-md flex justify-end"
                        onClick={onClose}
                    >
                        <IoMdClose className='cursor-pointer hover:rotate-45 text-lg' />
                    </div>
                    <form onSubmit={submitdata} className="mt-4 grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <label htmlFor="InsuranceCompany" className="block text-sm font-medium text-gray-700"> Insurance Company </label>

                            <input
                                type="text"
                                id="InsuranceCompany"
                                name="insurance_company"
                                onChange={handleChangeInputForm}
                                className="mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                            />
                        </div>
                        <div className="col-span-6 flex">
                            <label htmlFor="PolicyOwner" className="block text-sm font-medium text-gray-700">
                                Are you the policy owner?
                            </label>

                            <input
                                type="radio"
                                id="yes"
                                name="policy_owner"
                                value="0"
                                onChange={handleChangeInputForm}
                                className='ml-2 mr-1'
                            />
                            <label htmlFor="yes" className=" text-sm font-medium text-gray-700">Yes</label>

                            <input
                                type="radio"
                                id="no"
                                name="policy_owner"
                                value="1"
                                onChange={handleChangeInputForm}
                                className='ml-4 mr-1'
                            />
                            <label htmlFor="no" className=" text-sm font-medium text-gray-700">No</label>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700"> Policy No. </label>

                            <input
                                type="text"
                                id="policyNumber"
                                name="policy_number"
                                onChange={handleChangeInputForm}
                                className="mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="PolicyType" className="block text-sm font-medium text-gray-700"> Type of Policy </label>

                            <select
                                name="type_of_policy"
                                id="PolicyType"
                                onChange={handleChangeInputForm}
                                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                            >
                                <option value="">Please select</option>
                                <option value="1">VUL</option>
                                <option value="2">Traditional</option>
                                <option value="3">HMO</option>
                                <option value="4">Preneed</option>
                                <option value="5">Others</option>
                            </select>
                        </div>

                        <div className="col-span-6 ">
                            <label htmlFor="MonthAndYearIssued" className="block text-sm font-medium text-gray-700"> Month and Year Issued </label>

                            <input
                                type="month"
                                id="MonthAndYearIssued"
                                name="month_year_issued"
                                onChange={handleChangeInputForm}
                                className="mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="insured" className="block text-sm font-medium text-gray-700"> Insured </label>

                            <select
                                name="insured"
                                id="insured"
                                onChange={handleChangeInputForm}
                                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                            >
                                <option value="">Please select</option>
                                <option value="1">Self</option>
                                <option value="2">Spouse</option>
                                <option value="3">Children</option>
                                <option value="4">Parents</option>
                                <option value="5">Other Dependents</option>
                            </select>
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="Beneficiaries" className="text-sm font-medium text-gray-700 mb-2 flex gap-2">
                                Beneficiaries <FaPlusCircle onClick={addBeneficiariesForm} className='text-lg cursor-pointer' />
                            </label>
                            {inputBeneficiariesForm?.map((item, idx) => (
                                <div key={idx} className='grid grid-cols-10 items-center gap-4 mb-1'>
                                    <div className="col-span-2">
                                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 text-center">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            id="fullname"
                                            name="full_name"
                                            value={item.full_name}
                                            onChange={(e) => handleBeneficiariesInputForm(e, idx)}
                                            className="mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="%share" className="block text-sm font-medium text-gray-700 text-center">
                                            % Share
                                        </label>

                                        <input
                                            type="text"
                                            id="%share"
                                            name="percent_share"
                                            value={item.percent_share}
                                            onChange={(e) => handleBeneficiariesInputForm(e, idx)}
                                            className="mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700 text-center"> Designation </label>

                                        <select
                                            name="designation"
                                            id="designation"
                                            value={item.designation}
                                            onChange={(e) => handleBeneficiariesInputForm(e, idx)}
                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                        >
                                            <option value="">Please select</option>
                                            <option value="1">Revocable</option>
                                            <option value="2">Irrevocable</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="Priority" className="block text-sm font-medium text-gray-700 text-center">
                                            Priority
                                        </label>

                                        <select
                                            name="priority"
                                            id="Priority"
                                            value={item.priority}
                                            onChange={(e) => handleBeneficiariesInputForm(e, idx)}
                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                                        >
                                            <option value="">Please select</option>
                                            <option value="1">Primary</option>
                                            <option value="2">Secondry</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2">
                                        <button
                                            onClick={() => removeBeneficiariesInputForm(idx)}
                                            className="group relative inline-block text-xs mb-2 text-red-600 focus:outline-none focus:ring active:text-red-500"
                                        >
                                            <span
                                                className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                                            ></span>

                                            <span className="relative block border border-current bg-white py-1 px-3 cursor-pointer">  Delete </span>
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700"> Purpose </label>

                            <select
                                name="purpose"
                                id="purpose"
                                onChange={handleChangeInputForm}
                                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-gray-700 sm:text-sm"
                            >
                                <option value="">Please select</option>
                                <option value="family protection">Family Protection</option>
                                <option value="health">Health</option>
                                <option value="retirement">Retirement</option>
                                <option value="parents coverage">Parent&apos;s Coverage</option>
                                <option value="childrens coverage">Children&apos;s Coverage</option>
                                <option value="estate tax">Estate Tax</option>
                                <option value="estate distribution">Estate Distribution</option>
                                <option value="business insurance">Business Insurance</option>
                            </select>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="guaranteedPayoutAccept" className="flex gap-4">
                                <span className="text-sm text-gray-700">
                                    With Guaranteed Payout
                                </span>
                                <input
                                    type="checkbox"
                                    id="guaranteedPayoutAccept"
                                    name="with_guaranteed_payout"
                                    value="1"
                                    onChange={handleChangeInputForm}
                                    className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                                />
                            </label>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="faceAmountforFamilyProtection" className="grid grid-cols-2 gap-2 items-center">
                                <span className="text-sm text-gray-700">
                                    FACE AMOUNT FOR FAMILY PROTECTION/ CLEAN UP FUND
                                </span>
                                <input
                                    type="text"
                                    id="faceAmountforFamilyProtection"
                                    name="faceamount_fpcf"
                                    onChange={handleChangeInputForm}
                                    className="w-32 p-2 rounded-md border border-gray-200 bg-white shadow-sm"
                                />
                            </label>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="faceAmountforEstateTax" className="grid grid-cols-2 gap-2 items-center">
                                <span className="text-sm text-gray-700">
                                    FACE AMOUNT FOR ESTATE TAX
                                </span>
                                <input
                                    type="text"
                                    id="faceAmountforEstateTax"
                                    name="faceamount_etax"
                                    onChange={handleChangeInputForm}
                                    className="w-32 p-2 rounded-md border border-gray-200 bg-white shadow-sm"
                                />
                            </label>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="faceAmountforEstateDistribution" className="grid grid-cols-2 gap-2 items-center">
                                <span className="text-sm text-gray-700">
                                    FACE AMOUNT FOR ESTATE DISTRIBUTION
                                </span>
                                <input
                                    type="text"
                                    id="faceAmountforEstateDistribution"
                                    name="faceamount_edistribution"
                                    onChange={handleChangeInputForm}
                                    className="w-32 p-2 rounded-md border border-gray-200 bg-white shadow-sm"
                                />
                            </label>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="totalFaceAmount" className="grid grid-cols-2 gap-2 items-center">
                                <span className="text-sm text-gray-700">
                                    TOTAL FACE AMOUNT
                                </span>
                                <input
                                    type="text"
                                    id="faceAmountforEstateDistribution"
                                    name="faceamount_total"
                                    onChange={handleChangeInputForm}
                                    className="w-32 p-2 rounded-md border border-gray-200 bg-white shadow-sm"
                                />
                            </label>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="currentAccountValue" className="grid grid-cols-2 gap-2 items-center">
                                <span className="text-sm text-gray-700">
                                    CURRENT ACCOUNT VALUE OR CASH SURRENDER VALUE (ESTIMATED)*
                                </span>
                                <input
                                    type="text"
                                    id="currentAccountValue"
                                    name="current_account_value"
                                    onChange={handleChangeInputForm}
                                    className="w-32 p-2 rounded-md border border-gray-200 bg-white shadow-sm"
                                />
                            </label>
                        </div>

                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        // onClick={submitdata}
                        >
                            Submit
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ModalLifeInsurance