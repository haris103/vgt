import React, { useState, useEffect, Fragment } from "react";
import SingleTerminalMenu from "../TerminalNew/SingleTerminalMenu";
// import { URL, config, token } from "../../../src/utils/config";
// import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

// axios.interceptors.request.use(
//   (config) => {
//     config.headers.authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const ApiSingleItem = ({ terminal }) => {
  const [active, setActive] = useState(true);
  const [locationdata, setlocatoinData] = useState([]);
  const {
    title,
    icon,
    ipName,
    status,

    lastUpdate,
    connectTime,

    alertStatus,
    id,
    sweeps,
    time,
    terminals,
    id1,
    sweeps1,
    time1,
    terminals1,
    alerts,
    id2,
    sweeps2,
    time2,
    terminals2,
    id3,
    sweeps3,
    time3,
    terminals3,
  } = terminal || {};

  //   useEffect(() => {
  //     try {
  //       async function pullBusinessandLocationsData() {
  //         const { data } = await axios.post(
  //           `${URL}/api/Store/GetBusinessAndLocations`,
  //           config
  //         );
  //         setlocatoinData(data.data.overView);
  //         // setLoading(false);
  //         // console.log("requested data is", data.data.storeList);
  //         console.log("requested data is", data.data.overView);
  //       }
  //       pullBusinessandLocationsData();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);

  return (
    <div
      className={`flex justify-between border-2 my-2  ${
        alertStatus
          ? "bg-[#FFCCCC] border-[#D44A1E]"
          : "bg-[#D1E0FF] border-[#6598FF]"
      } rounded-md p-2`}
    >
      <div>
        {/* <div className="flex items-start"> */}
        {/* <div className="w-full grid-cols-5"> */}
        <div className="">
          {/* <img
            className="w-7 mt-1 h-auto object-contain"
            src={images[icon]}
            alt=""
          /> */}
          <div className="">
            {/* <h3 className="font-bold">{title}</h3>
            <p className="text-xs">{ipName}</p>
            <p className="text-xs">{status}</p> */}

            {/* <table className="grid grid-cols-4	"> */}
            {/* <thead className="">
                <tr>
                  <th className="text-left font-semibold text-md ">{id}</th>
                  <th className="text-right font-semibold text-md ">
                    {sweeps}
                  </th>
                  <th className="text-right font-semibold text-md "> {time}</th>
                  <th className="text-right font-semibold text-md ">
                    {terminals}
                  </th>
                  <th></th>
                </tr>
              </thead> */}

            {/* <tbody>
                <tr className="text-sm">
                  <td className="text-right text-sm ">{id}</td>
                  <td className="text-right text-sm "> {sweeps}</td>
                  <td className="text-right text-sm ">{time}</td>
                  <td className="text-right text-sm "> {terminals}</td>
                </tr>
              </tbody> */}
            {/* </table> */}
          </div>
        </div>

        {/* <div className="grid grid-cols-4">
            <div className="text-right text-xs">{id}</div>

            <div className="text-left text-xs">{sweeps}</div>

            <div className=" text-right text-xs">{time}</div>

            <div className="text-right text-xs">{terminals}</div>
          </div> */}
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-xs">{ipName}</p>
          <p className="text-xs">{status}</p>
          <div class="grid grid-cols-4 gap-4 ">
            {/* <div className="text-xs">01</div>
          <div className="text-xs">02</div>
          <div className="text-xs">03</div>
          <div className="text-xs">04</div>
          <div className="text-xs">05</div>
          <div className="text-xs">06</div>
          <div className="text-xs">07</div>
          <div className="text-xs">08</div> */}

            <table className="flex grid-cols-4 gap-4">
              <tr>
                <tbody className="text-xs">{id}</tbody>
                <tbody className="text-xs">{sweeps}</tbody>
                <tbody className="text-xs">{time}</tbody>
                <tbody className="text-xs">{terminals}</tbody>
              </tr>
            </table>
          </div>
        </div>
      </div>

      {/* <div className="text-right -mt-3">
        <SingleTerminalMenu />
        <p className="text-xs">
          Main Phone:<b> {lastUpdate}</b>
        </p>
        <p className="text-xs">
          Secondary Phone:<b> {connectTime}</b>
        </p>
      </div> */}

      <div className="text-right -mt-2">
        {/* ... menu button */}
        <div className=" flex flex-col flex-end items-end">
          <div className="flex ">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:h-6 md:w-6 h-4 w-4 text-black "
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
                          "text-black block px-4 py-2 text-xs font-bold"
                        }
                      >
                        Info
                      </div>
                    </Menu.Item>
                    <Link to="/revenuereport">
                      <Menu.Item>
                        <div
                          className={
                            "text-black block px-4 py-2 text-xs font-bold"
                          }
                        >
                          Revenue
                        </div>
                      </Menu.Item>
                    </Link>
                    <Link to="/terminalpage">
                      <Menu.Item>
                        <div
                          className={
                            "text-black block px-4 py-2 text-xs font-bold"
                          }
                        >
                          Terminals
                        </div>
                      </Menu.Item>
                    </Link>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <p className="text-xs">Last Update: {lastUpdate}</p>
        <p className="text-xs">Connect Time: {connectTime}</p>
      </div>
    </div>
  );
};

export default ApiSingleItem;
