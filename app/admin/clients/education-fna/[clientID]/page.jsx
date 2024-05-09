'use client'
import FinancialPlanningSolutions from '@/app/components/FNA/FinancialPlanningSolutions'
import { api } from '@/app/lib/libapi'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaPlusCircle } from 'react-icons/fa'
import { IoEye } from 'react-icons/io5'
import { MdLibraryAdd } from 'react-icons/md'


const educ_plann_exp_lists = [
    {
        id: 1,
        description: 'ESTIMATED ANNUAL TUITION FEES'
    }
]

const EducationFNAPage = ({ params }) => {
    const { clientID } = params
    const [inputData, setInputData] = useState([])
    const [inputChildrenData, setInputChildrenData] = useState([{
        childrenEducFNA_id: 0,
        famComp_id: 0,
        child_birthday: '',
        desired_school: '',
        age_for_college: 18,
        total_educ_fund_needed: 0,
        investment_alloc: 0,
    }])
    const [inputEducationPlanExpense, setInputEducationPlanExpense] = useState([])
    const [inputEducationPlanExpenseOthers, setInputEducationPlanExpenseOthers] = useState([])
    const [childrensList, setChildrensList] = useState([])
    const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false)
    const [selectedChild, setSelectedChild] = useState('')

    useEffect(() => {
        fetchFamilyCompositionList()
    }, [])

    const fetchFamilyCompositionList = async () => {
        try {
            const res = await api.getFamilyCompositionList(clientID);
            setChildrensList(res?.Family_Composition.filter((item) => item.type === 2))
        } catch (error) {
            console.error("Error fetching data from the API FETCH FAMILY COMPOSITION LIST: ", error);
        }
    }

    const handleInputChange = (e, index, options, id) => {

        const { value, name } = e.target

        if (options === 'inputData') setInputData({ ...inputData, [name]: value })

        if (options === 'selectedChild') {
            setSelectedChild(value)
            
            // Make a copy of the existing formData array
            const updatedFormData = [...inputChildrenData];

            // Check if formData already has an item with the same famComp_id
            const existingItemIndex = inputChildrenData.findIndex((item) => item.famComp_id === value);

            if (existingItemIndex !== -1) {
                // If an item with the same famComp_id exists, update its values
                updatedFormData[existingItemIndex][name] = value;
            } else {
                // If an item with the same famComp_id doesn't exist, create a new object and push it
                const newItem = {
                    childrenEducFNA_id: 0,
                    famComp_id: value,
                    child_birthday: '',
                    desired_school: '',
                    age_for_college: 18,
                    total_educ_fund_needed: 0,
                    investment_alloc: 0,
                };

                // Update the value of the specified property in the object
                newItem[name] = value;

                // Push the new object to the array
                updatedFormData.push(newItem);
            }

            // Update the state with the new formData
            setInputChildrenData(updatedFormData);
        };

        //Childrens
        if (options === 'childrensData') {

            // Make a copy of the existing formData array
            const updatedFormData = [...inputChildrenData];

            // Check if formData already has an item with the same famComp_id
            const existingItemIndex = inputChildrenData.findIndex((item) => item.famComp_id === id);

            if (existingItemIndex !== -1) {
                // If an item with the same famComp_id exists, update its values
                updatedFormData[existingItemIndex][name] = value;
            } else {
                // If an item with the same famComp_id doesn't exist, create a new object and push it
                const newItem = {
                    childrenEducFNA_id: 0,
                    famComp_id: id,
                    child_birthday: '',
                    desired_school: '',
                    age_for_college: 18,
                    total_educ_fund_needed: 0,
                    investment_alloc: 0,
                };

                // Update the value of the specified property in the object
                newItem[name] = value;

                // Push the new object to the array
                updatedFormData.push(newItem);
            }

            // Update the state with the new formData
            setInputChildrenData(updatedFormData);
        }

        //Education Plan Expense
        if (options === 'educationPlanExpense') {

            // Make a copy of the existing formData array
            const updatedFormData = [...inputEducationPlanExpense];

            // Check if formData already has an item with the same famComp_id
            const existingItemIndex = inputEducationPlanExpense.findIndex((item) => item.educPlanExpList_id === id);

            if (existingItemIndex !== -1) {
                // If an item with the same sfp_id exists, update its values
                updatedFormData[existingItemIndex][name] = value;
            } else {
                // If an item with the same sfp_id doesn't exist, create a new object and push it
                const newItem = {
                    educPlanExp_id: 0,
                    familyComp_id: id,
                    educPlanExpList_id: 0,
                    educPlanExpList_description: '',
                    presentVal_amt: 18,
                    avg_inflation_rate: 0,
                    fundNeeded_futureVal_amt: 0,
                };

                // Update the value of the specified property in the object
                newItem[name] = value;

                // Push the new object to the array
                updatedFormData.push(newItem);
            }

            // Update the state with the new formData
            setInputEducationPlanExpense(updatedFormData);
        }

        if (options === 'educationPlanExpenseOthers') {
            let data = [...inputEducationPlanExpenseOthers];
            data[index][name] = value;
            setInputEducationPlanExpenseOthers(data);
        }
    }

    const handleAddInputForm = () => {
        const educationPlanExpenseOthers = {
            educPlanExp_id: 0,
            familyComp_id: 0,
            educPlanExpList_id: 0,
            educPlanExpList_description: '',
            presentVal_amt: 18,
            avg_inflation_rate: 0,
            fundNeeded_futureVal_amt: 0,
        }
        setInputEducationPlanExpenseOthers([...inputEducationPlanExpenseOthers, educationPlanExpenseOthers])
    }

    const removeOtherInputFields = (index) => {
        let educationPlanExpenseOthers = [...inputEducationPlanExpenseOthers];
        educationPlanExpenseOthers.splice(index, 1)
        setInputEducationPlanExpenseOthers(educationPlanExpenseOthers)
    }

    const submitData = () => {
        let educationFNAData =
            [
                {
                    "data":
                        [
                            [
                                { "educPlanFNA_id": 0 }, // Make it zero to add this record for the first time.
                                { "reason_educPlan_important": "Education as Planning is important to me because of Lorem ipsum asgada wa weqgysd." },
                                { "dreams_for_children": "The dreams for my children are Lorem ipsum blah blah blah..." }
                            ]
                        ]
                },
                {
                    "Children":
                        [
                            [
                                { "childrenEducFNA_id": 0 }, // Make it zero to add this record for the first time.
                                { "famComp_id": 9 },
                                { "child_birthday": "2024-05-23" },
                                { "desired_school": "Anonymous School Institute of Technology for Child no. 1" },
                                { "age_for_college": 18 },
                                { "total_educ_fund_needed": 1562199.07 },
                                { "investment_alloc": 800000 }
                            ],
                            [
                                { "childrenEducFNA_id": 0 }, // Make it zero to add this record for the first time.
                                { "famComp_id": 10 },
                                { "child_birthday": "2024-05-23" },
                                { "desired_school": "Anonymous School Institute of Technology for Child no. 2" },
                                { "age_for_college": 20 },
                                { "total_educ_fund_needed": 699618.55 },
                                { "investment_alloc": 700000 }
                            ]
                        ]
                },
                {
                    "Education_Plan_Expenses":
                        [
                            [
                                { "educPlanExp_id": 0 },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                                { "familyComp_id": 9 },
                                { "educPlanExpList_id": 1 },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record that matches similar ID will be updated.
                                { "educPlanExpList_description": "" }, // include value if educPlanExpList_id is 0
                                { "presentVal_amt": 142000 },
                                { "avg_inflation_rate": 4 },
                                { "fundNeeded_futureVal_amt": 12000 }
                            ],
                            [
                                { "educPlanExp_id": 0 },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                                { "familyComp_id": 10 },
                                { "educPlanExpList_id": 0 },  // Indicate 0 if wanting to add it for the first time, otherwise, existing record that matches similar ID will be updated.
                                { "educPlanExpList_description": "Dorm Rental" }, // include value if educPlanExpList_id is 0
                                { "presentVal_amt": 67500 },
                                { "avg_inflation_rate": 0 },
                                { "fundNeeded_futureVal_amt": 18100 }
                            ]
                        ]
                },
                { "client_id": 7 },
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

        console.log('input Children', inputChildrenData)
        console.log('input data', inputData)
        console.log('selected child', selectedChild)

    }

    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
                <p className="mt-2 text-sm">
                    Education planning for children is crucial as it ensures they receive a quality education, tailored to their needs and goals, setting them up for future success. It maximizes opportunities, promotes a supportive learning environment, and addresses financial considerations.
                </p>
            </div>

            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">
                EDUCATION PLANNING
            </div>

            <div className='mt-8'>
                <label className="uppercase font-medium" htmlFor="reason_educPlan_important">
                    Education Planning is important for me because
                </label>
                <textarea
                    className="w-full mt-2 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="reason_educPlan_important"
                    name='reason_educPlan_important'
                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                    id="reason_educPlan_important"
                />
            </div>

            <div className='mt-2'>
                <label className="uppercase font-medium" htmlFor="dreams_for_children">
                    What are your dreams for your children?
                </label>
                <textarea
                    className="w-full mt-2 rounded-lg border border-gray-200 p-2 text-sm"
                    placeholder="Type your answer here"
                    name='dreams_for_children'
                    onChange={(e) => handleInputChange(e, 0, 'inputData')}
                    id="dreams_for_children"
                />
            </div>

            <div className='mt-8'>
                <div className="bg-gray-200 p-2">
                    <div className="text-sm font-bold text-slate-600 uppercase text-center">
                        EDUCATION FUNDS NEEDED TO ACHIEVE YOUR DREAM FOR YOUR CHILD/REN
                    </div>

                    <div className="mt-4">
                        <label className="uppercase font-semibold flex items-center gap-4 " htmlFor="children">Select a child *
                            <select
                                name="famComp_id"
                                id="children"
                                onChange={(e) => handleInputChange(e, 0, 'selectedChild')}
                                className=" p-2 w-[200px] rounded-md border border-gray-300 text-gray-700 text-xs"
                            >
                                <option value={''}>Please select</option>

                                {childrensList.map((item, idx) => (
                                    <option key={idx} value={item.fc_id}>{item.first_name} {item.last_name}</option>
                                ))}
                            </select>
                            <MdLibraryAdd className='cursor-pointer' size={20} />
                        </label>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 justi">
                        <label className="uppercase font-semibold flex items-center gap-4 whitespace-nowrap" htmlFor="infationRate">Birthdate *
                            <input
                                className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                type='date'
                                name='child_birthday'
                                onChange={(e) => handleInputChange(e, 0, 'childrensData', selectedChild)}
                                
                                id="birthdate"
                            />
                        </label>
                        <label className="uppercase font-semibold flex items-center gap-4 whitespace-nowrap" htmlFor="currentAge">Current Age
                            <p
                                className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                            >
                                {/* {inputChildrenData.length !== 0  ? ((Math.floor((new Date() - new Date(inputChildrenData[inputChildrenData.map(item => item.famComp_id).indexOf(parseInt(inputData.famComp_id) ?? 0)].child_birthday).getTime()) / 3.15576e+10)) ?? 0) : 0} */}
                            </p>
                        </label>
                    </div>
                    <div className="mt-4">
                        <label className="uppercase font-semibold flex items-center gap-4 whitespace-nowrap" htmlFor="desired_school">DESIRED SCHOOL *
                            <input
                                className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                type='text'
                                name='desired_school'
                                placeholder='Ateneo de Naga University'
                                onChange={(e) => handleInputChange(e, 0, 'childrensData', inputData.famComp_id ?? 0)}
                                
                                id="desired_school"
                            />
                        </label>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <label className="uppercase font-semibold flex items-center gap-4" htmlFor="infationRate">AGE OF CHILD GOING TO COLLEGE *
                            <select
                                name="mode_of_payment"
                                id="mode_of_payment"
                                onChange={(e) => handleInputChange(e, 0, 'childrensData', inputData.famComp_id ?? 0)}
                                
                                className=" p-2 w-[200px] rounded-md border border-gray-300 text-gray-700 text-xs"
                            >
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                        <label className="uppercase font-semibold flex items-center gap-4" htmlFor="infationRate">NO. OF YEARS BEFORE CHILD ENTERS COLLEGE*
                            <input
                                className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                type='text'
                                placeholder='Auto Computed '
                                id="current_age"
                                disabled
                            />
                        </label>
                    </div>

                    <div className='mt-4'>
                        <div className="overflow-x-auto ">
                            <table className="min-w-full ">
                                <thead className="">
                                    <tr className="text-sm">
                                        <td className="px-4 py-2 font-semibold text-gray-900">EDUCATION EXPENSE</td>
                                        <td className="px-4 py-2 font-semibold text-gray-900">PRESENT VALUE (YEARLY TOTAL)</td>
                                        <td className="px-4 py-2 font-semibold text-gray-900">AVE. INFLATIONRATE</td>
                                        <td className="px-4 py-2 font-semibold text-gray-900">FUND NEEDED FOR EDUCATION FUTURE VALUE</td>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    {educ_plann_exp_lists.map((item, idx, { length }) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                {item.description}*
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    name='presentVal_amt'
                                                    onChange={(e) => handleInputChange(e, idx, 'educationPlanExpense', item.id)}
                                                    className='w-32 rounded border border-gray-300 p-2' />
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    name='avg_inflation_rate'
                                                    onChange={(e) => handleInputChange(e, idx, 'educationPlanExpense', item.id)}
                                                    className='w-14 rounded border border-gray-300 p-2'
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-gray-700 flex items-center gap-4">
                                                <input
                                                    type="number"
                                                    name='fundNeeded_futureVal_amt'
                                                    onChange={(e) => handleInputChange(e, idx, 'educationPlanExpense', item.id)}
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                />
                                                {idx + 1 === length &&
                                                    <MdLibraryAdd className='cursor-pointer' size={20} onClick={handleAddInputForm} />
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                    {inputEducationPlanExpenseOthers.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                <input
                                                    type="text"
                                                    placeholder='Other Education Expense'
                                                    name='educPlanExpList_description'
                                                    onChange={(e) => handleInputChange(e, idx, 'educationPlanExpenseOthers', item.id)}
                                                    className='w-full rounded border border-gray-300 p-2'
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    name='presentVal_amt'
                                                    onChange={(e) => handleInputChange(e, idx, 'educationPlanExpenseOthers', item.id)}
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <input
                                                    type="number"
                                                    name='avg_inflation_rate'
                                                    onChange={(e) => handleInputChange(e, idx, 'educationPlanExpenseOthers', item.id)}
                                                    className='w-14 rounded border border-gray-300 p-2'
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-gray-700 ">
                                                <input
                                                    type="number"
                                                    name='fundNeeded_futureVal_amt'
                                                    onChange={(e) => handleInputChange(e, idx, 'educationPlanExpenseOthers', item.id)}
                                                    className='w-32 rounded border border-gray-300 p-2'
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="px-4 py-2 font-bold text-gray-900">
                                            TOTAL EDUCATION FUND NEEDED
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <input
                                                type="text"
                                                placeholder='Total Auto Computed'
                                                className='h-7 w-32 rounded border border-gray-300 p-2'
                                                disabled
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-700 text-center">
                                        </td>
                                        <td className="px-4 py-2 text-gray-700 flex items-center gap-4">
                                            <input
                                                type="text"
                                                placeholder='data is from 12.1 (total)'
                                                className='h-7 w-32 rounded border border-gray-300 p-2'
                                                disabled
                                            />
                                            <span>
                                                <Link href={'/admin/clients/education-fna/education-table'}>
                                                    <IoEye className='text-lg cursor-pointer' />
                                                </Link>
                                            </span> {/* When clicked go to 12.1 */}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='mt-8 grid grid-cols-2'>
                        <label className="uppercase font-semibold flex items-center gap-4 whitespace-nowrap" htmlFor="investment_alloc">LESS: NON-GUARANTEED INVESTMENTS ALLOCATED  FOR EDUCATION OF CHILD
                        </label>
                        <input
                            className="w-32 rounded-lg border border-gray-200 p-2 text-sm"
                            type='text'
                            name='investment_alloc'
                            onChange={(e) => handleInputChange(e, 0, 'childrensData', inputData.famComp_id ?? 0)}
                            
                            id="investment_alloc"
                        />
                    </div>
                    <div className='mt-8 grid grid-cols-2'>
                        <label className="uppercase font-semibold flex items-center gap-4 whitespace-nowrap" htmlFor="total_educ_fund_needed">ADDITIONAL EDUCATION FUND NEEDED
                        </label>
                        <input
                            className="w-32 rounded-lg border border-gray-200 p-2 text-sm"
                            type='text'
                            name='total_educ_fund_needed'
                            onChange={(e) => handleInputChange(e, 0, 'childrensData', inputData.famComp_id ?? 0)}
                            
                            id="total_educ_fund_needed"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                {/* <FinancialPlanningSolutions /> */}
            </div>

            <div className='mt-8 sticky bottom-0 bg-white  py-4 flex justify-between'>
                <Link
                    className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
                    href={`/admin/clients/financial-priorities/${clientID}`}
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

                {submitButtonIsLoading ?
                    <button
                        className="inline-block w-full rounded-lg bg-green-900 px-8 py-3 font-medium text-white sm:w-auto"
                    >
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    </button>
                    :

                    <button
                        type="submit"
                        onClick={submitData}
                        className="inline-block w-full rounded ml-2 bg-green-900 px-8 py-3 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                    // disabled={disabledSubmitButton}
                    >
                        Save
                    </button>
                }

            </div>
        </div>
    )
}

export default EducationFNAPage