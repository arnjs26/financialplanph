import React from 'react'

const SubmitModalFNA = ({ isOpen, onClose, submitData, submitLoading, submitButtonDisabled }) => {
    return (
        <div className={`fixed inset-0 z-50  ${isOpen ? 'block' : 'hidden'}`}>
            <div
                className="fixed inset-0 bg-black opacity-50"
            ></div>
            <div className="fixed inset-0 flex items-center justify-center ">
                <div className="bg-white p-8 rounded-md shadow-lg overflow-y-auto">
                    <div className='flex justify-between items-center'>
                        <h3 className='text-sm font-bold text-gray-700 uppercase'>Submit Forms</h3>
                        <p className='text-lg cursor-pointer font-bold' onClick={onClose}>x</p>
                    </div>
                    <div className='mt-10'>
                        <div className='flex justify-between gap-16 items-center'>
                            <h3 className='font-medium text-sm text-gray-900'>Save Family Protection - Financial Needs Analysis</h3>
                            <button
                                onClick={(e) => submitData(e, 'fpfna')}
                                disabled={submitLoading === 'fpfna' || submitLoading === 'submitAll' || submitButtonDisabled}
                                className="inline-block rounded-md bg-green-900 px-4 py-2 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                            >
                                {submitLoading === 'fpfna' || submitLoading === 'submitAll' ? 'Loading...' : 'Save' }
                            </button>
                        </div>

                        <div className='flex justify-between gap-16 items-center mt-2'>
                            <h3 className='font-medium text-sm text-gray-900'>Save Financial Planning Solutions</h3>
                            <button
                                onClick={(e) => submitData(e, 'fpSolutions')}
                                disabled={submitLoading === 'fpSolutions' || submitLoading === 'submitAll' || submitButtonDisabled}
                                className="inline-block rounded-md bg-green-900 px-4 py-2 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                            >
                                {submitLoading === 'fpSolutions' || submitLoading === 'submitAll' ? 'Loading...' : 'Save'}
                            </button>
                        </div>

                        <div className='flex justify-between gap-16 items-center mt-2'>
                            <h3 className='font-medium text-sm text-gray-900'>Save All Forms</h3>
                            <button
                                onClick={(e) => submitData(e, 'submitAll')}
                                disabled={submitLoading === 'submitAll' || submitButtonDisabled}
                                className="inline-block rounded-md bg-green-900 px-4 py-2 font-medium text-white sm:w-auto disabled:bg-white disabled:text-green-900 border disabled:border-green-900"
                            >
                                {submitLoading === 'submitAll' ? 'Loading...' : 'Save' }
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmitModalFNA