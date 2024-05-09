import React from 'react'
import { CiHeart } from "react-icons/ci";
import { TbTopologyStar3 } from "react-icons/tb";

const Work = () => {
  return (
    <section className="border-b-2 border-b-gray-200">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-5">
          How We Work?
        </h2>

        <p className="text-center text-lg text-gray-600">We want our advise to be relevant to our clients. Hence we conduct our practice as follows:</p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
          <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4">
              <CiHeart  
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>

                <p className="mt-0.5 text-lg font-medium text-gray-900">
                Fact Finding
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
            We ask relevant questions to client that can help us understant the client's goals.
            </p>
          </blockquote>
          <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4">
              <CiHeart  
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>

                <p className="mt-0.5 text-lg font-medium text-gray-900">
                  Develop a Financial Plan
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
              We will develop a financial plan to guide the client in achieving his financial goals
            </p>
          </blockquote>
          <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4">
              <TbTopologyStar3  
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>

                <p className="mt-0.5 text-lg font-medium text-gray-900">
                  Gather Feedback
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
              We will gather the client's feedback on the financial plan and update if necessary.
            </p>
          </blockquote>
          <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4">
              <TbTopologyStar3  
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>

                <p className="mt-0.5 text-lg font-medium text-gray-900">
                  Annual Review
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
              Keep track of the client's progress by conducting an annual review of the financial plan and the actions achieved.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default Work