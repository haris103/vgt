import React from 'react';
import { Link } from "react-router-dom";

function Button({ name, path }) {
  return (
    <Link to={path ? path: "/"} className='w-full'>
    <button
      type="button"
      className=" mb-3 bg-white w-full text-left pl-10 border border-gray-600 py-2 rounded-lg  font-semibold focus:bg-[#6FAAF9] hover:bg-[#E1EDFD] "
    >
    {name}
  </button>
  </Link>
);
}

export default Button;