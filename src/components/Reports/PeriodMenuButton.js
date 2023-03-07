import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

function PeriodMenuButton({
  business,
  Period_business_terminal,
  isLocation,
  location_id,
  store_id,
  business_id,
  name,
  location,
  locationName,
}) {
  const navigate = useNavigate();

  console.log("in menu business id ", business_id);
  console.log("Location id in Menu Buttonz:", location_id);
  console.log("in menu period business terminal", Period_business_terminal);

  const handleNavigateDetails = () => {
    if (isLocation === true) {
      // console.log("should redeirect location page", location_id);
      // navigate(`/locationinfo/${location.businessInfo.businessId}`, {
      navigate(`/locationinfo/${locationName}`, {
        // state: {
        //   isLocation: true,
        //   location,
        //   locationName,
        // },
      });
    } else {
      navigate(`/businessinfo/${name}`, {
        // state: business,
      });
    }
  };

  const handleNavigateRevenue = () => {
    if (isLocation === true) {
      console.log("should redirect location page", location_id);
      navigate(`/revenuereportlocation/${location_id}`, {
        state: {
          isLocation: true,
          location,
          locationName,
        },
      });
    } else {
      navigate(`/revenuereport/${business_id}`, {
        state: Period_business_terminal.businessInfo,
      });
    }
  };

  const handleNavigateTerminal = () => {
    if (isLocation) {
      navigate(`/terminallocationapi/${store_id}`, {
        state: {
          locationState: location,
          isLocation: true,
        },
      });
    } else {
      navigate(`/terminalapi/${store_id}`, {
        state: business,
      });
    }
  };

  const handleNavigateSupport = () => {
    if (isLocation === true) {
      // console.log("should redeirect location page", location_id);
      navigate(`/support/${location_id}`, {
        state: {
          isLocation: true,
          location,
          locationName,
        },
      });
    } else {
      navigate(`/support/${business_id}`, {
        // state: business.businessInfo.name,
        state: {
          isLocation: false,
          // businessName: business.businessInfo.name
          //   ? business.businessInfo.name
          //   : Period_business_terminal.businessInfo.name,
          // business: c,
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
                {/* <Link to={"/businessinfo/" + business_id}> */}
                <Menu.Item>
                  <div
                    className={"text-black block px-4 py-1 text-xs font-bold"}
                    onClick={() => handleNavigateDetails()}
                  >
                    Details
                  </div>
                </Menu.Item>
                {/* </Link> */}

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

                <Menu.Item>
                  <div
                    className={
                      "text-black block px-4 py-1 text-xs font-bold cursor-pointer"
                    }
                    onClick={() => handleNavigateSupport()}
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

export default PeriodMenuButton;