'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RxSketchLogo } from 'react-icons/rx'
import { LiaSignalSolid } from "react-icons/lia"
import { FaUserFriends } from "react-icons/fa";
import { FiSettings } from 'react-icons/fi'
import { FaUser } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import { MdLogout } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { BsTelephoneInboundFill, BsTextIndentRight } from "react-icons/bs";

const SideBar = (props) => {
  const pathname = usePathname()
  const path = pathname.split("/").pop()
  // Check if the word "summary" is present in the route
  const containsSummary = pathname ? pathname.toLowerCase().includes('summary') : false;
  const containsClients = pathname ? pathname.toLowerCase().includes('clients') : false;

  return (
    <div className="flex flex-col items-center">
      <div className="absolute w-full">
        <BsTextIndentRight onClick={props.hideShowPanel} className="float-right mr-1 cursor-pointer text-gray-600" size={20} />
      </div>
      <Link href='/admin/summary'>
        <div className="flex flex-col items-center">
        <div className="place-content-center">
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="Financial Plan PH Logo"
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <div className="p-2 text-sm text-center uppercase font-bold">
            Financial Plan PH
          </div>
        </div>
      </Link>
      <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
      <Link href='/admin/summary'>
        <div className={`flex items-center ${path === 'summary' || containsSummary ? 'md:bg-gradient-to-l md:from-indigo-100' : ''}`}>
          <div className={`${path === 'summary' || containsSummary ? 'bg-teal-400' : 'bg-gray-100'} cursor-pointer my-4 p-3 rounded-lg inline-block`}>
            <LiaSignalSolid />
          </div>
          <div className={`${path === 'summary' || containsSummary ? 'font-bold' : ''} p-2 w-40 hidden sm:block`}>
            Summary
          </div>
        </div>
      </Link>
      <Link href='/admin/clients'>
        <div className={`flex items-center ${path === 'clients' || containsClients  ? 'md:bg-gradient-to-l md:from-indigo-100' : ''}`}>
          <div className={`${path === 'clients' || containsClients  ? 'bg-teal-400' : 'bg-gray-100'} cursor-pointer my-4 p-3 rounded-lg inline-block`}>
            <FaUserFriends />
          </div>
          <div className={`${path === 'clients' || containsClients  ? 'font-bold' : ''} p-2 w-40 hidden sm:block`}>
            My Clients
          </div>
        </div>
      </Link>
      {/* <Link href='/admin/personal'>  // This is for PHASE 2
        <div className={`flex items-center ${path === 'personal' ? 'bg-gradient-to-l from-indigo-100' : ''}`}>
          <div className={`${path === 'personal' ? 'bg-teal-400' : 'bg-gray-100'} cursor-pointer my-4 p-3 rounded-lg inline-block`}>
            <FaUser />
          </div>
          <div className={`${path === 'personal' ? 'font-bold' : ''} p-2 w-40 hidden sm:block`}>
            Personal
          </div>
        </div>
      </Link> */}
      {props.ut == 'S' && (
        <Link href='/admin/settings'>
          <div className={`flex items-center ${path === 'settings' ? 'bg-gradient-to-l from-indigo-100' : ''}`}>
            <div className={`${path === 'settings' ? 'bg-teal-400' : 'bg-gray-100'} cursor-pointer my-4 p-3 rounded-lg inline-block`}>
              <FiSettings />
            </div>
            <div className={`${path === 'settings' ? 'font-bold' : ''} p-2 w-40 hidden sm:block`}>
              Settings
            </div>
          </div>
        </Link>
      )}
      <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
      <div className="pt-2">
        <Link href='#'>
          <div className="pl-3 pt-4 text-left hidden sm:block">
            Help
          </div>
          <div className="pl-3 pt-4 text-left block sm:hidden">
            <IoIosHelpCircle />
          </div>
        </Link>
        <Link href='#'>
          <div className="pl-3 pt-4 text-left hidden sm:block">
            Contact Us
          </div>
          <div className="pl-3 pt-4 text-left block sm:hidden">
            <BsTelephoneInboundFill />
          </div>
        </Link>
        <Link href='/'>
          <div onClick={props.logout} className={`flex items-center`}>
            <div className={`bg-gray-100 cursor-pointer my-4 p-3 rounded-lg inline-block`}>
              <MdLogout />
            </div>
            <div className={`p-2 w-40 hidden sm:block`}>
              Logout
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SideBar
