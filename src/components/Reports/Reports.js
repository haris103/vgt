import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonNavigation from "../../ButtonNavigation";
import PeriodDetails from "../Reports/Card/PeriodDetails";
import ReportCard from "../RevenueReport/ReportCard";

function Reports() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
        <div className="text-left">
          <Link
            to="/home"
            // className="inline-block text-sm font-semibold pl-2 px-4 py-2 leading-none rounded hover:text-white hover:bg-black mt-0 transition duration-300 ease-in-out "
            className="inline-block text-sm font-semibold -ml-2 leading-none rounded hover:text-white hover:bg-black mt-0 transition duration-300 ease-in-out"
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
          <p className="text-center font-bold text-lg ">Reports</p>
        </div>
        <div className="text-right"></div>
      </nav>

      {/* <div className="lg:px-[37%] md:px-[25%] px-5 mt-16"> */}
      <div className="inputs w-full p-6 mx-auto">
        <div className="flex flex-wrap justify-center -mx-3 mb-6">
          <div className="w-full max-w-[400px] px-3 mt-10">
            <div>
              {/* <p className="text-center font-bold text-2xl mt-5 mb-5">Reports</p> */}
            </div>
            <div className="flex space-x-5 justify-center">
              <PeriodDetails title="Period" subtitle="Report" />

              <ReportCard title="Revenue" subtitle="Report" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;
