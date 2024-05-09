import React from 'react'

const DreamsAndAspirations = () => {
    return (
        <div>
            <h2 className='text-center text-2xl font-bold text-slate-600'>Dreams and Aspirations</h2>

            <div className='grid grid-cols-3 gap-2'>
                <div>
                    <label className="sr-only" htmlFor="Goals">Goals</label>
                    <select
                        className="w-full mt-2 rounded-lg border border-gray-500 p-3 text-sm"
                        id="Goals"
                    >
                        <option value="">Goals</option>
                        <option value="Settlement of Debt">Settlement of Debt</option>
                        <option value="Travel">Travel</option>
                        <option value="House">House</option>
                        <option value="Cars">Cars</option>
                        <option value="Others....">Others....</option>
                    </select>
                </div>
                <div>
                    <label className="sr-only" htmlFor="targetAmount">Target Amount</label>
                    <input
                        className="w-full mt-2 rounded-lg border border-gray-500 p-3 text-sm"
                        placeholder="Type in your target amount"
                        type="text"
                        id="targetAmount"
                    />
                </div>
                <div>
                    <label className="sr-only" htmlFor="Timeline">Timeline</label>
                    <select
                        className="w-full mt-2 rounded-lg border border-gray-500 p-3 text-sm"
                        id="Timeline"
                    >
                        <option value="">Timeline</option>
                        <option value="1 to 3 Months">1 to 3 Months</option>
                        <option value="">4 to 6 Months</option>
                        <option value="">7 to 9 Months</option>
                        <option value="">10 to 12 Months</option>
                        <option value="">1 to 2 years</option>
                        <option value="">2 to 5 years</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default DreamsAndAspirations