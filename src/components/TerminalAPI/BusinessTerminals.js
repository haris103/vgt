import MenuButtonTerminals from "./MenuButtonTerminals";
// import gamePic from "../../images/game.png";
import GameTerminalHorizontalDual from "../../images/GameTerminalHorizontalDual.png";
import GameTerminalVertical from "../../images/GameTerminalVertical.png";
import pos from "../../images/pos.png";
import progressive from "../../images/progressive.png";
import RechargeStation from "../../images/RechargeStation.png";
import GameTerminalHorizontalSingle from "../../images/GameTerminalHorizontalSingle.png";
import redemption from "../../images/redemption.png";
import server from "../../images/server.png";
import updated from "../../images/updated.png";
import connect from "../../images/connect.png";
import downward from "../../images/downward.png";

// import warning from "../../images/warning.png";
import { getDay } from "date-fns";

const BusinessTerminals = ({
  terminal,
  business_id,
  business,
  // terminal,
  namee,
  isLocation,
  locationName,

  terminalData,
  location_id,
  a,
  location,
}) => {
  const {
    name,
    icon,
    terminalId,
    role,
    roleDisplayName,
    status,
    stacker,
    lastUpdated,
    connectTime,
    recylerBox,
    alert,
  } = terminal || {};

  // console.log("BusinessTerminals.js running terminal: ", locationName);

  return (
    <>
      <div
        className={`border ${
          alert
            ? "bg-[#FFCCCC] border-[#D65228]"
            : "bg-[#D1E0FF] border-[#6598FF]"
        }   rounded-md mb-2 flex flex-row `}
      >
        <div className="flex justify-center items-center pl-0.5 md:pl-1 mt-2">
          {/* h-13 w-7 */}
          <div className="w-6 h-12 ">
            {roleDisplayName === "Game Terminal: Horizontal Dual Screen" ? (
              <img src={GameTerminalHorizontalDual} className=""></img>
            ) : (
              ""
            )}
            {roleDisplayName === "Game Terminal: Horizontal Single Screen" ? (
              <img src={GameTerminalHorizontalSingle} className=""></img>
            ) : (
              ""
            )}
            {roleDisplayName === "Server" ? (
              <img src={server} className=""></img>
            ) : (
              ""
            )}
            {roleDisplayName === "POS" ? (
              <img src={pos} className=""></img>
            ) : (
              ""
            )}
            {roleDisplayName === "Game Terminal: Vertical" ? (
              <img src={GameTerminalVertical} className=""></img>
            ) : (
              ""
            )}
            {/* {roleDisplayName === "pos" ? (
            <img src={gameTerminalVertical} className="w-6 h-6"></img>
          ) : (
            ""
          )} */}
            {roleDisplayName === "Progressive Display" ? (
              <img src={progressive} className=""></img>
            ) : (
              ""
            )}
            {roleDisplayName === "Recharge Station" ? (
              <img src={RechargeStation} className=""></img>
            ) : (
              ""
            )}
            {roleDisplayName === "Redemption Kiosk" ? (
              <img src={redemption} className=""></img>
            ) : (
              ""
            )}
            {roleDisplayName === "{Pos" ? (
              <img src={pos} className=""></img>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="grow">
          <div className="flex grow justify-between text-xs pl-0.5 mt-2">
            <div className="font-bold text-sm pr-3">{name}</div>
            <div className="text-sm pr-1">
              <MenuButtonTerminals
                business_id={business_id}
                business={business}
                // terminal={terminal}
                // name={namee}
                terminal={terminalData ? terminalData : terminal}
                id={terminalId}
                // location_id={terminalId}
                location_id={location_id}
                location={location}
                locationName={locationName}
                isLocation={location_id ? "true" : "false"}
                terminalName={name}
                terminalRole={terminal.role}
                // isLocationn={isLocation}
              />
            </div>
          </div>

          <div className="flex justify-between text-[11px] sm:text-xs  pl-0.5">
            <div>
              {roleDisplayName === "Game Terminal: Horizontal Single Screen" ||
              roleDisplayName === "Game Terminal: Horizontal Dual Screen" ||
              roleDisplayName === "Game Terminal: Vertical"
                ? "Game Terminal"
                : roleDisplayName}
              : {terminal.IP}
            </div>
            <div className="flex justify-center items-center pr-1">
              <img
                src={updated}
                alt=""
                className="w-2 h-2 mr-[0.85px] md:mr-1 "
              ></img>
              {lastUpdated.slice(2)}
            </div>
          </div>
          <div className="flex justify-between text-[11px] sm:text-xs pl-0.5 mb-1">
            <div>
              Status: <b>{status}</b>
            </div>
            <div>
              <div className="flex justify-center items-center pr-1">
                {connectTime !== "" && connectTime.charAt(0) === "-" ? (
                  <img
                    src={downward}
                    alt=""
                    className="w-2 h-2 mr-[0.85px]"
                  ></img>
                ) : (
                  ""
                )}
                {connectTime !== "" && connectTime.charAt(0) !== "-" ? (
                  <img
                    src={connect}
                    alt=""
                    className="w-2 h-2 mr-[0.85px] "
                  ></img>
                ) : (
                  ""
                )}

                {connectTime.replace("-", "")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessTerminals;
