import React, { useEffect, useState } from "react";
import { URL, config, token } from "../../../src/utils/config";
import axios from "axios";
import { Box, CircularProgress } from "@material-ui/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonNavigation from "../../ButtonNavigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Support() {
  const [businessList, setBusinessList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [terminalList, setTerminalList] = useState([]);
  const [problemList, setProblemList] = useState([]);
  const [totalLocation, setTotalLocation] = useState([]);
  const [businessName, setBusinessName] = useState();
  const [locationName, setLocationName] = useState();
  const [terminalName, setTerminalName] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [locationsId, setLocationsId] = useState(null);
  const [terminalData, setTerminalData] = useState();
  const [categoryName, setCategoryName] = useState(null);
  const [category, setCategory] = useState();
  const [problemData, setProblemData] = useState();
  const [navTerminalsList, setNavTerminalsList] = useState([]);
  const [navigationTerminalName, setNavigationTerminalName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [textData, setTextData] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [responseType, setResponseType] = useState();
  const [responseText, setResponseText] = useState();
  const [additionalDetails, setAdditionalDetails] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [placeholderData, setPlaceholderData] = useState(
    "Choose response method"
  );
  // const navigate = useNavigate();
  const [select, setSelect] = useState(false);
  const [methodInput, setMethodInput] = useState(true);
  const { state } = useLocation();

  console.log("state is: ", state);

  useEffect(() => {
    async function getdropdownData() {
      setLoading(true);
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
      setBusinessList(data.data.allBusiness);
      // setting businesName state on page load from navigation menus
      if (state !== null && !state.isLocation) {
        if (!("terminalName" in state)) {
          setBusinessName(
            (prevState) => (prevState, state.business.businessInfo.name)
          );
        } else if ("terminalName" in state) {
          setBusinessName((prevState) => (prevState, state.businessName));
          setLocationName((prevState) => (prevState, state.terminals.id));
          setTerminalName((prevState) => (prevState, state.terminalName));
        }
      } else if (state !== null && state.isLocation) {
        if (!("terminalName" in state)) {
          setBusinessName(
            (prevState) => (prevState, state.location.businessInfo.name)
          );
          setLocationName((prevState) => (prevState, state.locationName));
        } else if ("terminalName" in state) {
          setBusinessName(
            (prevState) => (prevState, state.location.businessInfo.name)
          );
          setLocationName((prevState) => (prevState, state.locationName));
          setTerminalName((prevState) => (prevState, state.terminalName));
        }
      }

      setTotalLocation(response.data.data.allLocations);
      setLoading(false);
    }
    getdropdownData();
    async function getUserData() {
      const { data } = await axios.post(
        `${URL}/api/User/GetUserProfile`,
        config
      );
      // console.log("First Name", data.data.userProfile.firstName);
      // console.log("Last Name", data.data.userProfile.lastName);
      setFirstName(data.data.userProfile.firstName);
      setLastName(data.data.userProfile.lastName);
    }
    getUserData();
  }, []);

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

  const getEmail = (e) => {
    // console.log("event is: ", e);
    // console.log("value is: ", e.target.value);
    // setUserData(e.target.value);
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
          setMethodInput(false);
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
          setMethodInput(false);
        }
        getUserData();
      } catch (error) {
        console.log(error);
      }
    }
    if (e.target.value === "phone") {
      setResponseType("phone");
      try {
        async function getUserData() {
          const { data } = await axios.post(
            `${URL}/api/User/GetUserProfile`,
            config
          );
          console.log("Phone number", data.data.userProfile.phone);
          setResponseText(data.data.userProfile.phone);
          setUserData(data.data.userProfile.phone);
          setMethodInput(false);
        }
        getUserData();
      } catch (error) {
        console.log(error);
      }
    }
    if (e.target.value === "SELECT...") {
      setUserData("");
      setPlaceholderData("Choose a response method");
      setMethodInput(true);
    }
    // else {
    //   console.log("phone");
    //   // setResponseType("phone");
    //   setResponseText(e.target.value);
    //   SetplaceholderData("Enter phone number");
    // }
  };

  const getProbData = async (e) => {
    setSelect(true);
    // setProblemData();
    // const options = [{ label: "Other", value: "Other" }];
    setProblemData((prevState) => (prevState, "SELECT..."));
    setProblemList([]);
    console.log("e called", e.target.value);
    // console.log(problemData);
    console.log("problem list ", problemList);
    const selected = e.target.value;
    setCategory(e.target.value);

    if (selected === "General Inquiry") {
      const options = [{ label: "Other", value: "Other" }];
      setProblemList(options);
      setAdditionalDetails(true);
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
      setProblemList(options);
      setAdditionalDetails(false);
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
      setProblemList(options);
      setAdditionalDetails(false);
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
      setProblemList(options);
      setAdditionalDetails(false);
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
      setProblemList(options);
      setAdditionalDetails(false);
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
      setProblemList(options);
      setAdditionalDetails(false);
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
      setProblemList(options);
      setAdditionalDetails(false);
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
      setProblemList(options);
      setAdditionalDetails(false);
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
      setProblemList(options);
      setAdditionalDetails(false);
    }
    if (selected === "Other") {
      const options = [{ label: "Other", value: "Other" }];
      setProblemList(options);
      setAdditionalDetails(true);
    }
  };

  const handleBusinessSelect = (e) => {
    if (e !== "SELECT...") {
      console.log("business event is ", e);
      // setLocationsList([]);
      // setLocationsList((prevState) => (prevState, "SELECT..."));
      const filterLocationList = totalLocation.filter(
        (location) => location.businessId === e
      );
      console.log("filterLocationList is: ", filterLocationList);
      setLocationsList(filterLocationList);
      // console.log("state location is  ", locationslist);
      // console.log("All location is  ", locationslist);
      try {
        async function pullSummaryData(e) {
          const bussinessId = e;
          console.log("businessId is: ", bussinessId);
          const response1 = await axios.post(
            `${URL}/api/Business/GetBusinessDetails`,
            { bussinessId }
          );
          console.log("response1 is: ", response1);
          // console.log(
          //   "RESPONSE FROM API IS",
          //   response1.data.data.business.stores[0].terminals
          // );
          // setTerminalList(response1.data.data.business.stores[0].terminals);
          // console.log(data);
        }
        pullSummaryData(e);
      } catch (error) {
        console.log(error.response.status);
      }

      // finding business name
      let business_name = businessList.find(
        (item) => item.businessInfo.businessId === e
      );
      setBusinessName(business_name.businessInfo.name);
      console.log("Business-name:", businessName);
    } else {
      setLocationsList([]);
      setTerminalList([]);
      setBusinessName("SELECT..");
    }
  };

  const handleLocationSelect = (e) => {
    console.log("e from handleLocationSelect: ", e);
    //logic to handle location select when Support is accessed directly from homepage
    if (state === null) {
      // console.log("dddd", e);
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
            title: "",
            terminals: value,
          };
          modifiedData.push(obj);
        }
        console.log("designable data is ", modifiedData[0].terminals);
        setTerminalList(modifiedData[0].terminals);
      }
      pullTerminalData();
      // finding location name
      let location_details = locationsList.find((item) => item.id === e);
      setLocationName(location_details.name);
    }
    //logic to handle location select when Support is accessed through navigation menu
    if (state !== null && state.isLocation) {
      setLocationName((prevState) => (prevState, e));
    }
    if (state !== null && !state.isLocation) {
      setLocationName((prevState) => (prevState, e));
    }
  };

  const getTerminal = (e) => {
    console.log("terminalData:", e.target.value);
    if (state === null) {
      setTerminalData(e.target.value);
    } else {
      setNavigationTerminalName((prevState) => (prevState, e.target.value));
      setTerminalName((prevState) => (prevState, e.target.value));
    }
  };

  const getTextArea = (e) => {
    console.log("textData:", e.target.value);
    setTextData(e.target.value);
  };

  const getProblem = (e) => {
    console.log("e from getProblem: ", e);
    setProblemData(e.target.value);
    // setProblemlist([]);
  };

  const submitData = () => {
    if (
      businessName === undefined ||
      businessName === "Select" ||
      locationName === undefined ||
      locationName === "Select" ||
      category === undefined ||
      category === "Select" ||
      //when additional details are required the text area should not be empty
      //additional details are erquired when category "General Inquiry" or "Other" selected
      (additionalDetails && !textData)
    ) {
      alert("Please complete the required fields before submission.");
    } else {
      try {
        async function submitData() {
          setDisabled(true);
          // console.log("1", userData);
          // console.log("2", textData);
          // console.log("3", terminalData);
          // console.log("4", problemData);
          // console.log("5", category);
          // console.log("6", locationName);
          // console.log("7", businessName);
          // console.log("8", fname);
          // console.log("8", lname);

          const { data } = await axios.post(
            `${URL}/api/User/SubmitSupportRequest`,
            {
              firstName: firstName,
              lastName: lastName,
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
            setDisabled(false);
          }
          if (data.rc === 1000) {
            toast.success("Data Submitted Successfully...", {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            let promise = new Promise(() => {
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            });
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

  const navLocations = [];
  var navTerminals = [];
  const navTerminalsArr = [];

  const handleNavTerminalsList = (e) => {
    console.log("firing handleNavTerminalsList: ", e);
    if (!("terminalName" in state)) {
      // find the index of current location object in navTerminalsArr
      let filterTerms = navTerminalsArr.filter((object) =>
        object.terms ? object.loc === e : null
      );
      //update navigationTerminalsList with the corresponding list of terminals at position indx of navTerminalsArr
      //if a valid location is selected, update terminals list and name
      if (e !== "SELECT...") {
        setNavTerminalsList((prevState) => (prevState, filterTerms[0].terms));
        setNavigationTerminalName((prevState) => (prevState, "SELECT..."));
        setTerminalName((prevState) => (prevState, "SELECT..."));
      }
      //if a valid location is not selected, reset terminals list and name
      else {
        setNavTerminalsList((prevState) => (prevState, []));
        setNavigationTerminalName((prevState) => (prevState, "SELECT..."));
        setTerminalName((prevState) => (prevState, "SELECT..."));
      }
    } else {
      setNavTerminalsList((prevState) => (prevState, navTerminalsArr[0]));
      console.log("navTerminalsArr[0]: ", navTerminalsArr[0]);
    }
  };

  //navigation is from Overview/Period/Terminals business tab
  if (state !== null && state.isLocation === false) {
    if (!("terminalName" in state)) {
      console.log("navigating from business...");

      if ("stores" in state.business) {
        for (let i in state.business.stores) {
          navLocations[i] = state.business.stores[i].name;
        }
        // console.log("navLocations from Overivew or Period: ", navLocations);
      } else {
        for (let i in state.locations) {
          navLocations[i] = state.locations[i].id;
          // console.log("navLocations from Termnals: ", navLocations);
        }
      }

      //create array of locations and their terminals
      if (state.business.stores !== undefined) {
        for (let i in state.business.stores) {
          for (let j in state.business.stores[i].terminals) {
            navTerminals.push(
              `${state.business.stores[i].terminals[j].name} (${state.business.stores[i].terminals[j].role})`
            );
          }
          navTerminalsArr.push({
            loc: state.business.stores[i].name,
            terms: navTerminals,
          });
          navTerminals = [];
        }
        // console.log("navTerminalsArr: ", navTerminalsArr);
      } else {
        for (let i in state.locations) {
          for (let j in state.locations[i].terminals) {
            navTerminals.push(
              `${state.locations[i].terminals[j].name} (${state.locations[i].terminals[j].role})`
            );
          }
          navTerminalsArr.push({
            loc: state.locations[i].id,
            terms: navTerminals,
          });
          navTerminals = [];
        }
        // console.log("navTerminalsArr: ", navTerminalsArr);
      }

      for (let i in navTerminals) {
        for (let j in navTerminals[i].terminals) {
          navTerminalsArr.push(navTerminals[i].terminals[j].name);
        }
      }
      console.log("navTerminalsArr: ", navTerminalsArr);
    } else if ("terminalName" in state) {
      navTerminalsArr.push(state.terminalName);
      navLocations.push(state.terminals.id);
      // console.log("navTerminalsArr from Terminal entity: ", navTerminalsArr);
      // console.log("navLocation from Terminal entity: ", navLocations);
    }
  }
  //navigation is from Overview/Period/Terminals location tab
  if (state !== null && state.isLocation === true) {
    console.log("navigating from location...");
    // let location = state.location.name;
    // console.log("printing loc>location from array:", location);
    if ("terminals" in state.location && state.location.terminals.length > 0) {
      for (let i in state.location.terminals) {
        navTerminals[
          i
        ] = `${state.location.terminals[i].name} (${state.location.terminals[i].role})`;
      }
    } else if ("terminals" in state) {
      for (let i in state.terminals) {
        navTerminals[
          i
        ] = `${state.terminals[i].name} (${state.terminals[i].role})`;
      }
    }
  }

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
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
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
                      request. Fields marked{" "}
                      <span style={{ color: "red" }}>*</span> are required.
                    </div>
                    <div className="mt-3">My issue is related to:</div>

                    {/* conditional rendering of the UI based on accessing Support
                    from homepage or 360 menu */}
                    {state === null ? (
                      <>
                        <div className="grid grid-cols-7 gap-1 mt-2">
                          <div className="font-semibold col-span-2 text-right">
                            <span style={{ color: "red" }}>*</span>Business:
                          </div>
                          <div>
                            <select
                              className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                              value={businessId}
                              onChange={(e) =>
                                handleBusinessSelect(e.target.value)
                              }
                            >
                              <option>SELECT...</option>
                              {businessList.map((data) => (
                                <>
                                  <option
                                    value={data.businessInfo.businessId}
                                    key={data.businessInfo.businessId}
                                  >
                                    {data.businessInfo.name}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mt-2">
                          <div className="font-semibold col-span-2 text-right ">
                            {" "}
                            <span style={{ color: "red" }}>*</span>Location:
                          </div>
                          <div>
                            <select
                              className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                              value={locationsId}
                              onChange={(e) =>
                                handleLocationSelect(e.target.value)
                              }
                            >
                              <option>SELECT...</option>
                              {locationsList.map((data, index) => (
                                <>
                                  <option value={data.id} key={index}>
                                    {data.name}
                                  </option>
                                </>
                              ))}
                            </select>
                            {console.log(
                              "these are locationIds: ",
                              locationsId
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mt-2">
                          <div className="font-semibold col-span-2 text-right">
                            {" "}
                            <span className="invisible">*</span>Terminal:
                          </div>
                          <div>
                            {terminalList && (
                              <select
                                className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                                value={terminalName}
                                onChange={getTerminal}
                              >
                                <option>SELECT...</option>
                                {terminalList.map((data, index) => (
                                  <>
                                    <option value={data.name} key={index}>
                                      {data.name} {data.roleDisplayName}
                                    </option>
                                  </>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {state !== null &&
                        !state.isLocation &&
                        typeof state.terminalName !== "string" ? (
                          <>
                            <div className="grid grid-cols-7 gap-1 mt-2">
                              <div className="font-semibold col-span-2 text-right">
                                <span style={{ color: "red" }}>*</span>Business:
                              </div>
                              <div>
                                <select
                                  className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                                  value={businessId}
                                >
                                  <option>
                                    {state.businessName
                                      ? state.businessName
                                      : state.business.businessInfo.name}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mt-2">
                              <div className="font-semibold col-span-2 text-right ">
                                {" "}
                                <span style={{ color: "red" }}>*</span>Location:
                              </div>
                              <div>
                                <select
                                  className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                                  value={locationsId}
                                  onChange={(e) => {
                                    handleNavTerminalsList(e.target.value);
                                    handleLocationSelect(e.target.value);
                                  }}
                                >
                                  <option>SELECT...</option>
                                  {navLocations.map((value, index) => (
                                    <option value={value} key={index}>
                                      {value}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mt-2">
                              <div className="font-semibold col-span-2 text-right">
                                {" "}
                                <span className="invisible">*</span>Terminal:
                              </div>
                              <div>
                                {navTerminalsList && (
                                  <select
                                    className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                                    value={navigationTerminalName}
                                    onChange={getTerminal}
                                  >
                                    <option>SELECT...</option>
                                    {navTerminalsList.map((value, index) => (
                                      <option value={value} key={index}>
                                        {value}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {state !== null &&
                            state.isLocation &&
                            typeof state.terminalName !== "string" ? (
                              <>
                                <div className="grid grid-cols-7 gap-1 mt-2">
                                  <div className="font-semibold col-span-2 text-right">
                                    <span style={{ color: "red" }}>*</span>
                                    Business:
                                  </div>
                                  <div>
                                    <select className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm">
                                      <option>
                                        {state.location.businessInfo.name}
                                      </option>
                                    </select>
                                  </div>
                                </div>

                                <div className="grid grid-cols-7 gap-1 mt-2">
                                  <div className="font-semibold col-span-2 text-right ">
                                    <span style={{ color: "red" }}>*</span>
                                    Location:
                                  </div>
                                  <div>
                                    <select className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm">
                                      <option>
                                        {state.terminals
                                          ? state.locationName
                                          : state.location.name}
                                      </option>
                                    </select>
                                  </div>
                                </div>

                                <div className="grid grid-cols-7 gap-1 mt-2">
                                  <div className="font-semibold col-span-2 text-right">
                                    <span className="invisible">*</span>
                                    Terminal:
                                  </div>
                                  <div>
                                    {navTerminals && (
                                      <select
                                        className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                                        value={navigationTerminalName}
                                        onChange={getTerminal}
                                      >
                                        <option>SELECT...</option>
                                        {navTerminals.map((value, index) => (
                                          <option value={value} key={index}>
                                            {value}
                                          </option>
                                        ))}
                                      </select>
                                    )}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="grid grid-cols-7 gap-1 mt-2">
                                  <div className="font-semibold col-span-2 text-right">
                                    <span style={{ color: "red" }}>*</span>
                                    Business:
                                  </div>
                                  <div>
                                    <select className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm">
                                      <option>
                                        {state.isLocation
                                          ? state.location.businessInfo.name
                                          : state.businessName}
                                      </option>
                                    </select>
                                  </div>
                                </div>

                                <div className="grid grid-cols-7 gap-1 mt-2">
                                  <div className="font-semibold col-span-2 text-right ">
                                    <span style={{ color: "red" }}>*</span>
                                    Location:
                                  </div>
                                  <div>
                                    <select className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm">
                                      <option>
                                        {state.isLocation
                                          ? state.locationName
                                          : state.terminals.id}
                                      </option>
                                    </select>
                                  </div>
                                </div>

                                <div className="grid grid-cols-7 gap-1 mt-2">
                                  <div className="font-semibold col-span-2 text-right">
                                    <span className="invisible">*</span>
                                    Terminal:
                                  </div>
                                  <div>
                                    <select className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm">
                                      <option>
                                        {state.terminalName} (
                                        {state.terminalRole})
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                    <hr className="my-4 border-none h-[2px] bg-[black] "></hr>
                    <div>
                      To help us provide the proper support, please specify the
                      details of your issue:
                    </div>
                    <div className="grid grid-cols-7 gap-1 mt-2">
                      <div className="font-semibold col-span-2 text-right ">
                        <span style={{ color: "red" }}>*</span>Category:
                      </div>
                      <div>
                        <select
                          className="max-w-[228px] w-[55vw] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 md:min-w-[273px] focus:outline-none border border-black text-sm"
                          value={categoryName}
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
                          className="max-w-[228px] w-[55vw] md:min-w-[273px] col-span-5 py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0  focus:outline-none border border-black text-sm"
                          onChange={getProblem}
                          value={problemData}
                        >
                          <option>SELECT...</option>
                          {problemList && (
                            <>
                              {problemList.map((option) => (
                                <option value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="font-semibold">
                        {additionalDetails ? (
                          <>
                            {" "}
                            <span style={{ color: "red" }}>*</span>Additional
                            details
                          </>
                        ) : (
                          <>
                            {" "}
                            <span
                              style={{ color: "red" }}
                              className="invisible"
                            >
                              *
                            </span>
                            Additional details
                          </>
                        )}
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
                          className="block appearance-none border-black border-[1px] w-full text-gray-900 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Your message..."
                          onChange={getTextArea}
                          maxLength={500}
                        ></textarea>
                      </div>
                    </div>
                    <div className="mb-2">Preferred response method:</div>
                    {/* <div className="container mx-auto"> */}
                    <div className="grid grid-cols-7 gap-1 mt-2">
                      <div className="col-span-2">
                        <label htmlFor="fname" className="w-full">
                          <select
                            onChange={getEmail}
                            className="w-full py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 focus:outline-none border border-black text-sm"
                          >
                            <option>SELECT...</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="cellphone">Cell Phone</option>
                          </select>
                        </label>
                      </div>
                      <div className="max-w-[228px] w-[55vw] md:min-w-[273px] col-span-5">
                        <div>
                          <input
                            className="w-full py-1.5 ml-2 pr-6 pl-1 sm:pl-3 rounded-0 focus:outline-none border border-black text-sm"
                            type="text"
                            // id="fname"
                            // name="fname"
                            placeholder={placeholderData}
                            value={userData}
                            onChange={getEmail}
                            disabled={methodInput}
                          />
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="flex justify-center">
                    {disabled ? (
                      <>
                        <button
                          type="submit"
                          className="text-white bg-blue-500 font-bold px-6 py-2.5 mr-2 mb-2 mt-2 rounded opacity-50 cursor-not-allowed"
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
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 border-black "
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

export default Support;
