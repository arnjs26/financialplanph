
export default function LoadingSummary() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
            <div className="grid lg:grid-cols-8 gap-4 text-base">
                <div className='border-gray-200 text-gray-700 lg:col-span-2 col-span-1 justify-between border rounded-md flex flex-col'>
                    <div className="p-4 font-bold text-lg">
                        <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[90%] h-[20px] mt-2"></span>
                        <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[60%] h-[12px] mt-2"></span>
                        </div>
                        <div className="p-1 bg-zinc-400 bg-opacity-30 rounded-br-sm rounded-bl-sm text-center text-sm cursor-pointer">
                        <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[80%] h-[20px] mt-2"></span>
                    </div>
                </div>
                <div className='border-gray-200 text-gray-700 lg:col-span-2 col-span-1 justify-between border rounded-md flex flex-col'>
                    <div className="p-4 font-bold text-lg">
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[90%] h-[20px] mt-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[60%] h-[12px] mt-2"></span>
                    </div>
                    <div className="p-1 bg-zinc-400 bg-opacity-30 rounded-br-sm rounded-bl-sm text-center text-sm cursor-pointer">
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[80%] h-[20px] mt-2"></span>
                    </div>
                </div>
                <div className='border-gray-200 text-gray-700 lg:col-span-2 col-span-1 justify-between border rounded-md flex flex-col'>
                    <div className="p-4 font-bold text-lg">
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[90%] h-[20px] mt-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[60%] h-[12px] mt-2"></span>
                    </div>
                    <div className="p-1 bg-zinc-400 bg-opacity-30 rounded-br-sm rounded-bl-sm text-center text-sm cursor-pointer">
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[80%] h-[20px] mt-2"></span>
                    </div>
                </div>
                <div className='border-gray-200 text-gray-700 lg:col-span-2 col-span-1 justify-between border rounded-md flex flex-col'>
                    <div className="p-4 font-bold text-lg">
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[90%] h-[20px] mt-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[60%] h-[12px] mt-2"></span>
                    </div>
                    <div className="p-1 bg-zinc-400 bg-opacity-30 rounded-br-sm rounded-bl-sm text-center text-sm cursor-pointer">
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[80%] h-[20px] mt-2"></span>
                    </div>
                </div>
            </div>
            <div className='border-gray-200 text-gray-700 lg:col-span-2 col-span-1 justify-between border rounded-md flex flex-col mt-5'>
                <div className="p-4 font-bold text-lg">
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[100%] h-[20px] mt-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[80%] h-[20px] mt-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[100%] h-[20px] mt-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[100%] h-[20px] mt-2"></span>
                </div>
                <div className="p-1 bg-zinc-400 bg-opacity-30 rounded-br-sm rounded-bl-sm text-right text-sm cursor-pointer">
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[2%] h-[20px] mt-2 mr-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[2%] h-[20px] mt-2 mr-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[2%] h-[20px] mt-2 mr-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[2%] h-[20px] mt-2 mr-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[2%] h-[20px] mt-2 mr-2"></span>
                    <span className="animate-pulse p-1 justify-between inline-block bg-zinc-400 w-[2%] h-[20px] mt-2 mr-2"></span>
                </div>
            </div>
        </>
    )
}