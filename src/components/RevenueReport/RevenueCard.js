import React from "react";
import axios from "axios";
import { URL, config, token } from "../../utils/config";
import moment from "moment";
import { addDays, format } from "date-fns";
import { Box, CircularProgress } from "@material-ui/core";

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

function RevenueCard({
  data,
  summary,
  selectedYear,
  selectedMonth,
  start,
  enddate,
  startRange,
  endRange,
  revenueCard,
  active,
  week,
  cStart,
  cEnd,
  value,
  activeCalTab,
  monthYear,
  month,
  valueDat,
  B_name,
  L_name,
  B_namee,
  loading,
}) {
  console.log(
    "Revenue Card",
    start,
    enddate,
    selectedYear,
    selectedMonth,
    data,
    startRange,
    endRange,
    active
  );
  console.log("klrmklgklrt---", startRange, endRange);
  console.log("klrmklgklrt", start, enddate);
  console.log("Value:::", L_name);
  console.log("summary", summary);

  console.log("B & L", B_name, L_name);
  if (start && !startRange && !endRange) {
    console.log("IF");
    console.log("For Day/Month :)");
    console.log("LLLLLLL", start, enddate);
    var a = addDays(new Date(start), 1);
    // var startdate = format(new Date(a), "ccc MMMM dd,yyyy");
    // var monthYear = format(new Date(a), "MMMM,yyyy");
    // var enddatee = format(new Date(enddate), "ccc MMMM-dd-yyyy");
  } else if (start && enddate) {
    console.log("For Month/Custom");
    console.log("LLLLLLL", start, enddate);
    var a = addDays(new Date(start), 1);
    var b = addDays(new Date(enddate), 1);
    var startdate = format(new Date(a), "ccc MMMM dd,yyyy");
    var enddate = format(new Date(b), "ccc MMMM dd,yyyy");
  } else if (start && startRange && endRange) {
    console.log("ELSE");
    console.log("For Week");
    console.log("FFFFFFF::", startRange, endRange);
    console.log("GGGGGGG", moment(startRange, "MM-DD-YYYY"));
    // var a = addDays(new Date(startRange), 2);
    // var b = addDays(new Date(endRange), 2);
    // var startdate = format(new Date(a), "ccc MMMM dd,yyyy");
    // var enddate = format(new Date(b), "ccc MMMM dd,yyyy");
    // console.log("Result start/end date:", startdate, enddate);
  } else {
    console.log("ElSE CALLED");
    // var startdate = format(new Date(start), "ccc MMMM dd,yyyy");
    // var enddate = format(new Date(enddate), "ccc MMMM dd,yyyy");
  }
  console.log("TAB CAL:", activeCalTab);

  return (
    <div>
      {loading ? (
        <></>
      ) : (
        <>
          {revenueCard ? (
            <>
              {data ? (
                <>
                  {" "}
                  <h1 className="-mt-3 font-semibold text-xl">
                    {/* {active ? "All Businessssss" : "All Locations"} */}
                    {B_name !== "" && active ? B_name : ""}
                    {B_name === "" && active ? "All Businesses" : ""}
                    {/* {B_name === "American Legion Post 1" && active && B_namee  ? "American Legion Post 1": ""} */}
                    {L_name !== "" && !active ? L_name : ""}
                    {L_name === "" && !active ? "All Locations" : ""}

                    {/* {L_name === null  ? L_name: "All Locations"} */}

                    <div>
                      {/* <h2 className="font-semibold text-lg "></h2> */}

                      <div className="flex text-xs">
                        {activeCalTab === "day" ? (
                          <span>
                            {" "}
                            {moment(value ? value : valueDat).format(
                              "ddd MMMM DD YYYY"
                            )}
                          </span>
                        ) : activeCalTab === "week" ? (
                          `Week ${week}: ${
                            startRange
                              ? moment(startRange).format("ddd MMMM DD YYYY")
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
                            {month ? moment(month).format("MMMM YYYY") : ""}
                          </span>
                        ) : activeCalTab === "custom" ? (
                          ` ${
                            cStart
                              ? moment(cStart).format("ddd MMMM DD YYYY")
                              : ""
                          } ${
                            cEnd
                              ? ` to ${moment(cEnd).format("ddd MMMM DD YYYY")}`
                              : ""
                          }`
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <br />
                    {/* <small>
                  {enddate ? startdate + " to " + enddate : startdate}
                </small> */}
                  </h1>
                  <h6>{/* {selectedMonth} {selectedYear} */}</h6>
                  <div
                    className={`border ${" bg-[#D1E0FF] border-[#6598FF]"} rounded-md md:px-1 px-1 py-2 `}
                  >
                    <div className="">
                      <div className=" rounded-lg">
                        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 ">
                          <div className="font-semibold text-xs sm:text-sm ">
                            Summary
                          </div>
                          <div className="text-right font-semibold "></div>
                          <div className="text-right font-semibold text-xs sm:text-sm ">
                            Sales
                          </div>
                          {/* <div className="text-right font-semibold "></div> */}
                          <div className="text-right font-semibold hidden sm:table-cell text-xs sm:text-sm">
                            Redeem
                          </div>
                          <div className="text-right font-semibold sm:table-cell text-xs sm:text-sm ">
                            Net
                          </div>
                          <div className="text-right font-semibold "></div>
                          <div className="text-right font-semibold "></div>
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 text-[11px] sm:text-xs">
                          <div className="">Total:</div>
                          <div></div>
                          {summary.s < 0 ? (
                            <div
                              className="text-right text-[11px] sm:text-xs"
                              style={{ color: "red" }}
                            >
                              ({moneyFormat(summary.s)})
                            </div>
                          ) : (
                            <div className="text-right text-[11px] sm:text-xs">
                              {moneyFormat(summary.s)}
                            </div>
                          )}

                          {summary.r < 0 ? (
                            <div
                              className="text-right text-[11px] sm:text-xs hidden sm:table-cell"
                              style={{ color: "red" }}
                            >
                              ({moneyFormat(summary.r)})
                            </div>
                          ) : (
                            <div className="text-right text-[11px] sm:text-xs hidden sm:table-cell">
                              {moneyFormat(summary.r)}
                            </div>
                          )}

                          {summary.n < 0 ? (
                            <div
                              className="text-right sm:table-cell text-[11px] sm:text-xs"
                              style={{ color: "red" }}
                            >
                              ({moneyFormat(summary.n)})
                            </div>
                          ) : (
                            <div className="text-right sm:table-cell text-[11px] sm:text-xs">
                              {moneyFormat(summary.n)}
                            </div>
                          )}
                        </div>

                        {/* <div className="grid grid-cols-7">
                  <div className=" text-sm">5555</div>
                  <div className=" text-sm"></div>
                  <div className="text-right text-sm">5555555</div>
                  <div className="text-right text-sm">$5555555555</div>
                  <div className="text-right text-sm">5555</div>
                </div> */}
                      </div>
                    </div>
                  </div>
                  <br />
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
    </div>
  );
}

export default RevenueCard;
