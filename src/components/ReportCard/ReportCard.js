import React from 'react';
import { Link } from 'react-router-dom';

function ReportCard({ title, subtitle }) {
    return (
      <Link to="/revenuereport" className="w-full">
        <div className="cursor-pointer h-40 w-full flex flex-col justify-around items-center rounded-lg border border-gray-500 bg-white hover:bg-[#6FABF9] hover:text-white focus:text-white">
          <p className="font-bold text-lg">{title}</p>
          <p className="font-semibold ">{subtitle}</p>
  
          <div className="border border-gray-800 rounded-full p-3 mb-2 bg-white">

            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-700 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
        </div>
      </Link>
    );
}

export default ReportCard;