import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function Terminals__BusinessCard() {
  return (
    <div>
      {/* <div
        className={`border ${
        alert ? "bg-[#F0F0F0]" : " bg-[#E5EBF8]"
        }  border-gray-400 rounded-md md:px-6 px-4 py-2  `}
        > */}
      <div
        className={`bg-gradient-to-b from-[#EFEFEF] rounded-md md:px-4 px-4 py-1 `}
      >
        {/*  */}
        <div className="flex justify-between">
          <div>
            <p className="font-bold md:text-base md:text-sm text-xs ">
              Ali's Bar & Grill
            </p>
            <p className="md:text-sm text-xs font-semibold">123 Main St. </p>
            <p className="md:text-sm text-xs font-semibold">Montgomery, AL</p>
          </div>
          {/* ... menu button */}
          <div className=" flex flex-col flex-end items-end">
            <div className="flex -mt-1 ">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="md:h-6 md:w-6 h-4 w-4 text-gray-500 "
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
                          className={"text-gray-700 block px-4 py-2 text-sm"}
                        >
                          Info
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          className={"text-gray-700 block px-4 py-2 text-sm"}
                        >
                          Revenue
                        </div>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="flex ">
              <p className="pr-1.5 -mt-2 md:text-sm text-xs font-semibold ">
                Main Phone:{" "}
              </p>
              <p className="md:text-sm text-xs -mt-2 text-[#0D60D8] font-bold">
                876 543 2109
              </p>
            </div>
            <div className="flex">
              <p className="pr-1.5 md:text-sm text-xs -mt-1 font-semibold ">
                Secondary Phone:
              </p>
              <p className="md:text-sm text-xs -mt-1  text-[#0D60D8] font-bold">
                876 543 2109
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`border ${
          alert ? "bg-[#6699FF]" : " bg-[#5884e1] "
        }  border-gray-400 rounded-md md:px-6 px-2 py-2  `}
      >
        <div className="flex justify-between">
          <p className="flex font-bold text-white sm:text- md:text-sm text-xs ">
            10123 V2 Sweeps - 10 Terminals (1 Alert)
          </p>
        </div>
      </div>
      <br />

      <div
        className={`border ${
          alert ? "bg-[#00000]" : " bg-[#F0F0F0]"
        }  border-gray-400 rounded-md md:px-6 px-2 py-2  `}
      >
        <div className="flex justify-between">
          <p className="flex font-bold sm:text-base md:text-sm text-xs ">
            10124 V2 Pay to Play - 5 Terminals
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terminals__BusinessCard;
