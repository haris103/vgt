import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Table from "./Table";

// function PeriodCard({ heading, location, status, type, country, time, data }) {
function PeriodCard({ name, address, status, type, country, time, data }) {
  return (
    <>
      <div
        className={`bg-gradient-to-b from-[#D9E6FF] rounded-md md:px-4 px-4 py-1 `}
      >
        {/*  */}
        <div className="flex justify-between">
          <div>
            <p className="font-bold md:text-sm text-xs ">High Rollers Bingo</p>
          </div>

          <div className="flex flex-col flex-end items-end">
            <Menu as="div" className="relative inline-block text-left">
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
                      <div className={"text-gray-700 block px-4 py-2 text-sm"}>
                        Info
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div className={"text-gray-700 block px-4 py-2 text-sm"}>
                        Revenue
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div className={"text-gray-700 block px-4 py-2 text-sm"}>
                        Terminals
                      </div>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-xs ">{address}</p>
          </div>
          <div className=" text-xs">{status}</div>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-xs">{country}</p>
          </div>
          <div className=" text-xs">
            {/* Updated 03-05-2022 13:10:55 */}
            {time}
          </div>
        </div>
        {type === "location" ? (
          // <div className="flex justify-between ">
          //   <div>
          //     <p className="text-sm ">V2 Sweeps</p>
          //   </div>
          //   <div className=" text-[#1515FE] font-bold text-sm">12 Terminals</div>
          // </div>
          <>
            <div className="flex justify-between pt-2">
              <div>
                <p className=" text-xs">V2 Sweeps</p>
              </div>
              <div className=" text-[#1515FE] text-xs font-bold">
                12 Terminals
              </div>
            </div>
          </>
        ) : type === "business" ? (
          <>
            <div className="flex justify-between pt-2">
              <div>
                <p className="text-[#1515FE] text-xs font-bold">
                  10294 V2 Pay to Play
                </p>
              </div>
              <div className=" text-[#1515FE] text-xs font-bold">
                29 Terminals
              </div>
            </div>
            <div className="flex justify-between pt-1">
              <div>
                <p className="text-[#1515FE] text-xs font-bold">
                  10429 V2 Pay to Play
                </p>
              </div>
              <div className=" text-[#1515FE] text-xs  font-bold">
                12 Terminals
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {/* if you see there is an array of detail coming in object */}
        {/* <Table tableData={data} /> */}
      </div>
      <Table tableData={data} />
    </>
  );
}

export default PeriodCard;
