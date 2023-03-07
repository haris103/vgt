import { Link } from "react-router-dom";
import reportperiod_b from "../../../images/icon-reportPeriod01b.png";
import reportperiod_a from "../../../images/icon-reportPeriod01a.png";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function PeriodDetails({ title, subtitle, path }) {
  const setSelectionRange = () => {
    localStorage.setItem("periodActive", true);
  };
  return (
    // <Link to={path ?path : "/periodreport"} className="w-full">
    <Link
      to={path ? path : "/periodreport"}
      className="w-full group"
      onClick={setSelectionRange()}
    >
      <div className="cursor-pointer h-40 w-full flex flex-col justify-around items-center rounded-lg border border-gray-500 bg-white group-hover:bg-[#7F99CC] hover:text-white focus:text-white">
        <p className="font-bold text-lg">{title}</p>

        <p className="font-semibold ">{subtitle}</p>

        <div className=" rounded-full p-3 mb-2 bg-white group-hover:bg-[#7F99CC] group-hover:hidden">
          <img src={reportperiod_a} className="w-12 h-12"></img>
        </div>
        <div className=" rounded-full p-3 mb-2 bg-white hidden group-hover:block group-hover:bg-[#7F99CC]">
          <img src={reportperiod_b} className="w-12 h-12"></img>
        </div>
      </div>
    </Link>
  );
}

export default PeriodDetails;
