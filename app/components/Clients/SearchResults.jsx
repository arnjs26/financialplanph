import React from 'react'

const SearchResults = ({ handleChange, searchResults }) => {
    return (
        <div>
            {searchResults.meta.total > 0 ? (
                <>
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr className="text-sm">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date Added</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">FNA</td>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-xs">
                                {searchResults.Client?.map((client, idx) => (
                                    <tr key={idx}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{client.LastName}, {client.FirstName}, {client.MiddleName}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{client.Date_Added}</td>
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
                    {/* <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                        <ol className="flex justify-end gap-1 text-xs font-medium">
                            <li>
                                <a
                                    href="#"
                                    className="inline-flex h-7 w-7 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                >
                                    <span className="sr-only">Prev Page</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block h-7 w-7 rounded border border-gray-100 bg-white text-center leading-7 text-gray-900"
                                >
                                    1
                                </a>
                            </li>

                            <li
                                className="block h-7 w-7 rounded border-blue-600 bg-blue-600 text-center leading-7 text-white"
                            >
                                2
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block h-7 w-7 rounded border border-gray-100 bg-white text-center leading-7 text-gray-900"
                                >
                                    3
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block h-7 w-7 rounded border border-gray-100 bg-white text-center leading-7 text-gray-900"
                                >
                                    4
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="inline-flex h-7 w-7 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                >
                                    <span className="sr-only">Next Page</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ol>
                    </div> */}
                </>

            ) : (
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr className="text-sm">
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date Added</td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">FNA</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-xs">
                            <tr>
                                <td colSpan={3} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                                    No Results Found</td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            )

            }
        </div>
    )
}

export default SearchResults