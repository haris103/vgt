import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

function MenuButtonTerminals({
  business_id,
  location_id,
  business,
  name,
  id,
  terminal,
  isLocation,
  // isLocationn,
  location,
  locationName,
  terminalName,
  terminalRole,
}) {
  const navigate = useNavigate();
  // console.log("MenuButtonTerminals.js is running!", locationName);
  // console.log("biid:" + business_id);
  // console.log("terminal in below button:", terminal);
  // console.log("location in below buutton", location);
  // console.log("location in below buutton", isLocation);
  // console.log("location in below buutton", isLocationn);

  const handleNavigateSupport = () => {
    if (isLocation === "true") {
      // console.log("IF BLOCK");

      navigate(`/support`, {
        state: {
          location: location,
          locationName: locationName,
          isLocation: true,
          terminals: terminal.terminals,
          terminalName: terminalName,
          terminalRole: terminalRole,
          business_id: location_id,
          businessName: business,
          // support,
        },
      });
    } else {
      // console.log("ELSE BLOCK");

      navigate(`/support`, {
        state: {
          terminals: terminal,
          isLocation: false,
          terminalName: terminalName,
          terminalRole: terminalRole,
          business_id: business_id,
          businessName: business.businessInfo.name,
          // support,
        },
      });
    }
  };
  return (
    <div className="  flex flex-col flex-end items-end">
      <div className="flex ">
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex">
            <Menu.Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="md:h-4.5 md:w-4.5 h-4 w-4 text-black "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0  w-32 h-25 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="">
                <Link to={"/terminalinfo/" + id}>
                  <Menu.Item>
                    <div
                      className={"text-black block px-4 py-1 text-xs font-bold"}
                    >
                      Details
                    </div>
                  </Menu.Item>
                </Link>
              </div>

              <div className="">
                <Menu.Item>
                  <div
                    onClick={handleNavigateSupport}
                    className={
                      "text-black block px-4 py-1 text-xs font-bold cursor-pointer "
                    }
                  >
                    Support
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default MenuButtonTerminals;
