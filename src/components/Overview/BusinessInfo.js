import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL, config, token } from "../../utils/config";
import { Box, CircularProgress } from "@material-ui/core";
import MenuButton from "./MenuButton";
import MenuButtonBusinessDetails from "./MenuButtonBusinessDetails";
import { data } from "autoprefixer";
import ButtonNavigation from "../../ButtonNavigation";
import main from "../../images/one.png";
import secondary from "../../images/two.png";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
function BusinessInfo() {
  const names = useParams();
  const location = useLocation();
  const { state } = location;
  const [businessinfo, setBusinessinfo] = useState([]);
  const [locationdata, setLocationData] = useState([]);
  const [date, setDate] = useState();
  console.log("DATE::", date);
  console.log("Business_state is ", state);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function pullSummaryData() {
        // const { data } = await axios.post(
        //   `${URL}/api/Business/GetOverView`,
        //   config
        // );
        const businessId = state.business_id;
        console.log(businessId);
        const response1 = await axios.post(
          `${URL}/api/Business/GetBusinessDetails`,
          { businessId }
        );
        // const response1 = await axios.post(
        //   `${URL}/api/Business/GetBusinessDetails`,
        //   { businessId }
        // );
        console.log("RESPONSE FROM API IS", response1.data.data.business);
        setDate(response1.data.data.business);

        console.log("Name", response1.data.data.business.businessInfo.name);

        // const response = data.data.overView;
        // /// const response = response1.data.data.business;
        // console.log("the response is", response);
        // const { businesses, stores } = response;
        // setBusinessinfo(businesses);
        // setLocationData(stores);
        // console.log("business data is", businesses);
        // console.log("store/location data is", stores);
      }

      pullSummaryData();
    } catch (error) {
      console.log(error.response.status);
    }
  }, [0]);

  // let obj = {
  //   center: {
  //     lat: 33.47984,
  //     lng: -86.91836,
  //   },
  //   zoom: 11,
  // };
  // const AnyReactComponent = ({ text }) => (
  //   <img
  //     src={text}
  //     alt=""
  //     srcset=""
  //     style={{ objectFit: "contain" }}
  //     width="30px"
  //     height="30px"
  //   />
  // );
  // const defaultMapOptions = {
  //   fullscreenControl: false,
  // };

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
          <ButtonNavigation />
        </div>
        <div className="text-center">
          <p className="text-center font-bold text-sm md:text-lg">
            Business Details
          </p>
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

      {/* <div className="m-1 lg:px-72 md:px-32 px-1"> */}
      <div className="inputs w-full p-2 mt-4 sm:p-6 sm:mt-0 mx-auto">
        <div className="flex flex-wrap justify-center -mx-3 mb-6">
          <div className="w-full max-w-[800px] px-3 mb-6 -mt-4">
            {/* <div className="m-1 lg:px-72 md:px-32 px-1"> */}
            <div className="flex justify-around rounded-full py-3 mt-8"></div>

            {date ? (
              <>
                <div className=" mt-3 rounded-lg  bg-gradient-to-b from-[#D9E6FF]">
                  <div className="flex justify-between text-md px-1 md:px-1">
                    {/* <div className="text-md font-bold mt-3">
                  {date ? date.businessInfo.name : ""}
                </div>
                <div>
                  <MenuButtonBusinessDetails
                    business_id={date.businessInfo.businessId}
                    business={date}
                    store_id={date.stores[0].id}
                  />
                </div> */}
                    <div className="mt-2 text-md font-bold">
                      {date ? date.businessInfo.name : ""}
                    </div>
                    <div className="mt-2">
                      <MenuButtonBusinessDetails
                        business_id={date.businessInfo.businessId}
                        business={date}
                        store_id={date.stores[0].id}
                        isLocation={state.isLocation}
                        a={state.locationState}
                        locationName={state?.locationState?.name}
                        location={state?.locationState}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-xs px-1 md:px-1">
                    <div className="grid grid-cols-2 text-sm  ">
                      <div className="col-span-2 pt-0.5 ">
                        {date ? date.businessInfo.street : ""}
                      </div>

                      <div className="col-span-2 pt-0.5 ">
                        {date ? date.businessInfo.city : ""},{" "}
                        {date ? date.businessInfo.locality : ""}
                      </div>
                      <div className="col-span-2 pt-0.5 ">
                        {date ? date.businessInfo.zipPostal : ""}
                      </div>
                      <div className="col-span-2 pt-0.5 ">
                        {date ? date.businessInfo.country : ""}
                      </div>
                      <div className="text-black pt-4 text-xs">Owner:</div>
                      <div className="text-black pt-4 ml-2 text-xs">
                        {date ? date.businessInfo.owner : ""}
                      </div>
                      <div className="text-black text-xs">Primary Contact:</div>
                      <div className="text-black ml-2 text-xs">
                        {date ? date.businessInfo.primaryContact : ""}
                      </div>
                      <div className="text-black pt-5 text-xs ">
                        {" "}
                        Main:
                        {/* {mainphone} */}
                      </div>
                      <div className=" pt-5 ml-2 text-xs">
                        {date ? date.businessInfo.phone : ""}
                      </div>
                      <div className="text-black text-xs  ">
                        Secondary:
                        {/* {secondaryphone} */}
                      </div>
                      <div className=" ml-2 text-xs">
                        {date ? date.businessInfo.secondaryPhone : ""}
                      </div>
                      <div className="text-black pt-5 text-xs ">
                        Business Type:
                      </div>
                      <div className="text-black pt-5 text-xs ml-2">
                        {" "}
                        {date ? date.businessInfo.businessType : ""}
                      </div>
                      <div className="text-black pt-5 text-xs ">
                        Hours of Operation:
                      </div>
                      <div className="text-black pt-5 ml-2 text-xs">
                        {date ? date.businessInfo.hours : ""}
                      </div>
                    </div>
                  </div>
                </div>
                {date.stores.map((item) => (
                  <>
                    <div
                      className={`border ${
                        alert
                          ? "bg-[#D1E0FF] border-[#6598FF]"
                          : "bg-[#D1E0FF] border-[#6598FF]"
                      }   rounded-md mb-2   `}
                    >
                      <div className="">
                        <div class="flex justify-between mt-2 text-md px-1 md:px-1 ">
                          <div className="text-sm font-semibold">
                            {`${item.id}`} {`${date.businessInfo.name}`}
                          </div>

                          <div className="text-sm">
                            {/* <MenuButton /> */}
                            <MenuButtonBusinessDetails
                              // business_id={item.businessInfo.businessId}
                              business_id={item.businessId}
                              // business={item}
                              business={date}
                              store_id={item.id}
                              isLocation={true} // to start
                              a={state.locationState}
                              locationName={state?.locationState?.name}
                              location={
                                state?.locationState
                                  ? state.locationState
                                  : date
                              } // to start
                            />
                          </div>
                        </div>

                        <div class="flex justify-between text-xs px-1 md:px-1">
                          <div className="">
                            Terminals:{""}
                            <strong className="">
                              {" "}
                              {item.terminals.length}
                            </strong>
                          </div>
                          <div className="md:pl-14 ">
                            Status: {item.locationStatus}
                          </div>
                        </div>
                        {console.log("item is ", item)}
                        <div class="flex justify-between text-xs px-1 md:px-1">
                          <div className=" md:px-0">
                            Play From Home:{" "}
                            {item.pfh === false ? "False" : "True"}
                          </div>
                          <div className="md:pl-14">
                            Updated: {item.terminals[0]?.lastUpdated.slice(2)}{" "}
                          </div>
                        </div>

                        <div class="flex justify-between text-xs px-1 md:px-1 mt-2">
                          <div>Session Type: {item.sessionType}</div>
                          <div className=" ">
                            Next Potential Win: {item.nextPotentialWin}
                          </div>
                        </div>

                        <div class="flex justify-between text-xs px-1 md:px-1 mb-1">
                          <div>Skill Type: {item.skillType}</div>
                          <div className="">
                            Ext. Progressive: {item.extProgressives}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
}

export default BusinessInfo;
