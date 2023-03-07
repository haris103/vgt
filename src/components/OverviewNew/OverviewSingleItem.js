import React from "react";
import vertical from "../../images/gameTerminalVertical.png";
import horizontalDouble from "../../images/gameTerminalhorizontalDouble.png";
import horizontalSingle from "../../images/gameTerminalhorizontalSingle.png";
import pos from "../../images/pos.png";
import progressiveDisplay from "../../images/progressiveDisplay.png";
import rechargeStation from "../../images/rechargeStation.png";
import redemptionKiosk from "../../images/redemptionKiosk.png";
import server from "../../images/server.png";
import SingleTerminalMenu from "../TerminalNew/SingleTerminalMenu";
const images = {
  vertical,
  horizontalDouble,
  horizontalSingle,
  pos,
  progressiveDisplay,
  rechargeStation,
  redemptionKiosk,
  server,
};
const SingleTerminalItem = ({ terminal }) => {
  const {
    title,
    icon,
    ipName,
    status,
    staker,
    lastUpdate,
    connectTime,
    recylerBox,
    alertStatus,
    id,
    sweeps,
    time,
    terminals,
    id1,
    sweeps1,
    time1,
    terminals1,
    alerts,
    id2,
    sweeps2,
    time2,
    terminals2,
    id3,
    sweeps3,
    time3,
    terminals3,
  } = terminal || {};

  return (
    <div
      className={`flex justify-between border-2 my-2  ${
        alertStatus
          ? "bg-[#FFCCCC] border-[#D44A1E]"
          : "bg-[#D1E0FF] border-[#6598FF]"
      } rounded-md p-2`}
    >
      <div>
        <div className="flex items-start">
          {/* <img
            className="w-7 mt-1 h-auto object-contain"
            src={images[icon]}
            alt=""
          /> */}
          <div className="ml-2">
            <h3 className="font-bold">{title}</h3>
            <p className="text-xs">{ipName}</p>
            <p className="text-xs">{status}</p>

            <div class="flex">
              <div class="flex-none w-14 text-sm font-bold text-right">
                {id}
              </div>
              <div class="px-4 flex-initial w-32 text-sm font-semibold text-left">
                {sweeps}
              </div>
              <div class="px-4 flex-initial w-32 text-sm font-semibold text-left">
                {time}
              </div>
              <div class="flex-initial w-32 text-sm font-bold text-right ">
                {terminals}
              </div>
              <div class="flex-initial w-32 text-sm font-bold text-right ">
                {alerts}
              </div>
            </div>

            <div class="flex">
              <div class="flex-none w-14 text-sm font-bold text-right">
                {id1}
              </div>
              <div class="px-4 flex-initial w-32 text-sm font-semibold text-left">
                {sweeps1}
              </div>
              <div class="px-4 flex-initial w-32 text-sm font-semibold text-left">
                {time1}
              </div>
              <div class="flex-initial w-32 text-sm font-bold text-right ">
                {terminals1}
              </div>
            </div>

            <div class="flex">
              <div class="flex-none w-14 text-sm font-bold text-right">
                {id2}
              </div>
              <div class="px-4 flex-initial w-32 text-sm font-semibold text-left">
                {sweeps2}
              </div>
              <div class="px-4 flex-initial w-32 text-sm font-semibold text-left">
                {time2}
              </div>
              <div class="flex-initial w-32 text-sm font-bold text-right ">
                {terminals2}
              </div>
            </div>

            <div class="flex">
              <div class="flex-none w-14 text-sm font-bold text-right">
                {id3}
              </div>
              <div class="px-4 flex-initial w-32 text-sm font-semibold text-left">
                {sweeps3}
              </div>
              <div class="px-4 flex-initial w-32 text-sm font-semibold text-left">
                {time3}
              </div>
              <div class="flex-initial w-32 text-sm font-bold text-right ">
                {terminals3}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right -mt-3">
        <SingleTerminalMenu />
        <p className="text-xs">
          Main Phone:<b> {lastUpdate}</b>
        </p>
        <p className="text-xs">
          Secondary Phone:<b> {connectTime}</b>
        </p>
      </div>
    </div>
  );
};

export default SingleTerminalItem;
