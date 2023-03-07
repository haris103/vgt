import React, { useEffect, useState } from "react";
import { URL, config, token } from "../../../src/utils/config";
import axios from "axios";
import { Box, CircularProgress } from "@material-ui/core";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonNavigation from "../../ButtonNavigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SupportId() {
  const location = useLocation();
  const { state } = location;
  console.log("Support statee: ", state);

  const { id } = useParams();
  console.log("UseParams:", useParams());
  console.log("Support ID is ", id);

  const [businesslist, setBusinessList] = useState([]);
  const [totalLocation, setTotalLocation] = useState([]);
  const [locationslist, setLocationsList] = useState([]);
  const [terminallist, setTerminalList] = useState([]);
  const [problemlist, setProblemlist] = useState([]);
  const [terminalname, setTerminalName] = useState(state.terminalName);
  const [businessId, setBusinessid] = useState(null);
  const [locationsId, setLocationsId] = useState(null);
  const [loading, Setloading] = useState(false);
  const [catgoryName, setcatGoryName] = useState(null);
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState();
  const [locationName, setLocationName] = useState();
  const [userData, setUserData] = useState();
  const [textData, setTextData] = useState();
  const [terminalData, setTerminalData] = useState();
  const [problemData, setProblemData] = useState();
  const [category, setCategory] = useState();
  const [fname, setFirstName] = useState();
  const [lname, setLastName] = useState();
  const [responseType, setResponseType] = useState();
  const [responseText, setResponseText] = useState();

  const [additionalDetails, setAdditionalDetails] = useState(true);
  const [disabled, SetDisabled] = useState(false);
  const [placeholderData, SetplaceholderData] = useState();

  useEffect(() => {
    async function getdropdownData() {
      Setloading(true);
      const { data } = await axios.post(
        `${URL}/api/Business/GetAllBusiness`,
        config
      );
      const response = await axios.post(
        `${URL}/api/Business/GetAllLocation`,
        config
      );
      console.log("business data", data.data.allBusiness);
      console.log("location data", response.data.data.allLocations);

      // getting business object
      const filtereddata = data.data.allBusiness.filter(
        (item) => item.businessInfo.businessId === id
      );

      // getting location object for locationname
      const filteredlocationdata = response.data.data.allLocations.filter(
        (item) => item.businessId === id
      );

      console.log("Filtered data:", filtereddata);
      console.log("Filtered data1:", filteredlocationdata);
      console.log(data.data.allBusiness);
      setBusinessList(filtereddata[0].businessInfo);
      setBusinessName(filtereddata[0].businessInfo.name);
      setLocationName(
        state.locationName ? state.locationName : filteredlocationdata[0].name
      );
      setLocationsId(filteredlocationdata[0].id);
      // getting terminals
      // const filteredterminaldata = response.data.data.allLocations.filter(
      //   (item) => item.businessInfo.businessId === id
      // );

      setLocationsList(response.data.data.allLocations);
      Setloading(false);
    }
    getdropdownData();
    async function getUserData() {
      const { data } = await axios.post(
        `${URL}/api/User/GetUserProfile`,
        config
      );
      console.log("First Name", data.data.userProfile.firstName);
      console.log("Last Name", data.data.userProfile.lastName);
      setFirstName(data.data.userProfile.firstName);
      setLastName(data.data.userProfile.lastName);
    }
    getUserData();
  }, [0]);

  const getTerminalData = async (e) => {
    setLocationsId(e.target.value);
    //now we will call terminal list api with this buisess id and locatin id
    const requestbody = {
      businessId: businessId,
      locationIds: [locationsId],
    };
    const { data } = await axios({
      method: "post",
      url: `${URL}/api/Business/GetTerminals`,
      config,
      data: requestbody,
    });
    const terminal = [];
    const myObject = data.data.terminals;
    Object.keys(myObject).map(function (key, index) {
      terminal.push(key);
    });
    setTerminalList(terminal);
    // console.log("function called");
    // console.log(locationsId), console.log(businessId);
  };
  // const getProbData = async (e) => {
  //   const selected = e.target.value;
  //   console.log("e called", e.target.value);
  //   switch (selected) {
  //     case "Printer":
  //       console.log("proeed sf");
  //       break;

  //     default:
  //       break;
  //   }
  //   setProblemlist(["test", "best", "gest"]);
  // };

  const getProbData = async (e) => {
    console.log("e called", e.target.value);
    const selected = e.target.value;
    setCategory(e.target.value);
    setAdditionalDetails(false);

    if (selected === "General Inquiry") {
      const options = [{ label: "Other", value: "Other" }];
      setProblemlist(options);
    }

    if (selected === "Game Terminal") {
      const options = [
        {
          label: "Error: Application Error",
          value: "Error: Application Error",
        },
        {
          label: "Error: Error Catch Exception",
          value: "Error: Error Catch Exception",
        },
        {
          label: "Error: Server Hard Error",
          value: "Error: Server Hard Error",
        },
        {
          label: "No Display / Black Screen",
          value: "No Display / Black Screen",
        },
        {
          label: "Frozen / Unresponsive",
          value: "Frozen / Unresponsive",
        },
        {
          label: "Main Not Responding",
          value: "Main Not Responding",
        },
        {
          label: "Performance (Slow/Choppy Gameplay)",
          value: "Performance (Slow/Choppy Gameplay)",
        },
        {
          label: "Prize / Gameplay Dispute",
          value: "Prize / Gameplay Dispute",
        },

        {
          label: "Reinstall / Reimage",
          value: "Reinstall / Reimage",
        },
        {
          label: "Touch Screen",
          value: "Touch Screen",
        },

        {
          label: "Update Required",
          value: "Update Required",
        },

        {
          label: "Windows Activation",
          value: "Windows Activation",
        },

        { label: "Other", value: "Other" },
      ];
      setProblemlist(options);
    }

    if (selected === "Bill Acceptor") {
      const options = [
        {
          label: "Error: Bill Acceptor Failure (2310)",
          value: "Error: Bill Acceptor Failure (2310)",
        },
        {
          label: "Error: Bill Acceptor No Connect (2290)",
          value: "Error: Bill Acceptor No Connect (2290)",
        },
        {
          label: "Error: Bill Error Communication (2297)",
          value: "Error: Bill Error Communication (2297)",
        },
        {
          label: "Error: Bill Error Feed Motor (2300)",
          value: "Error: Bill Error Feed Motor (2300)",
        },
        {
          label: "Error: Bill Error Ram",
          value: "Error: Bill Error Ram",
        },
        {
          label: "Error: Bill Error Stack Motor (2298)",
          value: "Error: Bill Error Stack Motor (2298)",
        },
        {
          label: "Error: Bill Incorrectly Accepted",
          value: "Error: Bill Incorrectly Accepted",
        },
        {
          label: "Error: Bill Port Not Ready (2011)",
          value: "Error: Bill Port Not Ready (2011)",
        },

        {
          label: "Error: Bill Stacker Open (2292)",
          value: "Error: Bill Stacker Open (2292)",
        },
        {
          label: "Error: Input Bill Not Finish",
          value: "Error: Input Bill Not Finish",
        },

        {
          label: "Bill Jam",
          value: "Bill Jam",
        },

        {
          label: "Cash Box Full",
          value: "Cash Box Full",
        },
        {
          label: "Not Accepting Bills",
          value: "Not Accepting Bills",
        },
        {
          label: "Not Accepting Vouchers",
          value: "Not Accepting Vouchers",
        },

        { label: "Other", value: "Other" },
      ];
      setProblemlist(options);
    }
    if (selected === "Printer") {
      const options = [
        {
          label: "Error: Printer Paper Jam (2253)",
          value: "Error: Printer Paper Jam (2253)",
        },
        {
          label: "Error: Printing Ticket Not Finished",
          value: "Error: Printing Ticket Not Finished",
        },
        { label: "Printer Paper Out", value: "Printer Paper Out" },
        { label: "Reprint Voucher Request", value: "Reprint Voucher Request" },
        { label: "Other", value: "Other" },
      ];
      setProblemlist(options);
    }
    if (selected === "POS") {
      const options = [
        {
          label: "Error: Server Exception",
          value: "Error: Server Exception",
        },
        {
          label: "Player Account Creation",
          value: "Player Account Creation",
        },
        { label: "Player PIN Reset", value: "Player PIN Reset" },
        { label: "POS Access", value: "POS Access" },
        { label: "POS Password Reset", value: "POS Password Reset" },
        { label: "Other", value: "Other" },
      ];
      setProblemlist(options);
    }

    if (selected === "Server") {
      const options = [
        {
          label: "Error: Error Send To Web Server",
          value: "Error: Error Send To Web Server",
        },
        {
          label: "Error: Server Hard Error",
          value: "Error: Server Hard Error",
        },
        {
          label: "Error: Unauthorized Server ",
          value: "Error: Unauthorized Server ",
        },
        {
          label: "Windows Activation  ",
          value: "Windows Activation",
        },

        { label: "Other", value: "Other" },
      ];
      setProblemlist(options);
    }
    if (selected === "Progessive/Jackpot") {
      const options = [
        {
          label: "Error: Error Connecting to Server",
          value: "Error: Error Connecting to Server",
        },
        {
          label: "No Display",
          value: "No Display",
        },
        {
          label: "Prize Dispute",
          value: "Prize Dispute",
        },

        { label: "Other", value: "Other" },
      ];
      setProblemlist(options);
    }
    if (selected === "Promo") {
      const options = [
        {
          label: "Promo-Mania: Black Screen",
          value: "Promo-Mania: Black Screen",
        },
        {
          label: "Promo-Mania: Frozen",
          value: "Promo-Mania: Frozen",
        },
        {
          label: "Promo-Mania: Audio Problem",
          value: "Prize Dispute",
        },

        { label: "Other", value: "Other" },
      ];
      setProblemlist(options);
    }
    if (selected === "Pfh") {
      const options = [
        {
          label: "Balance Issue",
          value: "Balance Issue",
        },
        {
          label: "Phone Number Update",
          value: "Phone Number Update",
        },
        {
          label: "PIN Reset",
          value: "PIN Reset",
        },
        {
          label: "Error: Error 12",
          value: "Error: Error 12",
        },

        { label: "Other", value: "Other" },
      ];
      setProblemlist(options);
    }
    if (selected === "Other") {
      const options = [{ label: "Other", value: "Other" }];
      setProblemlist(options);
    }
  };

  const getEmail = (e) => {
    // console.log("event is ", e);
    // console.log("value", e.target.value);
    setUserData(e.target.value);
    if (e.target.value === "email") {
      setResponseType("Email");
      try {
        async function getUserData() {
          const { data } = await axios.post(
            `${URL}/api/User/GetUserProfile`,
            config
          );
          console.log("Email Data", data.data.userProfile.email);
          setResponseText(data.data.userProfile.email);
          setUserData(data.data.userProfile.email);
        }
        getUserData();
      } catch (error) {
        console.log(error);
      }
    }
    if (e.target.value === "cellphone") {
      setResponseType("cellphone");
      try {
        async function getUserData() {
          const { data } = await axios.post(
            `${URL}/api/User/GetUserProfile`,
            config
          );
          console.log("Cell phone Data", data.data.userProfile.cellphone);
          setResponseText(data.data.userProfile.cellphone);
          setUserData(data.data.userProfile.cellphone);
        }
        getUserData();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("phone");
      // setResponseType("phone");
      setResponseText(e.target.value);
      SetplaceholderData("Enter phone number");
    }
  };

  const handleLocationSelect = (e) => {
    console.log("dddd", e);
    const requestbody = {
      businessId: "",
      locationIds: [`${e}`],
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

      // console.log(response);
      const data = await response.json();
      const { terminals } = data.data;
      console.log("Data of TERMINALAPI.js:", data.data);
      console.log("terminal data is ", terminals);

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
      console.log("designable data is ", modifiedData[0].terminals);
      setTerminalList(modifiedData[0].terminals);
    }
    pullTerminalData();
    console.log(locationslist);
    // finding location name
    let location_details = locationslist.find((item) => item.id === e);
    console.log("Location-details:", location_details.name);
    setLocationName(location_details.name);
  };

  const getTerminal = (e) => {
    console.log("object", e.target.value);
    console.log("terminalData:", e.target.value);
    setTerminalData(e.target.value);
  };

  const getTextArea = (e) => {
    console.log("textData:", e.target.value);
    setTextData(e.target.value);
  };

  const getProblem = (e) => {
    setProblemData(e.target.value);
  };

  const submitData = () => {
    if (
      textData === undefined ||
      textData === "" ||
      category === undefined ||
      category === "Select" ||
      !businessName
    ) {
      alert("Please complete the details before submission.");
    } else {
      try {
        async function submitData() {
          SetDisabled(true);
          console.log("1", userData);
          console.log("2", textData);
          console.log("3", terminalData);
          console.log("4", problemData);
          console.log("5", category);
          console.log("6", locationName);
          console.log("7", businessName);
          console.log("8", fname);
          console.log("8", lname);
          const { data } = await axios.post(
            `${URL}/api/User/SubmitSupportRequest`,
            {
              firstName: fname,
              lastName: lname,
              locationName: locationName,
              terminalName: terminalData,
              responseText: responseText,
              responseType: responseType,
              category: category,
              problem: problemData,
              details: textData,
            }
          );
          console.log("dataaa:", data.rc);
          if (data) {
            SetDisabled(false);
          }
          if (data.rc === 1000) {
            toast.success("Data Submitted Successfully...", {
              position: "bottom-center",
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            window.location.reload();
          } else {
            toast.error("Error", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
        submitData();
      } catch (error) {
        console.log(error);
      }
    }
  };

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
  // console.log("1:", businessName);
  // console.log("2:", locationName);
  // console.log("3:", terminalData);
  // console.log("4:", category);
  // console.log("5:", problemData);
  // console.log("6:", textData);

  return (
    <>
      <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
        <div className="text-left">
          <ButtonNavigation />
        </div>
        <div className="text-center">
          <p className="text-center font-bold text-md md:text-lg">Support</p>
        </div>
        <div className="text-right">
          {/* <button
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
          </button> */}
        </div>
      </nav>
      <div class="m-1 lg:px-72 md:px-32 px-1">
        <div class="container mx-auto">
          <div class="inputs w-full max-w-2xl p-6 mx-auto">
            {/* <h2 class="text-lg text-center font-bold">Support</h2> */}
            {/*<form class="mt-6 border-t pt-4">*/}

            <div className="">
              {loading ? (
                <>
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
                </>
              ) : (
                <>
                  {" "}
                  <div className="w-full md:w-full px-3 mt-8">
                    <div className="">
                      Please complete the following form to submit a support
                      request. Fields marked * are required.
                    </div>
                    <div className="">My issue is related to:</div>

                    <div className="grid grid-cols-7 gap-1 mt-2 ">
                      <div className="font-semibold col-span-2 text-right">
                        <span style={{ color: "red" }}>* </span>Business:
                      </div>
                      <div>
                        {businesslist ? (
                          <>
                            <select
                              className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                              value={businessId}
                              // onChange={handleBusinessSelect}
                            >
                              {/* <option>SELECT ...</option> */}
                              <option
                                value={businesslist.name}
                                key={businesslist.businessId}
                              >
                                {businesslist.name}
                              </option>
                            </select>
                          </>
                        ) : (
                          ""
                        )}
                        {console.log("business id ", businessId)}
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mt-2 ">
                      <div className="font-semibold col-span-2 text-right">
                        {/* {state.isLocation ? (
                          <span style={{ color: "red" }}>* </span>
                        ) : ( */}
                        <span className="" style={{ color: "red" }}>
                          *{" "}
                        </span>
                        {/* )}{" "} */}
                        Location:
                      </div>
                      <div>
                        <select
                          className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                          value={locationsId}
                          onChange={getTerminalData}
                        >
                          <option value={state?.location?.businessId}>
                            {state?.locationState?.name}
                            {state?.locationName}
                            {locationName}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mt-2 ">
                      <div className="font-semibold col-span-2 text-right">
                        Terminal:
                      </div>
                      <div>
                        {state.isLocation === false ? (
                          <>
                            {/* For Business */}
                            <select
                              className="max-w-[228px] w-[55vw]  col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                              value={terminalname}
                              onChange={(e) => setTerminalName(e.target.value)}
                            >
                              {/* <option>{state?.id}</option> */}
                              <option>SELECT...</option>
                              {state?.business1?.map((data, index) => (
                                <>
                                  <option value={data.name} key={index}>
                                    {data.name} {data.roleDisplayName}
                                  </option>
                                </>
                              ))}

                              {/* {state?.business?.terminals?.map(
                                (data, index) => (
                                  <>
                                    <option value={data.name} key={index}>
                                      {data.name}
                                    </option>
                                  </>
                                )
                              )} */}

                              {state?.terminals?.terminals?.map(
                                (data, index) => (
                                  <>
                                    <option value={data.name.name} key={index}>
                                      {data.name} {data.roleDisplayName}
                                    </option>
                                  </>
                                )
                              )}
                            </select>
                          </>
                        ) : (
                          <>
                            {/* For Location */}
                            <select
                              className="max-w-[228px] w-[55vw]  col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                              value={terminalname}
                              onChange={getTerminal}
                            >
                              {/* <option>{state?.id}</option> */}
                              {/* <option>SELECT...</option> */}

                              {state?.location?.terminals?.map(
                                (data, index) => (
                                  <>
                                    <option value={data.name} key={index}>
                                      {data.name} {data.roleDisplayName}
                                    </option>
                                  </>
                                )
                              )}

                              {/*  for location of terminalapi */}
                              {state?.terminals?.terminals?.map(
                                (data, index) => (
                                  <>
                                    <option value={data.name} key={index}>
                                      {data.name} {data.roleDisplayName}
                                    </option>
                                  </>
                                )
                              )}
                            </select>
                          </>
                        )}
                      </div>
                    </div>
                    {/* <hr></hr> */}
                    <hr className="my-4 border-none h-[2px] bg-[black] "></hr>
                    <div>
                      To help us provide the proper support, please provide the
                      details of your issue
                    </div>
                    <div className="grid grid-cols-7 gap-1 mt-2">
                      <div className="font-semibold col-span-2 text-right ">
                        <span style={{ color: "red" }}>* </span> Category:
                      </div>
                      <div>
                        <select
                          className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                          onChange={getProbData}
                        >
                          <option value="Select">SELECT...</option>
                          <option value="General Inquiry">
                            General Inquiry
                          </option>
                          <option value="Game Terminal">Game Terminal</option>
                          <option value="Bill Acceptor">Bill Acceptor</option>
                          <option value="Printer">Printer</option>
                          <option value="POS">POS</option>
                          <option value="Server">Server</option>
                          <option value="Progessive/Jackpot">
                            Progessive / Jackpot
                          </option>
                          <option value="Promo">Promo</option>
                          <option value="Pfh">Play from Home</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mt-2">
                      <div className="font-semibold col-span-2 text-right ">
                        <span className="invisible">*</span>Problem:
                      </div>
                      <div>
                        <select
                          className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                          onChange={getProblem}
                          value={problemData}
                        >
                          <option>SELECT...</option>
                          {problemlist && (
                            <>
                              {problemlist.map((option) => (
                                <option value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label>
                        {additionalDetails ? (
                          <>
                            {" "}
                            <span style={{ color: "red" }}>*</span> Additional
                            details
                          </>
                        ) : (
                          <>
                            {" "}
                            <span style={{ color: "red" }}>*</span> Additional
                            details
                          </>
                        )}
                        :
                      </label>
                      {/* <div>
                        <textarea
                          id="w3review"
                          name="w3review"
                          rows="4"
                          cols="50"
                        ></textarea>
                      </div> */}
                      <div class="mb-6">
                        <textarea
                          id="message"
                          rows="4"
                          className="block border-black border-[1px] p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Your message..."
                          onChange={getTextArea}
                          maxLength={500}
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">Preferred response method:</div>
                      <div className="flex">
                        <label for="fname">
                          <select onChange={getEmail}>
                            <option>SELECT...</option>
                            <option value="email">Email</option>
                            <option value="">Phone</option>
                            <option value="cellphone">Cell Phone</option>
                          </select>
                        </label>
                        <input
                          className="ml-1"
                          type="text"
                          // id="fname"
                          // name="fname"
                          placeholder={placeholderData}
                          value={userData}
                          onChange={getEmail}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {disabled ? (
                      <>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                          onClick={submitData}
                        >
                          Submit
                        </button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 border-black "
                          onClick={submitData}
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </div>
                  <ToastContainer />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SupportId;
