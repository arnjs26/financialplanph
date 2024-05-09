import React from "react";
import { FaMedal } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { TbTopologyStar3 } from "react-icons/tb";

const Advantages = () => {
  return (
    <section className="bg-white border-b-2 border-b-gray-200">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-5">
          Our Advantages
        </h2>

        <p className="text-center text-lg text-gray-600">All Our Services are packed with the folowing</p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4">
              <FaMedal 
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>

                <p className="mt-0.5 text-lg font-medium text-gray-900">
                  Quality
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
              We make sure that the advise that we give has been reviewed by financial advisors and by experts in our team.
            </p>
          </blockquote>
          <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4">
              <CiHeart  
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>

                <p className="mt-0.5 text-lg font-medium text-gray-900">
                  Simplicity
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
              We deliver the financial plan in the most simplified and comprehensible manner.
            </p>
          </blockquote>
          <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4">
              <TbTopologyStar3  
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>

                <p className="mt-0.5 text-lg font-medium text-gray-900">
                  Quality
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
              We offer various financial products to make sure that we serve the best interest of our clients.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
