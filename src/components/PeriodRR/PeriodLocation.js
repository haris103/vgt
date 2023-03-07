import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { Link, useNavigate } from "react-router-dom";
import MenuButton from "../Overview/MenuButton";

function PeriodLocation({
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
}) {
  const navigate = useNavigate();

  const handleNavigateTerminal = (id, name) => {
    navigate(`/terminallocationapi/${id}`, {
      state: {
        locationState: location,
        isLocation: true,
      },
    });
  };
  return (
    <div
      className={`border ${
        alert
          ? "bg-[#FFCCCC] border-[#D65228]"
          : "bg-[#D1E0FF] border-[#6598FF]"
      }   rounded-md    `}
    >
      <div className="flex justify-between text-xs px-2 md:px-2 mt-2">
        <div className="font-bold text-sm">{heading}</div>
        <div className="text-sm">
          <MenuButton
            // business={business}
            // business_id={business_id}
            location_id={id}
            isLocation={true}
            location={location}
            // store_id={stores[0].id}
            locationName={heading}
          />
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
        <div className="grid grid-cols-7 text-xs mt-1.5 mb-1">
          {/* <div className="text-right font-bold px-6 "> {store.id}</div> */}
          <div className="col-span-2 text-left px-4">{sweeps}</div>
          <div className="text-left "> {time}</div>
          <div
            onClick={() => handleNavigateTerminal(id)}
            className="col-span-2 text-right text-[#0000FF] font-bold cursor-pointer "
          >
            {terminal} Terminals
          </div>
          <div className=" text-right text-[#0000FF] font-bold"></div>
        </div>
      </>
    </div>
  );
}

export default PeriodLocation;
