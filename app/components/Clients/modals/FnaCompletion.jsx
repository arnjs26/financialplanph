"use client";
import { FaArrowUp, FaSpinner } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

const FnaCompletion = (props) => {
  return (
    <>
      {props.isOpenModal && (
        <div className="modal">
          <div className="modal-content modalW40">
            <div className="modal-header">
                <span className="close text-sm mt-[-8px]" onClick={props.closeModal}>
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded">
                        &times;
                    </button>
                </span>
                <header className="text-[17px]"><b>Accomplished FNA/s of:</b></header>
            </div>
            <div className="modal-body">
              <div className="text-[14px] pb-2">Client Name: <b>{props.clientFN}</b></div>
              {props.loading ? (
                <div className={`inset-0 z-50 block`}>
                  <div className="inset-0 bg-black opacity-5"></div>
                  <div className="inset-0 flex items-center justify-center ">
                    Fetching Data. Please wait... &nbsp; &nbsp; &nbsp;
                    <FaSpinner className="animate-spin text-green-900" size={30} />
                  </div>
                </div>
              ) : (
                <div>
                  <ul>
                  {Array.from({ length: props.totalFNAComp }).map((_, idx) => {
                    const fNAsCompList = props.fnaCompList[idx]; // Get the client at the current index if available
                    return fNAsCompList && (
                      <ul>
                        <li>
                          <div className="p-1 text-[13px]">
                          <BsCheckLg className="text-green-600 inline-block" /> &nbsp; {fNAsCompList.FNA}
                          </div>
                        </li>
                      </ul>
                    )
                  })}
                  </ul>
                  <div className="mt-4 pt-3 border-t-2">
                    Total: {props.totalFNAComp} out of 6 Completed
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FnaCompletion;