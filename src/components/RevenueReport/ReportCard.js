import React from "react";
import { Link } from "react-router-dom";
import reportperiod_b from "../../images/icon-reportRevenue01b.png";
import reportperiod_a from "../../images/icon-reportRevenue01a.png";

function ReportCard({ title, subtitle }) {
  return (
    // <Link to="/revenuereport" className="w-full">
    <Link to="/revenuereport" className="w-full group">
      <div className="cursor-pointer h-40 w-full flex flex-col justify-around items-center rounded-lg border border-[#585C68] bg-white group-hover:bg-[#7F99CC] hover:text-white focus:text-white">
        <p className="font-bold text-lg">{title}</p>
        <p className="font-semibold ">{subtitle}</p>

        <div className=" rounded-full p-3 mb-2 bg-white group-hover:bg-[#7F99CC] group-hover:hidden">
          <img src={reportperiod_a} className="w-12 h-12"></img>
        </div>
        <div className=" rounded-full p-3 mb-2 bg-white group-hover:bg-[#7F99CC] hidden group-hover:block">
          <img src={reportperiod_b} className="w-12 h-12"></img>
        </div>
      </div>
    </Link>
  );
}

export default ReportCard;
