import React, { useState } from "react";
// import warningIcon from "../../images/warning";

const SingleTerminalApi = ({
  data,
  showTerminalHandler,
  activeItem,
  setActiveItem,
  getAlertCount,
  selected,
  setSelected,
  index,
  testdata,
}) => {
  const [s, setS] = useState(index === 0 ? true : false);
  const [a, setA] = useState(1);
  console.log("terminal new page data", selected);
  console.log("data", data);
  console.log("index", index);
  console.log("testdata", testdata);
  console.log("a", a);
  const { title, id } = data || {};
  // const currentIndex = index;
  const fristItemPreSelected = () => {
    showTerminalHandler(id, testdata);
  };
  // if (activeItem === id) {
  //   //fristItemPreSelected();
  // }
  return (
    <div
      // selected={true}
      onClick={() => {
        showTerminalHandler(id, testdata);
        setActiveItem(id);
        if (!selected) {
          setSelected((prev) => !prev);
        }
        setS(!s);
        // setA(index)
      }}
      className={`flex ${
        id === activeItem ? "bg-[#7F99CC] text-white" : "bg-white text-black"
      }  border-black border rounded-lg p-1 my-1 cursor-pointer mt-3 rounded-md md:px-4 px-2 py-2 `}
    >
      {
        <img
          className={`mr-2 ${
            getAlertCount(id) === 0 && "opacity-0"
          } object-contain`}
          //   src={warningIcon}
          alt=""
        />
      }
      <h2 className="selected">
        {id} - {data.terminals?.length} Terminals{" "}
        {getAlertCount(id) > 0 && `(${getAlertCount(id)} Alert)`}
      </h2>
    </div>
  );
};

export default SingleTerminalApi;
