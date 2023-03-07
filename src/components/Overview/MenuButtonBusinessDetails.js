import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

function MenuButtonBusinessDetails({
  business,
  isLocation,
  location_id,
  store_id,
  business_id,
  name,
  location,
  locationName,
  revenue_id,
  _locationState,
  a,
}) {
  const navigate = useNavigate();
  // console.log("in menu button -> isLocation:", isLocation);
  // console.log("in menu business ", business);
  // console.log("in menu store id ", store_id);
  // console.log("in menu business id:: ", business_id);
  // console.log("Location id in Menu Button:", location_id);
  // console.log("location object:::", location);
  // console.log("Location name in MenuButtonBusinessDetails.js", locationName);
  // console.log("_Location state in MenuButtonBusinessDetails.js", a);

  const handleNavigateRevenue = () => {
    if (isLocation === true) {
      // console.log("should redeirect location page", location_id);
      localStorage.setItem("storeId", store_id);
      navigate(`/revenuereport`, {
        state: {
          isLocation: true,
          location,
          locationName,
          isActive: false,
          store_id: store_id,
        },
      });
    } else {
      navigate(`/revenuereport`, {
        // state: business,
        state: {
          business: business,
          isActive: true,
        },
      });
    }
  };

  const handleNavigateTerminal = () => {
    if (isLocation) {
      navigate(`/terminals`, {
        state: {
          locationState: location,
          isLocation: true,
          store_id: store_id,
        },
      });
      localStorage.setItem("activeItem", false);
    } else {
      navigate(`/terminals`, {
        state: business,
      });
      localStorage.setItem("activeItem", true);
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
                <Menu.Item>
                  <div
                    className={
                      "text-black block px-4 py-1 text-xs font-bold cursor-pointer"
                    }
                    onClick={() => handleNavigateRevenue()}
                  >
                    Revenue
                  </div>
                </Menu.Item>

                <Menu.Item>
                  <div
                    className={
                      "text-black block px-4 py-1 text-xs font-bold cursor-pointer"
                    }
                    onClick={() => handleNavigateTerminal()}
                  >
                    Terminals
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

export default MenuButtonBusinessDetails;
