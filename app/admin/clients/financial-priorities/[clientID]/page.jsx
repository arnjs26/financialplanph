"use client"
import DreamsAndAspirations from '@/app/components/FinancialPriority/DreamsAndAspirations';
import ProfileNavbar from '@/app/components/ProfileNavbar';
import { API_BASE_URL, api, webUser } from '@/app/lib/libapi';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiFillCalculator, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp, FaSpinner } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { MdLibraryAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const FinancialPrioritiesPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const agent_id = useSelector((state) => state.StateController.agent_id);
  const token = useSelector((state) => state.StateController.token)
  const { clientID } = params
  const [selectedFinancialPriority, setSelectedFinancialPriority] = useState([])
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormData, setAddFormData] = useState([])
  const [hideAddSaveButton, setHideAddSaveButton] = useState(false)
  const [editFormData, setEditFormData] = useState([])
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false)
  const [unsavedEditError, setUnsavedEditError] = useState(false)

  const FNAOptions = [
    { value: "", label: "Select from the list" },
    { value: 1, label: "FAMILY PROTECTION/CLEAN UP FUND - FP FNA", link: "familyprotection-fna" },
    { value: 2, label: "HEALTH FUND- Health FNA", link: "health-fna" },
    { value: 3, label: "RETIREMENT PLAN- Retirement FNA", link: "retirement-fna" },
    { value: 4, label: "CHILDREN'S EDUCATION FUND- Education FNA 1", link: "education-fna" },
    { value: 5, label: "PARENT'S COVERAGE", link: "familyprotection-fna" },
    { value: 6, label: "CHILDREN'S COVERAGE- Family and Life FNA", link: "familyprotection-fna" },
    // { value: 7, label: "ESTATE PLAN- EP Narratives", link: "estate-planning" },
    // { value: 8, label: "BUSINESS INSURANCE- Employee- BI Employee Owner- BI Own", link: "familyprotection-fna" },
  ]

  // OnChange for Add Form
  const handleChange = (e) => {
    setUnsavedEditError(true)
    setSubmitButtonDisabled(false)
    const { name, value } = e.target;
    setAddFormData((prevData) => ({
      ...prevData,
      'sfp_id': 0,
      'rank': selectedFinancialPriority.length + 1,
      [name]: value,
    }));

  }

  // OnChange for Edit Selected Priority
  const handleEditChange = (e, idx, sfp_id, rank) => {
    setUnsavedEditError(true)
    const { name, value } = e.target;

    // Check if Selected Financial Priority is existing
    const isExist = selectedFinancialPriority.some((fna) => fna.fplist_id === parseInt(value) && fna.sfp_id !== sfp_id)

    if (isExist) {
      toast.warn("Financial Priority is Selected already, Please Choose another One!");
    }

    setSubmitButtonDisabled(false)

    // Make a copy of the existing formData array
    const updatedFormData = [...selectedFinancialPriority];

    // Check if formData already has an item with the same sfp_id
    const existingItemIndex = selectedFinancialPriority.findIndex((item) => item.sfp_id === sfp_id);

    if (existingItemIndex !== -1) {
      // If an item with the same sfp_id exists, update its values
      updatedFormData[existingItemIndex][name] = value;
    } else {
      // If an item with the same sfp_id doesn't exist, create a new object and push it
      const newItem = {
        sfp_id,
        rank: rank,
        fna: null,
        reason: '',
      };

      // Update the value of the specified property in the object
      newItem[name] = value;

      // Push the new object to the array
      updatedFormData.push(newItem);
    }

    // Update the state with the new formData
    setSelectedFinancialPriority(updatedFormData);
  };

  const handleAddPriorityPlanForm = () => {
    setShowAddForm(!showAddForm)
  }

  const fetchSelectedFinancialPriority = async () => {
    try {
      const res = await api.getSelectedFinancialPriority(clientID);
      setSelectedFinancialPriority(res?.Selected_Financial_Priorities)
    } catch (error) {
      console.error("Error fetching data from the API FETCH SELECTED FINANCIAL PRIORITY LIST: ", error);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchSelectedFinancialPriority()
  }, [])


  //Submit Form for 3 New Priority List
  const handleSubmitAddForm = async () => {
    const { fna1, fna2, fna3, reason1, reason2, reason3 } = addFormData

    if (addFormData.length === 0) return toast.warn('Must Choose 3 Financial Priority')
    if (!fna1 || !reason1) return toast.warn('SELECT TOP 1 Financial Priority and Type in your reason')
    if (!fna2 || !reason2) return toast.warn('SELECT TOP 2 Financial Priority and Type in your reason')
    if (!fna3 || !reason3) return toast.warn('SELECT TOP 3 Financial Priority and Type in your reason')
    if (fna1 === fna2) return toast.warn('YOUR TOP 2 FINANCIAL PRIORITY ALREADY BEEN SELECTED, Choose Another One')
    if (fna1 === fna3) return toast.warn('YOUR TOP 3 FINANCIAL PRIORITY ALREADY BEEN SELECTED, Choose Another One')
    if (fna2 === fna1) return toast.warn('YOUR TOP 1 FINANCIAL PRIORITY ALREADY BEEN SELECTED, Choose Another One')
    if (fna2 === fna3) return toast.warn('YOUR TOP 3 FINANCIAL PRIORITY ALREADY BEEN SELECTED, Choose Another One')
    if (fna3 === fna1) return toast.warn('YOUR TOP 1 FINANCIAL PRIORITY ALREADY BEEN SELECTED, Choose Another One')
    if (fna3 === fna2) return toast.warn('YOUR TOP 2 FINANCIAL PRIORITY ALREADY BEEN SELECTED, Choose Another One')

    setSubmitButtonIsLoading(true)

    let data = [
      {
        "data":
          [
            [
              { "sfp_id": 0 },
              { "client_id": clientID },
              { "financial_priority_list_id": fna1 },
              { "rankNumber": 1 },
              { "reason": reason1 }
            ],
            [
              { "sfp_id": 0 },
              { "client_id": clientID },
              { "financial_priority_list_id": fna2 },
              { "rankNumber": 2 },
              { "reason": reason2 }
            ],
            [
              { "sfp_id": 0 },
              { "client_id": clientID },
              { "financial_priority_list_id": fna3 },
              { "rankNumber": 3 },
              { "reason": reason3 }
            ],
          ]
      },
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

    const res = await axios.post(`${API_BASE_URL}/addUpdateSelectedFinancialPriorities`, data);
    if (res.status === 200) {
      toast.success("Successfully Saved!");
      setSelectedFinancialPriority(res.data.Selected_Financial_Priorities)
      setSubmitButtonIsLoading(false)
      setSubmitButtonDisabled(true)
      setUnsavedEditError(false)
    }
  }

  //Submit Form for Adding From Priority List
  const handleSubmitAddPriorityForm = async (e) => {
    e.preventDefault();
    const { fna, reason } = addFormData

    let data = [
      {
        "data":
          [
            [
              { "sfp_id": 0 },
              { "client_id": clientID },
              { "financial_priority_list_id": fna },
              { "rankNumber": selectedFinancialPriority.length + 1 },
              { "reason": reason }
            ],
          ]
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

    const isExist = selectedFinancialPriority.some((item) => item.fplist_id === parseInt(fna))

    if (isExist) {
      toast.error("Financial Priority Already Selected, Please Select Another Priority!")
    } else {
      const res = await axios.post(`${API_BASE_URL}/addUpdateSelectedFinancialPriorities`, data);
      if (res.status === 200) {
        toast.success("Successfully Added!");
        fetchSelectedFinancialPriority();
        setUnsavedEditError(false)
        e.target.reset();
      }
    }
  }

  //Submit Form for Editing Selected Priority List
  const handleSubmitEditForm = async () => {

    //Check if addformData financial priority has been selected already
    const isExist = selectedFinancialPriority.some((item) => item.fplist_id === parseInt(addFormData.fplist_id))

    if (isExist) {
      return toast.error("Financial Priority Already Selected, Please Select Another Priority!")
    }

    let submitData = [...selectedFinancialPriority]

    if (addFormData.length !== 0) {
      submitData.push({ ...addFormData })
    }

    const data = [
      {
        "data": submitData.map((item) => (
          [
            { "sfp_id": item.sfp_id },
            { "client_id": clientID },
            { "financial_priority_list_id": item.fplist_id },
            { "rankNumber": item.rank },
            { "reason": item.reason ?? '' }
          ]
        ))
      },
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
    ];

    setSubmitButtonIsLoading(true)

    const res = await axios.post(`${API_BASE_URL}/addUpdateSelectedFinancialPriorities`, data);

    if (res.status === 200) {
      toast.success("Saved Successfully!");
      setSelectedFinancialPriority(res.data.Selected_Financial_Priorities)
      setUnsavedEditError(false)
      setSubmitButtonIsLoading(false)
      setSubmitButtonDisabled(true)
    }

  }

  const generateLink = (selectedValue) => {
    switch (selectedValue) {
      case 1:
        return `/admin/clients/familyprotection-fna/${clientID}`;
      case 2:
        return `/admin/clients/health-fna/${clientID}`;
      case 3:
        return `/admin/clients/retirement-fna/${clientID}`;
      case 4:
        return `/admin/clients/education-fna/${clientID}`;
      case 5:
        return `/admin/clients/education-fna/${clientID}`;
      case 6:
        return `/admin/clients/health-fna/${clientID}`;
      case 7:
        return `/admin/clients/estate-planning/${clientID}`;
      case 8:
        return `/admin/clients/health-fna/${clientID}`;
      default:
        return "";
    }
  };

  const handleRankDownOnClick = async (rank) => {

    const data = selectedFinancialPriority.find((item) => item.rank === rank)
    const data2 = selectedFinancialPriority.find((item) => item.rank === rank + 1)

    let formData = [
      {
        "data":
          [
            [
              { "sfp_id": data.sfp_id },
              { "client_id": clientID },
              { "financial_priority_list_id": data.fplist_id },
              { "rankNumber": data.rank + 1 },
              { "reason": data.reason }
            ],
            [
              { "sfp_id": data2.sfp_id },
              { "client_id": clientID },
              { "financial_priority_list_id": data2.fplist_id },
              { "rankNumber": data2.rank - 1 },
              { "reason": data2.reason }
            ]
          ]
      },
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

    const res = await axios.post(`${API_BASE_URL}/addUpdateSelectedFinancialPriorities`, formData);

    if (res.status === 200) {
      setSelectedFinancialPriority(res.data?.Selected_Financial_Priorities)
      toast.success("Successfully Ranked Down!");
    }
  }

  const handleRankUpOnClick = async (rank) => {

    const data = selectedFinancialPriority.find((item) => item.rank === rank)
    const data2 = selectedFinancialPriority.find((item) => item.rank === rank - 1)

    let formData = [
      {
        "data":
          [
            [
              { "sfp_id": data.sfp_id },
              { "client_id": clientID },
              { "financial_priority_list_id": data.fplist_id },
              { "rankNumber": data.rank - 1 },
              { "reason": data.reason }
            ],
            [
              { "sfp_id": data2.sfp_id },
              { "client_id": clientID },
              { "financial_priority_list_id": data2.fplist_id },
              { "rankNumber": data2.rank + 1 },
              { "reason": data2.reason }
            ]
          ]
      },
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
    const res = await axios.post(`${API_BASE_URL}/addUpdateSelectedFinancialPriorities`, formData);

    if (res.status === 200) {
      toast.success("Successfully Ranked Up!");
      setSelectedFinancialPriority(res.data?.Selected_Financial_Priorities)
    }

  }

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
    <div>
      <ProfileNavbar clientID={clientID} />
      <div className='mt-4 bg-white justify-between border rounded-lg p-2'>
        <div
          className="bg-green-900 px-2 md:px-4 py-2 text-white"
        >
          <p className="font-medium text-left">
            Based on the explanation of the Financial Pyramid, please select your top priorities and rank them
          </p>
        </div>

        <div className='mt-4'>
          <h2 className='text-center text-2xl font-bold text-slate-600 mb-4'>Financial Priorities</h2>

          {selectedFinancialPriority.length !== 0 ? (
            <>
              {selectedFinancialPriority.map((item, idx, { length }) => {
                return (
                  <div className='flex flex-col py-2' key={idx}>
                    <div className='flex md:flex-row flex-col md:justify-between mb-5'>
                      <div className='flex items-center'>
                        <span className='flex gap-2 mr-2 md:mr-5 text-md'>
                          {idx === 0
                            ? (
                              <FaRegArrowAltCircleDown className='cursor-pointer' size={20} onClick={() => handleRankDownOnClick(item.rank)} />
                            )
                            : idx + 1 === length
                              ? (
                                <FaRegArrowAltCircleUp className='cursor-pointer' size={20} onClick={() => handleRankUpOnClick(item.rank)} />
                              )
                              : (
                                <>
                                  <FaRegArrowAltCircleUp className='cursor-pointer' size={20} onClick={() => handleRankUpOnClick(item.rank)} />
                                  <FaRegArrowAltCircleDown className='cursor-pointer' size={20} onClick={() => handleRankDownOnClick(item.rank)} />
                                </>
                              )
                          }
                        </span>

                        <h3 className='text-slate-600 text-left font-bold text-md'>
                          Top {item.rank} Financial Priority
                        </h3>

                      </div>
                      <div className='flex items-center gap-4'>
                        <label className="sr-only" htmlFor={`FNA${idx}`}>FNA</label>
                        <select
                          className="w-full rounded-lg border border-gray-500 p-2 text-sm"
                          value={item.fplist_id}
                          name='fplist_id'
                          onChange={(e) => handleEditChange(e, idx, item.sfp_id, item.rank)}
                          id={`FNA${idx}`}
                          disabled={selectedFinancialPriority.length == 8}
                        >
                          {FNAOptions.map((fna, ida) => (
                            <option value={fna.value} key={ida} > {fna.label} </option>
                          ))}
                        </select>
                        {item.fplist_id && (
                          <Link href={generateLink(item.fplist_id)} target="_blank">
                            <AiFillCalculator className='cursor-pointer' size={25} />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div>
                      <textarea
                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                        value={item.reason === null ? '' : item.reason}
                        name='reason'
                        onChange={(e) => handleEditChange(e, idx, item.sfp_id, item.rank)}
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                )
              })}

              {/* Add Button */}
              {selectedFinancialPriority.length !== 6 && (

                <div className='flex justify-end'>
                  {!hideAddSaveButton && (
                    <MdLibraryAdd size={25} onClick={handleAddPriorityPlanForm} className='cursor-pointer' />
                  )}
                </div>
              )}
            </>
          )
            :
            ( // No Selected Financial Priority Yet
              <div>
                <div className='flex flex-col py-2'>
                  <div className='flex md:flex-row flex-col md:justify-between mb-5 items-center'>
                    <div>
                      <h3 className='text-slate-600 text-left font-bold text-md'>
                        Top 1 Financial Priority
                      </h3>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="FNA1">FNA</label>
                      <select
                        className="w-full rounded-lg border border-gray-500 p-2 text-sm"
                        name='fna1'
                        onChange={handleChange}
                        id="FNA1"
                      >
                        <option value="">Select from the list</option>
                        <option value="1">FAMILY PROTECTION/CLEAN UP FUND - FP FNA</option>
                        <option value="2">HEALTH FUND- Health FNA</option>
                        <option value="3">RETIREMENT PLAN- Retirement FNA</option>
                        <option value="4">CHILDREN'S EDUCATION FUND- Education FNA 1</option>
                        <option value="5">PARENT'S COVERAGE</option>
                        <option value="6">CHILDREN'S COVERAGE- Family and Life FNA</option>
                        {/* <option value="7">ESTATE PLAN- EP Narratives</option>
                        <option value="8">BUSINESS INSURANCE- Employee- BI Employee
                          Owner- BI Own</option> */}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="reason">Reason</label>

                    <textarea
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                      rows="5"
                      name='reason1'
                      id="reason1"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="sr-only">
                    <label className="sr-only" htmlFor="reason">Reason</label>

                    <input type='text' name='rank1' value={1} onChange={handleChange} />
                  </div>
                </div>

                <div className='flex flex-col py-2'>
                  <div className='flex md:flex-row flex-col md:justify-between mb-5 items-center'>
                    <div>
                      <h3 className='text-slate-600 text-left font-bold text-md'>
                        Top 2 Financial Priority
                      </h3>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="FNA2">FNA</label>
                      <select
                        className="w-full rounded-lg border border-gray-500 p-2 text-sm"
                        name='fna2'
                        onChange={handleChange}
                        id="FNA2"
                      >
                        <option value="">Select from the list</option>
                        <option value="1">FAMILY PROTECTION/CLEAN UP FUND - FP FNA</option>
                        <option value="2">HEALTH FUND- Health FNA</option>
                        <option value="3">RETIREMENT PLAN- Retirement FNA</option>
                        <option value="4">CHILDREN'S EDUCATION FUND- Education FNA 1</option>
                        <option value="5">PARENT'S COVERAGE</option>
                        <option value="6">CHILDREN'S COVERAGE- Family and Life FNA</option>
                        {/* <option value="7">ESTATE PLAN- EP Narratives</option>
                        <option value="8">BUSINESS INSURANCE- Employee- BI Employee
                          Owner- BI Own</option> */}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="reason2">Reason</label>

                    <textarea
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                      rows="5"
                      name='reason2'
                      id="reason2"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className='flex flex-col py-2'>
                  <div className='flex md:flex-row flex-col md:justify-between mb-5 items-center'>
                    <div>
                      <h3 className='text-slate-600 text-left font-bold text-md'>
                        Top 3 Financial Priority
                      </h3>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="FNA">FNA</label>
                      <select
                        className="w-full rounded-lg border border-gray-500 p-2 text-sm"
                        name='fna3'
                        onChange={handleChange}
                        id="FNA"
                      >
                        <option value="">Select from the list</option>
                        <option value="1">FAMILY PROTECTION/CLEAN UP FUND - FP FNA</option>
                        <option value="2">HEALTH FUND- Health FNA</option>
                        <option value="3">RETIREMENT PLAN- Retirement FNA</option>
                        <option value="4">CHILDREN'S EDUCATION FUND- Education FNA 1</option>
                        <option value="5">PARENT'S COVERAGE</option>
                        <option value="6">CHILDREN'S COVERAGE- Family and Life FNA</option>
                        {/* <option value="7">ESTATE PLAN- EP Narratives</option>
                        <option value="8">BUSINESS INSURANCE- Employee- BI Employee
                          Owner- BI Own</option> */}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="reason3">Reason</label>

                    <textarea
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                      rows="5"
                      name='reason3'
                      id="reason3"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

              </div>
            )}
        </div>

        {/* Add Form  */}
        {showAddForm && selectedFinancialPriority.length !== 6 && (
          <div className='flex flex-col'>
            <div className='flex justify-between mb-5'>
              <div className='flex items-center'>
                <h3 className='text-xl font-bold'>
                  Select Top {selectedFinancialPriority.length + 1} Financial Priority
                </h3>
              </div>

              <div>
                <label className="sr-only" htmlFor="FNA">FNA</label>
                <select
                  className="w-full mt-2 rounded-lg border border-gray-500 p-3 text-sm"
                  name='fplist_id'
                  id="FNA"
                  onChange={handleChange}
                  required
                >
                  {FNAOptions.map((fna, ida) => (
                    <option value={fna.value} key={ida} > {fna.label} </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="sr-only" htmlFor="reason">Reason</label>

              <textarea
                className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                placeholder="Type your reason"
                name='reason'
                rows="8"
                id="reason"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        )}

        {/* Dreams and Aspirations */}
        <div className='mt-10 '>
          <DreamsAndAspirations />
        </div>

        <div className='sticky bottom-0 bg-white  py-4 flex justify-between items-center mt-5'>
          <div>
            <Link
              className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
              href={`/admin/clients/slideshow-presentation/${clientID}`}
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
              <span className='text-red-500 ml-4'>Changes not yet saved</span>
            }
          </div>

          {selectedFinancialPriority.length !== 0 ?

            submitButtonIsLoading ?
              <button
                className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto"
              >
                <AiOutlineLoading3Quarters className="animate-spin" />
              </button>
              :
              <button
                onClick={handleSubmitEditForm}
                className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                disabled={submitButtonDisabled}
              >
                Save Changes
              </button>
            :
            submitButtonIsLoading ?
              <button
                className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto"
              >
                <AiOutlineLoading3Quarters className="animate-spin" />
              </button>
              :
              <button
                disabled={submitButtonDisabled}
                onClick={handleSubmitAddForm}
                className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
              >
                Save
              </button>
          }
        </div>

        <ToastContainer />

      </div>
    </div>
  )
}

export default FinancialPrioritiesPage