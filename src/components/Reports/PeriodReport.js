import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import PeriodCard from "./Card/PeriodCard";
import { URL, config, token } from "../../../src/utils/config";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import MenuButton from "../Overview/MenuButton";
import { Box, Button, CircularProgress } from "@material-ui/core";
import PeriodTrialCard from "./PeriodTrialCard";
import PeriodLocationTrialCard from "./PeriodLocationtrialCard";
import ButtonNavigation from "../../ButtonNavigation";

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

function PeriodReport() {
  // const [active, setActive] = useState(true);
  // alert(JSON.parse(localStorage.getItem("periodActive")));
  const [active, setActive] = useState(
    JSON.parse(localStorage.getItem("periodActive")) && true
  );
  const [locationdata, setlocatoinData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate;

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
    get2();

    // to check the 'showScroll' value
    window.addEventListener("scroll", checkScrollTop2);
  }, []);

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop2 = () => {
    console.log("checkScrollTop2");
    if (window.scrollY > 10) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getLocationss = () => {
    setActive(false);
    console.log("LOCATIONS TAB");

    localStorage.setItem("periodActive", false);
  };

  function get2() {
    setLoading(true);
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
        setLoading(false);
        console.log(
          "requestedddddd data period report is::",
          data.data.storeList
        );
      }
      pullSummaryData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
        <div className="text-left">
          <ButtonNavigation />
        </div>
        <div className="text-center">
          <p className="text-center font-bold text-sm md:text-lg ">
            Period Report
          </p>
        </div>
        <div className="text-right">
          <button
            type="button"
            className="inline-block text-sm font-semibold -ml-2 leading-none rounded hover:text-white hover:bg-black mt-0 transition duration-300 ease-in-out "
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

      <div className="inputs w-full p-2 mt-2 sm:p-6 sm:mt-0 mx-auto">
        <div className="flex flex-wrap justify-center -mx-3 mb-6">
          <div className="w-full max-w-[800px] px-3 mb-6 -mt-4">
            {/* <div className="m-1 lg:px-72 md:px-32 px-1"> */}
            {/* <div className="m-1 lg:px-[400px] md:px-32 px-1"> */}
            <div className="flex justify-around rounded-full py-3 mt-12">
              <div
                className={`border border-[#000000] w-full border-r-0 text-center p-2 rounded-l-lg font-bold pointer ${
                  active ? "bg-[#7F99CC] text-white " : ""
                }`}
                // onClick={() => setActive(true)}
                onClick={() => {
                  setActive(true);
                  localStorage.setItem("periodActive", true);
                }}
              >
                Business
              </div>
              <div
                className={`border border-[#000000] w-full text-center p-2 rounded-r-lg font-bold ${
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
                  marginTop: "100px",
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
                        <PeriodTrialCard business={v.business} />

                        <div className=" bg-[#F3F3F3] py-0.75 rounded-lg -mt-4 px-1 sm:px-1  ">
                          <div className="grid grid-cols-4 text-xs sm:text-sm">
                            <div className="font-bold">Period</div>
                            <div className="text-right font-bold text-xs sm:text-sm">
                              Sales
                            </div>
                            <div className="text-right font-bold text-xs sm:text-sm ">
                              Redeem
                            </div>
                            <div className="text-right font-bold text-xs sm:text-sm ">
                              Net
                            </div>
                          </div>
                          {/* {a.map((v, k) => ( */}
                          <div className="grid grid-cols-4 text-[11px] sm:text-xs ">
                            <div className="text-[11px] sm:text-xs ">Today</div>

                            {v.summary.cds < 0 ? (
                              <div
                                className="text-right text-[11px] sm:text-xs "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cds)})
                              </div>
                            ) : (
                              <div className="text-right text-[11px] sm:text-xs ">
                                {moneyFormat(v.summary.cds)}
                              </div>
                            )}

                            {v.summary.cdr < 0 ? (
                              <div
                                className="text-right text-[11px] sm:text-xs "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cdr)})
                              </div>
                            ) : (
                              <div className="text-right text-[11px] sm:text-xs">
                                {moneyFormat(v.summary.cdr)}
                              </div>
                            )}

                            {v.summary.cdn < 0 ? (
                              <div
                                className="text-right text-[11px] sm:text-xs"
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cdn)})
                              </div>
                            ) : (
                              <div className="text-right text-[11px] sm:text-xs">
                                {moneyFormat(v.summary.cdn)}
                              </div>
                            )}

                            <div className="text-[11px] sm:text-xs ">
                              This Week
                            </div>
                            {v.summary.cws < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cws)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.cws)}
                              </div>
                            )}

                            {v.summary.cwr < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cwr)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.cwr)}
                              </div>
                            )}

                            {v.summary.cwn < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cwn)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.cwn)}
                              </div>
                            )}

                            <div className=" ">Last Week</div>
                            {v.summary.lws < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lws)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.lws)}
                              </div>
                            )}

                            {v.summary.lwr < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lwr)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.lwr)}
                              </div>
                            )}

                            {v.summary.lwn < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lwn)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.lwn)}
                              </div>
                            )}

                            <div className=" ">This Month</div>
                            {v.summary.tms < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.tms)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.tms)}
                              </div>
                            )}

                            {v.summary.tmr < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.tmr)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.tmr)}
                              </div>
                            )}

                            {v.summary.tmn < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.tmn)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.tmn)}
                              </div>
                            )}

                            <div className=" ">Last Month</div>
                            {v.summary.lms < 0 ? (
                              <div
                                className="text-right  mb-1"
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lms)})
                              </div>
                            ) : (
                              <div className="text-right  mb-1">
                                {moneyFormat(v.summary.lms)}
                              </div>
                            )}

                            {v.summary.lmr < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lmr)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.lmr)}
                              </div>
                            )}

                            {v.summary.lmn < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lmn)})
                              </div>
                            ) : (
                              <div className="text-right ">
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
                        <PeriodLocationTrialCard
                          business_id={v.store.businessInfo.businessId}
                          id={v.store.businessInfo.businessId}
                          location={v.store}
                          storeName={v.store.name} // heading
                          storeId={v.store.id}
                          storeBussinessInfoStreet={v.store.businessInfo.street}
                          storeBussinessInfoCity={v.store.businessInfo.city}
                          storeBussinessInfoLocality={v.store.businessIn}
                          storeBussinessInfoXipPostal={
                            v.store.businessInfo.zipPostal
                          }
                          storeSoftwareName={v.store.sofwareName}
                          storeStatusMsg={v.store.statusMsg}
                          storeTerminalsLength={v.store.terminals.length}
                          storeLastUpdate={v.store.lastUpdate}
                          storeLocality={v.store.businessInfo.locality}
                        />

                        <div className=" bg-[#F3F3F3] py-0.75 rounded-lg -mt-4 px-1 sm:px-1">
                          <div className="grid grid-cols-4 text-xs sm:text-sm">
                            <div className="font-bold">Period</div>
                            <div className="text-right font-bold ">Sales</div>
                            <div className="text-right font-bold ">Redeem</div>
                            <div className="text-right font-bold ">Net</div>
                          </div>

                          <div className="grid grid-cols-4 text-[11px] sm:text-xs">
                            <div className=" ">Today</div>

                            {v.summary.cds < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cds)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.cds)}
                              </div>
                            )}

                            {v.summary.cdr < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cdr)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.cdr)}
                              </div>
                            )}

                            {v.summary.cdn < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cdn)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.cdn)}
                              </div>
                            )}

                            <div className=" ">This Week</div>
                            {v.summary.cws < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cws)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.cws)}
                              </div>
                            )}

                            {v.summary.cwr < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cwr)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.cwr)}
                              </div>
                            )}

                            {v.summary.cwn < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.cwn)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.cwn)}
                              </div>
                            )}

                            <div className=" ">Last Week</div>
                            {v.summary.lws < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lws)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.lws)}
                              </div>
                            )}

                            {v.summary.lwr < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lwr)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.lwr)}
                              </div>
                            )}

                            {v.summary.lwn < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lwn)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.lwn)}
                              </div>
                            )}

                            <div className=" ">This Month</div>
                            {v.summary.tms < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.tms)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.tms)}
                              </div>
                            )}

                            {v.summary.tmr < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.tmr)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.tmr)}
                              </div>
                            )}

                            {v.summary.tmn < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.tmn)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.tmn)}
                              </div>
                            )}

                            <div className="  mb-1">Last Month</div>
                            {v.summary.lms < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lms)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.lms)}
                              </div>
                            )}

                            {v.summary.lmr < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lmr)})
                              </div>
                            ) : (
                              <div className="text-right ">
                                {moneyFormat(v.summary.lmr)}
                              </div>
                            )}

                            {v.summary.lmn < 0 ? (
                              <div
                                className="text-right "
                                style={{ color: "red" }}
                              >
                                ({moneyFormat(v.summary.lmn)})
                              </div>
                            ) : (
                              <div className="text-right ">
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
        </div>
      </div>
      <footer></footer>
    </>
  );
}

export default PeriodReport;
