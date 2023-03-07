import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PeriodCard from "./Card/PeriodCard";
import { URL, config, token } from "../../../src/utils/config";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import MenuButton from "../Overview/MenuButton";
import { Box, Button, CircularProgress } from "@material-ui/core";

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

const addCommas = (nStr) => {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
};
var value = 0;
const result = Math.abs(value).toFixed(2);
var test = "S" + addCommas(result);
console.log(test);

const moneyFormat = (value) => {
  const result = Math.abs(value).toFixed(2);
  // const result = value.toFixed();
  return `$${addCommas(result)}`;
};

function PeriodReportTrial() {
  const [active, setActive] = useState(true);
  const [locationdata, setlocatoinData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function get1() {
      try {
        async function pullSummaryData() {
          const { data } = await axios.post(
            `${URL}/api/Business/GetBusinessSummary`,
            config
          );
          // const { data } = await axios({
          //   method: "post",
          //   url: `${URL}/api/Business/GetBusinessSummary`,
          //   config,
          //   // data: requestBody ? requestBody : "",
          // });
          console.log("DDDDDD", data);
          setBusinessData(data.data.businessList);
          // setLoading(false);
          console.log("requested data business summary is", data.data);
          setLoading(false);
        }
        pullSummaryData();
      } catch (error) {
        console.log(error);
      }
    }
    get1();
  }, []);

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

  const getLocationss = () => {
    setActive(false);
    console.log("LOCATIONS TAB");
    get2();
  };

  function get2() {
    try {
      async function pullSummaryData() {
        const { data } = await axios.post(
          `${URL}/api/Store/GetStoreSummary`,
          config
        );
        // const { data } = await axios({
        //   method: "post",
        //   url: `${URL}/api/Store/GetStoreSummary?_page=${locationdata}&_limit=10`,
        //   config,
        //   // data: requestBody ? requestBody : "",
        // });
        setlocatoinData(data.data.storeList);
        // setLoading(false);
        console.log("requested data period report is::", data.data.storeList);
      }
      pullSummaryData();
    } catch (error) {
      console.log(error);
    }
  }

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
          <p className="text-center font-bold text-lg ">Period Report</p>
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
            className={`border border-[#000000] w-full border-r-0 text-center p-2 rounded-l-lg font-bold pointer ${
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
            onClick={getLocationss}
          >
            Location
          </div>
        </div>

        {/*  */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="grid  grid-cols-1 gap-5">
            {active ? (
              <>
                {businessData.map((v, k) => (
                  <>
                    <div
                      className={`bg-gradient-to-b from-[#D9E6FF] rounded-md `}
                    >
                      <div className="flex justify-between px-2 md:px-2 mt-2">
                        <div>
                          <p className="font-bold text-sm md:text-sm ">
                            {v.business.businessInfo.name}
                          </p>
                          <p className="text-xs ">
                            {v.business.businessInfo.street}
                          </p>
                          <p className="text-xs ">
                            {v.business.businessInfo.city}, {""}
                            {v.business.businessInfo.locality} {""}
                            {v.business.businessInfo.zipPostal}
                          </p>
                        </div>
                        <MenuButton />
                      </div>

                      {v.business.stores.map((store, key) => (
                        <>
                          {/* <div class=" flex justify-between text-xs mt-2 px-2">
                            <div className="font-bold text-right">
                              {store.id}
                            </div>
                            <div className="text-left">{store.sofwareName}</div>
                            <div className="text-left">{store.statusMsg} </div>
                            <div className="text-[#0000FF] font-bold text-right">
                              {store.terminals.length} Terminals
                            </div>
                            <div className="text-right">
                              Updated on: {store.lastUpdate}{" "}
                            </div>
                          </div> */}

                          <div class=" grid grid-cols-11 text-xs mt-2 px-2">
                            <div className="font-bold text-right pr-5 ">
                              {store.id}
                            </div>
                            <div className="col-span-2">
                              {store.sofwareName}
                            </div>
                            <div>{store.statusMsg} </div>
                            <div className="text-[#0000FF] mr-[-4px] text-right col-span-2 font-bold">
                              {store.terminals.length} Terminals
                            </div>
                            <div className="col-span-5 text-right pl-2 ">
                              Updated on: {store.lastUpdate}{" "}
                            </div>
                          </div>

                          {/* <div className="px-1 ">
                            <div className="grid grid-cols-12 text-xs">
                              <div className=" text-right font-bold">
                                {store.id}
                              </div>
                              <div className="col-span-3 text-left px-1">
                                {store.sofwareName}
                              </div>
                              <div className=" text-left">
                                {store.statusMsg}
                              </div>
                              <div className="col-span-2 text-right text-[#0000FF] font-bold cursor-pointer ">
                                {store.terminals.length} Terminals
                              </div>
                              <div className="col-span-4 text-right ">
                                Updated: {store.lastUpdate}
                              </div>
                            </div>
                          </div> */}
                        </>
                      ))}
                    </div>

                    <div className=" bg-[#F3F3F3] py-0.75 rounded-lg -mt-4 px-2  ">
                      <div className="grid grid-cols-4">
                        <div className="font-bold">Period</div>
                        <div className="text-right font-bold text-sm">
                          Sales
                        </div>
                        <div className="text-right font-bold text-sm ">
                          Redeem
                        </div>
                        <div className="text-right font-bold text-sm ">Net</div>
                      </div>
                      {/* {a.map((v, k) => ( */}
                      <div className="grid grid-cols-4 ">
                        <div className=" text-xs">Today</div>

                        {v.summary.cds < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cds)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cds)}
                          </div>
                        )}

                        {v.summary.cdr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cdr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cdr)}
                          </div>
                        )}

                        {v.summary.cdn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cdn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cdn)}
                          </div>
                        )}

                        <div className=" text-xs">This Week</div>
                        {v.summary.cws < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cws)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cws)}
                          </div>
                        )}

                        {v.summary.cwr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cwr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cwr)}
                          </div>
                        )}

                        {v.summary.cwn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cwn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cwn)}
                          </div>
                        )}

                        <div className=" text-xs">Last Week</div>
                        {v.summary.lws < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lws)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lws)}
                          </div>
                        )}

                        {v.summary.lwr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lwr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lwr)}
                          </div>
                        )}

                        {v.summary.lwn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lwn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lwn)}
                          </div>
                        )}

                        <div className=" text-xs">This Month</div>
                        {v.summary.tms < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.tms)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.tms)}
                          </div>
                        )}

                        {v.summary.tmr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.tmr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.tmr)}
                          </div>
                        )}

                        {v.summary.tmn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.tmn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.tmn)}
                          </div>
                        )}

                        <div className=" text-xs">Last Month</div>
                        {v.summary.lms < 0 ? (
                          <div
                            className="text-right text-xs mb-1"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lms)})
                          </div>
                        ) : (
                          <div className="text-right text-xs mb-1">
                            {moneyFormat(v.summary.lms)}
                          </div>
                        )}

                        {v.summary.lmr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lmr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lmr)}
                          </div>
                        )}

                        {v.summary.lmn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lmn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lmn)}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                {locationdata.map((v, k) => (
                  <>
                    <div
                      className={`bg-gradient-to-b from-[#D9E6FF] rounded-md `}
                    >
                      <div className="flex justify-between px-2 md:px-2 mt-2">
                        <div className="">
                          <p className="font-bold text-sm ">{v.store.name}</p>
                          <p className="text-xs ">
                            {v.store.businessInfo.street}
                          </p>
                          <p className="text-xs ">
                            {v.store.businessInfo.city}, {""}
                            {v.store.businessInfo.locality} {""}
                            {v.store.businessInfo.zipPostal}
                          </p>
                        </div>

                        <MenuButton />
                      </div>

                      {/* <div class=" flex justify-between text-xs mt-2 px-2">
                        <div className="text-left">{v.store.sofwareName}</div>
                        <div className="text-left">{v.store.statusMsg} </div>
                        <div className="text-[#0000FF] font-bold text-right">
                          {v.store.terminals.length} Terminals{" "}
                        </div>
                        <div className="text-left">
                          Updated on: {v.store.lastUpdate}{" "}
                        </div>
                      </div> */}

                      {/* <div className="grid grid-cols-12 text-xs">
                        <div className="col-span-3 px-3 text-left ">
                          {v.store.sofwareName}
                        </div>
                        <div className="px-6 col-span-1 text-left ">
                          {v.store.statusMsg}
                        </div>
                        <div className="col-span-3 text-right text-[#0000FF] font-bold cursor-pointer ">
                          {v.store.terminals.length} Terminals
                        </div>
                        <div className="col-span-5 text-right">
                          Updated on: {v.store.lastUpdate}
                        </div>
                      </div> */}

                      <div class=" flex justify-between text-xs mt-2 px-2">
                        <div className="text-left"> {v.store.sofwareName}</div>
                        <div className="text-left"> {v.store.statusMsg} </div>
                        <div className="text-[#0000FF] text-right font-bold">
                          {v.store.terminals.length} Terminals
                        </div>
                        <div>Updated: {v.store.lastUpdate} </div>
                      </div>
                    </div>

                    <div className=" bg-[#F3F3F3] py-0.75 rounded-lg -mt-4 px-2">
                      <div className="grid grid-cols-4">
                        <div className="text-sm font-bold">Period</div>
                        <div className="text-sm text-right font-bold ">
                          Sales
                        </div>
                        <div className="text-sm text-right font-bold ">
                          Redeem
                        </div>
                        <div className="text-sm text-right font-bold ">Net</div>
                      </div>

                      <div className="grid grid-cols-4">
                        <div className=" text-xs">Today</div>

                        {v.summary.cds < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cds)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cds)}
                          </div>
                        )}

                        {v.summary.cdr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cdr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cdr)}
                          </div>
                        )}

                        {v.summary.cdn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cdn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cdn)}
                          </div>
                        )}

                        <div className=" text-xs">This Week</div>
                        {v.summary.cws < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cws)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cws)}
                          </div>
                        )}

                        {v.summary.cwr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cwr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cwr)}
                          </div>
                        )}

                        {v.summary.cwn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.cwn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.cwn)}
                          </div>
                        )}

                        <div className=" text-xs">Last Week</div>
                        {v.summary.lws < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lws)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lws)}
                          </div>
                        )}

                        {v.summary.lwr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lwr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lwr)}
                          </div>
                        )}

                        {v.summary.lwn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lwn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lwn)}
                          </div>
                        )}

                        <div className=" text-xs">This Month</div>
                        {v.summary.tms < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.tms)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.tms)}
                          </div>
                        )}

                        {v.summary.tmr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.tmr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.tmr)}
                          </div>
                        )}

                        {v.summary.tmn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.tmn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.tmn)}
                          </div>
                        )}

                        <div className=" text-xs mb-1">Last Month</div>
                        {v.summary.lms < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lms)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lms)}
                          </div>
                        )}

                        {v.summary.lmr < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lmr)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lmr)}
                          </div>
                        )}

                        {v.summary.lmn < 0 ? (
                          <div
                            className="text-right text-xs"
                            style={{ color: "red" }}
                          >
                            ({moneyFormat(v.summary.lmn)})
                          </div>
                        ) : (
                          <div className="text-right text-xs">
                            {moneyFormat(v.summary.lmn)}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default PeriodReportTrial;
