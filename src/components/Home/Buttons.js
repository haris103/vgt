import React from "react";
import { Link } from "react-router-dom";
import useEffect from "react";

function Button({ name, path, handleTerminal }) {
  return (
    <Link to={path ? path : "/"} className="w-full">
      <button
        type="button"
        className="w-full mt-4 py-2 pl-10 text-left bg-white border border-gray-600 rounded-lg font-semibold focus:bg-[#6FAAF9] hover:bg-[#E1EDFD] "
        // hover:bg-[#E1EDFD]
        onClick={handleTerminal}
      >
        {name}
      </button>
    </Link>
  );
}

export default Button;
