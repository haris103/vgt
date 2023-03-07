import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import MenuButton from "./MenuButton";
import { IoAlertSharp, IoGridSharp } from "react-icons/io5";
import hold from "../../images/hold.png";
import closed from "../../images/closed.png";
import offline from "../../images/offline.png";
import online from "../../images/online.png";
import main from "../../images/one.png";
import secondary from "../../images/two.png";

function LocationTrialCard({
  heading,
  mainphone,
  secondaryphone,
  alert,
  detail,
  houseNumber,
  address,
  id,
  sweeps,
  time,
  terminal,
  location,
  stores,
  business,
  business_id,
  location_id,
}) {
  const navigate = useNavigate();
  console.log("Location Id:", id, location);

  const handleNavigateTerminal = (m, name) => {
    navigate(`/terminals`, {
      state: {
        locationState: location,
        isLocation: true,
      },
    });
    localStorage.setItem("activeItem", false);
    localStorage.setItem("storeId", id);
  };
  return (
    <div
      className={`border ${
        time === "alert"
          ? "bg-[#FFCCCC] border-[#D65228]"
          : "bg-[#D1E0FF] border-[#6598FF]"
      }   rounded-md    `}
    >
      {/* <div className="flex justify-between text-xs px-2 md:px-2 mt-1">
        <div className="font-bold text-sm">{heading}</div>
        <div className="text-sm">
          <MenuButton />
        </div>
      </div>
      <div className="flex justify-between text-xs px-2 md:px-2">
        <div>{houseNumber}</div>
        <div>Main: {mainphone} </div>
      </div>
      <div className="flex justify-between text-xs px-2 md:px-2">
        <div>{address}</div>
        <div>Secondary: {secondaryphone} </div>
      </div>
      <>
        <div className="flex space-x-5 mt-5 mb-2 items-center"></div>
        <div className="-mt-6 px-5">
          <div className="grid grid-cols-4 text-xs">
            <div className="text-left"> {sweeps}</div>
            <div className="text-left ">{time}</div>
            <div className="text-right text-[#0000FF] font-bold">
              {terminal} Terminals
            </div>
            <div className="text-right text-[#0000FF] font-bold"></div>
          </div>
        </div>
      </> */}

      <div className="flex justify-between px-1 md:px-1 mt-2">
        <div className="font-bold text-md">{heading}</div>
        <div className="text-sm">
          <MenuButton
            // business={business}
            business_id={location_id}
            // location_id={location_id}

            isLocation={true}
            location={location}
            locationName={heading}
            name={heading}
            store_id={location.id}
          />
        </div>
      </div>

      <div className="flex justify-between text-[11px] sm:text-xs px-1 md:px-1">
        <div>{houseNumber}</div>
        <div className="flex justify-center items-center">
          {mainphone !== "" ? (
            <img src={main} alt="" className="w-4 h-4 mr-1"></img>
          ) : (
            ""
          )}
          {mainphone}
        </div>
      </div>
      <div className="flex justify-between text-[11px] sm:text-xs px-1 md:px-1">
        <div>{address}</div>
        <div className="flex justify-center items-center">
          {secondaryphone !== "" ? (
            <img src={secondary} alt="" className="w-4 h-4 mr-1"></img>
          ) : (
            ""
          )}
          {secondaryphone}
        </div>{" "}
      </div>

      <>
        <div className="grid grid-cols-7 text-[11px] sm:text-xs mt-1.5 mb-1">
          {/* <div className="text-right font-bold px-6 "> {store.id}</div> */}
          <div className="px-1">
            {/* <div className="sm:pr-0 md:pr-0 font-bold ml-[30px]"> */}
            {time === "offline" ? (
              <>
                <img src={offline} className="w-4 h-4 mr-3"></img>
              </>
            ) : (
              ""
            )}

            {time === "online" ? (
              <>
                <img src={online} className="w-4 h-4 mr-3"></img>
              </>
            ) : (
              ""
            )}
            {/* {
              time === "online"?<><IoAlertSharp className="text-[#f54e4c]" /></> : ""
            } */}
            {time === "hold" ? (
              <>
                {/* <IoAlertSharp className="text-[#000000]" /> */}
                <img src={hold} className="w-4 h-4 mr-3"></img>
              </>
            ) : (
              ""
            )}
            {time === "closed" ? (
              <>
                <img src={closed} className="w-4 h-4 mr-3"></img>
              </>
            ) : (
              ""
            )}

            {/* {store.id} */}
          </div>
          <div className="col-span-2 text-left px-4">{sweeps}</div>
          <div className="text-left "> {time}</div>
          {terminal === 0 ? (
            <div className="col-span-2 text-right text-[#2a2a2a] font-semibold pointer-events-none opacity-40 ">
              {terminal} Terminals
            </div>
          ) : (
            <div
              onClick={() => handleNavigateTerminal(id)}
              className="col-span-2 text-right text-[#0000FF] font-semibold cursor-pointer "
            >
              {terminal} Terminals
            </div>
          )}

          <div className=" text-right text-[#0000FF] font-bold"></div>
        </div>
      </>
    </div>
  );
}

export default LocationTrialCard;
