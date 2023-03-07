import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { URL, token } from "../../utils/config";
// import game from "../../images/game.png";
import { Box, CircularProgress } from "@material-ui/core";

import GameTerminalHorizontalDual from "../../images/GameTerminalHorizontalDual.png";
import GameTerminalVertical from "../../images/GameTerminalVertical.png";
import pos from "../../images/pos.png";
import progressive from "../../images/progressive.png";
import RechargeStation from "../../images/RechargeStation.png";
import GameTerminalHorizontalSingle from "../../images/GameTerminalHorizontalSingle.png";
import redemption from "../../images/redemption.png";
import server from "../../images/server.png";
import ButtonNavigation from "../../ButtonNavigation";
// import warning from "../../images/warning.png";
import { Tooltip } from "@mui/material";
import updated from "../../images/updated.png";
import connect from "../../images/connect.png";
import downward from "../../images/downward.png";

function TerminalDetails() {
  const { terminalId } = useParams();
  const [basicinfo, setBasicInfo] = useState();
  const [detailsInfo, setDetailsInfo] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  //   console.log(id);

  useEffect(() => {
    try {
      async function pullTerminalData() {
        setLoading(true);
        // console.log("Terminal id is ", terminalId);
        const requestbody = {
          terminalId,
        };
        const response = await fetch(`${URL}/api/Store/GetTerminalDetails`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestbody),
        });
        //response return a promise thats why we need to await for actuall data
        const res = await response.json();
        const terminal = res.data.terminal.terminal;
        const {
          name,
          roleDisplayName,
          lastUpdated,
          connectTime,
          ...detailData
        } = terminal;
        const basicData = {
          name,
          roleDisplayName,
          lastUpdated,
          connectTime,
        };
        const detailsDta = {
          ...detailData,
        };
        console.log(terminal);
        setBasicInfo(basicData);
        setDetailsInfo(detailsDta);
        setLoading(false);
      }

      pullTerminalData();
    } catch (error) {
      console.log(error.response.status);
    }
  }, [terminalId]);

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (window.scrollY > 10) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <div>
      {loading ? (
        <>
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "100px",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          <>
            <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
              <div className="text-left w-fit ">
                <ButtonNavigation />
              </div>
              <div className="text-center  ">
                <p className="text-center font-bold text-sm md:text-lg ">
                  Terminal Details
                </p>
              </div>
              <div
                className={`text-right ${showScroll ? "visible" : "invisible"}`}
              >
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

            {/* <div className="m-1 lg:px-72 md:px-32 px-1"> */}
            {/* <div className="m-1 lg:px-72 md:px-32 px-1"> */}
            <div className="inputs w-full p-2 mt-2 sm:p-6 sm:mt-0 mx-auto">
              <div className="flex flex-wrap justify-center -mx-3 mb-6">
                <div className="w-full max-w-[800px] px-3 mb-6 -mt-4">
                  <div className="">
                    <div className=" ">
                      <div className="p-2 mt-16 rounded-lg  bg-gradient-to-b from-[#D9E6FF]  ">
                        <div className="flex justify-between items-center ">
                          <div className=" flex flex-row">
                            <div className="flex justify-center items-start pt-2 h-13 w-7 mr-2">
                              <div className="w-7 h-12 ">
                                {basicinfo.roleDisplayName ===
                                "Game Terminal: Horizontal Single Screen" ? (
                                  <img
                                    src={GameTerminalHorizontalSingle}
                                    className=""
                                  ></img>
                                ) : (
                                  ""
                                )}
                                {basicinfo.roleDisplayName ===
                                "Game Terminal: Vertical" ? (
                                  <img
                                    src={GameTerminalVertical}
                                    className=" "
                                  ></img>
                                ) : (
                                  ""
                                )}
                                {basicinfo.roleDisplayName ===
                                "Game Terminal: Horizontal Dual Screen" ? (
                                  <img
                                    src={GameTerminalHorizontalDual}
                                    className=""
                                  ></img>
                                ) : (
                                  ""
                                )}
                                {basicinfo.roleDisplayName ===
                                "Progressive Display" ? (
                                  <img src={progressive} className=""></img>
                                ) : (
                                  ""
                                )}
                                {basicinfo.roleDisplayName === "POS" ? (
                                  <img src={pos} className=""></img>
                                ) : (
                                  ""
                                )}
                                {basicinfo.roleDisplayName ===
                                "Recharge Station" ? (
                                  <img src={RechargeStation} className=""></img>
                                ) : (
                                  ""
                                )}

                                {basicinfo.roleDisplayName === "Server" ? (
                                  <img src={server} className=""></img>
                                ) : (
                                  ""
                                )}
                                {basicinfo.roleDisplayName ===
                                "Redemption Kiosk" ? (
                                  <img src={redemption} className=""></img>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className=" ">
                              <div className="ml-[-4px] text-md sm:text-lg font-bold md:mr-[-50px]">
                                {basicinfo.name}
                              </div>
                              {/* <div className="text-sm font-bold">
                            {basicinfo.roleDisplayName}
                          </div> */}
                            </div>
                          </div>

                          <div className="-mt-8 text-xs md:pl-20">
                            <div className="flex justify-center items-center">
                              <img
                                src={updated}
                                alt=""
                                className="w-3 h-3 mr-[0.85px]  md:mr-1  "
                              ></img>
                              {basicinfo.lastUpdated.slice(2)}
                            </div>
                          </div>
                          {/* <div className="text-sm font-bold">
                          {basicinfo.roleDisplayName}
                        </div>

                        <div className="text-xs px-2">
                          Connect Time: {basicinfo.connectTime}{" "}
                        </div> */}
                        </div>
                        <div className="flex justify-between text-xs px-2 md:px-2 -mt-6">
                          <div className="font-bold ml-7">
                            {basicinfo.roleDisplayName ===
                              "Game Terminal: Horizontal Single Screen" ||
                            basicinfo.roleDisplayName ===
                              "Game Terminal: Horizontal Dual Screen" ||
                            basicinfo.roleDisplayName ===
                              "Game Terminal: Vertical"
                              ? "Game Terminal"
                              : basicinfo.roleDisplayName}
                          </div>
                          <div className="flex justify-center items-center text-xs">
                            {basicinfo.connectTime !== "" &&
                            basicinfo.connectTime.charAt(0) === "-" ? (
                              <img
                                src={downward}
                                alt=""
                                className="w-2 h-2 mr-[0.85px]"
                              ></img>
                            ) : (
                              ""
                            )}
                            {basicinfo.connectTime !== "" &&
                            basicinfo.connectTime.charAt(0) !== "-" ? (
                              <img
                                src={connect}
                                alt=""
                                className="w-2 h-2 mr-[0.85px]"
                              ></img>
                            ) : (
                              ""
                            )}
                            {basicinfo.connectTime.replace("-", "")}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 mt-6 ">
                          <div className="w-52 md:w-80 -ml-2">Status:</div>
                          <div className="w-full">{detailsInfo.status}</div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80  -ml-2">IP Address:</div>
                          <div className="w-full">{detailsInfo.IP}</div>
                        </div>
                        {/* <div className="flex justify-between text-xs px-2 md:px-2 mt-3">
                          <div className="w-52 md:w-80">Bill Validator:</div>
                          <div className="w-full truncate">
                            {detailsInfo.billValidator}
                          </div>
                        </div> */}

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80  -ml-2">
                            Bill Validator:
                          </div>
                          <div className="w-full">
                            {detailsInfo.billValidator}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            {" "}
                            Voucher/Receipt Printer:
                          </div>
                          <div className="w-full">
                            {detailsInfo.voucherPrinter}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2 ">
                            Ticket Printer:
                          </div>
                          <div className="w-full">
                            {detailsInfo.ticketPrinter}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">IO Type:</div>
                          <div className="w-full">{detailsInfo.ioType}</div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            PC Manufacturer:
                          </div>
                          <div className="w-full">
                            {detailsInfo.manufacture}
                          </div>
                        </div>
                        <div className="flex justify-between text-xs px-2 md:px-2">
                          <div className="w-52 md:w-80 -ml-2">PC Model:</div>
                          <div className="w-full">{detailsInfo.model}</div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">CPU:</div>
                          <div className="w-full">{detailsInfo.CPU}</div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">RAM:</div>
                          <div className="w-full">{detailsInfo.RAM}</div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            Display Adapter:
                          </div>
                          <div className="w-full">
                            {detailsInfo.displayAdapter}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">Display RAM:</div>
                          <div className="w-full">{detailsInfo.displayRAM}</div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            Display Resolution 1:
                          </div>

                          <div className="w-full">
                            {detailsInfo.displayResolution1}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            Display Resolution 2:
                          </div>
                          <div className="w-full">
                            {detailsInfo.displayResolution2}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            Sound Device:
                          </div>
                          <div className="w-full">
                            {detailsInfo.soundDevice}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            Total Storage:
                          </div>
                          <div className="w-full">
                            {detailsInfo.totalStorage}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            Free Storage:
                          </div>

                          <div className="w-full">
                            {detailsInfo.freeStorage}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            Database Usage:
                          </div>
                          <div className="w-full">
                            {detailsInfo.databaseUsage}
                          </div>
                        </div>

                        {/* <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80">Operating System:</div>
                          <Tooltip title={detailsInfo.OS} placement="bottom">
                            <div className="w-full truncate">
                              {detailsInfo.OS}
                            </div>
                          </Tooltip>
                        </div> */}

                        <div className="flex justify-between text-xs px-2 md:px-2">
                          <div className="w-52 md:w-80 -ml-2">
                            Operating System:
                          </div>
                          <div className="w-full">{detailsInfo.OS}</div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">
                            Image Version:
                          </div>
                          <div
                            className="w-full "
                            style={{ overflowWrap: "anywhere" }}
                          >
                            {detailsInfo.imageVersion}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2">
                          <div className="w-52 md:w-80 -ml-2">Boot Date:</div>
                          <div className="w-full">{detailsInfo.bootDate}</div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2">
                          <div className="w-52 md:w-80 -ml-2">
                            Registration Date:
                          </div>
                          <div className="w-full">
                            {detailsInfo.registrationDate}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs px-2 md:px-2 ">
                          <div className="w-52 md:w-80 -ml-2">Time Zone:</div>

                          <div className="w-full">{detailsInfo.timeZone}</div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer></footer>
          </>
        </>
      )}
    </div>
  );
}

export default TerminalDetails;
