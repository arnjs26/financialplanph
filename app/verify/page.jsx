"use client";
import Cookies from "js-cookie";
import axios from "axios";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "@/app/lib/libapi";
import { FaSpinner } from "react-icons/fa";

// State Management
import { setData, setClients } from "@/provider/redux/StateController";
import { useDispatch } from "react-redux";

const VerifyPage = () => {
  const [status, setStatus] = useState("Verifying... Please wait...");
  const pathname = useSearchParams();
  const router = useRouter();

  //Verify token in the database

  const dispatch = useDispatch();

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    let agent_id = null;
    let token = null;
    let verified = null;
    if (pathname.get("token") && pathname.get("id")) {
      const twoHoursFromNow = new Date(
        new Date().getTime() + 2 * 60 * 60 * 1000
      ); // Time limit
      agent_id = pathname.get("id"); // getting data from the path
      token = pathname.get("token"); // getting data from the path
      Cookies.set("token", token, { expires: twoHoursFromNow });
      Cookies.set("id", agent_id, { expires: twoHoursFromNow });
      verified = await api.verifyUser(agent_id, token);
      const { FirstName, LastName, Profile_IMG, user_type } = verified[0];
      dispatch(
        setData({
          agent_id,
          token,
          FirstName,
          LastName,
          Profile_IMG,
          user_type,
        })
      );
    } else {
      if (Cookies.get("id") && Cookies.get("token")) {
        agent_id = Cookies.get("id");
        token = Cookies.get("token");
        verified = await api.verifyUser(agent_id, token);
        const { FirstName, LastName, Profile_IMG, user_type } = verified[0];
        dispatch(
          setData({
            agent_id,
            token,
            FirstName,
            LastName,
            Profile_IMG,
            user_type,
          })
        );
      } else {
        router.push("/");
      }
    }
    //const clientList = await api.getClients("clients", agent_id, 1, 10);
    //setClientList(data.Client);
    // setTotalPages(data.meta.total);
    // const { Client, meta } = clientList;
    // dispatch(setClients({ Client, meta }));
    if (token == null) {
      setStatus("Logging out...");
      await api.logout(agent_id, token);
      router.push("/");
    } else {
      setStatus("Redirecting...");
      router.push("/admin/summary");
    }
  };

  return (
    <div className="p-10">
      <div className={`fixed inset-0 z-50 block`}>
        <div className="fixed inset-0 bg-black opacity-5"></div>
        <div className="fixed inset-0 flex items-center justify-center ">
          {status} &nbsp;&nbsp;
          <FaSpinner className="animate-spin text-green-900" size={20} />
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
