import Image from 'next/image'
import React from 'react'
import logo from "../../public/logo.png";

const Footer = () => {
  return (
    <div className='mb-4 border border-t-gray-200'>
        <Image src={logo} width={150} className='mx-auto'/>
        <p className='text-center'>&copy; Copyright 2023</p>
    </div>
  )
}

export default Footer