import React from "react";

import { useNavigate } from "react-router-dom";
import MenuButton from "./MenuButton";
import { IoAlertSharp, IoGridSharp } from "react-icons/io5";
// import iconalert from "../../images/icon-alert01.png";
import closed from "../../images/closed.png";
import hold from "../../images/hold.png";
import offline from "../../images/offline.png";
import online from "../../images/online.png";
import main from "../../images/one.png";
import secondary from "../../images/two.png";

function TrialCard({
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
  // console.log("stores are ", heading);
  // console.log("business ID", business_id);
  // console.log("Stores in TrialCard.js", stores);

  const navigate = useNavigate();
  const handleNavigateTerminal = (id, name) => {
    navigate(`/terminals`, {
      state: business,
    });
    localStorage.setItem("activeItem", true);
    localStorage.setItem("storeId", id);
  };
  return (
    <div
      className={`border ${
        stores[0].alerts.length
          ? "bg-[#FFCCCC] border-[#D65228]"
          : "bg-[#D1E0FF] border-[#6598FF]"
      }   rounded-md    `}
    >
      <div className="flex justify-between px-1 md:px-1 mt-2">
        <div className="font-bold text-md">{heading}</div>
        <div className="text-sm">
          <MenuButton
            business={business}
            store_id={stores[0].id}
            business_id={business_id}
            name={heading}
            isLocation={false}
          />
        </div>
      </div>

      <div className="flex justify-between text-[11px] sm:text-xs px-1 md:px-1">
        <div>{houseNumber}</div>
        <div className="flex justify-center items-center">
          {mainphone !== "" ? (
            <img src={main} alt="" className="w-4 h-4 mr-1 "></img>
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
            <img src={secondary} alt="" className="w-4 h-4 mr-1 "></img>
          ) : (
            ""
          )}
          {secondaryphone}
        </div>
      </div>

      {/* if you see there is an array of detail coming in object */}
      {stores.map((store, key) => (
        <>
          {/* <div className="flex space-x-5 mt-5 mb-1 items-center"></div> */}
          {/* <div className="flex space-x-5 mt-5 mb-1 items-center"></div> */}

          <div className="grid grid-cols-9 text-[11px] sm:text-xs mt-2 mb-1 px-1">
            <div className=" ">
              {store.statusMsg === "offline" ? (
                <>
                  <img src={offline} className="w-4 h-4"></img>
                </>
              ) : (
                ""
              )}
              {store.statusMsg === "online" ? (
                <>
                  <img src={online} className="w-4 h-4"></img>
                </>
              ) : (
                ""
              )}
              {/* {
              store.statusMsg === "online"?<><IoAlertSharp className="text-[#f54e4c]" /></> : ""
            } */}
              {store.statusMsg === "hold" ? (
                <>
                  {/* <IoAlertSharp className="text-[#f54e4c]" /> */}
                  <img src={hold} className="w-4 h-4 "></img>
                </>
              ) : (
                ""
              )}
              {store.statusMsg === "closed" ? (
                <>
                  <img src={closed} className="w-4 h-4"></img>
                </>
              ) : (
                ""
              )}

              {/* {store.id} */}
            </div>
            <div className="-ml-2 md:mr-[40px] font-bold text-right ">
              {store.id}
            </div>
            <div className="col-span-2 ml-8 md:ml-10 text-left ">
              {store.sofwareName}
            </div>
            <div className="text-left ml-[20px]"> {store.statusMsg} </div>
            {store.terminals.length === 0 ? (
              <div className="col-span-3 -mr-6 md:mr-[70px] text-right text-[#2a2a2a] font-semibold pointer-events-none opacity-40">
                {store.terminals.length} Terminals
              </div>
            ) : (
              <div
                onClick={() =>
                  handleNavigateTerminal(store.id, store.sofwareName)
                }
                className="col-span-3 -mr-6 md:mr-[70px] text-right text-[#0000FF] font-semibold cursor-pointer "
              >
                {store.terminals.length} Terminals
              </div>
            )}

            {store.alerts.length > 0 ? (
              <>
                {/* <div className=" text-center text-[#0000FF] font-bold">
                  {store.alerts.length}Alerts
                </div> */}
              </>
            ) : (
              ""
            )}
          </div>
        </>
      ))}
    </div>
  );
}

export default TrialCard;
