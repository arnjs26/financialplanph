"use client";
import NotAuthorized from "@/app/components/NotAuthorized";
import ProfileNavbar from "@/app/components/ProfileNavbar";
import { API_BASE_URL, api } from "@/app/lib/libapi";
import { clientInfoByID, setClientInfo } from "@/provider/redux/StateController";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const FinancialPlanPresentationPage = ({ params }) => {
  const dispatch = useDispatch()
  const router = useRouter();

  const agent_id = useSelector((state) => state.StateController.agent_id)
  const { id } = params
  const clientInfo = useSelector((state) => state.StateController.clients)
  // const clientInfo = clients.filter((item)=>item.Client_ID === id)
  const [clientList, setClientList] = useState([])
  const [showWeddingDate, setShowWeddingDate] = useState(false);
  const [showTextBox, setShowTextBox] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
  const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [formsDisabled, setFormsDisabled] = useState(false)


  // const client = useSelector((state) => clientInfoByID(state, id))


  const handleChange = (e) => {
    const { name, value } = e.target
    setSubmitButtonDisabled(false)
    setButtonDisabled(true)
    setClientList({ ...clientList, [name]: value })

    if (name === 'Civil_Status' && e.target.value === "married") {
      setShowWeddingDate(true);
    } else {
      setShowWeddingDate(false);
    }
  };

  const handleChangeHealthCondition = (e) => {
    const { name, value } = e.target
    setSubmitButtonDisabled(false)
    setButtonDisabled(true)
    setClientList({ ...clientList, [name]: value })

    if (e.target.value === "2" || e.target.value === "3") {
      setShowTextBox(true);
    } else {
      setShowTextBox(false);
    }
  };

  useEffect(() => {
    checkToken();
    fetchClienPersonalInfo()
  }, [])

  const checkToken = () => {
    // Verifying token...
    if (!api.checkToken()) {
      router.push("/verify");
    }
  };

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
    const res = await api.getClientInfo(id, userID);
    setClientList(res.Client?.find((item) => item.Client_ID === id))
    // dispatch(setClientInfo({ clientInfo:res.Client?.find((item) => item.Client_ID === id) }));
    setIsLoading(false)

    // try {
    //   const res = await api.getClientInfo(id, agent_id);
    //   setClientList(res.Client?.find((item) => item.Client_ID === id))
    // } catch (error) {
    //   console.error("Error fetching data from the API FETCH CLIENT PERSONAL INFO: ", error);
    // }
    // setIsLoading(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setButtonDisabled(true)
    setSubmitButtonDisabled(false)
    setClientList({ ...clientList, [name]: value })
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    const data =
    {
      client_id: id,
      wedding_date: clientList.Wedding_Date === null ? '' : clientList.Wedding_Date,
      health_condition: clientList.Health_Condition,
      health_conditionDetail: clientList.Details_Of_Health_Condition,
      risk_capacity: clientList.Risk_Capacity,
      risk_attitude: clientList.Risk_Attitude,
    }

    if (clientList.Civil_Status !== "single") {
      if (!data.wedding_date) return (toast.warn('Please Input Wedding Date'))
    }
    if (!data.health_condition) return (toast.warn('Please Input Health Condition'))
    if (data.health_condition !== '1' && data.health_condition !== 1) {
      if (!data.health_conditionDetail) return (toast.warn('Please Input Health Condition Details'))
    }
    if (!data.risk_capacity) return (toast.warn('Please Input Risk Capacity'))
    if (!data.risk_attitude) return (toast.warn('Please Input Risk Attitude'))

    const res = await axios.put(`${API_BASE_URL}/updateClient`, null, {
      params: {
        client_id: id,
        wedding_date: clientList.Wedding_Date === null ? '' : clientList.Wedding_Date,
        health_condition: clientList.Health_Condition,
        health_conditionDetail: clientList.Details_Of_Health_Condition,
        risk_capacity: clientList.Risk_Capacity,
        risk_attitude: clientList.Risk_Attitude,
      }
    });

    if (res.status === 200) {
      setSubmitButtonIsLoading(false)
      toast.success("Successfully Updated!");
      setClientList(res.data.Client[0])
      dispatch((setClientInfo({clientInfo:res.data.Client[0]})))
      setSubmitButtonDisabled(true)
      setButtonDisabled(false)
      setFormsDisabled(false)
    } else {
      setSubmitButtonDisabled(false)
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
    <section>
      {!clientList ? <NotAuthorized /> :
        <>
          <ProfileNavbar clientID={id} />
          <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">

            <div className="rounded-lg  p-8 shadow-xl bg-white">
              <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold text-gray-700 sm:text-4xl uppercase">
                  Personal Details
                </h1>
              </div>
              <form onSubmit={handleSubmitForm}>
                <fieldset disabled={formsDisabled} className="space-y-4">
                  <div>
                    <label className="uppercase font-semibold text-gray-600" htmlFor="fullname">Full Name </label>
                    <input
                      className="w-full mt-2 rounded-lg border border-gray-200 p-3 text-sm  disabled:bg-white"
                      placeholder="John Doe"
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={clientList.FirstName + ' ' + clientList.LastName}
                      // onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="uppercase font-semibold text-gray-600" htmlFor="birthdate">Birthdate</label>
                      <p className="w-full mt-2 rounded-lg border border-gray-200 p-3 text-sm bg-white cursor-default">{clientList.BirthDate?.Formatted}</p>
                    </div>

                    <div>
                      <label className="uppercase font-semibold text-gray-600" htmlFor="age">Age</label>
                      <p className="w-full mt-2 rounded-lg border border-gray-200 p-3 text-sm bg-white cursor-default">{clientList.BirthDate?.Age}</p>
                    </div>

                    <div>
                      <label className="uppercase font-semibold text-gray-600" htmlFor="gender">Gender <span className="text-red-500">*</span></label>
                      <select
                        className="w-full mt-2 rounded-lg border border-gray-200 p-3 text-sm"
                        id="gender"
                        defaultValue={clientList.Gender}
                        name="Gender"
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="uppercase font-semibold text-gray-600" htmlFor="contactNo">Contact No.</label>
                      <input
                        className="w-full mt-2 rounded-lg border border-gray-200 p-3 text-sm disabled:bg-white"
                        placeholder="6391212345"
                        type="tel"
                        id="contactNo"
                        name="Contact_Number"
                        defaultValue={clientList.Contact_Number}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="uppercase font-semibold text-gray-600" htmlFor="email">Email</label>
                      <input
                        className="w-full mt-2 rounded-lg border border-gray-200 p-3 text-sm disabled:bg-white"
                        placeholder="Email address"
                        type="email"
                        id="email"
                        defaultValue={clientList.Email}
                        name="Email"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="uppercase font-semibold text-gray-600" htmlFor="civilStatus">Civil Status <span className="text-red-500">*</span></label>
                      <select
                        className="w-full mt-2 rounded-lg border border-gray-200 p-3 text-sm disabled:bg-white"
                        id="civilStatus"
                        onChange={handleChange}
                        value={clientList.Civil_Status}
                        name="Civil_Status"
                        required
                      >
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="widowed">Widowed</option>
                        <option value="separated">Legally Separated</option>
                      </select>
                    </div>
                    {(showWeddingDate || clientList.Civil_Status === 'Married') &&
                      <div>
                        <label className="uppercase font-semibold text-gray-600" htmlFor="weddingDate">Wedding Date <span className="text-red-500">*</span></label>
                        <input
                          className="w-full mt-2 rounded-lg border border-gray-200 p-3 text-sm"
                          type="date"
                          id="weddingDate"
                          name="Wedding_Date"
                          value={clientList.Wedding_Date}
                          onChange={handleInputChange}
                        />
                      </div>
                    }
                  </div>

                  <div>
                    <p className="uppercase font-semibold text-gray-600">Health Condition</p>
                    <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 mt-2">
                      <div>
                        <input
                          className="peer sr-only"
                          id="option1"
                          type="radio"
                          tabIndex="-1"
                          name="Health_Condition"
                          value='1'
                          checked={parseInt(clientList.Health_Condition) === 1}
                          onChange={handleChangeHealthCondition}
                        />

                        <label
                          htmlFor="option1"
                          className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-900 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white"
                          tabIndex="0"
                        >
                          <span className="text-sm"> Healthy  </span>
                        </label>
                      </div>

                      <div>
                        <input
                          className="peer sr-only"
                          id="option2"
                          type="radio"
                          tabIndex="-1"
                          name="Health_Condition"
                          value='2'
                          checked={parseInt(clientList.Health_Condition) === 2}
                          onChange={handleChangeHealthCondition} />

                        <label
                          htmlFor="option2"
                          className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-900 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white"
                          tabIndex="0"
                        >
                          <span className="text-sm"> With Medical Condition</span>
                        </label>
                      </div>

                      <div>
                        <input
                          className="peer sr-only"
                          id="option3"
                          type="radio"
                          tabIndex="-1"
                          name="Health_Condition"
                          value='3'
                          checked={parseInt(clientList.Health_Condition) === 3}
                          onChange={handleChangeHealthCondition} />

                        <label
                          htmlFor="option3"
                          className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-900 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white"
                          tabIndex="0"
                        >
                          <span className="text-sm"> Person with disability </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {(showTextBox || parseInt(clientList?.Health_Condition) === 2 || parseInt(clientList?.Health_Condition) === 3) &&
                    <div>
                      <label className="uppercase font-semibold text-gray-600" htmlFor="healthDescription">Write your Health Condition</label>
                      <input
                        className="w-full mt-2 mb-5 rounded-lg border border-gray-200 p-3 text-sm  disabled:bg-white"
                        placeholder="Ex: Heart Failure"
                        type="text"
                        id="healthDescription"
                        value={clientList.Details_Of_Health_Condition}
                        name="Details_Of_Health_Condition"
                        onChange={handleInputChange}
                      />
                    </div>
                  }

                  <div className="pt-5">
                    <label className="uppercase font-semibold text-gray-600" htmlFor="RiskAssesment">Risk Assesment (optional)</label>
                    <Link
                      href={'#'}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm ml-4 cursor-pointer bg-green-900 text-white"
                    >
                      TAKE THE ASSESMENT
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="md:border-r-2">
                      <p className="uppercase font-semibold mt-10 text-gray-600">Risk Capacity</p>
                      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 mt-2 md:pr-4">
                        <div>
                          <input className="peer sr-only" id="low" type="radio" tabIndex="-1" name="Risk_Capacity" value="low" onChange={handleInputChange} defaultChecked={clientList.Risk_Capacity === 'low'} />

                          <label
                            htmlFor="low"
                            className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-900 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white"
                            tabIndex="0"
                          >
                            <span className="text-sm"> Low (5-7 pts)  </span>
                          </label>
                        </div>

                        <div>
                          <input className="peer sr-only" id="medium" type="radio" tabIndex="-1" name="Risk_Capacity" value="medium" onChange={handleInputChange} defaultChecked={clientList.Risk_Capacity === 'medium'} />

                          <label
                            htmlFor="medium"
                            className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-900 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white"
                            tabIndex="0"
                          >
                            <span className="text-sm"> Medium (8 - 12 pts)</span>
                          </label>
                        </div>

                        <div>
                          <input className="peer sr-only" id="high" type="radio" tabIndex="-1" name="Risk_Capacity" value="high" onChange={handleInputChange} defaultChecked={clientList.Risk_Capacity === 'high'} />

                          <label
                            htmlFor="high"
                            className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-900 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white"
                            tabIndex="0"
                          >
                            <span className="text-sm"> High (13 - 15 pts) </span>
                          </label>
                        </div>
                      </div>

                    </div>
                    <div>
                      <p className="uppercase font-semibold mt-10 text-gray-600">Risk Attitude</p>

                      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 mt-2">
                        <div>
                          <input className="peer sr-only" id="conservative" type="radio" tabIndex="-1" name="Risk_Attitude" value="conservative" onChange={handleInputChange} defaultChecked={clientList.Risk_Attitude === 'conservative'} />

                          <label
                            htmlFor="conservative"
                            className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-900 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white"
                            tabIndex="0"
                          >
                            <span className="text-sm"> Conservative (6 - 9 pts)  </span>
                          </label>
                        </div>

                        <div>
                          <input className="peer sr-only" id="moderate" type="radio" tabIndex="-1" name="Risk_Attitude" value="moderate" onChange={handleInputChange} defaultChecked={clientList.Risk_Attitude === 'moderate'} />

                          <label
                            htmlFor="moderate"
                            className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-900 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white"
                            tabIndex="0"
                          >
                            <span className="text-sm"> Moderate (10 - 14 pts)</span>
                          </label>
                        </div>

                        <div>
                          <input className="peer sr-only" id="aggressive" type="radio" tabIndex="-1" name="Risk_Attitude" value="aggressive" onChange={handleInputChange} defaultChecked={clientList.Risk_Attitude === 'aggressive'} />

                          <label
                            htmlFor="aggressive"
                            className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-900 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white"
                            tabIndex="0"
                          >
                            <span className="text-sm"> Aggressive (15 - 18 pts) </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="uppercase font-semibold text-gray-600" >Financial Plan Presentation</p>
                    <div className="mt-5">
                      {buttonDisabled ?
                        (
                          <>
                            <span className="py-4 px-8 border border-gray-500 rounded-md mr-2">
                              Video Presentation
                            </span>

                            <span className="py-4 px-8 border border-gray-500 rounded-md">
                              Slideshow Presentation
                            </span>
                          </>
                        ) : (
                          <>
                            <Link href={`/admin/clients/video-presentation/${id}`} className="py-4 px-8 border border-gray-500 bg-green-900 text-white rounded-md mr-2 transition hover:scale-110 hover:shadow-xl">
                              Video Presentation
                            </Link>

                            <Link href={`/admin/clients/slideshow-presentation/${id}`} className="py-4 px-8 border border-gray-500 bg-green-900 text-white rounded-md transition hover:scale-110 hover:shadow-xl">
                              Slideshow Presentation
                            </Link>
                          </>
                        )
                      }

                    </div>
                  </div>

                  <div className="sticky bottom-0 mt-8 bg-white py-4 text-right">
                    {submitButtonIsLoading ?
                      (
                        <button
                          className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto"
                        >
                          <AiOutlineLoading3Quarters className="animate-spin" />
                        </button>
                      ) : (
                        <div className="flex items-center justify-between">
                          <Link
                            className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
                            href={"/admin/clients"}
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
                          <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                            disabled={submitButtonDisabled}
                          >
                            Save
                          </button>
                        </div>
                      )
                    }
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </>
      }
      <ToastContainer />
    </section>
  );
};

export default FinancialPlanPresentationPage;
