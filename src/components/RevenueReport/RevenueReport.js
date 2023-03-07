import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { token } from "../../utils/config";
import BusinessCard from "./BusinessCard";
import RevenueCard from "./RevenueCard";
import Tooltip from "@mui/material/Tooltip";
import ButtonNavigation from "../../ButtonNavigation";
import moment from "moment";
import { addDays, endOfWeek, getWeek, getYear, startOfWeek } from "date-fns";
import { Box, CircularProgress } from "@material-ui/core";
import { getDay } from "date-fns";

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

function RevenueReport() {
  //   console.log("REVENUE REPORT");
  const location = useLocation();
  const { state } = location;
  console.log("SS:", state);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  // const [active, setActive] = useState(
  //   JSON.parse(localStorage.getItem("overviewActive")) && true
  // );
  const [active, setActive] = useState(
    state?.isActive === false ? false : true
  );

  const [isapicalled, seIsApiCalled] = useState(false);
  const [businessArr, setBusinessArr] = useState([]); //initialy we have declared an business array that is empty
  const [locationArr, setLocationArr] = useState([]); //initialy we have declared an location array that is empty
  const [summary, setSummary] = useState([]);
  const [selecteddate, setSelecetedDate] = useState("");
  const [endDate, setEndDate] = useState();
  const [cStart, setCStart] = useState();
  const [cEnd, setCEnd] = useState();
  const [week, setWeek] = React.useState(moment(new Date()).isoWeek());
  const [weekk, setWeekk] = React.useState(new Date());
  const [valueDat, setValue] = useState(new Date());
  const [activeCalTab, setActiveCalTab] = useState("week");
  const [month, setMonth] = useState(new Date());

  const [year, setYear] = useState(getYear(new Date()));
  const [date, setDate] = useState(new Date());
  const [startRange, getStartRange] = useState(
    moment(`${year}`).add(moment(date).isoWeek(), "weeks").startOf("isoweek")
  );
  const [endRange, getendRange] = useState(
    moment(`${year}`)
      .add(moment(new Date()).isoWeek(), "weeks")
      .endOf("isoweek")
  );
  const [revenueCard, setRevenueCard] = useState(true);
  const [businessCard, setBusinessCard] = useState(true);
  const [locationCard, setLocationCard] = useState(true);
  const navigate = useNavigate();
  const [monthYear, setMonthYear] = useState();
  const a = state === null ? "" : state.business?.businessInfo.businessId;
  const [businessId, setBusinessid] = useState(a === "" ? null : a);
  // const statee = state?.location?.id ? state.location.id : state?.store_id;
  const statee = localStorage.getItem("storeId")
    ? localStorage.getItem("storeId")
    : state?.location?.id;
  const b = state === null ? "" : statee;
  const [locationId, setLocationid] = useState(b === "" ? null : b);
  const [loading, Setloading] = useState(true);

  const FetchApibusData = (data) => {
    if (active) {
      console.log("if block");
      setBusinessArr(data.businessRevenueReport);
      setSummary(data.totalSummary);
      seIsApiCalled(true);
    } else {
      console.log("else block");
      setLocationArr(data.revenueReport);
      setSummary(data.totalSummary);
      seIsApiCalled(true);
    }
    window.addEventListener("scroll", checkScrollTop2);
  };

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (window.scrollY > 10) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

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

  window.addEventListener("scroll", checkScrollTop);

  const businessClicked = () => {
    setActive(true);
    localStorage.setItem("revenueActive", true);
    setBusinessCard(false);
    setRevenueCard(false);
    setLocationCard(false);
    setLocationArr([]);
    setBusinessid(null);
  };
  const locationClicked = () => {
    setActive(false);
    localStorage.setItem("revenueActive", false);
    setBusinessCard(false);
    setRevenueCard(false);
    setLocationArr(false);
    setLocationCard(false);
  };

  // console.log("firs", businessId, locationId);

  return (
    <>
      <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
        <div className="text-left w-fit ">
          <ButtonNavigation />
        </div>
        <div className="text-center  ">
          <p className="text-center font-bold text-sm sm:text-lg md:text-lg ">
            Revenue Report
          </p>
        </div>
        <div className={`text-right ${showScroll ? "visible" : "invisible"}`}>
          <button
            type="button"
            className="inline-block text-sm font-semibold pr-2 px-4 py-2 leading-none rounded hover:text-white hover:bg-black mt-0 transition duration-300 ease-in-out "
            onClick={scrollTop}
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

      <div className="inputs w-full p-2 mt-4 sm:p-6 sm:mt-0 mx-auto">
        <div className="flex flex-wrap justify-center -mx-3 mb-6">
          <div className="w-full max-w-[800px] px-3 mb-6 -mt-4">
            <div className="flex justify-around rounded-full py-3 mt-12">
              <div
                className={`border border-[#000000] w-full border-r-0 text-center p-2 rounded-l-lg text-md font-bold pointer ${
                  active ? "bg-[#7F99CC] text-white " : ""
                }`}
                onClick={() => {
                  businessClicked();
                }}
              >
                Business
              </div>
              <div
                className={`border border-[#000000] text-md w-full text-center p-2 rounded-r-lg font-bold ${
                  !active ? "bg-[#7F99CC] text-white " : ""
                }`}
                onClick={() => {
                  locationClicked();
                }}
              >
                Location
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <BusinessCard
                active={active}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
                data={FetchApibusData}
                start={setSelecetedDate}
                enddate={setEndDate}
                getStartRange={getStartRange}
                getendRange={getendRange}
                setRevenueCard={setRevenueCard}
                setBusinessCard={setBusinessCard}
                setLocationCard={setLocationCard}
                setMonthYear={setMonthYear}
                week={week}
                setWeek={setWeek}
                setCStart={setCStart}
                setCEnd={setCEnd}
                value={valueDat}
                setValue={setValue}
                activeCalTab={activeCalTab}
                setActiveCalTab={setActiveCalTab}
                month={month}
                setMonth={setMonth}
                setWeekk={setWeekk}
                weekk={weekk}
                setBusinessid={setBusinessid}
                businessId={businessId}
                Setloading={Setloading}
                locationId={locationId}
                setLocationid={setLocationid}
                // setActive={setActive}
              />
              <RevenueCard
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                data={isapicalled}
                summary={summary}
                business={businessArr}
                start={selecteddate}
                enddate={endDate}
                startRange={startRange}
                endRange={endRange}
                revenueCard={revenueCard}
                monthYear={monthYear}
                active={active}
                week={week}
                cStart={cStart}
                cEnd={cEnd}
                value={valueDat}
                activeCalTab={activeCalTab}
                month={month}
                setMonth={setMonth}
                loading={loading}
                // B_name ={businessArr.length === 0 ||businessArr.length === 40 ?"" : businessArr[0].business.businessInfo.name}
                B_name={
                  businessArr.length === 1
                    ? businessArr[0].business.businessInfo.name
                    : ""
                }
                L_name={
                  locationArr.length === 1 ? locationArr[0].store.name : ""
                }
              />

              {loading ? (
                <>
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
                  {active ? (
                    <>
                      <>
                        {businessCard ? (
                          <>
                            {businessArr.length > 0 && (
                              <div className="-mt-8 font-semibold text-lg">
                                Details
                                <br />
                                <div className="flex text-xs">
                                  {activeCalTab === "day" ? (
                                    <span>
                                      {moment(valueDat).format(
                                        "ddd MMMM DD YYYY"
                                      )}
                                    </span>
                                  ) : activeCalTab === "week" ? (
                                    `Week ${week}: ${
                                      startRange
                                        ? moment(startRange).format(
                                            "ddd MMMM DD YYYY"
                                          )
                                        : ""
                                    } ${
                                      endRange
                                        ? ` to ${moment(endRange).format(
                                            "ddd MMMM DD YYYY"
                                          )}`
                                        : ""
                                    }`
                                  ) : activeCalTab === "month" ? (
                                    <span>
                                      {month
                                        ? moment(month).format("MMMM YYYY")
                                        : ""}
                                    </span>
                                  ) : activeCalTab === "custom" ? (
                                    ` ${
                                      cStart
                                        ? moment(cStart).format(
                                            "ddd MMMM DD YYYY"
                                          )
                                        : ""
                                    } ${
                                      cEnd
                                        ? ` to ${moment(cEnd).format(
                                            "ddd MMMM DD YYYY"
                                          )}`
                                        : ""
                                    }`
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            )}
                            {businessArr.length > 0 && (
                              <>
                                {businessArr.map((item) => (
                                  <>
                                    <div className="">
                                      <div
                                        className={` border ${" bg-[#F3F3F3] border-[#b4a9a9]"} px-1 py-3 rounded-lg -mt-3 `}
                                      >
                                        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 ">
                                          <div className=" col-span-2 md:col-span-2 text-left font-semibold text-md truncate">
                                            {item.business.businessInfo.name}
                                          </div>
                                          <div className="text-right font-semibold text-xs sm:text-sm">
                                            Sales
                                          </div>
                                          <div className="text-right font-semibold hidden sm:table-cell text-xs sm:text-sm">
                                            Redeem
                                          </div>
                                          <div className="text-right font-semibold sm:table-cell md:mr-[-1px] text-xs sm:text-sm ">
                                            Net
                                          </div>
                                          <div className="md:px-12 sm:px-6 text-left font-semibold hidden sm:table-cell text-xs sm:text-sm">
                                            Status
                                          </div>
                                          <div className="text-right font-semibold hidden sm:table-cell text-xs sm:text-sm">
                                            Updated
                                          </div>
                                        </div>

                                        <div className="text-[11px] sm:text-xs">
                                          {item.revenueReport.map(
                                            (data, index) =>
                                              index % 2 == 0 ? (
                                                <div className="bg-[#F9F9F9] text-xs grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 py-1">
                                                  <div className="col-span-2  md:col-span-2 text-left text-[11px] sm:text-xs ">
                                                    {data.store.id}{" "}
                                                    {data.store.sofwareName}
                                                  </div>

                                                  {data.summary.s < 0 ? (
                                                    <>
                                                      {" "}
                                                      <div
                                                        className=" text-right text-[11px] sm:text-xs"
                                                        style={{ color: "red" }}
                                                      >
                                                        (
                                                        {moneyFormat(
                                                          data.summary.s
                                                        )}
                                                        )
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <div className=" text-right text-[11px] sm:text-xs">
                                                        {moneyFormat(
                                                          data.summary.s
                                                        )}
                                                      </div>
                                                    </>
                                                  )}

                                                  {data.summary.r < 0 ? (
                                                    <>
                                                      {" "}
                                                      <div
                                                        className="text-right text-[11px] sm:text-xs hidden sm:table-cell"
                                                        style={{ color: "red" }}
                                                      >
                                                        (
                                                        {moneyFormat(
                                                          data.summary.r
                                                        )}
                                                        )
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <>
                                                      {" "}
                                                      <div className="text-right text-[11px] sm:text-xs hidden sm:table-cell">
                                                        {moneyFormat(
                                                          data.summary.r
                                                        )}
                                                      </div>
                                                    </>
                                                  )}
                                                  {data.summary.n < 0 ? (
                                                    <>
                                                      {" "}
                                                      <div
                                                        className="text-right text-[11px] sm:text-xs sm:table-cell md:mr-[-2px] "
                                                        style={{
                                                          color: "red",
                                                        }}
                                                      >
                                                        (
                                                        {moneyFormat(
                                                          data.summary.n
                                                        )}
                                                        )
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <>
                                                      {" "}
                                                      <div className="text-right text-[11px] sm:text-xs sm:table-cell md:mr-[-2px]">
                                                        {moneyFormat(
                                                          data.summary.n
                                                        )}
                                                      </div>
                                                    </>
                                                  )}
                                                  <div className="md:px-12 sm:px-6 text-left text-[11px] sm:text-xs hidden sm:table-cell">
                                                    {data.store.statusMsg}
                                                  </div>
                                                  <div className="text-right ml-[-80px] text-[11px] sm:text-xs hidden sm:table-cell truncate ">
                                                    {data.lastUpdate.slice(2)}
                                                  </div>
                                                </div>
                                              ) : (
                                                <div className="text-xs grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7">
                                                  <div className="text-left col-span-2 md:col-span-2 text-[11px] sm:text-xs ">
                                                    {data.store.id}{" "}
                                                    {data.store.sofwareName}
                                                  </div>
                                                  {data.summary.s < 0 ? (
                                                    <>
                                                      {" "}
                                                      <div
                                                        className="text-right text-[11px] sm:text-xs"
                                                        style={{ color: "red" }}
                                                      >
                                                        (
                                                        {moneyFormat(
                                                          data.summary.s
                                                        )}
                                                        )
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <div className="text-right text-[11px] sm:text-xs">
                                                        {moneyFormat(
                                                          data.summary.s
                                                        )}
                                                      </div>
                                                    </>
                                                  )}

                                                  {data.summary.r < 0 ? (
                                                    <>
                                                      {" "}
                                                      <div
                                                        className="text-right text-[11px] sm:text-xs hidden sm:table-cell"
                                                        style={{ color: "red" }}
                                                      >
                                                        (
                                                        {moneyFormat(
                                                          data.summary.r
                                                        )}
                                                        )
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <>
                                                      {" "}
                                                      <div className="text-right text-[11px] sm:text-xs hidden sm:table-cell">
                                                        {moneyFormat(
                                                          data.summary.r
                                                        )}
                                                      </div>
                                                    </>
                                                  )}
                                                  {data.summary.n < 0 ? (
                                                    <>
                                                      {" "}
                                                      <div
                                                        className="text-right text-[11px] sm:text-xs md:mr-[-2px]"
                                                        style={{
                                                          color: "red",
                                                        }}
                                                      >
                                                        (
                                                        {moneyFormat(
                                                          data.summary.n
                                                        )}
                                                        )
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <>
                                                      {" "}
                                                      <div className="text-[11px] sm:text-xs text-right md:mr-[-2px] ">
                                                        {moneyFormat(
                                                          data.summary.n
                                                        )}
                                                      </div>
                                                    </>
                                                  )}
                                                  <div className="md:px-12 sm:px-6 text-left text-[11px] sm:text-xs hidden sm:table-cell ">
                                                    {data.store.statusMsg}
                                                  </div>
                                                  <div className="text-right ml-[-80px] text-[11px] sm:text-xs hidden sm:table-cell truncate">
                                                    {data.lastUpdate.slice(2)}
                                                  </div>
                                                </div>
                                              )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    </>
                  ) : (
                    <>
                      {locationCard ? (
                        <>
                          {locationArr.length > 0 ? (
                            <>
                              <div className="-mt-8 font-semibold text-lg">
                                Details
                                <br />
                                <div className="flex text-xs">
                                  {activeCalTab === "day" ? (
                                    <span>
                                      {moment(valueDat).format(
                                        "ddd MMMM DD YYYY"
                                      )}
                                    </span>
                                  ) : activeCalTab === "week" ? (
                                    `Week ${week}: ${
                                      startRange
                                        ? moment(startRange).format(
                                            "ddd MMMM DD YYYY"
                                          )
                                        : ""
                                    } ${
                                      endRange
                                        ? ` to ${moment(endRange).format(
                                            "ddd MMMM DD YYYY"
                                          )}`
                                        : ""
                                    }`
                                  ) : activeCalTab === "month" ? (
                                    <span>
                                      {month
                                        ? moment(month).format("MMMM YYYY")
                                        : ""}
                                    </span>
                                  ) : activeCalTab === "custom" ? (
                                    ` ${
                                      cStart
                                        ? moment(cStart).format(
                                            "ddd MMMM DD YYYY"
                                          )
                                        : ""
                                    } ${
                                      cEnd
                                        ? ` to ${moment(cEnd).format(
                                            "ddd MMMM DD YYYY"
                                          )}`
                                        : ""
                                    }`
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className=" ">
                                <div
                                  className={` border ${" bg-[#F3F3F3] border-[#b4a9a9]"} px-1 py-3 rounded-lg -mt-3 `}
                                >
                                  <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 text-xs sm:text-sm">
                                    <div className="text-left font-semibold">
                                      Location
                                    </div>
                                    <div className="text-left font-semibold pl-10 sm:pl-10 px-3.75    ">
                                      Product
                                    </div>
                                    <div className="text-right font-semibold md:mr-[-0.25px] mr-[2px] ">
                                      Sales
                                    </div>

                                    <div className="text-right font-semibold hidden md:mr-[2.49px] sm:table-cell ">
                                      Redeem
                                    </div>
                                    <div className="text-right font-semibold mr-[0px] md:mr-[1px] ">
                                      Net
                                    </div>
                                    <div className="md:px-12 sm:px-6 text-left font-semibold hidden sm:table-cell">
                                      Status
                                    </div>
                                    <div className="text-right font-semibold hidden sm:table-cell ">
                                      Updated
                                    </div>
                                  </div>

                                  <div className="text-[11px] sm:text-xs">
                                    {locationArr.map((item, index) =>
                                      index % 2 == 0 ? (
                                        <div className="bg-[#F9F9F9] text-[11px] sm:text-xs grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7  ">
                                          <Tooltip
                                            title={item.store.name}
                                            placement="bottom"
                                          >
                                            <div className="text-left text-[11px] sm:text-xs truncate">
                                              {item.store.name}
                                            </div>
                                          </Tooltip>

                                          <div className="text-left text-[11px] sm:text-xs pl-10 md:pl-10 px-3.75 truncate  ">
                                            {item.store.sofwareName}
                                          </div>
                                          {/* </Tooltip> */}
                                          {item.summary.s < 0 ? (
                                            <>
                                              {" "}
                                              <div
                                                className=" text-right text-[11px] sm:text-xs md:mr-[-0.25px] mr-[2px] "
                                                style={{ color: "red" }}
                                              >
                                                ({moneyFormat(item.summary.s)})
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className=" text-right text-[11px] sm:text-xs md:mr-[-0.25px] mr-[2px] ">
                                                {moneyFormat(item.summary.s)}
                                              </div>
                                            </>
                                          )}
                                          {item.summary.r < 0 ? (
                                            <>
                                              {" "}
                                              <div
                                                className="text-right text-[11px] sm:text-xs hidden md:mr-[2.49px] sm:table-cell"
                                                style={{ color: "red" }}
                                              >
                                                ({moneyFormat(item.summary.r)})
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              {" "}
                                              <div className="text-right text-[11px] sm:text-xs hidden md:mr-[2.49px] sm:table-cell">
                                                {moneyFormat(item.summary.r)}
                                              </div>
                                            </>
                                          )}
                                          {item.summary.n < 0 ? (
                                            <>
                                              {" "}
                                              <div
                                                className="text-right text-[11px] sm:text-xs mr-[0px] md:mr-[1px] "
                                                style={{ color: "red" }}
                                              >
                                                ({moneyFormat(item.summary.n)})
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              {" "}
                                              <div className="text-right text-[11px] sm:text-xs mr-[0px]  md:mr-[1px] ">
                                                {moneyFormat(item.summary.n)}
                                              </div>
                                            </>
                                          )}
                                          <div className="md:px-12 sm:px-6 text-left text-[11px] sm:text-xs hidden sm:table-cell">
                                            {item.store.statusMsg}
                                          </div>
                                          <div className="text-right sm:ml-[-80px] text-[11px] sm:text-xs hidden sm:table-cell truncate">
                                            {item.lastUpdate.slice(2)}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="text-[11px] sm:text-xs grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7">
                                          <Tooltip
                                            title={item.store.name}
                                            placement="bottom"
                                          >
                                            <div className="text-left text-[11px] sm:text-xs truncate">
                                              {item.store.name}
                                            </div>
                                          </Tooltip>
                                          <div className="text-left text-[11px] sm:text-xs pl-10 md:pl-10 px-3.75 truncate">
                                            {item.store.sofwareName}
                                          </div>
                                          {item.summary.s < 0 ? (
                                            <>
                                              {" "}
                                              <div
                                                className="text-right text-[11px] sm:text-xs md:mr-[-0.25px] mr-[2px]"
                                                style={{ color: "red" }}
                                              >
                                                ({moneyFormat(item.summary.s)})
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="text-right text-[11px] sm:text-xs md:mr-[-0.25px] mr-[2px]">
                                                {moneyFormat(item.summary.s)}
                                              </div>
                                            </>
                                          )}

                                          {item.summary.r < 0 ? (
                                            <>
                                              {" "}
                                              <div
                                                className="text-right text-[11px] sm:text-xs hidden md:mr-[2.49px] sm:table-cell"
                                                style={{ color: "red" }}
                                              >
                                                ({moneyFormat(item.summary.r)})
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              {" "}
                                              <div className="text-right text-[11px] sm:text-xs hidden md:mr-[2.49px] sm:table-cell">
                                                {moneyFormat(item.summary.r)}
                                              </div>
                                            </>
                                          )}
                                          {item.summary.n < 0 ? (
                                            <>
                                              {" "}
                                              <div
                                                className="text-right text-[11px] sm:text-xs mr-[0px] md:mr-[1px] "
                                                style={{ color: "red" }}
                                              >
                                                ({moneyFormat(item.summary.n)})
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              {" "}
                                              <div className="text-right mr-[0px] md:mr-[1px] ">
                                                {moneyFormat(item.summary.n)}
                                              </div>
                                            </>
                                          )}
                                          <div className="md:px-12 sm:px-6 text-left text-[11px] sm:text-xs hidden sm:table-cell ">
                                            {item.store.statusMsg}
                                          </div>
                                          <div className="text-right ml-[-80px] text-[11px] sm:text-xs hidden sm:table-cell truncate">
                                            {item.lastUpdate.slice(2)}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
}

export default RevenueReport;
