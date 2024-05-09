import React from "react";

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt="Party"
              src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-6xl font-bold tracking-tight text-gray-900">
              Protect and Grow your Wealth
            </h2>

            <p className="my-10 text-lg text-gray-600">
              Our mission is to help our clients protect and grow their wealth by giving them comprehensive financial plan.
            </p>

            <button
              href="#"
              className="mt-8 inline-block rounded-full bg-gray-700 px-12 py-3 text-sm font-medium text-white transition hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-700"
            >
              Log In
            </button>
            <button
              href="#"
              className="mt-8 md:ml-2 inline-block rounded-full border-4 bg-white px-12 py-3 text-sm font-medium text-gray-700 hover:text-white transition hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-700"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
    // <div className="w-full mx-auto px-16 border-b-2 border-b-gray-200">
    //     <div className='grid grid-cols-1 md:grid-cols-2'>

    //         {/* Left */}
    //         <div className='m-auto pr-16'>
    //             <h1 className='font-bold text-7xl text-gray-600 tracking tracking-wide mb-5'>Protect and Grow your Wealth</h1>
    //             <p className='text-xl mb-5 text-gray-700'>
    //                 Out mission is to help our clients protect and grow their wealth by giving them comprehensive financial plan.
    //             </p>
    //             <div className='uppercase'>
    //                 <button className='bg-gray-500 text-white px-16 py-4 rounded-lg'>Log in</button>
    //                 <button className='py-4 px-16 border border-gray-500 rounded-lg ml-5'>Learn More</button>
    //             </div>
    //         </div>

    //         {/* Right */}
    //         <div>
    //         <CiImageOn size={900} className='w-full text-gray-600'/>
    //         </div>
    //     </div>
    // </div>
  );
};

export default Hero;
