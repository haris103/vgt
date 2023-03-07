import { React, useState, useEffect } from "react";

import { Box, CircularProgress } from "@material-ui/core";
// import dotIcon from "./../images/icons/dot.svg";
import { URL, token, config } from "../../utils/config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SingleTerminal from "./SingleTerminalApi";
import BusinessTerminals from "./BusinessTerminals";
import { useLocation } from "react-router-dom";
// import { closestIndexTo } from "date-fns/esm";
// import MenuButton from "../Overview/MenuButton";
import MenuButtonTerminals from "./MenuButtonTerminals";
// import game from "../../images/game.png";
import pos from "../../images/pos.png";
// import recharge from "../../images/recharge.png";
import redemption from "../../images/redemption.png";
import server from "../../images/server.png";
import warning from "../../images/warning.png";
import MenuButtonTerminal from "./MenuButtonTerminal";
import ButtonNavigation from "../../ButtonNavigation";
import { useParams } from "react-router-dom";
import main from "../../images/one.png";
import secondary from "../../images/two.png";

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

const Terminalapi = () => {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  console.log("State of Terminalapi.js is: ", state);
  // console.log("terminal id ", id);

  const [terminalData, setTerminalData] = useState([]);
  const [activeItem, setActiveItem] = useState(localStorage.getItem("storeId"));
  const [selected, setSelected] = useState();
  const [testdata, setTestData] = useState([]);
  const [businesslist, setBusinessList] = useState([]);
  // const [active, setActive] = useState(
  //   JSON.parse(localStorage.getItem("active")) && true
  // );
  const [active, setActive] = useState(
    JSON.parse(localStorage.getItem("activeItem"))
  );
  const [showselect, setshowselect] = useState(true);
  const [loading, Setloading] = useState(true);
  const [terminalLoading, setTerminalLoading] = useState(false);
  const [locationloading, setLocationLoading] = useState(false);
  const [businessId, setBusinessid] = useState(
    state?.businessInfo ? state.businessInfo.businessId : ""
  );
  const [buinessdata, setBusinessdata] = useState();
  const [businessDataNav, setBusinessDataNav] = useState([]);
  const [bData, setBData] = useState();
  const [locationdata, setLocationData] = useState();
  const [locationbasic, setlocationBasic] = useState();
  const [locationList, setLocationList] = useState([]);
  const [locationid, setlocationid] = useState(
    state?.locationState ? state.locationState.id : ""
  );
  const [dataId, setDataID] = useState("");
  const [locationName, setLocationName] = useState("");
  const [terminalbasename, setTerminalBaseName] = useState("");
  const [activeT, SetActiveT] = useState("");

  const navigate = useNavigate;

  //calling api
  useEffect(() => {
    try {
      async function getbusinessData() {
        const localBusinessID = JSON.parse(localStorage.getItem("businessId"));
        if (localBusinessID === 111 || localBusinessID === null) {
          const { data } = await axios.post(
            `${URL}/api/Business/GetAllBusiness`
          );
          setBusinessList(data.data.allBusiness);
          console.log("my business. data is", data.data.allBusiness);
        }
        if (
          JSON.parse(localStorage.getItem("locationId")) === 111 ||
          JSON.parse(localStorage.getItem("locationId")) === null
        ) {
          const response = await axios.post(
            `${URL}/api/Business/GetAllLocation`
          );
          setLocationList(response.data.data.allLocations);
          console.log("my location. data is", response.data.data.allLocations);
        }
      }
      getbusinessData();

      if (
        !(localStorage.getItem("businessId") == 111) &&
        localStorage.getItem("businessId")
      ) {
        console.log(
          "Local Storage Business Called",
          localStorage.getItem("businessId") == 111
        );
        setTerminalLoading(true);
        // setTimeout(callApi, 4000);
        callApi();
      }
      if (
        !(localStorage.getItem("locationId") == 111) &&
        localStorage.getItem("locationId")
      ) {
        console.log(
          "Local Storage Location Called",
          localStorage.getItem("locationId") == 111
        );
        setTerminalLoading(true);
        // setTimeout(callLocationApi, 8000);
        callLocationApi();
      }

      if (!(localStorage.getItem("businessId") !== null) && !state.isLocation) {
        console.log("Block Business Called");

        async function getbusinessData() {
          setTerminalLoading(true);
          const a = state?.businessInfo?.businessId;
          const b = state?.businessId;
          const requestbody = {
            businessId: a ? a : b,
            locationIds: [""],
          };

          async function pullTerminalData() {
            const response = await fetch(`${URL}/api/Business/GetTerminals`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestbody),
            });
            const data = await response.json();
            const { terminals } = data.data;
            const modifiedData = [];
            for (const [key, value] of Object.entries(terminals).sort((a, b) =>
              a[0].localeCompare(b[0])
            )) {
              const obj = {
                id: key,
                // title: "10123 V2 Pay to Pay",
                // title: "",
                title: "",
                terminals: value,
              };
              modifiedData.push(obj);
            }
            setTestData(modifiedData);
            setBusinessDataNav(modifiedData);

            const selectedTerminal = modifiedData.filter((modifiedItem) => {
              const a = localStorage.getItem("storeId");
              const b = state.stores[0].id;
              const id = a === null ? b : a;
              return modifiedItem?.id.split(" ")[0] === id;
            });
            // to render the selected terminal
            const a = localStorage.getItem("terminalHandlerId");
            setActiveItem(a ? a : selectedTerminal[0]?.id);
            showTerminalHandler(a ? a : selectedTerminal[0]?.id, modifiedData);
            setshowselect(true);
            setTerminalLoading(false);
          }
          pullTerminalData();
          //generating the buiness infromation
          const res = locationList.filter((e) => e.id == locationid);
          const businessId = res[0]?.businessId;
          const businessInfo = businesslist.filter(
            (e) => e.businessInfo.businessId == businessId
          );
          // setBusinessdata(businessInfo[0]?.businessInfo);
          setBusinessdata(state?.businessInfo);
          SetActiveT(true);
          setBData(state);
        }
        getbusinessData();
      }
      if (!(localStorage.getItem("locationId") !== null) && state.isLocation) {
        console.log("Block Location Called");

        async function getLocationData() {
          setTerminalLoading(true);
          async function pullTerminalData() {
            const requestbody = {
              businessId: "",
              locationIds: [
                `${
                  // state.locationState.id
                  //   ? state.locationState.id
                  //   : state.store_id
                  state.store_id ? state.store_id : state.locationState.id
                }`,
              ],
            };
            const response = await fetch(`${URL}/api/Store/GetTerminals`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestbody),
            });
            const data = await response.json();
            const { terminals } = data.data;
            const modifiedData = [];
            for (const [key, value] of Object.entries(terminals)) {
              const obj = {
                id: key,
                // title: "10123 V2 Pay to Pay",
                // title: "",
                title: "",
                terminals: value,
              };
              console.log("EE", obj);

              modifiedData.push(obj);
            }
            setTestData(modifiedData);
            setBusinessDataNav(modifiedData);
            const a = localStorage.getItem("storeId");
            // const b = state.locationState.id
            //   ? state.locationState.id
            //   : state.store_id;
            const b = state.store_id ? state.store_id : state.locationState.id;
            const id = a === null ? b : a;
            setlocationid(id);
            const selectedTerminal = modifiedData.filter((modifiedItem) => {
              return modifiedItem.id.split(" ")[0] === id;
            });
            const c = localStorage.getItem("terminalHandlerId");
            showTerminalHandler(c ? c : selectedTerminal[0]?.id, modifiedData);
            setActiveItem(c ? c : selectedTerminal[0]?.id);
            setshowselect(false);
            setTerminalLoading(false);
          }
          pullTerminalData();
          setLocationData(state.locationState);
          SetActiveT(true);
        }
        getLocationData();
      }
      // Setloading(false);
    } catch (error) {
      console.log(error);
    }
    // to check the 'showScroll' value
    window.addEventListener("scroll", checkScrollTop2);
  }, [0]);

  // onclick of terminal
  const showTerminalHandler = (id, testdata) => {
    console.log("ID in::;", id);
    console.log("ID in:::", testdata);
    if (testdata.length > 1) {
      localStorage.setItem("terminalHandlerId", id);
      // if(localStorage.getItem("terminalHandlerId")){

      // }else{
      //   localStorage.setItem("terminalHandlerId",modifiedData[0].id)
      // }
    } else {
      localStorage.removeItem("terminalHandlerId");
    }
    // localStorage.setItem('terminalHandlerId',id)
    const currentTerminals = testdata.find((item) => item.id === id);
    // sorting the terminals according to the alertStatus
    currentTerminals?.terminals?.sort(
      (x, y) => Number(!x.alertStatus) - Number(!y.alertStatus)
    );
    setTerminalData(currentTerminals ? currentTerminals : "");
  };

  const callApi = async (busId) => {
    setTerminalLoading(true);
    setLocationData(null); // to remove location data
    localStorage.removeItem("terminalHandlerId"); // to remove the previously selected terminal id

    //if business tab is active then we will put business id in requist body otherwise we will put the location
    //id in the response body.
    const requestbody = {
      businessId: busId ? busId : localStorage.getItem("businessId"),
      locationIds: [""],
    };

    async function pullTerminalData() {
      const response = await fetch(`${URL}/api/Business/GetTerminals`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestbody),
      });
      const data = await response.json();
      console.log("data:", data.data);
      const { terminals } = data.data;
      const modifiedData = [];
      for (const [key, value] of Object.entries(terminals).sort((a, b) =>
        a[0].localeCompare(b[0])
      )) {
        console.log("1", key);
        console.log("2", value);
        const obj = {
          id: key,
          title: "",
          terminals: value,
        };
        modifiedData.push(obj);
      }
      console.log("first", modifiedData);
      setTestData(modifiedData);
      setBusinessDataNav(modifiedData);
      if (modifiedData.length > 1) {
      } else {
        localStorage.removeItem("terminalHandlerId");
      }
      const a = localStorage.getItem("terminalHandlerId");
      showTerminalHandler(a ? a : modifiedData[0]?.id, modifiedData);
      setBusinessid(busId ? busId : localStorage.getItem("businessId"));
      setshowselect(true);
      // to render the selected terminal
      setActiveItem(a ? a : modifiedData[0]?.id);
      setTerminalLoading(false);
    }

    pullTerminalData();

    if (busId === undefined) {
      console.log("Block-A Business");
      const { data } = await axios.post(`${URL}/api/Business/GetAllBusiness`);
      setBusinessList(data.data.allBusiness);
      const response = await axios.post(`${URL}/api/Business/GetAllLocation`);
      setLocationList(response.data.data.allLocations);

      //generating the buiness infromation
      const businessInfo = data.data.allBusiness?.filter(
        (e) => e.businessInfo.businessId === localStorage.getItem("businessId")
      );
      setBusinessdata(businessInfo[0]?.businessInfo);
      setBusinessid(
        businessId ? businessId : localStorage.getItem("businessId")
      );
      setBData(businessInfo[0]);
      SetActiveT(true);
    } else {
      console.log("Block-B Business");
      //generating the buiness infromation
      const businessInfo = businesslist?.filter(
        (e) => e.businessInfo.businessId === busId
      );
      setBusinessdata(businessInfo[0]?.businessInfo);
      setBData(businessInfo[0]);
      SetActiveT(true);
    }
  };

  const callLocationApi = async (locId) => {
    setTerminalLoading(true);
    setBusinessdata(null); // to remove the businessdata
    localStorage.removeItem("terminalHandlerId"); // to remove the previously selected id

    const requestbody = {
      businessId: "",
      locationIds: [`${locId ? locId : localStorage.getItem("locationId")}`],
    };
    // setTerminalData(currentTerminals ? currentTerminals : "");
    // rendering terminals on page renders
    const showTerminalHandler = (id, testdata) => {
      const currentTerminals = testdata.find((item) => item?.id === id);
      setTerminalBaseName(currentTerminals?.id);

      // sorting the terminals according to the alertStatus
      currentTerminals?.terminals?.sort(
        (x, y) => Number(!x.alertStatus) - Number(!y.alertStatus)
      );
      // setTerminalData(currentTerminals);
      setTerminalData(currentTerminals ? currentTerminals : "");
      // setActive(id);
      setActiveItem(id);
      if (!selected) {
        setSelected((prev) => !prev);
      }
      // setS(!s);
      setActive(false);
    };

    async function pullTerminalData() {
      const response = await fetch(`${URL}/api/Store/GetTerminals`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestbody),
      });

      const data = await response.json();
      const { terminals } = data.data;
      console.log(data.data, "console-data");

      const modifiedData = [];
      for (const [key, value] of Object.entries(terminals)) {
        const obj = {
          id: key,
          // title: "10123 V2 Pay to Pay",
          // title: "",
          title: "",
          terminals: value,
        };
        modifiedData.push(obj);
      }
      setTestData(modifiedData);
      setBusinessDataNav(modifiedData);
      showTerminalHandler(
        modifiedData[0]?.id,
        modifiedData ? modifiedData : ""
      );
      setshowselect(false);
      setTerminalLoading(false);
    }
    pullTerminalData();

    if (locId === undefined) {
      console.log("Block-A Location");
      const response = await axios.post(`${URL}/api/Business/GetAllLocation`);
      setLocationList(response.data.data.allLocations);

      const res = response.data.data.allLocations.filter(
        (e) => e.id === localStorage.getItem("locationId")
      );
      const businessId = res[0]?.businessId;
      const businessInfo = response.data.data.allLocations.filter(
        (e) => e.businessId === businessId
      );
      setLocationData(businessInfo[0]);
      SetActiveT(true);
    } else {
      console.log("Block-B Location");

      //generating the buiness infromation
      const res = locationList.filter((e) => e.id === locId);
      const businessId = res[0]?.businessId;
      const businessInfo = locationList.filter(
        (e) => e.businessId === businessId
      );
      setLocationData(businessInfo[0]);
      SetActiveT(true);
    }
  };

  const handleOnBusinessChange = (id) => {
    console.log("business select and its id  is ", id);
    if (id !== "SELECT...") {
      setBusinessid(id);
      callApi(id);
      localStorage.setItem("businessId", id);
      localStorage.setItem("activeItem", true);
    }
  };
  const handleLocationChange = (id) => {
    console.log("location select and its id  is ", id);
    if (id !== "SELECT...") {
      setlocationid((prevState) => (prevState, id));
      callLocationApi(id);
      localStorage.setItem("locationId", id);
      localStorage.setItem("activeItem", false);
    }
    // console.log("Location Id:", id);
  };
  const bussinessClick = () => {
    if (!active) {
      setTestData([]);
      setBusinessid("");
      // setBusinessdata();
      setTerminalData([]);
      setActive(true);
      setActiveItem(false);
      setLocationData(null); // to remove the locationdata
      SetActiveT(false);
      setshowselect(true);

      // localStorage.setItem("testdata", []);
      // localStorage.setItem("businessId", "");
      // localStorage.setItem("businessdata", "");
      // localStorage.setItem("terminalData", []);
      // localStorage.setItem("active", true);
      localStorage.setItem("activeItem", active);
      localStorage.setItem("locationdata", null);
      localStorage.setItem("locationId", 111);
    }
  };

  const locationClick = () => {
    if (active) {
      setTestData([]);
      setlocationid("");
      setBusinessdata();
      setTerminalData([]);
      setActive(false);
      setActiveItem(false);
      setBusinessdata(null); // to remove the businessdata
      SetActiveT(false);
      setlocationid(null);
      setshowselect(false);

      // localStorage.setItem("testdata", []);
      // localStorage.setItem("businessId", "");
      // localStorage.setItem("businessdata", "");
      // localStorage.setItem("terminalData", []);
      // localStorage.setItem("active", false);
      localStorage.setItem("activeItem", false);
      localStorage.setItem("locationdata", null);
      localStorage.setItem("businessId", 111);
      // localStorage.setItem("locationId",111)
    }
  };
  // getting alert counts
  const getAlertCount = (id) => {
    let count = 0;
    // const currentTerminals = testdata.find((item) => item.id === id);
    // currentTerminals.terminals &&
    //   currentTerminals.terminals.forEach((terminal) => {
    //     if (terminal.alertStatus) {
    //       count++;
    //     }
    //   });

    return count;
  };
  const checkScrollTop2 = () => {
    if (window.scrollY > 10) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const [showScroll, setShowScroll] = useState(false);

  // const checkScrollTop2 = () => {
  //   console.log("checkScrollTop2");
  //   if (window.scrollY > 10) {
  //     setShowScroll(true);
  //   } else {
  //     setShowScroll(false);
  //   }
  // };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // window.addEventListener("scroll", checkScrollTop);

  return (
    <>
      <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
        <div className="text-left">
          <ButtonNavigation />
        </div>
        <div className="text-center">
          <p className="text-center font-bold text-lg ">Terminals</p>
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
      <div className="inputs w-full p-2 mt-3 sm:p-6 sm:mt-0 mx-auto">
        <div className="flex flex-wrap justify-center -mx-3 mb-6">
          <div className="w-full max-w-[800px] px-3 mb-6 -mt-4">
            {/* <div className="m-1 lg:px-72 md:px-32 px-1"> */}
            <div className="flex justify-around rounded-full py-3 mt-12">
              <div
                className={`border border-[#000000] w-full border-r-0 text-center p-2 rounded-l-lg font-bold pointer ${
                  active ? "bg-[#7F99CC] text-white " : ""
                }`}
                onClick={bussinessClick}
              >
                Business
              </div>
              <div
                className={`border border-[#000000] w-full text-center p-2 rounded-r-lg font-bold ${
                  !active ? "bg-[#7F99CC] text-white " : ""
                }`}
                onClick={locationClick}
              >
                Location
              </div>
            </div>
            {terminalLoading ? (
              <>
                {/* <div>
              {terminalLoading && ( */}
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
                {/* )}
            </div> */}
              </>
            ) : (
              <>
                {showselect === true ? (
                  <>
                    <div className="flex items-center">
                      <h1>Business:</h1>
                      <select
                        // className="ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                        className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                        value={businessId}
                        onChange={(e) => handleOnBusinessChange(e.target.value)}
                      >
                        <option>SELECT...</option>
                        {businesslist.map((data) => (
                          <>
                            <option value={data.businessInfo.businessId}>
                              {data.businessInfo.name}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {showselect === false ? (
                  <>
                    <div className="flex items-center">
                      <h1>Location:</h1>
                      <select
                        className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                        value={
                          locationid
                            ? locationid
                            : localStorage.getItem("locationId")
                        }
                        onChange={(e) => handleLocationChange(e.target.value)}
                      >
                        <option>SELECT...</option>
                        {locationList.map((data) => (
                          <>
                            {/* {console.log("from concole ", data.id)} */}
                            <option value={data.id}>{data.name}</option>
                          </>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <>
                  {/* <div className={` ${buinessdata ? " " : ""} `}> */}
                  {buinessdata ? (
                    <div
                      className={`bg-gradient-to-b from-[#EFEFEF]
                  }   rounded-md mt-5   `}
                    >
                      <div className="flex justify-between px-1 md:px-1 mt-2">
                        <div className="font-bold text-md mt-2">
                          {buinessdata?.name}
                        </div>
                        <div className="text-sm mt-2">
                          <MenuButtonTerminal
                            name={buinessdata?.name}
                            business_id={buinessdata?.businessId}
                            business={bData}
                            terminal={terminalData}
                            support={true}
                            locations={businessDataNav}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between text-[11px] sm:text-xs px-1 md:px-1">
                        <div>{buinessdata?.street}</div>

                        <div className="flex justify-center items-center">
                          {buinessdata.phone !== "" ? (
                            <img
                              src={main}
                              alt=""
                              className="w-4 sm:w-4 h-4 sm:h-4 mr-1 sm:mr-1"
                            ></img>
                          ) : (
                            ""
                          )}
                          {buinessdata?.phone}
                        </div>
                      </div>
                      <div className="flex justify-between text-[11px] sm:text-xs px-1 md:px-1">
                        <div>
                          {buinessdata?.city}, {buinessdata?.locality},{" "}
                          {buinessdata?.zipPostal}
                        </div>
                        <div className="flex justify-center items-center">
                          {buinessdata.secondaryPhone !== "" ? (
                            <img
                              src={secondary}
                              alt=""
                              className="w-4 sm:w-4 h-4 sm:h-4 mr-1 sm:mr-1"
                            ></img>
                          ) : (
                            ""
                          )}
                          {buinessdata?.secondaryPhone}{" "}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {locationdata ? (
                    <div
                      className={`bg-gradient-to-b from-[#EFEFEF]
                }   rounded-md mt-5   `}
                    >
                      <div className="flex justify-between px-1 md:px-1 mt-2">
                        <div className="font-bold text-md  mt-2">
                          {locationdata.businessInfo.name}
                        </div>
                        <div className="text-sm mt-2">
                          <MenuButtonTerminal
                            location_id={
                              locationdata?.businessId
                                ? locationdata?.businessId
                                : locationdata.businessInfo.businessId
                            }
                            isLocation={true}
                            location={locationdata}
                            locationName={locationdata?.name}
                            terminal={terminalData}
                            support={false}
                            locations={businessDataNav}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between text-[11px] sm:text-xs px-1 md:px-1">
                        <div>{locationdata?.businessInfo.street}</div>

                        <div className="flex justify-center items-center">
                          {locationdata.businessInfo.phone !== "" ? (
                            <img
                              src={main}
                              alt=""
                              className="w-4 sm:w-4 h-4 sm:h-4 mr-1 sm:mr-1"
                            ></img>
                          ) : (
                            ""
                          )}
                          {locationdata?.businessInfo.phone}
                        </div>
                      </div>
                      <div className="flex justify-between text-[11px] sm:text-xs px-1 md:px-1">
                        <div>
                          {locationdata?.businessInfo.city},{" "}
                          {locationdata?.businessInfo.locality},{" "}
                          {locationdata?.businessInfo.zipPostal}
                        </div>
                        <div className="flex justify-center items-center">
                          {locationdata.businessInfo.secondaryPhone !== "" ? (
                            <img
                              src={secondary}
                              alt=""
                              className="w-4 sm:w-4 h-4 sm:h-4 mr-1 sm:mr-1"
                            ></img>
                          ) : (
                            ""
                          )}
                          {locationdata?.businessInfo.secondaryPhone}{" "}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="">
                    {
                      //mapping the fakeData to display sweeps/pay to pay buttons
                      testdata.map((data, index) => (
                        <>
                          <>
                            <SingleTerminal
                              key={data.id}
                              testdata={testdata}
                              activeItem={activeItem}
                              setActiveItem={setActiveItem}
                              selected={index === 0 ? selected : !selected}
                              setSelected={setSelected}
                              // showTerminalHandler(data.id,testdata)
                              showTerminalHandler={showTerminalHandler}
                              data={data}
                              getAlertCount={getAlertCount}
                              index={index}
                            />
                          </>
                        </>
                      ))
                    }
                    {activeT && (
                      <>
                        <hr className="my-4" />
                        <div className="flex justify-between md:text-sm mb-2">
                          <strong>{terminalData?.id}</strong>
                          {/* {terminalData?.terminals?.length ? ( */}
                          <>
                            <h1>
                              {terminalData?.terminals?.length ? (
                                <>
                                  {terminalData?.terminals?.length} Terminals
                                  {getAlertCount(terminalData?.id) > 0 && (
                                    <>
                                      (
                                      <strong className="text-red-600">{`${getAlertCount(
                                        terminalData?.id
                                      )} Alert`}</strong>
                                      )
                                    </>
                                  )}
                                </>
                              ) : (
                                <> 0 Terminals</>
                              )}
                            </h1>
                          </>
                          {/* ) : (
                            ""
                          )} */}
                        </div>
                      </>
                    )}
                    {/* mapping through the terminals */}

                    {terminalData.terminals?.map((terminal) => (
                      <BusinessTerminals
                        business_id={buinessdata?.businessId}
                        key={terminal.id}
                        terminal={terminal}
                        terminalData={terminalData}
                        location_id={locationdata?.businessId}
                        location={locationdata}
                        locationName={businessDataNav[0].id}
                        business={bData}
                      />
                    ))}
                  </div>
                  {/* </div> */}
                </>
              </>
            )}
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default Terminalapi;
