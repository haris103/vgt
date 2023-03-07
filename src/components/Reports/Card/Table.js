import React from "react";

function Table({ tableData }) {
  return (
    <div className="m-3 lg:px-5 md:px-32 px-1">
      <div className="bg-[#F3F3F3] rounded-lg border shadow md:px-4 px-4 py-1 -mt-5 ">
        <table className=" bg-[#F3F3F3] w-full">
          <thead className="">
            <tr>
              <th className="text-left font-semibold text-sm ">Period</th>
              <th className="text-right font-semibold text-sm ">Sales</th>
              <th className="text-right font-semibold text-sm ">Redeem</th>
              <th className="text-right font-semibold text-sm ">Net</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((v, k) => (
              <tr className="">
                <td className=" text-sm ">period</td>
                <td className="text-right text-sm ">sales</td>
                <td className="text-right text-sm ">redeem</td>
                <td className="text-right text-sm ">net</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
