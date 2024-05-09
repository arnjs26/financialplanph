"use client";
import Cookies from "js-cookie";

import TrClients from "@/app/components/Clients/TrClients";
import ButtonToTop from "@/app/components/ButtonToTop";
import FnaCompletion from "@/app/components/Clients/modals/FnaCompletion";

import { api } from "@/app/lib/libapi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CiSearch, CiRedo } from "react-icons/ci";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setData, setClients } from "@/provider/redux/StateController";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { BsSortAlphaUp, BsSliders, BsCalendar2Check } from "react-icons/bs";

const CustomersList = () => {
  // Will do optimization on the entire code later...
  const [isVisible, setIsVisible] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const initClients = useSelector((state) => state.StateController.clients);
  const [isLoading, setIsLoading] = useState(true);
  const agent_id = useSelector((state) => state.StateController.agent_id);
  const agent_token = useSelector((state) => state.StateController.token);

  const [fnaCompletionList, setFNACompletionList] = useState([]);
  const [totalFNAComp, setTotalFNAComp] = useState([]);
  const [loadingFNAComp, setLoadingFNAComp] = useState(false);
  const [clientFN, setClientFN] = useState("");

  const [clientList, setClientList] = useState([]);
  const [searchDataInput, setSearchDataInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currPage, setCurrPage] = useState(1);

  const checkToken = () => {
    // Verifying token...
    if (!api.checkToken()) {
      router.push("/verify");
    }
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsVisible(scrollTop > 100); // Show button when scrolled down 100 pixels
  };
  const makeListener = () => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Hook
  useEffect(() => {
    makeListener();
    checkToken();
    requestClients();
  }, [itemsPerPage, currPage]);

  const resetClient = () => {
    setSearchDataInput("");
    setItemsPerPage(10);
    setCurrPage(1);
  };

  const handleChange = (clientID, e) => {
    switch (e.target.value) {
      case "1":
        router.push(`/admin/clients/financial-plan/${clientID}`);
        break;
      case "2":
        router.push(`/admin/clients/financial-priorities/${clientID}`);
        break;
      case "3":
        router.push(`/admin/clients/cash-flow/${clientID}`);
        break;
      case "4":
        router.push(`/admin/clients/networth-inventory-summary/${clientID}`);
        break;
      case "5":
        router.push("/admin/clients/networth-inventory-summary");
        break;
      case "6":
        router.push(`/admin/clients/family-composition/${clientID}`);
        break;
      default:
        break;
    }
  };

  const handleSearchOnchange = (e) => {
    setSearchDataInput(e.target.value);
  };
  const setValueInDropdown = async (e) => {
    setCurrPage(1);
    setItemsPerPage(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    searchClient();
  };
  const searchClient = async () => {
    if (searchDataInput !== "" && !isLoading) {
      setIsLoading(true);
      const clientList = await api.getClientSearchResult(
        searchDataInput,
        agent_id,
        1,
        itemsPerPage
      );
      assignData(clientList);
    } else {
      toast.error("Search field is empty!");
    }
  };
  const requestClients = async () => {
    let userID = null;
    let token = null;
    if (Cookies.get("id") && Cookies.get("token")) {
      userID = Cookies.get("id");
      token = Cookies.get("token");
    } else {
      goToLogout();
    }
    if (searchDataInput !== "") {
      const clientList = await api.getClientSearchResult(
        searchDataInput,
        userID,
        currPage,
        itemsPerPage
      );
      assignData(clientList);
    } else {
      const clientList = await api.getClients(
        "clients",
        userID,
        currPage,
        itemsPerPage
      );
      assignData(clientList);
    }
  };
  const sortAlpha = async () => {
    setSearchDataInput("");
    let userID = null;
    let token = null;
    if (Cookies.get("id") && Cookies.get("token")) {
      userID = Cookies.get("id");
      token = Cookies.get("token");
    } else {
      goToLogout();
    }
    const clientList = await api.getClients(
      "clientsOrderLastNameASC",
      userID,
      currPage,
      itemsPerPage
    );
    assignData(clientList);
  };

  const goToLogout = async () => {
    setStatus("Logging out...");
    await api.logout(userID, token);
    router.push("/");
  };

  const assignData = (data) => {
    setClientList(data.Client);
    setTotalPages(data.meta.total);
    //setItemsPerPage(data.meta.per_page);
    //setCurrPage(data.meta.page);
    dispatch(setClients({ data }));
    setIsLoading(false);
  };

  const handlePageChange = (e) => {
    setIsLoading(true)
    setCurrPage(e.selected + 1);
  };

  // modal
  const openModal = async (C_ID, f_n) => {
    setClientFN(f_n)
    setLoadingFNAComp(true);
    setIsOpenModal(true);
    const FNA_Completion_List = await api.getFNACompletion(
      agent_id,
      agent_token,
      C_ID,
    );
    setTotalFNAComp(FNA_Completion_List.meta.total)
    setFNACompletionList(FNA_Completion_List.FNA_Completion);
    setLoadingFNAComp(false);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="bg-white justify-between p-2 border rounded-lg bg-gradient-to-l from-teal-300">
      <div className="text-base pl-1 pt-2 border-b-2 font-bold text-slate-600">
        List: My Clients
      </div>
      <div>
        <span className="absolute mt-2 mx-1">
          <select
            name="tablePageSelector"
            value={itemsPerPage}
            onChange={setValueInDropdown}
            className="w-15 rounded-md border-gray-200 shadow-sm sm:text-xs p-2 border outline-none cursor-pointer"
            disabled={isLoading}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </span>
        <div className="p-2 block md:flex justify-end items-center">
          {/* <div className="text-base sm:py-2 font-bold text-slate-600">My Clients</div> */}
          <div className="flex gap-2 items-center">
            <div className="text-sm text-slate-500">Search</div>
            <form className="flex gap-4" onSubmit={handleSubmit}>
              <div className="relative w-60">
                <label htmlFor="clientName" className="sr-only">
                  {" "}
                  Client Name{" "}
                </label>

                <input
                  type="text"
                  id="clientName"
                  placeholder="George..."
                  onChange={handleSearchOnchange}
                  value={searchDataInput}
                  className="w-full rounded-md border-gray-200 pe-10 shadow-sm sm:text-xs p-2 border outline-none"
                  required
                  disabled={isLoading}
                />
              </div>
            </form>
            <a
              className="group relative inline-block bg-white rounded-md overflow-hidden border border-indigo-600 px-4 py-[6px] focus:outline-none focus:ring"
              href="#"
              onClick={() => searchClient()}
              style={{ pointerEvents: isLoading ? "none" : "auto", opacity: isLoading ? 0.5 : 1 }}
            >
              <span className="absolute inset-y-0 left-0 w-[2px] bg-teal-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
              <span className="relative text-sm font-medium text-teal-600 transition-colors group-hover:text-white">
                <CiSearch size={20} />
              </span>
            </a>
            <a
              className="group relative inline-block bg-white rounded-md overflow-hidden border border-indigo-600 px-4 py-[6px] focus:outline-none focus:ring"
              href="#"
              onClick={() => resetClient()}
              style={{ pointerEvents: isLoading ? "none" : "auto", opacity: isLoading ? 0.5 : 1 }}
            >
              <span className="absolute inset-y-0 left-0 w-[2px] bg-teal-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
              <span className="relative text-sm font-medium text-teal-600 transition-colors group-hover:text-white">
                <CiRedo size={20} />
              </span>
            </a>
          </div>
        </div>
        <div>
          <div className="rounded-lg border border-gray-200 w-full ">
            <div className="rounded-t-lg bg-white">
              {isLoading ? (
                <div className={`inset-0 z-50 block p-6`}>
                  <div className="inset-0 bg-black opacity-5"></div>
                  <div className="inset-0 flex items-center justify-center ">
                    Fetching Data. Please wait... &nbsp; &nbsp; &nbsp;
                    <FaSpinner className="animate-spin text-green-900" size={30} />
                  </div>
                </div>
              ) : (
                <table className="min-w-full divide-y-2 divide-gray-200">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="text-sm">
                      <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                        #
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                        <div className="inline-block w-[20px]">
                          <BsSortAlphaUp
                            onClick={sortAlpha}
                            className="cursor-pointer text-orange-700"
                          />
                        </div>
                        <div className="inline-block">
                          Full Name
                          <br />
                          <small>(Last, First, Middle)</small>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                        FNA Completion
                        <br />
                        <small>Status (%)</small>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                        Date Added
                        <br />
                        <small>(D-M-Y)</small>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                        Financial Needs Analysis
                        <br />
                        <small>(FNA)</small>
                      </td>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs">
                    {Array.from({ length: itemsPerPage }).map((_, idx) => {
                      // Create an array with 10 elements
                      let line = 0;
                      if (currPage > 1) {
                        line = (currPage - 1) * itemsPerPage + idx;
                      } else {
                        line = idx;
                      }
                      const client = clientList[idx]; // Get the client at the current index if available
                      return client ? (
                        // If a client exists, render the TrClients component with the client data
                        <TrClients
                          key={idx}
                          lineNo={line}
                          LastName={client.LastName}
                          FirstName={client.FirstName}
                          MiddleName={client.MiddleName}
                          Date_Added={client.Date_Added}
                          Client_ID={client.Client_ID}
                          completion_status={client.completion_status}
                          handleChange={handleChange}
                          openModal={openModal}
                        />
                      ) : (
                        // If no client exists for this index, render a placeholder row
                        <tr key={idx} className="">
                          <td
                            colSpan="5"
                            className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 h-8"
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {!isLoading && (
            <ReactPaginate
              pageRangeDisplayed={3}
              pageCount={Math.ceil(totalPages / itemsPerPage)}
              onPageChange={handlePageChange}
              forcePage={currPage - 1}
              breakLabel="..."
              nextLabel={
                <span className="border border-1 border-gray-400 w-7 h-7 flex items-center justify-center bg-gray-100 rounded-md hover:bg-blue-400 hover:text-white">
                  <BsChevronRight />
                </span>
              }
              previousLabel={
                <span className="border border-1 border-gray-400 w-7 h-7 flex items-center justify-center bg-gray-100 rounded-md hover:bg-blue-400 hover:text-white">
                  <BsChevronLeft />
                </span>
              }
              containerClassName="bg-white flex items-center justify-center p-4 gap-2"
              pageClassName="cursor-pointer border border-1 border-gray-400 block w-7 h-7 flex items-center justify-center rounded-md hover:bg-blue-400"
              activeClassName="bg-blue-400"
            />
          )}
        </div>
      </div>
      <ToastContainer />
      <ButtonToTop isVisible={isVisible} scrollToTop={scrollToTop} />
      {fnaCompletionList.length !== 0 &&
        <FnaCompletion isOpenModal={isOpenModal} closeModal={closeModal} fnaCompList={fnaCompletionList} totalFNAComp={totalFNAComp} loading={loadingFNAComp} clientFN={clientFN} />
      }
    </div>
  );
};

export default CustomersList;
