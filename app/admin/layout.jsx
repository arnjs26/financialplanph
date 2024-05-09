"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import ProfileNavbar from "../components/ProfileNavbar";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/libapi";

import { setData } from "@/provider/redux/StateController";
import { useDispatch, useSelector } from "react-redux";

const layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [panel, setPanel] = useState(true);

  const name =
    useSelector((state) => state.StateController.user_fn) +
    " " +
    useSelector((state) => state.StateController.user_ln);
  const userIMG = useSelector((state) => state.StateController.user_img);
  const user_type = useSelector((state) => state.StateController.user_type);

  const agent_id = Cookies.get("id"); // getting data from the path
  const token = Cookies.get("token"); // getting data from the path

  const logoutUser = async () => {
    const res = await api.logout(agent_id, token);
    Cookies.remove("id");
    Cookies.remove("token");
    router.push("/verify");
  };

  const initializeData = async () => {
    let agent_id = null;
    let token = null;
    let verified = null;
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
      router.push("/verify");
    }
  };

  const hideShowPanel = () => {
    setPanel(!panel);
  }

  useEffect(() => {
    if (name == null || name == "" || name == "... ...") {
      // Browser has been Reloaded...
      initializeData();
    }
  }, [name]);

  return (
    <>
      <div className="flex">
        {panel && 
          <div className={`fixed w-m-[15%] sm:w-m-200 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between slide-right-enter`}>
            <Sidebar logout={logoutUser} ut={user_type} hideShowPanel={hideShowPanel} />
          </div>
        }
        <div className={`${panel ? 'sm:ml-[229px] w-[85%]' : ''} sm:w-[100%] h-screen`} style={{width:''+300+'%'}}>
          <Navbar logout={logoutUser} username={name} userimg={userIMG} panel={panel} hideShowPanel={hideShowPanel} />
          <div className="p-4 bg-gray-100 h-screen">{children}</div>
        </div>
      </div>
    </>
  );
};

export default layout;
