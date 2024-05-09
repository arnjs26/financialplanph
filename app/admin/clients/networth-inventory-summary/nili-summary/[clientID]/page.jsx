import FamilyLifeAndHealthInsurance from '@/app/components/NetworthInventory/FamilyLifeAndHealthInsurance'
import FamilyLifeAndHealthInsuranceAetos from '@/app/components/NetworthInventory/FamilyLifeAndHealthInsuranceAetos'
import React from 'react'
import { IoIosInformationCircle } from 'react-icons/io'

const NILISummaryPage = () => {
    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div className="text-base font-bold text-slate-600 uppercase text-center">NETWORTH INVENTORY</div>
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
                <p className="mt-2 text-sm">
                    The net worth inventory is important in financial planning because it provides a snapshot of your financial situation by calculating the difference between your assets and liabilities. It helps assess your financial health, set realistic goals, manage cash flow, handle debts effectively, allocate assets, and plan for the future. Regularly updating your net worth inventory allows you to track progress, make informed decisions, and maintain financial stability.
                </p>
            </div>

            <div className='mt-4'>
                <div className="text-base sm:py-2 font-bold text-slate-600 uppercase">ASSETS</div>
                <button className='px-4 py-2 bg-gray-200 flex items-center gap-4 font-bold text-slate-600'>
                    LIQUID ASSETS <IoIosInformationCircle className='text-lg' />
                </button>
                <FamilyLifeAndHealthInsuranceAetos />
                <FamilyLifeAndHealthInsurance />
            </div>
        </div>
    )
}

export default NILISummaryPage