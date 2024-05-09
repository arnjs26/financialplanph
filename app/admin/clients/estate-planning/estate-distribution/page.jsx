import React from 'react'

const EstateDistributionPage = () => {
    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div className="text-base sm:py-2 font-bold text-slate-600 uppercase text-center">
                ESTATE PLANNING
            </div>
            <div className='mt-8'>
                <label className="uppercase font-medium" htmlFor="Reason">
                    ESTATE  DISTRIBUTION PLANNING IS IMPORTANT FOR ME BECAUSE
                </label>
                <textarea
                    className="w-full mt-2 rounded-lg border border-gray-200 p-1 text-sm"
                    placeholder="Copy Answer from previous page"
                    id="Reason"
                />
            </div>

            <div className='max-w-[1000px] mt-8 mx-auto'>
                <div className='bg-gray-200 py-2 px-8'>
                    <div className='space-y-4'>
                        <h2 className="text-sm font-bold text-slate-600 uppercase mt-4 flex items-center justify-center gap-4">
                            ESTATE DISTRIBUTION
                        </h2>

                        <iframe
                            className="w-full aspect-video"
                            src="https://www.youtube.com/embed/Hmof1vfH8TI?si=IndtV6iZ8pSF9HKj"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>

                        <div className='grid grid-cols-2 items-center gap-2'>
                            <label htmlFor="InsuranceCompany" className="text-base font-medium text-gray-700 text-right">
                            MY PREFERRED DISTRIBUTION TOOL IS
                            </label>
                            <select
                                name="mode_of_payment"
                                id="mode_of_payment"
                                className=" p-2 rounded-md border border-gray-300 text-gray-700 text-xs"
                            >
                                <option value="">Please select</option>
                                <option value="retirement">Maximum Benefit Limit</option>
                                <option value="education">Annual Benefit Limit</option>
                                <option value="others">Lifetime Benefit Limit</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EstateDistributionPage