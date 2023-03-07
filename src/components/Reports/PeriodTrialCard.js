import React from "react";
import { useNavigate } from "react-router-dom";
import MenuButton from "../Overview/MenuButton";
import PeriodMenuButton from "./PeriodMenuButton";
import updated from "../../images/updated.png";
import { moment } from "moment";
import { format } from "date-fns";

function PeriodTrialCard({
  // heading,
  // mainphone,
  // secondaryphone,
  // alert,
  // houseNumber,
  // address,
  // stores,
  business,
  // business_id,
}) {
  // console.log("stores are ", heading);
  // console.log("business ID", business_id);
  const navigate = useNavigate();

  const handleNavigateTerminal = (id, name) => {
    console.log("kkk", id);
    navigate(`/terminals`, {
      // state: {
      //   business,
      //   store_id:id
      // },
      state: business,
    });
    localStorage.setItem("activeItem", true);
    localStorage.setItem("storeId", id);
  };
  return (
    <>
      <div className={`bg-gradient-to-b from-[#D9E6FF] rounded-md `}>
        <div className="flex justify-between px-1 sm:px-1 mt-2">
          <div>
            <p className="font-bold text-md md:text-md ">
              {business.businessInfo.name}
            </p>
            <p className="text-xs ">{business.businessInfo.street}</p>
            <p className="text-xs ">
              {business.businessInfo.city}, {""}
              {business.businessInfo.locality} {""}
              {business.businessInfo.zipPostal}
            </p>
          </div>
          <MenuButton
            Period_business_terminal={business.stores[0]}
            business={business}
            store_id={business.stores[0].id}
            business_id={business.businessInfo.businessId}
            name={business.businessInfo.name}
          />
          {/* <PeriodMenuButton
            Period_business_terminal={business}
            store_id={business.stores[0].id}
            business_id={business.businessInfo.businessId}
            name={business.businessInfo.name}
          /> */}
        </div>

        {business.stores.map((store, key) => (
          <>
            {/* <div className="grid grid-cols-12 text-xs mt-2  ">
              <div className="col-span-2 font-bold text-right">{store.id}</div>
              <div className=" text-left">{store.sofwareName}</div>
              <div className="text-left">{store.statusMsg} </div>
              <div
                onClick={() =>
                  handleNavigateTerminal(store.id, store.sofwareName)
                }
                className="col-span-3 text-[#0000FF]  font-bold text-right cursor-pointer"
              >
                {store.terminals.length} Terminals
              </div>
              <div className="col-span-7 ">Updated: {store.lastUpdate}</div>
            </div> */}

            {/* <div className="grid grid-cols-12 text-xs mt-2  ">
              <div className="col-span-2 mr-4 font-bold text-right">
                {store.id}
              </div>
              <div className="w-12 text-left">{store.sofwareName}</div>
              <div className=" text-left">{store.statusMsg} </div>
              <div
                onClick={() =>
                  handleNavigateTerminal(store.id, store.sofwareName)
                }
                className="col-span-3 text-[#0000FF] font-bold text-right cursor-pointer pl-2"
              >
                {store.terminals.length} Terminals
              </div>
              <div className="col-span-5 w-52 md:px-12 md:mr-2">
                Updated: {store.lastUpdate}
              </div>
            </div> */}

            {/* <div className="grid grid-cols-12 text-xs mt-2 px-1  ">
              <div className="col-span-2 md:mr-[48px] mr-2.5 font-bold text-right">
                {store.id}
              </div>
              <div className="ml-2 md:ml-[-10px] text-left">
                {store.sofwareName}
              </div>
              <div className="ml-[20px] text-left">{store.statusMsg} </div>
              <div
                onClick={() =>
                  handleNavigateTerminal(store.id, store.sofwareName)
                }
                className="col-span-4 mr-[14px] text-[#0000FF] font-bold text-right cursor-pointer"
              >
                {store.terminals.length} Terminals
              </div>

              <div className="col-span-4 ml-2 md:ml-[100px]">
                <div className="flex justify-center items-center">
                  <img
                    src={updated}
                    alt=""
                    className="w-3 h-3 mr-[0.85px] md:mr-1"
                  ></img>
                  {store.lastUpdate}
                </div>
              </div>
            </div> */}

            {/* <div className="grid grid-cols-8 text-xs mt-2 px-1  bg-red-400">
              <div className=" font-bold text-right bg-orange-300">{store.id}</div>
              <div className="ml-[5px] md:ml-[40px] text-left bg-indigo-400">
                {store.sofwareName}
              </div>
              <div className="ml-[10px] md:ml-[60px] text-left bg-blue-800">
                {store.statusMsg}{" "}
              </div>
              <div
                onClick={() =>
                  handleNavigateTerminal(store.id, store.sofwareName)
                }
                className="col-span-2 text-[#0000FF] font-bold text-right cursor-pointer bg-gray-400"
              >
                {store.terminals.length} Terminals
              </div>

              <div className="col-span-3 md:ml-[160px] bg-green-300">
                <div className="flex justify-center items-center">
                  <img
                    src={updated}
                    alt=""
                    className="w-3 h-3 mr-[0.85px] md:mr-1"
                  ></img>
                  {store.lastUpdate.slice(2)}
                </div>
              </div>
            </div> */}
            <div className="grid grid-cols-12 text-[11px] sm:text-xs mt-2 px-1  ">
              <div className="col-span-2 sm:col-span-2 font-bold text-right text-[11px] sm:text-xs mr-2 sm:mr-14">
                {store.id}
              </div>
              {/* <div className="col-span-2 sm:col-span-2 sm:text-center hidden sm:block text-left text-[11px] sm:text-xs">
                {store.sofwareName}
              </div> */}

              {/* <div className="col-span-1 sm:w-auto sm:col-span-2 hidden sm:block text-left ml-2s text-[11px] sm:text-xs">
                {store.statusMsg}
              </div> */}
              {/* <div className="sm:hidden text-left block col-span-3 flex justify-around items-center text-[11px] sm:text-xs">
                <div className="text-left">{store.sofwareName}</div>
                <div className="text-left">{store.statusMsg}</div>
              </div> */}
              <div className="col-span-2 sm:col-span-2 text-left text-[11px] sm:text-xs mr-4 sm:mr-0">
                {store.sofwareName}
              </div>
              <div className="col-span-1 sm:col-span-1 text-left text-[11px] sm:text-xs pr-2">
                {store.statusMsg}
              </div>
              {store.terminals.length === 0 ? (
                <div className="col-span-3 sm:col-span-3 text-right text-[#2a2a2a] font-semibold pointer-events-none opacity-40 sm:text-center text-[11px] sm:text-xs pl-2">
                  {store.terminals.length} Terminals
                </div>
              ) : (
                <div
                  onClick={() =>
                    handleNavigateTerminal(store.id, store.sofwareName)
                  }
                  className="col-span-3 sm:col-span-3 text-[#0000FF] font-semibold sm:text-center cursor-pointer text-right text-[11px] sm:text-xs pl-2"
                >
                  {store.terminals.length} Terminals
                </div>
              )}

              <div className="col-span-4 sm:col-span-4 text-[11px] sm:text-xs">
                <div className="flex justify-end items-center">
                  <img src={updated} alt="" className="w-3 h-3"></img>
                  {store.lastUpdate.slice(2)}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default PeriodTrialCard;
