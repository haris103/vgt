import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ButtonNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const back = () => {
    if (location.pathname === "/terminals") {
      localStorage.removeItem("locationId");
      localStorage.removeItem("businessId");
      localStorage.setItem("activeItem", true);
      localStorage.removeItem("storeId");
      localStorage.removeItem("terminalHandlerId");
      localStorage.removeItem("activeItem");
    }
    if (location.pathname === "/periodreport") {
      localStorage.removeItem("periodActive");
    }
    if (location.pathname === "/revenuereport") {
      localStorage.removeItem("storeId");
    }

    navigate(-1);
    console.log("back called");
  };
  return (
    <div>
      <button
        className="inline-block text-sm font-semibold -ml-2 leading-none rounded hover:text-white hover:bg-black mt-0 transition duration-300 ease-in-out "
        onClick={() => back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 inline"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>
    </div>
  );
}

export default ButtonNavigation;
