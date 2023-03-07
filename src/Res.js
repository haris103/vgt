import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL, config, token } from "./utils/config";

// to configure axios with authorization header
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.setItem("message", "Session is expired");
      window.location.href = "/";
    }
    if (
      response.status === "CORS error" ||
      response.status === 524 ||
      response.status === 503 ||
      response.status === 400
    ) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.setItem(
        "message",
        "Something is wrong, please try again later"
      );
      window.location.href = "/";
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.setItem("message", "Session is expired");
      window.location.href = "/";
      console.log("yes");
    }
    if (
      error.response.status === "CORS error" ||
      error.response.status === 524 ||
      error.response.status === 503 ||
      error.response.status === 400
    ) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.setItem(
        "message",
        "Something is wrong, please try again later"
      );
      window.location.href = "/";
    }

    return error;
  }
);

function Res() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [active, setActive] = useState(true);
  const [isapicalled, seIsApiCalled] = useState(false);
  const [businessArr, setBusinessArr] = useState([]); //initialy we have declared an business array that is empty
  const [locationArr, setLocationArr] = useState([]); //initialy we have declared an location array that is empty
  const [loading, setLoading] = useState(true); //means before calling api page will be load without error when data will come we will change loading status false
  const [value, onChange] = useState([new Date(), new Date()]);
  const [summary, setSummary] = useState([]);

  // const [apidata, setApiData] = useState([]);
  const FetchApiData = (data) => {
    setLocationArr(data.revenueReport);
    seIsApiCalled(true);
    setSummary(data.totalSummary);
  };

  const FetchApibusData = (data) => {
    setBusinessArr(data.businessRevenueReport);
    seIsApiCalled(true);
    setSummary(data.totalSummary);
  };

  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (
      !showScroll &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      setShowScroll(true);
    } else if (
      showScroll &&
      window.innerHeight + window.scrollY <= document.body.offsetHeight
    ) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <>
      <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
        <div className="text-left">
          <Link
            to="/reports"
            className="inline-block text-sm font-semibold pl-2 px-4 py-2 leading-none rounded hover:text-white hover:bg-black mt-0 transition duration-300 ease-in-out "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </Link>
        </div>
        <div className="text-center">
          <p className="text-center font-bold text-md ">Revenue Report</p>
        </div>
        <div className="text-right">
          <button
            type="button"
            className="inline-block text-sm font-semibold pr-2 px-4 py-2 leading-none rounded hover:text-white hover:bg-black mt-0 transition duration-300 ease-in-out "
            onClick={scrollTop}
            style={{ opacity: showScroll ? "1" : "0" }}
          >
            Top
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div className="m-1 lg:px-72 md:px-32 px-1">
        <div className="flex justify-around rounded-full py-3 mt-12">
          <div
            className={`border border-[#7F99CC] w-full border-r-0 text-center p-2 rounded-l-lg text-md font-bold pointer ${
              active ? "bg-[#7F99CC] text-white " : ""
            }`}
            onClick={() => setActive(true)}
          >
            Business
          </div>
          <div
            className={`border border-[#6C6C6C] text-md w-full text-center p-2 rounded-r-lg font-bold ${
              !active ? "bg-[#7F99CC] text-white " : ""
            }`}
            onClick={() => setActive(false)}
          >
            Location
          </div>
        </div>
      </div>
    </>
  );
}

export default Res;
