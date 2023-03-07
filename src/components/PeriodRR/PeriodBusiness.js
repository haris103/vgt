import React from "react";

import { useNavigate } from "react-router-dom";
import MenuButton from "../Overview/MenuButton";

function PeriodBusiness({
  heading,
  mainphone,
  secondaryphone,
  alert,
  houseNumber,
  address,
  stores,
  business,
  business_id,
}) {
  console.log("stores are ", heading);
  console.log("business ID", business_id);
  const navigate = useNavigate();

  const handleNavigateTerminal = (id, name) => {
    navigate(`/terminalapi/${id}`, {
      state: business,
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
            business={business}
            store_id={stores[0].id}
            business_id={business_id}
            name={heading}
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

      {/* if you see there is an array of detail coming in object */}
      {stores.map((store, key) => (
        <>
          {/* <div className="flex space-x-5 mt-5 mb-1 items-center"></div> */}
          {/* <div className="flex space-x-5 mt-5 mb-1 items-center"></div> */}

          <div className="grid grid-cols-5 text-xs mt-1.5 mb-1">
            <div className="text-right md:pr-24 font-bold px-6 ">
              {" "}
              {store.id}
            </div>
            <div className=" text-left ">{store.sofwareName}</div>
            <div className="text-left "> {store.statusMsg}</div>
            <div
              onClick={() =>
                handleNavigateTerminal(store.id, store.sofwareName)
              }
              className=" text-right text-[#0000FF] font-bold cursor-pointer "
            >
              {store.terminals.length} Terminals
            </div>
            <div className=" text-right text-[#0000FF] font-bold"></div>
          </div>
        </>
      ))}
    </div>
  );
}

export default PeriodBusiness;
