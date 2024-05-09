"use client"
import Charts from '@/app/components/Charts';
import Link from 'next/link'
import charts from '../../../../components/Charts'
import React, { useEffect, useState } from 'react'
import { api } from '@/app/lib/libapi';
import { FaSpinner } from 'react-icons/fa';
import { AiFillCalculator } from 'react-icons/ai';

const CashflowPage = ({ params }) => {
  const { clientID } = params
  const [cashFlowList, setCashFlowList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cashFlowListOutflow, setCashFlowListOutflow] = useState([])

  useEffect(() => {
    fetchCashFlowList()
    fetchCashFlowListOutflow()
  }, [])

  const fetchCashFlowList = async () => {
    try {
      const res = await api.getCashFlowList(0, clientID);

      setCashFlowList(res.Family_Cash_Flow_Analysis)
    } catch (error) {
      console.error("Error fetching data from the API FETCH CASH FLOW OUTFLOW LIST: ", error);
    }
    setIsLoading(false)
  }

  const fetchCashFlowListOutflow = async () => {
    try {
      const res = await api.getCashFlowList(1, clientID);

      setCashFlowListOutflow(res?.Family_Cash_Flow_Analysis)
    } catch (error) {
      console.error("Error fetching data from the API FETCH CASH FLOW LIST: ", error);
    }
    setIsLoading(false)
  }

  const countIsWant = cashFlowListOutflow.CashFlowList_OutFlow?.filter((item) => item.Cash_Flow_Data.isWant === 1)?.length
  const countNeeds = cashFlowListOutflow.CashFlowList_OutFlow?.filter((item) => item.Cash_Flow_Data.isWant === 0)?.length

  //INFLOW
  const sumOfCfdaClientAmount = cashFlowList.CashFlowList_InFlow?.reduce((sum, cashFlow) => {
    const cfdaClientAmount = cashFlow.Cash_Flow_Data?.cfda_client_amount || 0;
    return sum + cfdaClientAmount;
  }, 0);

  //Calculate all cfda_spouse_amount
  const sumOfCfdaSpouseAmount = cashFlowList.CashFlowList_InFlow?.reduce((sum, cashFlow) => {
    const cfdaSpouseAmount = cashFlow.Cash_Flow_Data?.cfda_spouse_amount || 0;
    return sum + cfdaSpouseAmount;
  }, 0);

  //OUTFLOW
  const sumOfCfdaClientAmountExpense = cashFlowListOutflow.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
    const cfdaClientAmount = cashFlow.Cash_Flow_Data?.cfda_client_amount_expense || 0;
    return sum + cfdaClientAmount;
  }, 0);

  //Calculate all cfda_spouse_amount_expense
  const sumOfCfdaSpouseAmountExpense = cashFlowListOutflow.CashFlowList_OutFlow?.reduce((sum, cashFlow) => {
    const cfdaSpouseAmount = cashFlow.Cash_Flow_Data?.cfda_spouse_amount_expense || 0;
    return sum + cfdaSpouseAmount;
  }, 0);


  if (isLoading) return (
    <div className={`fixed inset-0 z-50 block`}>
      <div
        className="fixed inset-0 bg-black opacity-5"
      ></div>
      <div className="fixed inset-0 flex items-center justify-center ">
        <FaSpinner className='animate-spin text-green-900' size={100} />
      </div>
    </div>
  )
  
  return (
    <div className='mt-4 bg-white p-2 border rounded-lg'>
      <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">Family Cash Flow Recommendation</div>

      <div className="rounded-lg border border-gray-200 w-full ">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="text-sm">
                <td className="whitespace-nowrap px-4 py-2 f  ont-medium text-gray-900"></td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Client</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Spouse</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total</td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs">

              <tr className='font-bold'>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">Total Annual Actual Cash InFlow</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {(sumOfCfdaClientAmount * 12)?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {(sumOfCfdaSpouseAmount * 12)?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {((sumOfCfdaClientAmount + sumOfCfdaSpouseAmount) * 12)?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <Link href={`/admin/clients/cash-flow/cash-inflow/${clientID}`}>
                    <AiFillCalculator className='cursor-pointer' size={25} />
                  </Link>
                </td>
              </tr>
              <tr className='font-bold'>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">Total Annual Actual Cash OutFlow</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {(sumOfCfdaClientAmountExpense * 12)?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {(sumOfCfdaSpouseAmountExpense * 12)?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {((sumOfCfdaClientAmountExpense + sumOfCfdaSpouseAmountExpense) * 12)?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <Link href={`/admin/clients/cash-flow/cash-outflow/${clientID}`}>
                    <AiFillCalculator className='cursor-pointer' size={25} />
                  </Link>
                </td>
              </tr>
              <tr className='font-bold'>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">Total Annual Actual Net Cash Flow</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {((sumOfCfdaClientAmount * 12) - (sumOfCfdaClientAmountExpense * 12))?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {((sumOfCfdaSpouseAmount * 12) - (sumOfCfdaSpouseAmountExpense * 12))?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {(((sumOfCfdaClientAmount * 12) - (sumOfCfdaClientAmountExpense * 12)) + ((sumOfCfdaSpouseAmount * 12) - (sumOfCfdaSpouseAmountExpense * 12)))?.toLocaleString('en-US')}</td>
              </tr>
              <tr className='font-bold'>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">Total Monthly Actual Net Cash Flow</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {((sumOfCfdaClientAmount) - (sumOfCfdaClientAmountExpense))?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {((sumOfCfdaSpouseAmount) - (sumOfCfdaSpouseAmountExpense))?.toLocaleString('en-US')}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₱ {(((sumOfCfdaClientAmount) - (sumOfCfdaClientAmountExpense)) + ((sumOfCfdaSpouseAmount * 12) - (sumOfCfdaSpouseAmountExpense * 12)))?.toLocaleString('en-US')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-4 '>
        <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">Cash Outflow Composition</div>

        <div className='mx-auto text-center'>
          <div className='grid grid-cols-3 p-4 mx-auto'>
            <Charts title="Client" />
            <Charts title="Spouse" />
            <Charts title="Total" />
          </div>
        </div>
      </div>

      <div className='mt-4 '>
        <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">Recommendations to Increase Cash Inflow</div>
        {cashFlowList.Recommendations?.length !== 0 ?

          cashFlowList.Recommendations?.map((item, idx) => (
            <ol key={idx} className='list-decimal list-inside'>
              <li>{item.description}</li>
            </ol>
          ))
          :
          'No Cash Inflow Recommendations yet'
        }
      </div>

      <div className='mt-4 '>
        <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">Recommendations to Decrease Cash Outflow</div>
        {cashFlowListOutflow.Recommendations?.length !== 0 ?

          cashFlowListOutflow.Recommendations?.map((item, idx) => (
            <ol key={idx} className='list-decimal list-inside'>
              <li>{item.description}</li>
            </ol>
          ))
          :
          'No Cash Outflow Recommendations yet'
        }

        <div className='mt-8'>
          <p>Improving personal net cash flow involves increasing your income and reducing your expenses. Here are several strategies to help you improve your personal net cash flow:</p>

          <ol className='list-decimal list-inside ml-5 my-4 space-y-4'>
            <li>
              <span className='font-bold'>Create a budget:</span> Start by tracking your income and expenses to get a clear picture of where your money is going. Identify areas where you can cut back on unnecessary spending.
            </li>
            <li>
              <span className='font-bold'>Increase your income:</span> Look for ways to boost your income. Consider asking for a raise at work, taking on additional hours, freelancing or starting a side business, or exploring passive income streams like renting out a property or investing in stocks. You may also explore being a financial advisor. Answer this quiz to know if you are fit to be an advisor: https://aetosfph.com/advisor-quiz/
            </li>
            <li>
              <span className='font-bold'>Reduce discretionary spending:</span> Review your expenses and identify areas where you can cut back. Reduce discretionary spending on non-essential items such as eating out, entertainment, or luxury goods. Look for more affordable alternatives or find ways to enjoy free activities.
            </li>
            <li>
              <span className='font-bold'>Minimize fixed expenses:</span> Review your recurring bills and see if there are any opportunities to reduce them. Negotiate lower rates for services like internet, cable, or insurance. Consider downsizing your living space or refinancing loans to lower monthly payments.
            </li>
            <li>
              <span className='font-bold'>Eliminate or consolidate debt:</span> High-interest debt can drain your cash flow. Develop a debt repayment plan and focus on paying off high-interest debt first. Consider consolidating multiple debts into a single, lower-interest loan to simplify your payments and potentially reduce interest charges.
            </li>
            <li>
              <span className='font-bold'>Save on utilities:</span> Be mindful of your energy consumption. Turn off lights when not in use, unplug electronics, and consider energy-efficient appliances. Lowering your utility bills can free up more money for savings or debt repayment.
            </li>
            <li>
              <span className='font-bold'>Automate savings:</span> Set up automatic transfers from your checking account to a savings or investment account. Treat savings as a regular expense and prioritize it in your budget.
            </li>
            <li>
              <span className='font-bold'>Increase financial literacy:</span> Educate yourself about personal finance to make informed decisions. Learn about investing, retirement planning, and strategies for managing your money effectively. This knowledge can help you optimize your cash flow in the long run.
            </li>
            <li>
              <span className='font-bold'>Review and adjust regularly:</span> Periodically review your budget and financial situation to ensure you're on track. Adjust your strategies as needed to accommodate changes in your income or expenses.
            </li>
          </ol>

          <p>Remember, improving your net cash flow requires discipline and consistent effort. It may take time to see significant results, but with persistence, you can make positive changes to your financial situation.</p>
        </div>
      </div>

      <div className='sticky bottom-0 bg-white  py-4 flex justify-between items-center mt-5'>
          <div>
            <Link
              className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-green-900 focus:outline-none focus:ring active:text-green-900"
              href={`/admin/clients`}
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
          </div>
            {/* <p>The value of the advise that we will give you will highly depend on the amount and value of information that you will provide us. Rest assure that all the information you will share will be kept confidential.</p> */}
        </div>

    </div>
  )
}

export default CashflowPage