import React, { useEffect, useState } from "react";
import { URL, config, token } from "../../../src/utils/config";
import axios from "axios";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { Alert } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import ButtonNavigation from "../../ButtonNavigation";
import { registerLocale } from "react-datepicker";
// import { URL, token, config } from "../../utils/config";

// axios.interceptors.request.use(
//   (config) => {
//     config.headers.authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

function Settings() {
  const [user, setUser] = useState([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [renewpassword, setRenewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [passwordState, setpasswordState] = useState("password");
  const [passwordState2, setpasswordState2] = useState("password");
  const [passwordState3, setpasswordState3] = useState("password");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      const { data } = await axios.post(
        `${URL}/api/User/GetUserProfile`,
        config
      );
      setUser(data.data.userProfile);
      // console.log(data.data.userProfile)
    }
    getUserData();
  }, [0]);

  const passwordCheck = (password) => {
    console.log("New password is: ", password);
    // const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()]).{6,}$/;
    return regex.test(password);
  };

  const ProfileUpdate = () => {
    setSuccess("");
    setPassword("");
    if (currentPassword === "") {
      setSuccess("empty_cp");
      return;
    }
    if (newPassword === "") {
      setSuccess("empty_np");
      return;
    }
    // check if New Password has space
    if (/\s/g.test(newPassword)) {
      setSuccess("new_has_space");
      return;
    }
    if (renewpassword === "") {
      setSuccess("empty_rp");
      return;
    }
    // check if Confirm New Password has space
    if (/\s/g.test(renewpassword)) {
      setSuccess("renew_has_space");
      return;
    }
    if (newPassword.length < 6 || renewpassword.length < 6) {
      setSuccess("incomplete_fields");
      return;
    }
    if (renewpassword !== newPassword) {
      setSuccess("warning");
      return;
    }
    if (newPassword === currentPassword) {
      setSuccess("duplicate_pass");
      return;
    }
    if (newPassword === renewpassword) {
      console.log("password validation is ", passwordCheck(newPassword));
      if (!passwordCheck(newPassword)) {
        setSuccess("");
      }
      try {
        async function Update() {
          const { data } = await axios({
            method: "post",
            url: `${URL}/api/User/UpdatePassword`,
            config,
            data: {
              currentPassword: currentPassword,
              newPassword: newPassword,
            },
          });
          // const data = {};
          console.log("Response: ", data);
          if (data.rc === 1000) {
            setCurrentPassword("");
            setNewpassword("");
            setRenewPassword("");
            setSuccess("success");
          } else if (data.rc === 1005) {
            setSuccess("incorrect_current_password");
          } else if (data.rc !== 1000) {
            setSuccess("update_failed");
          } else {
            setSuccess("warning");
          }
        }
        if (passwordCheck(newPassword)) {
          Update();
          // setSuccess("success");
        } else {
          setSuccess("wrong_combination");
        }
      } catch (error) {}
    } else {
      setPassword("");
    }
  };

  const showPassword = (q) => {
    if (q === "password") {
      setpasswordState("text");
    } else {
      setpasswordState("password");
    }
  };
  const showPassword2 = (q) => {
    if (q === "password") {
      setpasswordState2("text");
    } else {
      setpasswordState2("password");
    }
  };
  const showPassword3 = (q) => {
    if (q === "password") {
      setpasswordState3("text");
    } else {
      setpasswordState3("password");
    }
  };

  const handleRepeatPassword = (e) => {
    setRenewPassword(e.target.value);
    // if (e.target.value !== newPassword) {
    //   setSuccess("warning");
    //   return;
    // }
    setSuccess("");
  };

  const handleNewPassword = (e) => {
    setNewpassword(e.target.value);
    // if (e.target.value !== renewpassword) {
    //   setSuccess("warning");
    //   return;
    // }
    setSuccess("");
  };

  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (
      !showScroll &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      setShowScroll(true);
    } else if (
      showScroll &&
      window.innerHeight + window.scrollY <= document.body.offsetHeight
    ) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);
  return (
    <>
      {/* <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
        <div className="text-left">
          <ButtonNavigation />
        </div>
        <div className="text-center">
          <p className="text-center font-bold text-md md:text-lg mt-5">
            Account Settings
          </p>
        </div>
        <div className="text-right">
          <button
            type="button"
            className="inline-block text-sm font-semibold pr-2 px-4 py-2 leading-none rounded hover:text-white hover:bg-black mt-0 transition duration-300 ease-in-out "
            onClick={scrollTop}
            style={{ opacity: showScroll ? "1" : "0" }}
          >
            Top
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav> */}
      <nav className="grid grid-cols-3 items-center p-3 mb-5 fixed top-0 w-full bg-white z-50">
        <div className="text-left w-fit ">
          <ButtonNavigation />
        </div>
        <div className="text-center  ">
          <p className="text-center font-bold text-sm md:text-lg ">
            Account Settings
          </p>
        </div>
        <div className="text-right">
          <button
            type="button"
            className="inline-block text-sm font-semibold pr-2 px-4 py-2 leading-none rounded hover:text-white hover:bg-black mt-0 transition duration-300 ease-in-out "
            onClick={scrollTop}
            style={{ opacity: showScroll ? "1" : "0" }}
          >
            Top
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div class="m-1 px-1 -mt-10">
        <div class="container mx-auto">
          <div class="inputs w-full p-6 mx-auto">
            <div class="flex flex-wrap justify-center -mx-3 mb-6">
              <div class="w-full max-w-[616px] px-3 mb-6">
                <div class="">
                  {/* First and last name */}
                  <div class="flex items-center justify-center max-px-[12px] mt-10">
                    <div class="w-full px-3 my-10 ">
                      <label class="text-sm font-bold mb-2">First Name:</label>
                      <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:ring-0 focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                        readOnly
                        value={user.firstName}
                      />
                    </div>
                    <div class="w-full px-3 my-10">
                      <label class="text-sm font-bold mb-2">Last Name:</label>
                      <input
                        class="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:ring-0 focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                        readOnly
                        value={user.lastName}
                      />
                    </div>
                  </div>

                  {/* Email address */}
                  <div class="grid grid-cols-3 relative">
                    <div class="col-span-3 flex justify-between py-3 px-3 items-center">
                      <div class="basis-1/3 text-sm font-bold pr-1">
                        {" "}
                        Email Address:
                      </div>
                      <div class="flex relative flex-initial basis-2/3 w-full">
                        <input
                          class="w-full appearance-none block pr-8 py-3 bg-gray-200 text-gray-700 border border-gray-400 shadow-inner rounded-md leading-tight focus:ring-0 focus:outline-none focus:border-gray-500"
                          type="email"
                          required
                          readOnly
                          value={user.email}
                        />
                        <div className="float-right self-center -mx-6 text-gray-700">
                          <FiMail />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Current password */}
                  <div class="grid grid-cols-3 relative">
                    <div class="col-span-3 flex justify-between py-3 px-3 items-center">
                      <div class="basis-1/3 text-sm font-bold pr-1">
                        {" "}
                        Current Password:
                      </div>
                      <div class="flex relative flex-initial basis-2/3 w-full">
                        <input
                          maxLength={"16"}
                          className={`w-full appearance-none block bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md pr-8 py-3 leading-tight focus:outline-none  focus:border-gray-500
                      ${
                        success === "empty_cp" ||
                        success === "duplicate_pass" ||
                        success === "incorrect_current_password"
                          ? "border-2 border-red-500"
                          : ""
                      }
                      `}
                          type={passwordState}
                          required
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          value={currentPassword}
                        />
                        <div className="float-right self-center -mx-6 text-gray-700">
                          {passwordState === "password" ? (
                            <FiEyeOff
                              onClick={() => showPassword(passwordState)}
                            />
                          ) : (
                            <FiEye
                              onClick={() => showPassword(passwordState)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* New password */}
                  <div class="grid grid-cols-3 relative">
                    <div class="col-span-3 flex justify-between py-3 px-3 items-center">
                      <div class="basis-1/3 text-sm font-bold pr-1">
                        {" "}
                        New Password:
                      </div>
                      <div class="flex relative flex-initial basis-2/3 w-full">
                        <input
                          maxLength={"16"}
                          class={`w-full appearance-none block bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md pr-8 py-3 leading-tight focus:outline-none  focus:border-gray-500
                      ${
                        success === "warning" ||
                        success === "empty_np" ||
                        success === "incomplete_fields" ||
                        success === "new_has_space" ||
                        success === "duplicate_pass"
                          ? "border-2 border-red-500"
                          : ""
                      }
                  
                      `}
                          type={passwordState2}
                          required
                          onChange={handleNewPassword}
                          value={newPassword}
                        />
                        <div className="float-right self-center -mx-6 text-gray-700">
                          {passwordState2 === "password" ? (
                            <FiEyeOff
                              onClick={() => showPassword2(passwordState2)}
                            />
                          ) : (
                            <FiEye
                              onClick={() => showPassword2(passwordState2)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Confirm new password */}
                  <div class="grid grid-cols-3 relative">
                    <div class="col-span-3 flex justify-between py-3 px-3 items-center">
                      <div class="shrink basis-1/3 text-sm font-bold pr-1">
                        {" "}
                        Confirm New Password:
                      </div>
                      <div class="flex relative flex-initial basis-2/3 w-full">
                        <input
                          maxLength={"16"}
                          class={`w-full appearance-none block bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md pr-8 py-3 leading-tight focus:outline-none  focus:border-gray-500
                          ${
                            success === "warning" ||
                            success === "empty_rp" ||
                            success === "incomplete_fields" ||
                            success === "renew_has_space"
                              ? "border-2 border-red-500"
                              : ""
                          }
                          `}
                          type={passwordState3}
                          required
                          onChange={handleRepeatPassword}
                          value={renewpassword}
                        />
                        <div className="float-right self-center -mx-6 text-gray-700">
                          {passwordState3 === "password" ? (
                            <FiEyeOff
                              onClick={() => showPassword3(passwordState3)}
                            />
                          ) : (
                            <FiEye
                              onClick={() => showPassword3(passwordState3)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {success === "success" ? (
                    <Alert severity="success">
                      Password Successfully Updated!
                    </Alert>
                  ) : (
                    ""
                  )}
                  {success === "warning" ? (
                    <PasswordWarning title={`Passwords do not match`} />
                  ) : (
                    ""
                  )}
                  {success === "wrong_combination" ? (
                    <PasswordWarning
                      title={`Password must contain at least one uppercase, lowercase, number, and allowed special character ~!@#$%^&*()`}
                    />
                  ) : (
                    ""
                  )}
                  {success === "new_has_space" ? (
                    <PasswordWarning
                      title={`Password cannot contain a whitespace`}
                    />
                  ) : (
                    ""
                  )}
                  {success === "renew_has_space" ? (
                    <PasswordWarning
                      title={`Password cannot contain a whitespace`}
                    />
                  ) : (
                    ""
                  )}
                  {success === "incomplete_fields" ? (
                    <PasswordWarning
                      title={`Passwords must be at least 6 characters long`}
                    />
                  ) : (
                    ""
                  )}
                  {success === "duplicate_pass" ? (
                    <PasswordWarning
                      title={`New password must be different from current password`}
                    />
                  ) : (
                    ""
                  )}
                  {success === "empty_cp" ? (
                    <PasswordWarning title={`Please enter Current Password`} />
                  ) : (
                    ""
                  )}
                  {success === "empty_np" ? (
                    <PasswordWarning title={`Please enter New Password`} />
                  ) : (
                    ""
                  )}
                  {success === "empty_rp" ? (
                    <PasswordWarning
                      title={`Please enter Confirm New Password`}
                    />
                  ) : (
                    ""
                  )}
                  {success === "incorrect_current_password" ? (
                    <PasswordWarning title={`Incorrect Current Password`} />
                  ) : (
                    ""
                  )}
                  {success === "update_failed" ? (
                    <PasswordWarning title={`Incorrect Current Password`} />
                  ) : (
                    ""
                  )}
                  {success === "empty fields" ? (
                    <PasswordWarning
                      title={`Please fill in the password fields`}
                    />
                  ) : (
                    ""
                  )}
                  {password === "warning" ? (
                    <Alert severity="warning">Passwords do not match</Alert>
                  ) : (
                    ""
                  )}
                </div>

                {/* Update password button */}
                <div class="w-full md:w-full px-3 mb-6 flex justify-center">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"></label>
                  <button
                    type="button"
                    onClick={ProfileUpdate}
                    className="px-3 py-3 mx-3 my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 border-black"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;

const PasswordWarning = ({ title }) => {
  return (
    <div
      className=" mt-5 flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <svg
        aria-hidden="true"
        class="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium  ">{title}</span>{" "}
        {/* <span className="ml-3"></span> */}
      </div>
    </div>
  );
};
