'use client'
import { api } from '@/app/lib/libapi';
import React, { useState } from 'react'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';

const ClientList = ({ handleChange, setClientList, clientList, itemsPerPage, totalPages, agentID }) => {
    const { Client } = clientList
    const [currentPage, setCurrentPage] = useState(0);
    const [pathName, setPathName] = useState('clients');
    const [showFilter, setShowFilter] = useState(true)

    const handlePageChange = (selectedPage) => {
        fetchClientPaginate(selectedPage.selected + 1)
        setCurrentPage(selectedPage.selected);
    };

    const fetchClientPaginate = async (pageNumber) => {
        try {
            const res = await api.getClientListPaginate(pathName, pageNumber, agentID);

            setClientList(res)
        } catch (error) {
            console.error("Error fetching data from the API FETCH CLIENT LIST: ", error);
        }
    }

    const fetchClientListASC = async () => {
        setShowFilter(false)
        try {
            const res = await api.getClientList('clientsOrderLastNameASC', agentID);

            setClientList(res)
            setPathName('clientsOrderLastNameASC')
        } catch (error) {
            console.error("Error fetching data from the API FETCH CLIENT LIST: ", error);
        }
    }

    const fetchClientListDESC = async () => {
        setShowFilter(true)
        try {
            const res = await api.getClientList('clientsOrderLastNameDESC', agentID);

            setClientList(res)
            setPathName('clientsOrderLastNameDESC')

        } catch (error) {
            console.error("Error fetching data from the API FETCH CLIENT LIST: ", error);
        }
    }

    console.log('client list', clientList)
    console.log('client', Client)

    return (
        <div>
            <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="text-sm">
                            <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 flex items-center">
                                Name
                                <span className='text-xs mr-2'> (Last, First, Middle)   </span>
                                {showFilter ?
                                    <AiOutlineSortAscending size={20} className='cursor-pointer' onClick={fetchClientListASC} />
                                    :
                                    <AiOutlineSortDescending size={20} className='cursor-pointer' onClick={fetchClientListDESC} />
                                }
                            </td>

                            <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Date Added (D-M-Y)</td>
                            <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Financial Needs Analysis (FNA)</td>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-xs">
                        {Client?.map((client, idx) => (
                            <tr key={idx}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{client.LastName}, {client.FirstName}, {client.MiddleName} </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 uppercase">{client.Date_Added}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <select
                                        name="HeadlineAct"
                                        id="HeadlineAct"
                                        onChange={(e) => handleChange(client.Client_ID, e)}
                                        className="w-full rounded-md border-gray-300 text-gray-700 sm:text-xs p-2 border cursor-pointer outline-none">
                                        <option value="">PLEASE SELECT OPTIONS</option>
                                        <option value="1">FINANCIAL PLAN PRESENTATION</option>
                                        <option value="2">FINANCIAL PRIORITIES</option>
                                        <option value="3">CASH FLOW</option>
                                        <option value="4">NETWORTH INVENTORY</option>
                                        <option value="5">FINANCIAL PLAN SUMMARY</option>
                                        <option value="6">FAMILY COMPOSITION</option>
                                    </select>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {/* Math.ceil(totalPages / 10) */}
            <ReactPaginate
                pageRangeDisplayed={3}
                pageCount={Math.ceil(totalPages / 10) }
                onPageChange={handlePageChange}
                forcePage={currentPage}
                breakLabel="..."
                nextLabel={
                    <span className='w-7 h-7 flex items-center justify-center bg-gray-100 rounded-md hover:bg-blue-900 hover:text-white'>
                        <BsChevronRight />
                    </span>
                }
                previousLabel={
                    <span className='w-7 h-7 flex items-center justify-center bg-gray-100 rounded-md hover:bg-blue-900 hover:text-white'>
                        <BsChevronLeft />
                    </span>
                }
                containerClassName='flex items-center justify-center my-4 gap-2'
                pageClassName='block bg-white w-7 h-7 flex items-center justify-center rounded-md'
                activeClassName='text-blue-500'
            />
        </div>
    )
}

export default ClientList