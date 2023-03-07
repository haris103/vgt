import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Button from "./Buttons";
import axios from "axios";
import { URL, config, token } from "../../utils/config";

function Home() {
  const firstName = localStorage.getItem("firstName");
  localStorage.setItem("active", true);
  localStorage.setItem("overviewActive", true);
  localStorage.setItem("periodActive", true);
  localStorage.setItem("revenueActive", true);

  const [greetings, setGreetings] = useState("");
  const navigate = useNavigate();

  const handleSignOut = () => {
    try {
      async function pullSummaryData() {
        const { data } = await axios.post(`${URL}/api/User/Logout`, config);
        if (data.rc === 1000) {
          localStorage.removeItem("token");
          localStorage.removeItem("firstName");
          sessionStorage.removeItem("token");
          navigate("/");
        }
      }
      pullSummaryData();
    } catch (error) {
      console.log(error.response.status);
    }
  };

  useEffect(() => {
    var today = new Date();

    var curHr = today.getHours();
    if (curHr < 12) {
      setGreetings("Good Morning");
    } else if (curHr < 18) {
      setGreetings("Good Afternoon");
    } else {
      setGreetings("Good Evening");
    }
  }, []);

  const handleTerminal = () => {
    localStorage.setItem("businessId", 111);
    localStorage.setItem("locationId", 111);
    localStorage.setItem("activeItem", true);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     sessionStorage.removeItem("token");
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("firstName");
  //     localStorage.setItem("message", "Session expired");
  //     navigate("/");
  //   }, 60 * 60 * 1000);
  //   var today = new Date();

  //   var curHr = today.getHours();
  //   if (curHr < 12) {
  //     setGreetings("Good Morning");
  //   } else if (curHr < 18) {
  //     setGreetings("Good Afternoon");
  //   } else {
  //     setGreetings("Good Evening");
  //   }
  // }, []);

  return (
    <div className="h-screen grid justify-center px-5">
      <div className="container mx-auto">
        <div className="w-full mx-auto">
          <div className="flex justify-center mb-6 p-6">
            <div className="w-full max-w-[616px] flex-wrap space-y-4 px-3 mb-6">
              <div className="flex justify-center items-center">
                <img src={Logo} alt="" className="w-48 m-5 " />
              </div>
              <p className="flex justify-center items-center font-semibold text-xl">
                {greetings}, {firstName}
              </p>

              <Button name="Overview" path="/overview" />

              <Button name="Reports" path="/reports" />

              <Button
                name="Terminals"
                path="/terminals"
                handleTerminal={handleTerminal}
              />

              {/* <div className="border border-gray-600  w-full mt-2 mb-4 w-[97%] "></div> */}
              <div className="px-3">
                <hr className="mx-auto h-px bg-gray-700 border-0 dark:bg-gray-700" />
              </div>
              <Button name="Support" path="/support" />
              <Button name="Account Settings" path="/account-settings" />

              <button
                className="w-full my-2 py-2 pl-10 text-left bg-white border border-gray-600 rounded-lg font-semibold focus:bg-[#6FAAF9] hover:bg-[#E1EDFD]"
                onClick={handleSignOut}
                name="Sign Out"
              >
                Sign Out
              </button>

              {/* <h6>v1.00.00</h6> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
