import React from "react";
import warningIcon from "../../images/warning.png";
const SingleTerminal = ({
  data,
  showTerminalHandler,
  activeItem,
  setActiveItem,
  getAlertCount,
}) => {
  const { title, id } = data || {};
  return (
    <div
      onClick={() => {
        showTerminalHandler(id);
        setActiveItem(id);
      }}
      className={`flex ${
        activeItem === id && "bg-blue-400 text-white"
      }  border-black border-2 rounded-lg p-1 my-1 cursor-pointer mt-3 rounded-md md:px-4 px-2 py-2 `}
    >
      {
        <img
          className={`mr-2 ${
            getAlertCount(id) === 0 && "opacity-0"
          } object-contain`}
          // src={warningIcon}
          alt=""
        />
      }
      <h2 className="">
        {title} - {data.terminals?.length} Terminals{" "}
        {getAlertCount(id) > 0 && `(${getAlertCount(id)} Alert)`}
      </h2>
    </div>
  );
};

export default SingleTerminal;
