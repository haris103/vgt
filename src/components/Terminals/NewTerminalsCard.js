import React, { Fragment } from 'react';
import { Menu, Transition } from "@headlessui/react";

// these are all props like heading etc
function NewTerminalsCard( {
  heading,
  mainphone,
  secondaryphone,
  alert,
  detail,
  houseNumber,
  address,
  id,
  sweeps,
  time,
  terminal,
  id1,
  sweeps1,
  time1,
  terminal1,
}) {
  return (
    <div
    className={`border ${
        alert ? "bg-[#FFCCCC] border-[#D44A1E]" : " bg-[#D1E0FF] border-[#6598FF]"
      }   rounded-md md:px-2 px-4 py-2  `}
    >
      {/*  */}
      <div className="flex justify-between mb- sm:flex-col md:flex-row">
        <div>
          <p className="font-bold md:text-base md:text-sm text-xs ">
            {heading}
          </p>
          <p className="md:text-sm text-xs font-semibold">{houseNumber}</p>
          <p className="md:text-sm text-xs font-semibold">{address}</p>
        </div>        

        <div className=" flex flex-col flex-end items-end">
          <div className="flex">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:h-6 md:w-6 h-4 w-4 text-gray-500 "
                    fill="none"
                    viewBox="0 10 18 24"
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

          <div className="flex ">
            <p className="pr-1.5 md:text-sm text-xs font-semibold ">
              Last Update:{" "}
            </p>
            <p className="md:text-sm text-xs">
              {" "}
              {mainphone}
            </p>
          </div>
          <div className="flex">
            <p className="pr-1.5 md:text-sm text-xs font-semibold ">
              Connect Time:
            </p>
            <p className="md:text-sm text-xs">
              {secondaryphone}
            </p>
          </div>
        </div>
      </div>

      <div className="flex px-2">
          <p className="font-bold flex-none w-14 sm:flex-col md:flex-row text-sm">
            {id}
          </p>
          <p className="flex-initial w-32 text-sm ...">
            {sweeps}
          </p>
          <p className="flex-initial w-32 text-sm ...">
           {time} 
          </p>
          <p className="font-bold text-sm text-blue-700 flex-initial w-32 ...">
           {terminal} 
          </p>
        </div>

        <div className="flex px-2">
          <p className="font-bold flex-none w-14 h-5 text-sm">
            {id1}
          </p>
          <p className="flex-initial w-32 text-sm...">
            {sweeps1}
          </p>
          <p className="flex-initial w-32 text-sm ...">
           {time1} 
          </p>
          <p className="font-bold text-blue-700 flex-initial w-32 text-sm ...">
           {terminal1} 
          </p>
        </div>
{/* 
          <div className="flex ">
            <p className="pr-1.5 md:text-sm text-xs font-semibold ">
              {" "}
            </p>
            <p className="md:text-sm text-xs text-[#0D60D8] font-bold">
              {" "}
             { {lastupdate}}
            </p>
          </div>
          <div className="flex">
            <p className="pr-1.5 md:text-sm text-xs font-semibold ">
              Connect Time:
            </p>
            <p className="md:text-sm text-xs  text-[#0D60D8] font-bold">
              {connecttime}
            </p>
          </div> */}
      {/* array of details in object */}

      {detail?.map((v, k) => (
        <>
          <div className="flex space-x-5 mt-5 mb-2 items-center">
            <div className="md:text-sm text-[10px] capitalize font-semibold">
              {/* if there is an alert found in detail, then it will show first icon else second one */}
              {v.alerts ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="md:h-5 md:w-5 w-4 h-4 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    className="text-[#EE0000]"
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : (
                <span class="svg-icon svg-icon-primary svg-icon-2x">
                  <svg
                    className="md:h-5 md:w-5 h-4 w-4 text-[#6C7379]"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect x="0" y="0" width="24" height="24" />
                      <path
                        d="M4,9.67471899 L10.880262,13.6470401 C10.9543486,13.689814 11.0320333,13.7207107 11.1111111,13.740321 L11.1111111,21.4444444 L4.49070127,17.526473 C4.18655139,17.3464765 4,17.0193034 4,16.6658832 L4,9.67471899 Z M20,9.56911707 L20,16.6658832 C20,17.0193034 19.8134486,17.3464765 19.5092987,17.526473 L12.8888889,21.4444444 L12.8888889,13.6728275 C12.9050191,13.6647696 12.9210067,13.6561758 12.9368301,13.6470401 L20,9.56911707 Z"
                        fill="#000000"
                      />
                      <path
                        d="M4.21611835,7.74669402 C4.30015839,7.64056877 4.40623188,7.55087574 4.5299008,7.48500698 L11.5299008,3.75665466 C11.8237589,3.60013944 12.1762411,3.60013944 12.4700992,3.75665466 L19.4700992,7.48500698 C19.5654307,7.53578262 19.6503066,7.60071528 19.7226939,7.67641889 L12.0479413,12.1074394 C11.9974761,12.1365754 11.9509488,12.1699127 11.9085461,12.2067543 C11.8661433,12.1699127 11.819616,12.1365754 11.7691509,12.1074394 L4.21611835,7.74669402 Z"
                        fill="#000000"
                        opacity="0.3"
                      />
                    </g>
                  </svg>
                </span>
              )}
            </div>
            <div className='flex mb-2 font-bold'>
            <div className="md:text- text-[10px] font-bold">
              {v.id}
            </div>
            <div className="md:text-sm text-[10px]     
              font-semibold">
              <div className="md: px-8">{v.sweeps}</div>
            </div>
            <div className="md:text-sm text-[10px] px-10 font-semibold">
              {v.time}
            </div>
            <div className="md:text-sm text-[10px] px-10 text-[#0D60D8] font-bold">
              <div className="flex bg-blue-500">{v.terminal}</div>
            </div>
            {v.alerts ? (
              <div className="md:text-sm text-[10px] font-bold">
                <div className="flex px-20">{v.alerts} Alert</div>
              </div>
            ) : (
                ""
            )}
            </div>
            </div>
            </>
      ))}
      </div>
  );
            }

export default NewTerminalsCard;