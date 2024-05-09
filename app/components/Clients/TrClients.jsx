"use client";
import React, {useState, useEffect} from "react";

const TrClients = (props) => {
  return (
    <>
      <tr className="hover bg-white hover:bg-green-100">
        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
          {props.lineNo + 1}.
        </td>
        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900">
          {props.LastName}, {props.FirstName}{props.MiddleName ? ", " + props.MiddleName : props.MiddleName}{" "}
        </td>
        <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900 pr-10">
          <span className={`inline-block pr-1 w-[30px] ${parseInt(props.completion_status) > 1 ? 'text-gray-900' : 'text-gray-400'}`}><small>{props.completion_status}%</small></span>
          <div className={`inline-block w-[100%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 cursor-pointer`}>
            <div
              className={`bg-teal-600 hover:bg-orange-600 h-2.5 rounded-full`}
              title={`${props.completion_status}% of the FNA have been accomplished`}
              style={{width:''+props.completion_status+'%'}}
              onClick={() => props.openModal(props.Client_ID, props.LastName + ", " + props.FirstName + " "+ props.MiddleName)}
            ></div>
          </div>
        </td>
        <td className="whitespace-nowrap px-4 py-1 text-gray-700 uppercase">
          {props.Date_Added}
        </td>
        <td className="whitespace-nowrap px-4 py-1 text-gray-700">
          <select
            id={`${'HeadlineAct' + props.Client_ID}`}
            onChange={(e) => props.handleChange(props.Client_ID, e)}
            className="w-full rounded-md border-gray-300 text-gray-700 sm:text-xs p-2 border cursor-pointer outline-none"
          >
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
    </>
  );
};

export default TrClients;
