'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { CiSearch } from "react-icons/ci"
import { GoBell } from "react-icons/go"
import Link from 'next/link'
import { MdLogout } from "react-icons/md"
import { FaAngleDown } from "react-icons/fa6";
import { api } from "@/app/lib/libapi";

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import { BsTextIndentLeft } from "react-icons/bs";

const NavBar = (props) => {
  
  const pathname = usePathname()
  var summaryCpy = pathname.split("/").pop()
  // Check if the word "summary" is present in the route
  const containsSummary = pathname ? pathname.toLowerCase().includes('summary') : false;
  const containsClients = pathname ? pathname.toLowerCase().includes('clients') : false;
  const containsSettings = pathname ? pathname.toLowerCase().includes('settings') : false;

  const solutions = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
  ]
  const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
  ]

  return (
    <div className="bg-gray-200 shadow-lg">
      <div className="flex-row sm:flex justify-between pt-4 px-4 pb-2">
        <div className="text-sm font-bold text-slate-600 capitalize">
          {!props.panel && <BsTextIndentLeft onClick={props.hideShowPanel} className="inline-block mt-[-2px] cursor-pointer text-gray-600" size={20} />}
          <span className="inline-block pl-2">
            {containsSummary ? (
              'Summary'
            ): containsClients ? 'Clients': (
              containsSettings ? 'Settings' : containsSettings
            )}
          </span>
        </div>
        <div className="flex pt-3 sm:p-0 items-center gap-6 mt-[-4px]">
          <Popover className="absolute top-2 right-2 mt-1 mr-1">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              <div className='mr-1 mt-[-1px]'>
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={props.userimg !== "user.png" ? props.userimg : "/user.png"} alt="User profile image" />
                <span className="bg-green-500 absolute ml-[-6px] mt-[17.5px] rounded-xl w-2 h-2 text-center text-white text-xs"></span>
              </div>
              <span className="text-[12px]">{props.username}</span>
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 mt-2 z-50">
                <div className="w-[200px] rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="relative">
                    <div
                      className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                      role="menu"
                    >
                      <div className="p-2">
                        <strong className="block p-2 text-xs font-medium uppercase text-gray-400"> General </strong>

                        <a
                          href="#"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          role="menuitem"
                        >
                          Logs
                        </a>

                        <a
                          href="#"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          role="menuitem"
                        >
                          Activities
                        </a>

                        <a
                          href="#"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          role="menuitem"
                        >
                          Privacy Settings
                        </a>

                        <a
                          href="#"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          role="menuitem"
                        >
                          Account Management
                        </a>
                      </div>

                      <div className="p-2">
                        <a
                          href="#"
                          className="flex rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          role="menuitem"
                          onClick={props.logout}
                        >
                          <MdLogout className="block mr-2 mt-[4px]" /> <span className="block">Logout</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
    </div>
  )
}

// Function to normalize the route for case-insensitive comparison
const normalizeRoute = (route) => route.toLowerCase();

export default NavBar