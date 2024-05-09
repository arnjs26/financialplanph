import FinancialPlanningSolutions from '@/app/components/FNA/FinancialPlanningSolutions'
import React from 'react'
import { FaSyncAlt } from 'react-icons/fa'

const FamilyProtectionFinancialNeedsAnalysisPage = () => {

    const submitdata = () => {
        let data = 
        [
            {"data": 
                [
                    [
                        {"fpfna_id":0},
                        {"selected_financial_priority_id": 0}, // if 0, no Selected and Added Financial Priority yet.
                        {"selected_financial_priority_rank":1},
                        {"family_protect_important":"Lorem ipsum family protection important..."},
                        {"financial_impact_disceased":"Lorem ipsum family impact deceased..."},
                        {"average_infla_rate":68123.12},
                        {"annual_outflows_cl":1244.12},
                        {"annual_outflows_sp":2244.16},
                        {"years_family_support":6},
                        {"annual_support_from_cl":7869.16},
                        {"annual_support_from_sp":7869.16},
                        {"years_support_cl":1112.16},
                        {"years_support_sp":5667.16},
                        {"addx_life_insurance_cl":7772.22},
                        {"addx_life_insurance_sp":3314.13}
                    ]
                ]
            },
            {"debts_and_final_expenses":
                [
                    [
                        {"debFin_id":0},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        {"client_id":7},
                        {"debFinList_id":1},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        {"debFinList_description":""}, // include value if debFinList_id is 0
                        {"amount_on_client":9691.41},
                        {"amount_on_spouse":2255.38}
                    ],
                    [
                        {"debFin_id":0},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.                
                        {"client_id":7},
                        {"debFinList_id":2},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        {"debFinList_description":""}, // include value if debFinList_id is 0
                        {"amount_on_client":7712.61},
                        {"amount_on_spouse":2333.15}
                    ],
                    [
                        {"debFin_id":0},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        {"client_id":7},
                        {"debFinList_id":3},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        {"debFinList_description":""}, // include value if debFinList_id is 0
                        {"amount_on_client":1122.55},
                        {"amount_on_spouse":7121.16}
                    ]
                ]
            },
            {"existing_life_insurance_coverage":
                [
                    [
                        {"exLifeInsCov_id":0},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        {"client_id":7},
                        {"exLifeInsCovList_id":1},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        {"exLifeInsCovList_description":""},
                        {"amount_on_client":2224.15},
                        {"amount_on_spouse":3331.17}
                    ],
                    [
                        {"exLifeInsCov_id":0},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        {"client_id":7},
                        {"exLifeInsCovList_id":2},  // Indicate 0 if wanting to add it for the first time, otherwise, existing record will be updated.
                        {"exLifeInsCovList_description":""},
                        {"amount_on_client":2224.15},
                        {"amount_on_spouse":3331.17}
                    ]
                ]
            },
            { "client_id":7 }
        ]
        

    }
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
                    name='family_protect_important'
                    id="family_protect_important"
                    rows={4}
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
                    id="financial_impact_disceased"
                />
            </div>            

            <div className='mt-8'>
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
                                    type='text'
                                    name='average_infla_rate'
                                    id="average_infla_rate"
                                />
                            </div>
                        </div>

                        <div className='mt-4'>
                            <div className="overflow-x-auto ">
                                <table className="table-fixed ">
                                    <thead className="">
                                        <tr className="text-sm">
                                            <td className="px-4 py-2 font-medium text-gray-900"></td>
                                            <td className="px-4 py-2 font-medium text-gray-900">Name of Client</td>
                                            <td className="px-4 py-2 font-medium text-gray-900">Spouse</td>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                Total Annual Cash Outflows
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='annual_outflows_cl'
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                            <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='annual_outflows_sp'
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                NO. OF YEARS YOUR FAMILY NEEDS YOUR SUPPORT (AVERAGE OF 10 YRS OR 23 MINUS AGE OF THE YOUNGEST CHILD WHICHEVER IS LONGER
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='years_family_support'
                                                />
                                            </td>
                                            {/* <td className="px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='annual_outflows_sp'
                                                />
                                            </td> */}
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                TOTAL LIFE INSURANCE COVERAGE NEEDED FOR FAMILY LIVING EXPENSES</td>
                                            <td className="px-4 py-2 text-gray-700">
                                                0
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                0
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* LIFE INSURANCE COVERAGE FOR SUPPORT GIVEN TO OTHERS (EX. NEPHEWS/NIECES, MISSIONARIES) */}
                    <div className='mt-8'>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4 text-center">
                            LIFE INSURANCE COVERAGE FOR SUPPORT GIVEN TO OTHERS (EX. NEPHEWS/NIECES, MISSIONARIES)
                        </div>

                        <div className='mt-4'>
                            <div className="overflow-x-auto ">
                                <table className="table-fixed">
                                    <thead className="">
                                        <tr className="text-sm">
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name of Client</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Spouse</td>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                ANNUAL SUPPORT GIVEN
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='years_support_cl'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='years_support_sp'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                NO. OF YEARS YOU PLAN TO CONTINUE GIVING SUPPORT AFTER YOU'RE GONE
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='addx_life_insurance_cl'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='addx_life_insurance_sp'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                TOTAL LIFE INSURANCE COVERAGE NEEDED FOR SUPPORT GIVEN TO OTHERS
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                0
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                0
                                                </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* ONE TIME NEEDS TO CLEAR OUT DEBTS AND FINAL EXPENSES */}
                    <div className='mt-8'>
                        <div className="text-sm font-bold text-slate-600 uppercase mt-4 text-center">
                            ONE TIME NEEDS TO CLEAR OUT DEBTS AND FINAL EXPENSES
                        </div>

                        <div className='mt-4'>
                            <div className="overflow-x-auto ">
                                <table className="table-fixed">
                                    <thead className="">
                                        <tr className="text-sm">
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name of Client</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Spouse</td>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                LOANS NOT COVERED BY MORTGAGE REDEMPTION INSURANCE OR CREDIT LIFE INSURANCE
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_client'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_spouse'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                DESIRED STANDY BY FUNDS TO PAY OFF FUNERAL AND MEDICAL EXPENSES
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_client'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_spouse'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                UNFUNDED EDUCATIONAL NEEDS
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_client'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_spouse'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                GIFT TO PARENTS
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_client'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_spouse'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='rounded border border-gray-300 p-2' 
                                                name='debFinList_description'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_client'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_spouse'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-bold text-gray-900">
                                                TOTAL LIFE INSURANCE COVERAGE NEEDED
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                0
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                0
                                                </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* EXISTING LIFE INSURANCE COVERAGE */}
                    <div className='mt-8'>
                        <div className="text-sm font-medium  text-slate-600 uppercase mt-4 ">
                            EXISTING LIFE INSURANCE COVERAGE
                        </div>

                        <div className='mt-4'>
                            <div className="overflow-x-auto ">
                                <table className="table-fixed">
                                    <thead className="">
                                        <tr className="text-sm">
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name of Client</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Spouse</td>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                SSS/GSIS BENEFIT
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_client'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_spouse'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                COMPANY BENEFIT
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_client'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_spouse'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-full rounded border border-gray-300 p-2' 
                                                placeholder='Add Benefit from Governnment Company' 
                                                name='exLifeInsCovList_description'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='amount_on_client'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='annual_outflows_sp'
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-bold text-gray-900">
                                                TOTAL LIFE INSURANCE COVERAGE (NON-GOVERNMENT & NON COMPANY PAID)
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                0
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                0
                                                </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-bold text-gray-900">
                                                TOTAL EXISTING LIFE INSURANCE COVERAGE
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                0
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                0
                                                </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 font-bold text-gray-900">
                                                ADDITIONAL LIFE INSURANCE COVERAGE NEEDED
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='addx_life_insurance_cl'
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"><input 
                                                type="text" 
                                                className='w-32 rounded border border-gray-300 p-2' 
                                                name='addx_life_insurance_sp'
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
                <FinancialPlanningSolutions />
            </div>

        </div>
    )
}

export default FamilyProtectionFinancialNeedsAnalysisPage