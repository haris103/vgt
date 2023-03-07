import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TrialCard from "../Overview/TrialCard";
import LocationTrialCard from "../Overview/LocationTrialCard";
import { URL, config, token } from "../../../src/utils/config";
import axios from "axios";

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

function OverviewApi() {
  const [active, setActive] = useState(true);
  const [businessdata, setBusinessData] = useState([]);
  const [locationdata, setLocationData] = useState([]);
  const [totalBusinessCount, setTotalBusinessCount] = useState(0);
  const [totalStoreCount, setTotalStoreCount] = useState(0);
  const [totalTerminalCount, setTotalTerminalCount] = useState(0);
  const [totalAlertCount, SetTotalAlertCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  // useEffect(() => {
  //   try {
  //     async function pullSummaryData() {
  //       const { data } = await axios.post(
  //         //`${URL}/api/Store/GetBusinessAndLocations`,
  //         `${URL}/api/Business/GetOverView`,
  //         config
  //       );
  //       const response = data.data.overView;
  //       const { businesses, stores } = response;
  //       setBusinessData(businesses);
  //       setLocationData(stores);
  //       console.log("business data is", businesses);
  //       console.log("store/location data is", stores);
  //     }
  //     pullSummaryData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  useEffect(() => {
    try {
      async function pullSummaryData() {
        const { data } = await axios.post(
          `${URL}/api/Business/GetOverView?_page=${locationdata}&_limit=10`,
          config
        );
        const response = data.data.overView;
        console.log("the response is", response);

        const {
          businesses,
          stores,
          totalBusinessCount,
          totalStoreCount,
          totalTerminalCount,
          totalAlertCount,
        } = response;
        setBusinessData(businesses);
        setLocationData(stores);
        setTotalBusinessCount(totalBusinessCount);
        setTotalStoreCount(totalStoreCount);
        setTotalTerminalCount(totalTerminalCount);
        SetTotalAlertCount(totalAlertCount);
        console.log("business data is", businesses);
        console.log("store/location data is", stores);
      }
      pullSummaryData();
    } catch (error) {
      console.log(error);
    }
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

  window.addEventListener("scroll", checkScrollTop);

  return (
    <>
      <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
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
          <p className="text-center font-bold text-lg ">Overview</p>
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
        <>
          {locationdata
            ? locationdata?.map((v, k) => (
                <div>
                  {/* <p className="font-bold">{v.overView.totalBusinessCount} </p> */}
                </div>
              ))
            : "Loading.."}
        </>

        <div className=" px-2 flex justify-between md mb-1">
          <div>
            <span className="text-sm font-bold">
              {totalBusinessCount === 0 ? "Loading.." : totalBusinessCount}{" "}
            </span>
            <span className=" text-sm">Businesses</span>
          </div>
          <div>
            <span className="text-sm font-bold">
              {totalStoreCount === 0 ? "Loading.." : totalStoreCount}{" "}
            </span>
            <span className="text-sm ">
              Locations
              {/* <span className="text-[#EE0000]"> (0 Alert)</span> */}
            </span>
          </div>
          <div className="">
            <span className="text-sm font-bold ">
              {" "}
              {totalTerminalCount === 0 ? "Loading.." : totalTerminalCount}{" "}
            </span>
            <span className="text-sm">Terminals</span>
          </div>
        </div>

        <div className="grid  grid-cols-1 gap-5">
          {active ? (
            <>
              {businessdata
                ? businessdata.map(
                    (v, k) => (
                      console.log("item is", v),
                      (
                        <TrialCard
                          business={v}
                          heading={v.businessInfo.name}
                          id={v.stores[0].id}
                          mainphone={v.businessInfo.phone}
                          secondaryphone={
                            v.businessInfo.secondaryPhone == ""
                              ? v.businessInfo.phone
                              : v.businessInfo.secondaryPhone
                          }
                          alert={v.alert}
                          detail={v.detail}
                          houseNumber={v.businessInfo.street}
                          address={`${v.businessInfo.city},
                        ${v.businessInfo.locality}
                        ${v.businessInfo.zipPostal}`}
                          stores={v.stores}
                        />
                      )
                    )
                  )
                : "Loading.."}
            </>
          ) : (
            <>
              {locationdata
                ? locationdata?.map((v, k) => (
                    <LocationTrialCard
                      heading={v.name} //when we will access store data we will use array index cz store is an array.
                      mainphone={v.businessInfo.phone}
                      secondaryphone={
                        v.businessInfo.secondaryPhone == ""
                          ? v.businessInfo.phone
                          : v.businessInfo.secondaryPhone
                      }
                      //     alert={v.alert}
                      //     detail={v.detail}
                      houseNumber={v.businessInfo.street}
                      address={`${v.businessInfo.city},
                  ${v.businessInfo.locality}
                  ${v.businessInfo.zipPostal}`}
                      sweeps={v.sofwareName}
                      time={v.statusMsg}
                      terminal={v.terminals.length}
                    />
                  ))
                : "Loading.."}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OverviewApi;
