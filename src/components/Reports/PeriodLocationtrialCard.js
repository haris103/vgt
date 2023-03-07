import React, { Component } from "react";
import MenuButton from "../Overview/MenuButton";
import { Link, useNavigate } from "react-router-dom";
import updated from "../../images/updated.png";

function PeriodLocationTrialCard({
  business_id,
  id,
  location,
  storeName,
  storeId,

  storeBussinessInfoStreet,
  storeBussinessInfoCity,
  storeBussinessInfoLocality,
  storeBussinessInfoXipPostal,
  storeSoftwareName,
  storeStatusMsg,
  storeTerminalsLength,
  storeLastUpdate,
  storeLocality,
}) {
  const navigate = useNavigate();
  const handleNavigateTerminal = (id) => {
    console.log("iddddddddddddddddddd", id);
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
    <>
      <div className={`bg-gradient-to-b from-[#D9E6FF] rounded-md `}>
        <div className="flex justify-between px-1 md:px-1 mt-2">
          <div className="">
            <p className="font-bold text-md ">{storeName}</p>
            <p className="text-xs ">{storeBussinessInfoStreet}</p>
            <p className="text-xs ">
              {storeBussinessInfoCity}, {storeLocality}{" "}
              {storeBussinessInfoXipPostal}
              {/* {storeBussinessInfoLocality} {""} */}
              {/* {storeBussinessInfoXipPostal}, {storeLocality} */}
            </p>
          </div>
          <MenuButton
            // business={business}

            business_id={business_id}
            location_id={id}
            isLocation={true}
            location={location}
            name={storeName}
            store_id={location.id} //
            locationName={storeName}
          />
        </div>
        <div class=" flex justify-between text-[11px] sm:text-xs mt-2 px-1">
          <div className="text-left"> {storeSoftwareName}</div>
          <div className="text-left"> {storeStatusMsg}</div>
          {/* <div
            onClick={() => handleNavigateTerminal(storeId)}
            className="col-span-2 text-right text-[#0000FF] font-semibold cursor-pointer "
          >
            {storeTerminalsLength} Terminals
          </div> */}
          {storeTerminalsLength === 0 ? (
            <div className="col-span-2 text-right text-[#2a2a2a] font-semibold pointer-events-none opacity-40 ">
              {storeTerminalsLength} Terminals
            </div>
          ) : (
            <div
              onClick={() => handleNavigateTerminal(storeId)}
              className="col-span-2 text-right text-[#0000FF] font-semibold cursor-pointer "
            >
              {storeTerminalsLength} Terminals
            </div>
          )}

          <div className="col-span-4 sm:col-span-4 text-[11px] sm:text-xs">
            <div className="flex justify-end items-center">
              <img src={updated} alt="" className="w-3 h-3"></img>
              {storeLastUpdate.slice(2)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PeriodLocationTrialCard;
