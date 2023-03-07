import React, { useState, Fragment } from "react";
import { fakeDate } from "./fakeDataOverview";
import OverviewSingleItem from "./OverviewSingleItem";
import { Menu, Transition } from "@headlessui/react";
import OverviewSingle from "./OverviewSingle";
import { Link } from "react-router-dom";

const OverviewPage = () => {
  const [terminalData, setTerminalData] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [active, setActive] = useState(true);

  const showTerminalHandler = (id) => {
    const currentTerminals = fakeDate.find((item) => item.id === id);
    // sorting the terminals according to the alertStatus
    currentTerminals?.terminals?.sort(
      (x, y) => Number(!x.alertStatus) - Number(!y.alertStatus)
    );
    setTerminalData(currentTerminals);
  };

  // getting alert counts
  const getAlertCount = (id) => {
    let count = 0;
    const currentTerminals = fakeDate.find((item) => item.id === id);
    currentTerminals.terminals &&
      currentTerminals.terminals.forEach((terminal) => {
        if (terminal.alertStatus) {
          count++;
        }
      });
    return count;
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
      <nav className="grid grid-cols-3 items-center p-3 fixed top-0 w-full bg-white z-50">
        <div className="text-left">
          <Link
            to="/home"
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
          <span className="font-semibold lg:text-2xl sm:text-xl text-lg tracking-tight">
            Overview
          </span>
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

      <div className="flex justify-around rounded-full mb-3">
        {/* these 2 are tabs by default business tab is active,
         i use state which change onClick if the state is true,
          then business tab will be active, else location tab  */}
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
      <div className="flex justify-between md mb-3">
        <div>
          <span className="font-bold">5 </span>{" "}
          <span className=" font-semibold">Businesses</span>
        </div>
        <div>
          <span className="font-bold">8 </span>{" "}
          <span className="font-semibold">
            Locations <span className="text-[#EE0000]"> (1 Alert)</span>
          </span>
        </div>
        <div className="px-3">
          <span className="font-bold ">90 </span>{" "}
          <span className="font-semibold">Terminals</span>
        </div>
      </div>
      <div className="container mx-auto mt-14">
        {/* <div className="max-w-lg mx-auto p-3"> */}
        <div className="m-3 lg:px-72 md:px-32 px-1 relative">
          {
            // mapping the fakeData to display sweeps/pay to pay buttons
            fakeDate.map((data) => (
              <OverviewSingle
                key={data.id}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                showTerminalHandler={showTerminalHandler}
                data={data}
                getAlertCount={getAlertCount}
              />
            ))
          }
          {activeItem && (
            <>
              <hr className="my-6" />
              <div className="flex justify-between lg:text-lg">
                <strong>{terminalData?.title}</strong>
                <h1>
                  {terminalData?.terminals?.length} Terminals{" "}
                  {getAlertCount(terminalData?.id) > 0 && (
                    <>
                      ({" "}
                      <strong className="text-red-600">{`${getAlertCount(
                        terminalData?.id
                      )} Alert`}</strong>{" "}
                      )
                    </>
                  )}
                </h1>
              </div>
            </>
          )}
          {/* mapping through the terminals */}
          {terminalData.terminals?.map((terminal) => (
            <OverviewSingleItem key={terminal.id} terminal={terminal} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
