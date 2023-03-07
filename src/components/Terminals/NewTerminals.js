import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewTerminalsCard from "./NewTerminalsCard";
// import Trial from "./Trial";

function NewTerminals() {
  const [active, setActive] = useState(true);
  let arrOfBusiness = [
    // data used in the business tab
   
    {
      heading: "SW2-FC-001",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "-0d 12h 26m",
      alert: true,
    
      houseNumber: "Game Terminal: 10.0.42.1",
      address: "Status: Not Connected ",

      id: "11704",
      sweeps: "V1 Sweeps",
      time: "Online",
      terminal: "12 Terminals",

      id1: "11705",
        sweeps1: "V2 Sweeps",
       time1: "Online",
          terminal1: "18 Terminals",
          alerts1: "1"

    },

    {
      heading: "SW2-FC-009",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: true,
     
      id: "10294",
      sweeps: "V2 Pay to Play",
          time: "Online",
          terminal: "29 Terminals",
          alerts: "",
      houseNumber: "Game Terminal: 10.0.42.9",
      address: "Status: Printer Out of Paper ",

      id1: "10429",
      sweeps1: "V2 Pay to Play",
      time1: "Online",
      terminal1: "3 Terminals",
    },

    {
      heading: "SW2-RK-001",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
      // detail: [
      //   {
      //     id: "10023",
      //     sweeps: "V2 Sweeps",
      //     time: "Closed",
      //     terminal: "9",

      //   },
      //   {
      //     id: "10121",
      //     sweeps: "V2 Pay to Play",
      //     time: "Online",
      //     terminal: "3",
      //   },
      // ],
      id: "10023",
          sweeps: "V2 Sweeps",
          time: "Closed",
          terminal: "9 Terminals",
      houseNumber: "1746 Independence Blvd",
      address: "Charlotte, NC 28217 ",

      id1: "10121",
     sweeps1: "V2 Pay to Play",
      time1: "Online",
      terminal1: "3 Terminals",
    },

    {
      heading: "Rockin' Mart",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
      // detail: [
      //   {
      //     id: "10319",
      //     sweeps: "V2 Pay to Play",
      //     time: "Online",
      //     terminal: "11",
      //   },

      // ],
         id: "10319",
          sweeps: "V2 Pay to Play",
          time: "Online",
          terminal: "11 Terminals",
      houseNumber: "10651 W Lynchburg Salem Trumpike",
      address: "Montvale, VA 23412 ",
    },

    {
      heading: "VFW Post 4321",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
     
      id: "10297",
          sweeps: "V2 Pull-Tabs",
          time: "On Hold",
          terminal: "5 Terminals",
      houseNumber: "7321 Chester McKay Dr.",
      address: "New Port Richey, FL 34987 ",
    },

    {
      heading: "High Roller Bingo",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
      // detail: [
      //   {
      //     id: "10023",
      //     sweeps: "V2 Sweeps",
      //     time: "Closed",
      //     terminal: "4",
      //   },
       
      // ],
      id: "10023",
          sweeps: "V2 Sweeps",
          time: "Closed",
          terminal: "4",
      houseNumber: "1234 Sumware Blvd",
      address: "Farfeild ,AI 35064 ",
    },

    {
      heading: "High Roller Bingo",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: true,
      // detail: [
      //   {
      //     id: "10023",
      //     sweeps: "V2 Sweeps",
      //     time: "Closed",
      //     terminal: "4",
      //     alerts: "1",
      //   },
      //   {
      //     id: "10023",
      //     sweeps: "V2 Sweeps",
      //     time: "Closed",
      //     terminal: "4",
      //   },
      // ],
      id: "10023",
          sweeps: "V2 Sweeps",
          time: "Closed",
          terminal: "4 Terminals",
          alerts: "1",
      houseNumber: "1234 Sumware Blvd",
      address: "Farfeild ,AI 35064 ",
    },

    {
      heading: "High Roller Bingo",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
      // detail: [
      //   {
      //     id: "10023",
      //     sweeps: "V2 Sweeps",
      //     time: "On Hold",
      //     terminal: "4",
      //   },
      //   {
      //     id: "10023",
      //     sweeps: "V2 Sweeps",
      //     time: "On Hold",
      //     terminal: "4",
      //   },
      // ],
      id: "10023",
      sweeps: "V2 Sweeps",
      time: "On Hold",
      terminal: "4 Terminals",

      houseNumber: "1234 Sumware Blvd",
      address: "Farfeild ,AI 35064 ",
    },
  ];

  // data used in the location tab
  let arrOfLocation = [
    
    {
      heading: "1704 Game Time",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: true,
      // detail: [
      //   {  
      //     sweeps: "V2 Sweeps",
      //     time: "Online",
      //     terminal: "12",
      //     alerts:"1"
      //   },

      // ],
      sweeps: "V2 Sweeps",
      time: "Online",
      terminal: "12 Teriminals",
      alerts:"1",
      houseNumber: "15215 US 19",
      address: "Hudson FL, 34467 ",
    },
    {
      heading: "10023 Internet Cafe",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
      // detail: [
      //   {         
      //     sweeps: "V2 Sweeps",
      //     time: "Closed",
      //     terminal: "9",

      //   },

      // ],
      sweeps: "V2 Sweeps",
      time: "Closed",
      terminal: "9 Terminals",
      houseNumber: "1746 Independence Blvd",
      address: "Charlotte, NC 28217 ",
    },

    {
      heading: "10121 Internet Cafe",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
      // detail: [
      //   {
      //     sweeps: "V2 Pay to Play",
      //     time: "Online",
      //     terminal: "3",
      //   },
      // ],
      sweeps: "V2 Pay to Play",
          time: "Online",
          terminal: "3 Terminals",
      houseNumber: "1746 Independence Blvd",
      address: "Charlotte, NC 28217 ",
    },

    {
      heading: "10294 High Roller Bingo",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
      // detail: [
      //   {
      //     sweeps: "V2 Pay to Play",
      //     time: "Online",
      //     terminal: "29",
      //     alerts: "",
      //   },
      // ],
      sweeps: "V2 Pay to Play",
      time: "Online",
      terminal: "29 Terminals",
      alerts: "",

      houseNumber: "1234 Sumware Blvd",
      address: "Farfeild ,AI 35064 ",
    },

    {
      heading: "10297 VFW Post 4321",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
      // detail: [
      //   {         
      //     sweeps: "V2 Pull-Tabs",
      //     time: "On Hold",
      //     terminal: "5",
      //   },        
      // ],
      sweeps: "V2 Pull-Tabs",
      time: "On Hold",
      terminal: "5 Terminals",

      houseNumber: "7321 Chester McKay Dr.",
      address: "New Port Richey, FL 34987",
    },

    {
      heading: "10319 Rockin' Mart",
      mainphone: "2022-02-24 13:23:22",
      secondaryphone: "5d 13h 16m",
      alert: false,
      // detail: [
      //   {         
      //     sweeps: "V2 Pay to Play",
      //     time: "Online",
      //     terminal: "11",
      //   },        
      // ],
      sweeps: "V2 Pay to Play",
          time: "Online",
          terminal: "11 Terminals",
      houseNumber: "10651 W Lynchburg Salem Turnpike",
      address: "Montvale, VA 23412",
    },   
  ];

  return (
    <div className="m-3 lg:px-72 md:px-32 px-1">
      <div>
        <div className="flex items-center absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mt-0.5 font-semibold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <Link to='/'>
            <p className=" font-semibold text-lg mt-2 mb-2">Back</p>
          </Link>
        </div>
        <p className="text-center font-bold text-2xl mt-8 mb-10 ">Overview</p>
      </div>

      <div className="flex justify-around rounded-full mb-3">
        {/* these 2 are tabs by default business tab is active,
         i use state which change onClick if the state is true,
          then business tab will be active, else location tab  */}
        <div
          className={`border border-[#7F99CC] w-full border-r-0 text-center p-2 rounded-l-lg font-bold pointer ${active ? "bg-[#7F99CC] text-white " : ""
            }`}
          onClick={() => setActive(true)}
        >
          Business
        </div>
        <div
          className={`border border-[#6C6C6C] w-full text-center p-2 rounded-r-lg font-bold ${!active ? "bg-[#7F99CC] text-white " : ""
            }`}
          onClick={() => setActive(false)}
        >
          Location
        </div>
      </div>
      <div className="flex justify-between md mb-3">
        <div>
          <span className="font-bold">5 </span>{" "}
          <span className=" font-semibold">Businesses</span>
        </div>
        <div>
          <span className="font-bold">8 </span>{" "}
          <span className="font-semibold">
            Locations <span className="text-[#EE0000]"> (1 Alert)</span>
          </span>
        </div>
        <div className="px-3">
          <span className="font-bold ">90 </span>{" "}
          <span className="font-semibold">Terminals</span>
        </div>
      </div>

      <div className="grid  grid-cols-1 gap-5">
        {/* here if the active is true then it will show data related to business else location */}
        {active ? (
          <>
            {/* here i map arr of business and send data in component using props  */}
            {arrOfBusiness.map((v, k) => (
             
                <NewTerminalsCard
                  heading={v?.heading}
                  mainphone={v.mainphone}
                  secondaryphone={v.secondaryphone}
                  alert={v.alert}
                  detail={v.detail}
                  houseNumber={v.houseNumber}
                  address={v.address}
                  id={v.id}
                  sweeps={v.sweeps}
                  time={v.time}
                  terminal={v.terminal}
                  id1={v.id1}
                  sweeps1={v.sweeps1}
                  time1={v.time1}
                  terminal1={v.terminal1}
                />
                
             
            ))}

{/*             
             <div className="flex">
          <p className="flex-none w-14 h-14">
            {id}
          </p>
          <p className="flex-initial w-64 ...">
            {sweeps}
          </p>
          <p className="flex-initial w-32 ...">
           {terminal} Terminals
          </p>
        </div> */}
          </>
        ) : (
          <>
            {arrOfLocation?.map((v, k) => (
              <NewTerminalsCard
                heading={v?.heading}
                mainphone={v.mainphone}
                secondaryphone={v.secondaryphone}
                alert={v.alert}
                detail={v.detail}
                houseNumber={v.houseNumber}
                address={v.address}
                id={v.id}
                sweeps={v.sweeps}
                time={v.time}
                terminal={v.terminal}
              />
            ))}
                      
          </>
        )}
      </div>
    </div>
  );
}

export default NewTerminals;