import React, { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import NewTrial from '../Terminals/NewTrial';
// import ReportTables from './ReportTables';
import { URL, config, token } from "../src/utils/config";
import axios from "axios";
import { Link } from "react-router-dom";

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

const moneyFormat = (value) => {
  const result = value.toFixed(2);
  // const result = value.toFixed();
  return `$${result}`;
};

function GetSummary() {
  const [active, setActive] = useState(true);

  const [summarydata, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      async function pullSummaryData() {
        const { data } = await axios.post(
          `${URL}/api/Store/GetStoreSummary`,
          config
        );
        setSummaryData(data.data.storeList);
        setLoading(false);
        console.log("requested data is", data.data.storeList);
      }
      pullSummaryData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="m-3 lg:px-72 md:px-32 px-1 sm:flex-col md:flex-row">
      <div className="flex justify-between items-center">
        <div className="flex items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mt-0.5 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <Link to="/reports">
            <p className=" text-lg mt-2 mb-2">Back</p>
          </Link>
        </div>
        <p className="text-center font-bold text-2xl">Period Report</p>
        <div className="flex items-center ">
          <p className="  text-lg mt-2 mb-2">Top</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mt-0.5 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>{" "}
      </div>

      <div className="flex justify-around rounded-full mb-3 sm:flex-col md:flex-row">
        {/* these 2 are tab by default business tab which is active, i use state which change onClick if the state is true than it active business tab else location tab  */}
        <div
          className={`border border-gray-500 w-full border-r-0 text-center p-2 rounded-l-lg font-bold pointer ${
            active ? "bg-[#6EAAF6] text-white " : ""
          }`}
          onClick={() => setActive(true)}
        >
          Business
        </div>
        <div
          className={`border border-gray-500 w-full text-center p-2 rounded-r-lg font-bold ${
            !active ? "bg-[#6EAAF6] text-white " : ""
          }`}
          onClick={() => setActive(false)}
        >
          Location
        </div>
      </div>

      {loading ? (
        <>Loading........</>
      ) : (
        <>
          {summarydata.map(
            (item) => (
              console.log("i am from map function..", item),
              (
                // <div>
                //   <p>Id: {item.store.id}</p>
                //   <p>Name : {item.store.name}</p>
                //   <p>Address: {item.store.address}</p>
                //   <p>Location Status: {item.store.locationStatus}</p>
                // </div>

                <div
                  className={`bg-gradient-to-b from-[#D9E6FF] rounded-md md:px-4 px-4 py-1 sm:flex-col md:flex-row `}
                >
                  <div className="flex justify-between">
                    <div className="grid  grid-cols-1 gap-5">
                      <p className="font-bold md:text-sm text-xs ">
                        {item.store.name}
                      </p>
                      <p className="text-xs -mt-5 ">{item.store.address}</p>
                    </div>

                    <div className="flex flex-col flex-end items-end">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div className="flex">
                          <Menu.Button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="md:h-4.5 md:w-4.5 h-4 w-4 text-gray-500 "
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0  w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="">
                              <Menu.Item>
                                <div
                                  className={
                                    "text-gray-700 block px-4 py-2 text-sm"
                                  }
                                >
                                  Info
                                </div>
                              </Menu.Item>
                              <Menu.Item>
                                <div
                                  className={
                                    "text-gray-700 block px-4 py-2 text-sm"
                                  }
                                >
                                  Revenue
                                </div>
                              </Menu.Item>
                              <Menu.Item>
                                <div
                                  className={
                                    "text-gray-700 block px-4 py-2 text-sm"
                                  }
                                >
                                  Terminals
                                </div>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div className="bg-[#F3F3F3] rounded-lg border shadow md:px-4 px-4 py-1 mb-5">
                    <table class=" bg-[#F3F3F3] w-full">
                      <thead className="">
                        <tr>
                          <th className="text-left font-semibold text-sm ">
                            Period
                          </th>
                          <th className="text-right font-semibold text-sm -px-10">
                            Sales
                          </th>
                          <th className="text-right font-semibold text-sm ">
                            Redeem
                          </th>
                          <th className="text-right font-semibold text-sm ">
                            Net
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* <p>{item.store.name}</p>
                            <p>{moneyFormat(item.summary.cws)}</p>
                            <p>{item.summary.cwr} </p>
                            <p>{item.summary.cwn} </p>
                            <p>{item.store.statusMsg}</p> */}

                        <tr className="mt-5">
                          <td className=" text-sm ">Current Day</td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.cds)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.cdr)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.cdn)}
                          </td>
                        </tr>

                        <tr className="">
                          <td className=" text-sm ">Current Week</td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.cws)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.cwr)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.cwn)}
                          </td>
                        </tr>

                        <tr className="">
                          <td className=" text-sm ">Last Week</td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.lws)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.lwr)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.lwn)}
                          </td>
                        </tr>

                        <tr className="">
                          <td className=" text-sm ">This Month</td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.tms)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.tmr)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.tmn)}
                          </td>
                        </tr>

                        <tr className="">
                          <td className=" text-sm ">Last Month</td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.lms)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.lmr)}
                          </td>
                          <td className="text-right text-sm ">
                            {moneyFormat(item.summary.cws)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            )
          )}
        </>
      )}
    </div>
  );
}

export default GetSummary;
