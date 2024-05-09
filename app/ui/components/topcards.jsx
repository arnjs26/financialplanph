'use client'
import React from 'react'
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const topcards = (props) => {
  const BASE = process.env.NEXT_PUBLIC_BASE_ROUTE_URI;

  const pathname = usePathname()
  const path = pathname.split("/").pop()
  // Check if the word "summary" is present in the route
  const containsSummary = pathname ? pathname.toLowerCase().includes('summary') : false;

  return (
    <div className="grid lg:grid-cols-8 gap-4 text-base">
      <div className={`${props.op === 'summary' ? 'bg-teal-500 text-white' : 'bg-gradient-to-l from-teal-100 border border-gray-400 text-gray-700'} lg:col-span-2 col-span-1 justify-between border rounded-md flex flex-col`}>
        <div className="p-4 font-bold text-lg">
          My To Do's for Clients
          <div className="text-sm"># of To Do's</div>
        </div>
        <Link href={`${props.op === 'summary' ? '#':BASE}`}>
          <div className="p-1 bg-zinc-700 bg-opacity-30 rounded-br-sm rounded-bl-sm text-center text-sm cursor-pointer">
            <div className="p-1 justify-between">
              <span className="inline-block">
                {props.op === 'summary' ? 'Active' : 'More info'}
              </span>
              {props.op === 'summary' ? (
                <FaRegArrowAltCircleDown size={16} className="inline-block ml-2" />
              ):<FaCircleArrowRight size={16} className="inline-block ml-2" />}
            </div>
          </div>
        </Link>
      </div>

      <div className={`${props.op === 'clientToDo' ? 'bg-teal-500 text-white' : 'bg-gradient-to-l from-teal-100 border border-gray-400 text-gray-700'} lg:col-span-2 col-span-1 justify-between border rounded-md flex flex-col`}>
        <div className="p-4 font-bold text-lg">
          Client's To Do's
          <div className="text-sm"># of To Do's</div>
        </div>
        <Link href={`${props.op === 'clientToDo' ? '#':BASE+'clientToDo'}`}>
          <div className="p-1 bg-zinc-700 bg-opacity-30 rounded-br-sm rounded-bl-sm text-center text-sm cursor-pointer">
            <div className="p-1 justify-between">
              <span className="inline-block">
                {props.op === 'clientToDo' ? 'Active' : 'More info'}
              </span>
              {props.op === 'clientToDo' ? (
                <FaRegArrowAltCircleDown size={16} className="inline-block ml-2" />
              ):<FaCircleArrowRight size={16} className="inline-block ml-2" />}
            </div>
          </div>
        </Link>
      </div>

      <div className={`${props.op === 'clientAnnualReview' ? 'bg-teal-500 text-white' : 'bg-gradient-to-l from-teal-100 border border-gray-400 text-gray-700'} lg:col-span-2 col-span-1 justify-between border rounded-md flex flex-col`}>
        <div className="p-4 font-bold text-lg">
          Clients for Annual Review
          <div className="text-sm"># of Clients</div>
        </div>
        <Link href={`${props.op === 'clientAnnualReview' ? '#':BASE+'clientAnnualReview'}`}>
          <div className="p-1 bg-zinc-700 bg-opacity-30 rounded-br-sm rounded-bl-sm text-center text-sm cursor-pointer">
            <div className="p-1 justify-between">
              <span className="inline-block">
                {props.op === 'clientAnnualReview' ? 'Active' : 'More info'}
              </span>
              {props.op === 'clientAnnualReview' ? (
                <FaRegArrowAltCircleDown size={16} className="inline-block ml-2" />
              ):<FaCircleArrowRight size={16} className="inline-block ml-2" />}
            </div>
          </div>
        </Link>
      </div>

      <div className="lg:col-span-2 col-span-1 bg-gradient-to-l from-teal-100 text-gray-700 justify-between border border-gray-400 rounded-md flex flex-col">
        <div className="p-4 font-bold text-lg">
          My To Do's for<br/>
          Personal Finances
          <div className="text-sm"># of To Do's</div>
        </div>
        <div className="p-1 bg-zinc-700 bg-opacity-30 rounded-br-sm rounded-bl-sm text-center text-sm cursor-pointer">
          <div className="p-1 justify-between">
            <span className="inline-block">More info</span>
            <FaCircleArrowRight size={16} className="inline-block ml-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default topcards
