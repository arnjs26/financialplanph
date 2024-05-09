'use client'
import React from 'react'
import { IoMdClose } from 'react-icons/io'

const MissingFields = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-0 z-50  ${isOpen ? 'block' : 'hidden'}`}>
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center py-16">
                <div className="bg-white h-full p-8 rounded-md shadow-lg overflow-y-auto">
                    <div
                        className="px-4 py-2 rounded-md flex justify-end"
                        onClick={onClose}
                    >
                        <IoMdClose className='cursor-pointer hover:rotate-45 text-lg' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MissingFields