import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import TerminalsCard from "../Terminals/TerminalsCard";
import { Menu, Transition } from "@headlessui/react";

import Terminals__BusinessCard from "./Terminals__BusinessCard";

function Terminals() {
  const [active, setActive] = useState(true);
  let arrOfBusiness = [
    //datas used in business tab
    {
      // icon: {horizontalIcon},
      heading: "SW2-FC-001",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: true,

      gameTerminal: "10.0.42.9",
      status: "Not Connected ",
      stacker: "9 - $220.00",
    },

    {
      heading: "SW2-FC-009",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: true,

      gameTerminal: "10.0.42.9",
      status: "Printer Out of Paper ",
      stacker: "9 - $220.00",
    },

    {
      heading: "SW2-RK-001",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Printer Out of Paper ",
      stacker: "10 - $280.00",
      recylerbox: "1: 15 * $10.00 - $150.00",
    },

    {
      heading: "PT-01",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Online ",
    },

    {
      heading: "SW2-POS-001",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "8d 10h 16m",
      alert: false,

      gameTerminal: "10.0.42.31",
      status: "Online ",
    },

    {
      heading: "SW2-PD-001",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "8d 10h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Online ",
    },

    {
      heading: "SW2-RS-001",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.31",
      status: "Online ",
    },
  ];

  let arrOfLocation = [
    // here is the data which i use in location tab
    {
      heading: "SW2-FC-009",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: true,

      gameTerminal: "10.0.42.9",
      status: "Printer Out of Paper ",
    },

    {
      heading: "SW2-FC-009",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Online ",
    },

    {
      heading: "SW2-FC-009",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Online ",
    },

    {
      heading: "SW2-FC-009",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Online ",
    },

    {
      heading: "SW2-FC-009",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Online ",
    },

    {
      heading: "SW2-FC-009",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Online ",
    },

    {
      heading: "SW2-FC-009",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Online ",
    },

    {
      heading: "SW2-FC-009",
      lastupdate: "2022-02-24 13:23:22",
      connecttime: "5d 13h 16m",
      alert: false,

      gameTerminal: "10.0.42.9",
      status: "Online ",
    },
  ];
  return (
    <div className="m-3 lg:px-72 md:px-32 px-1">
      <div>
        <div className="flex items-center absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mt-0.5 font-semibold"
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

          <Link to="/">
            <p className=" font-semibold text-lg mt-2 mb-2">Back</p>
          </Link>
        </div>
        <p className="text-center font-bold text-2xl mt-8 mb-5 ">Terminals</p>
      </div>

      <div className="flex justify-around rounded-full mb-3">
        {/* these 2 are tab by default business tab is active i use here a state which change onClick if the state is true than it active buisness tab else location tab  */}
        <div
          className={`border border-[#7F99CC] w-full border-r-0 text-center p-2 rounded-l-lg font-bold pointer ${
            active ? "bg-[#7F99CC] text-white " : ""
          }`}
          onClick={() => setActive(true)}
        >
          Business
        </div>
        <div
          className={`border border-[#6C6C6C] w-full text-center p-2 rounded-r-lg font-bold ${
            !active ? "bg-[#7F99CC] text-white " : ""
          }`}
          onClick={() => setActive(false)}
        >
          Location
        </div>
      </div>

      <div className="flex items-center mt-4 mb-5">
        <p className="text-lg ">Business</p>
        <div className="flex items-center">
          <select className="py-1.5 ml-5 pr-60 pl-3 rounded-0 focus:outline-none border border-gray-500 text-sm">
            <option>Ali's Bar & Grill</option>
          </select>
        </div>
      </div>

      <button className="mt-5 p-3 mb-5 text-xs font-bold text-white bg-[#0179FF] ">
        View Terminals
      </button>

      <Terminals__BusinessCard />

      <div className="grid  grid-cols-1 gap-5 mt-5">
        {/* here if the active is true than it show data related buiness else location */}
        {active ? (
          <>
            {/* here i map arr of business and send data in component using props  */}
            {arrOfBusiness.map((v, k) => (
              <TerminalsCard
                heading={v?.heading}
                lastupdate={v.lastupdate}
                connecttime={v.connecttime}
                alert={v.alert}
                detail={v.detail}
                gameTerminal={v.gameTerminal}
                status={v.status}
                stacker={v.stacker}
                recylerbox={v.recylerbox}
              />
            ))}
          </>
        ) : (
          <>
            {arrOfLocation?.map((v, k) => (
              <TerminalsCard
                heading={v?.heading}
                lastupdate={v.lastupdate}
                connecttime={v.connecttime}
                alert={v.alert}
                detail={v.detail}
                gameTerminal={v.gameTerminal}
                status={v.status}
                stacker={v.stacker}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Terminals;
