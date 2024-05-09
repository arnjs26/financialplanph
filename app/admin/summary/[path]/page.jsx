

"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";

import { CiSearch, CiRedo } from "react-icons/ci";
import { FaEye, FaSpinner } from "react-icons/fa";
import {
  BsSortAlphaUp,
  BsSliders,
  BsCalendar2Check,
  BsChevronRight,
  BsChevronLeft,
} from "react-icons/bs";

import ButtonToTop from "@/app/components/ButtonToTop";
import AgentToDos from "@/app/components/Summary/AgentToDos";
import TopCards from "@/app/ui/components/topcards";
import { setData, setClients } from "@/provider/redux/StateController";
import { useDispatch, useSelector } from "react-redux";
import { api } from "@/app/lib/libapi";

const summarySubPath = ({ params }) => {
  const op = "summary";
  const router = useRouter();

  const agent_id = useSelector((state) => state.StateController.agent_id);
  const agent_token = useSelector((state) => state.StateController.token);

  const [selectedFNA, setSelectedFNA] = useState("");
  const [searchDataInput, setSearchDataInput] = useState("");
  const [agentToDosData, setAgentToDosData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currPage, setCurrPage] = useState(1);

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkToken = () => {
    // Verifying token...
    if (!api.checkToken()) {
      router.push("/verify");
    }
  };
  const agentToDos = async () => {
    let userID = null;
    let token = null;
    if (Cookies.get("id") && Cookies.get("token")) {
      userID = Cookies.get("id");
      token = Cookies.get("token");
    } else {
      goToLogout();
    }
    const agentToDos = await api.getAgentToDos(
      userID,
      token,
      currPage,
      itemsPerPage
    );
    if (agentToDos) {
      assignData(agentToDos);
    } else {
      setIsLoading(false);
    }
  };
  const handleSearchOnchange = (e) => {
    setSearchDataInput(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    searchAgentToDos();
  };
  const searchAgentToDos = async () => {
    if ((searchDataInput !== "" || selectedFNA !== "") && !isLoading) {
      setIsLoading(true);
      const agentToDosFromSearch = await api.getAgentOnSearch(
        agent_id,
        agent_token,
        1,
        itemsPerPage,
        searchDataInput,
        selectedFNA
      );
      if (agentToDosFromSearch) {
        assignData(agentToDosFromSearch);
      } else {
        setIsLoading(false);
      }
    } else {
      toast.error("Search field is empty!");
    }
  };

  const assignData = (data) => {
    setAgentToDosData(data.My_ToDos_for_Clients);
    setTotalPages(data.meta.total);
    setCurrPage(data.meta.page);
    setIsLoading(false);
  };
  const resetAgentToDo = () => {
    setSelectedFNA("");
    setSearchDataInput("");
    setItemsPerPage(10);
    setCurrPage(1);
  };
  const setValueInDropdown = (e) => {
    setCurrPage(1);
    setItemsPerPage(e.target.value);
  };
  const handlePageChange = (e) => {
    setIsLoading(true);
    setCurrPage(e.selected + 1);
  };
  const setValueSelectedFNA = (e) => {
    setSelectedFNA(e.target.value);
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

  useEffect(() => {
    makeListener();
    checkToken();
    agentToDos();
  }, [itemsPerPage, currPage]);


  return (
    <>
      <TopCards op={params.path} />
      <div className="mt-4 bg-white justify-between p-2 border rounded-lg bg-gradient-to-l from-teal-300">
        <div className="text-base pl-3 pt-2 border-b-2 font-bold text-slate-600">
          List: My To Do's for Clients
        </div>
        <div className="p-2 block md:flex justify-between items-center">
          <div className="mt-2 mx-1">
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
          </div>
          <div className="p-2 block md:flex justify-end items-center">
            <form className="flex gap-4" onSubmit={handleSubmit}>
              <div className="relative w-60 mr-[-4px]">
                <input
                  type="email"
                  id="UserEmail"
                  placeholder="Name or To Dos"
                  onChange={handleSearchOnchange}
                  value={searchDataInput}
                  className="w-full rounded-md border-gray-200 pe-10 shadow-sm sm:text-xs p-2 border outline-none"
                  disabled={isLoading}
                />
              </div>
              <div>
                <select
                  name="HeadlineAct"
                  id="HeadlineAct"
                  value={selectedFNA}
                  onChange={setValueSelectedFNA}
                  className="w-full rounded-md border-gray-300 text-gray-700 sm:text-xs p-2 border cursor-pointer outline-none"
                  disabled={isLoading}
                >
                  <option value="">Select FNA</option>
                  <option value="FINANCIAL PLAN PRESENTATION">
                    FINANCIAL PLAN PRESENTATION
                  </option>
                  <option value="FINANCIAL PRIORITIES">
                    FINANCIAL PRIORITIES
                  </option>
                  <option value="CASH FLOW">CASH FLOW</option>
                  <option value="NETWORTH INVENTORY">NETWORTH INVENTORY</option>
                  <option value="FINANCIAL PLAN SUMMARY">
                    FINANCIAL PLAN SUMMARY
                  </option>
                </select>
              </div>
            </form>
            <a
              className="group relative inline-block bg-white rounded-md overflow-hidden border border-indigo-600 px-4 ml-2 py-[6px] focus:outline-none focus:ring"
              href="#"
              onClick={() => searchAgentToDos()}
              style={{
                pointerEvents: isLoading ? "none" : "auto",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              <span className="absolute inset-y-0 left-0 w-[2px] bg-teal-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
              <span className="relative text-sm font-medium text-teal-600 transition-colors group-hover:text-white">
                <CiSearch size={20} />
              </span>
            </a>
            <a
              className="group relative inline-block bg-white rounded-md overflow-hidden border border-indigo-600 px-4 ml-2 py-[6px] focus:outline-none focus:ring"
              href="#"
              onClick={() => resetAgentToDo()}
              style={{
                pointerEvents: isLoading ? "none" : "auto",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              <span className="absolute inset-y-0 left-0 w-[2px] bg-teal-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
              <span className="relative text-sm font-medium text-teal-600 transition-colors group-hover:text-white">
                <CiRedo size={20} />
              </span>
            </a>
          </div>
        </div>
        <div>
          <div className="rounded-lg border border-gray-200 w-full">
            <div className="rounded-t-lg bg-white">
              {isLoading ? (
                <div className="inset-0 z-50 block p-6">
                  <div className="inset-0 bg-black opacity-5"></div>
                  <div className="inset-0 flex items-center justify-center mt-4">
                    Fetching Data. Please wait... &nbsp; &nbsp; &nbsp;
                    <FaSpinner
                      className="animate-spin text-green-900"
                      size={30}
                    />
                  </div>
                </div>
              ) : (
                <table className="min-w-full divide-y-2 divide-gray-200 ">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className="text-sm">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        #
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        <div className="inline-block w-[20px]">
                          <BsSortAlphaUp
                            // onClick={sortAlpha}
                            className="cursor-pointer text-orange-700"
                          />
                        </div>
                        <div className="inline-block">
                          Client Name
                          <br />
                          <small>(Last, First, Middle)</small>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Date To Do
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Days Pending
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        My To Do's
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        FNA
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                        View To Do's
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
                      const agentTD = agentToDosData[idx]; // Get the client at the current index if available
                      return agentTD ? (
                        // If a client exists, render the TrClients component with the client data
                        <AgentToDos
                          key={idx}
                          lineNo={line}
                          lastName={agentTD.client.Last_Name}
                          firstName={agentTD.client.First_Name}
                          middleName={agentTD.client.Middle_Name}
                          date_todo={agentTD.date_todo}
                          days_Pending={agentTD.days_pending}
                          is_overdue={agentTD.is_overdue}
                          description={agentTD.description}
                          fna={agentTD.from_table}
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
      </div>
    </>
  );
};

export default summarySubPath;
