"use client";
import React, {useState, useEffect} from "react";
import { BsEyeFill } from "react-icons/bs";

const AgentToDos = (props) => {
  return (
    <>
      <tr className="hover bg-white hover:bg-green-100">
        <td className="whitespace-nowrap px-4 py-3 text-gray-900 align-top">
          {props.lineNo + 1}.
        </td>
        <td className="whitespace-nowrap px-4 py-1 text-gray-900 align-top pt-3">
          {props.lastName}, {props.firstName}{props.middleName ? ", " + props.middleName : props.middleName}{" "}
        </td>
        <td className="whitespace-nowrap px-4 py-1 text-gray-900 align-top pt-3">
          {props.date_todo}
        </td>
        <td className={`whitespace-nowrap px-4 py-1 ${props.is_overdue ? 'text-red-400':'text-gray-700'} font-bold align-top pt-3`}>
          {props.days_Pending}
        </td>
        <td className="px-4 py-1 text-gray-700 align-top  pt-3">
            {props.description.substring(0, 25)}{props.description.length > 25 ? '...' : ''}
        </td>
        <td className="whitespace-nowrap px-4 py-1 text-gray-700 uppercase align-top pt-3">
          {props.fna}
        </td>
        <td className="whitespace-nowrap px-4 py-1 text-gray-700 uppercase text-center align-top pt-2">
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                <BsEyeFill />
            </button>
        </td>
      </tr>
    </>
  );
};

export default AgentToDos;
