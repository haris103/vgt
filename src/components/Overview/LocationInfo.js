import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL, config, token } from "../../utils/config";
import { Box, CircularProgress } from "@material-ui/core";
import MenuButton from "./MenuButton";
import MenuButtonBusinessDetails from "./MenuButtonBusinessDetails";
import { data } from "autoprefixer";
import ButtonNavigation from "../../ButtonNavigation";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function LocationInfo() {
  const names = useParams();
  const location = useLocation();
  const { state } = location;
  const [businessinfo, setBusinessinfo] = useState([]);
  const [locationdata, setLocationData] = useState([]);
  const [date, setDate] = useState();
  console.log("LOCATIONID:", names);
  console.log("sate is ", state);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function pullSummaryData() {
        const { data } = await axios.post(
          `${URL}/api/Business/GetOverView`,
          config
        );

        const businessId = names.business_name;
        console.log(businessId);
        const response1 = await axios.post(
          `${URL}/api/Business/GetBusinessDetails`,
          { businessId }
        );
        console.log(
          "RESPONSE FROM LOCATION-API IS",
          response1.data.data.business
        );
        setDate(response1.data.data.business);

        const response = data.data.overView;
        console.log("the response is", response);
        const { businesses, stores } = response;
        setBusinessinfo(businesses);
        setLocationData(stores);
        console.log("business data is", businesses);
        console.log("store/location data is", stores);
      }

      pullSummaryData();
    } catch (error) {
      console.log(error.response.status);
    }
  }, [0]);

  let obj = {
    center: {
      lat: 33.47984,
      lng: -86.91836,
    },
    zoom: 11,
  };
  const AnyReactComponent = ({ text }) => (
    <img
      src={text}
      alt=""
      srcset=""
      style={{ objectFit: "contain" }}
      width="30px"
      height="30px"
    />
  );
  const defaultMapOptions = {
    fullscreenControl: false,
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

  return (
    <>
      <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
        <div className="text-left">
          <ButtonNavigation />
        </div>
        <div className="text-center">
          <p className="text-center font-bold text-md md:text-lg">
            Business Detailsss
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

      <div className="m-1 lg:px-72 md:px-32 px-1">
        <div className="flex justify-around rounded-full py-3 mt-8"></div>

        {date ? (
          <>
            {/* <div
              className={`bg-gradient-to-b from-[#D9E6FF] border  border-gradient-to-b from-[#C5D9FE] rounded-lg md:px-4 px-4 py-1 `}
            > */}
            <div className=" mt-3 rounded-lg  bg-gradient-to-b from-[#D9E6FF]">
              {/* <div>
                <h1 className="text-lg font-bold">
                  {date ? date.businessInfo.name : ""}
                </h1>
              </div>
              <MenuButtonBusinessDetails
                business_id={date.businessInfo.businessId}
                business={date}
                store_id={date.stores[0].id}
              /> */}

              {/* <div className="grid grid-cols-2 px-2 md:px-2 mt-2"> */}
              <div className="flex justify-between text-md px-2 md:px-2">
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
                  {/* {date ? date.businessInfo.name : ""} */}
                  {state?.location?.name}
                  {state?.locationState?.name}
                </div>
                <div className="mt-2">
                  {/* <MenuButtonBusinessDetails
                    business_id={date.businessInfo.businessId}
                    business={date}
                    store_id={date.stores[0].id}
                  /> */}

                  <MenuButtonBusinessDetails
                    location_id={date.id}
                    // location_id={state.location.id}
                    revenue_id={date.businessInfo.businessId}
                    // revenue_id={state.location.businessInfo.businessId}
                    // location={date}
                    location={
                      state.location ? state.location : state.locationState
                    }
                    isLocation="true"
                    locationName={date.businessInfo.name}
                    //  locationName={state.location.name}
                    // store_id={date?.stores[0]?.id}
                    store_id={state?.locationState?.id}
                  />
                </div>
              </div>
              {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-5 "> */}
              <div className="flex justify-between text-xs px-2 md:px-2">
                <div className="grid grid-cols-2 text-sm  ">
                  <div className="col-span-2 pt-0.5 ">
                    {date ? date.businessInfo.street : ""}
                  </div>
                  {/* <div className="col-span-2 pt-0.5 ">
                    {date ? date.businessInfo.city : ""}
                  </div>
                  <div className="col-span-2 pt-0.5 ">
                    {date ? date.businessInfo.locality : ""}
                  </div> */}
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
                  <div className="text-black pt-4 text-sm">Owner:</div>
                  <div className="text-black pt-4">
                    {date ? date.businessInfo.owner : ""}
                  </div>
                  <div className="text-black text-sm">Primary Contact:</div>
                  <div className="text-black ">
                    {date ? date.businessInfo.primaryContact : ""}
                  </div>
                  <div className="text-black pt-5 text-sm ">Main Phone:</div>
                  <div className=" pt-5 text-sm">
                    {date ? date.businessInfo.phone : ""}
                  </div>
                  <div className="text-black text-sm  ">Secondary Phone:</div>
                  <div className=" ">
                    {date ? date.businessInfo.secondaryPhone : ""}
                  </div>
                  <div className="text-black pt-5 text-sm ">Business Type:</div>
                  <div className="text-black pt-5 text-sm">
                    {date ? date.businessInfo.businessType : ""}
                  </div>
                  <div className="text-black pt-5 text-sm ">
                    Hours of Operation:
                  </div>
                  <div className="text-black pt-5">
                    {date ? date.businessInfo.hours : ""}
                  </div>
                </div>
                {/* <div className="grid grid-cols-2 md:text-sm text-xs">
                  <div className=" border-4 border-gray-600 map md:w-[180%] w-[200%] md:h-[70%] h-[400px]">
                    <GoogleMapReact
                      className=""
                      defaultOptions={defaultMapOptions}
                      bootstrapURLKeys={{
                        key: "AIzaSyApc0M1lKC3yjjDmGu60zoZHYROlFGRUCw",
                      }}
                      defaultCenter={obj.center}
                      defaultZoom={obj.zoom}
                    > */}
                {/* <AnyReactComponent lat={43.653225} lng={-79.383186} text={Pin} />
                <AnyReactComponent lat={43.653225} lng={-79.383186} text={Pin} />
                <AnyReactComponent
                  lat={43.653225}
                  lng={-79.383186}
                  text={Pin}
                />
                <AnyReactComponent lat={43.837208} lng={-79.508278} text={Pin} />
                */}
                {/* <AnyReactComponent
                        lat={33.47984}
                        lng={-86.91836}
                        // text={Pin}
                      />
                    </GoogleMapReact>
                  </div>
                </div> */}
              </div>
            </div>
            {date.stores.map((item) => (
              <>
                {/* <div
                  className={`border ${"bg-[#D1E0FF] border-[#6598FF]"}   rounded-md    `}
                > */}

                <div
                  className={`border ${
                    alert
                      ? "bg-[#D1E0FF] border-[#6598FF]"
                      : "bg-[#D1E0FF] border-[#6598FF]"
                  }   rounded-md mb-2   `}
                >
                  {/* <div className="flex justify-between text-xs px-2 md:px-2 mt-2 mb-1 pt-2 p-1">
                    <div className="font-bold text-sm">{`${item.id} ${item.sofwareName}`}</div>
                    <div className="text-sm">
                      <MenuButton />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs px-2 md:px-2">
                    <div>Terminals: {item.terminals.length}</div>
                    <div>Status: {item.locationStatus} </div>
                  </div>
                  <div className="flex justify-between text-xs px-2 md:px-2">
                    <div>Session Type: {item.sessionType}</div>
                    <div>
                      <div>Next Potential win : {item.nextPotentialWin} </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs px-2 md:px-2">
                    <div>Skill Type: {item.skillType}</div>
                    <div>
                      <div>Ext. Progressive : </div>
                    </div>
                  </div> */}
                  <div>
                    <div class="flex justify-between mt-2 text-md px-2 md:px-2 ">
                      <div className="text-sm font-semibold">{`${item.name}`}</div>
                      <div className="text-sm">
                        {/* <MenuButton /> */}
                        {/* <MenuButtonBusinessDetails
                           business_id={item.businessInfo.businessId}
                          // business_id={item.businessId}
                          business={item}
                          store_id={item.id}
                        /> */}

                        {/*  using state */}
                        {/* <MenuButtonBusinessDetails
                          location_id={date.id}
                          revenue_id={date.businessInfo.businessId}
                          // location={date}
                          location={state.location}
                          isLocation={true}
                          locationName={date.businessInfo.name}
                          store_id={date?.stores[0]?.id}
                        /> */}

                        <MenuButtonBusinessDetails
                          // business_id={item.businessInfo.businessId}
                          business_id={item.businessId}
                          business={item}
                          store_id={item.id}
                        />

                        {/* <MenuButtonBusinessDetails
                    location_id={date.id}
                    revenue_id={date.businessInfo.businessId}
                    location={date}
                    isLocation={true}
                    locationName={date.businessInfo.name}
                    store_id={date?.stores[0]?.id}
                  /> */}
                      </div>
                    </div>

                    <div class="flex justify-between text-xs px-2 md:px-2">
                      <div className="">
                        Terminals:
                        <strong className="text-[#0000FF]">
                          {item.terminals.length}
                        </strong>
                      </div>
                      <div className="md:pl-14 ">
                        Status: {item.locationStatus}
                      </div>
                    </div>

                    <div class="flex justify-between text-xs px-2 md:px-2">
                      <div className=" md:px-0">Play From Home:</div>
                      <div className="md:pl-14">Updated:</div>
                    </div>

                    <div class="flex justify-between text-xs px-2 md:px-2 mt-2">
                      <div>Session Type: {item.sessionType}</div>
                      <div className="md:pl-14 ">
                        Next Potential win : {item.nextPotentialWin}
                      </div>
                    </div>

                    <div class="flex justify-between text-xs px-2 md:px-2 mb-1">
                      <div>Skill Type: {item.skillType}</div>
                      <div className="md:pl-14">
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
                marginTop: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          </>
        )}
      </div>
    </>
  );
}

export default LocationInfo;
