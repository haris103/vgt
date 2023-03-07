import React, { useEffect, useState } from "react";
import axios from "axios";
// const LOGIN_URL = '/auth';
import { URL } from "../../utils/config";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/lab";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { Box, CircularProgress } from "@material-ui/core";

function Login() {
  const navigate = useNavigate();
  //usestate, initially email passowrd loading and errormsg is empty
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [check, setChecked] = useState(
    JSON.parse(localStorage.getItem("check"))
  );
  const [passwordState, setpasswordState] = useState("password");

  //remeber me implementation
  // const rmCheck = document.getElementById("remember-me"),
  //   emailInput = document.getElementById("email"),
  //   passowrdInput = document.getElementById("Password");
  // console.log("email value is ", emailInput);

  // if (localStorage.checkbox && localStorage.checkbox !== "") {
  //   // rmCheck.setAttribute("checked", "checked");
  //   setEmail(localStorage.userEmail);
  //   setPassword(localStorage.userPassword);
  // } else {
  //   // rmCheck.removeAttribute("checked");
  //   // emailInput.value = "";
  // }

  const lsRememberMe = (e) => {
    console.log("Click Value", e.target.checked);
    setChecked(e.target.checked);
    if (e.target.checked === true) {
      localStorage.setItem("userPassword", password);
      localStorage.setItem("userEmail", email);
      // localStorage.setItem("check", true);
    } else {
      // localStorage.setItem("userPassword", "");
      // localStorage.setItem("userEmail", "");
      // localStorage.setItem("check", false);
    }
  };

  // when i submit the login form this function will be executed.
  const handleSubmit = async (e) => {
    localStorage.setItem("userPassword", password);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("check", check);

    e.preventDefault();
    const loginData = {}; //just a object
    loginData.username = email; //user email
    loginData.password = password; //user password

    try {
      setLoading(true); // there will be loader until api give response use
      console.log(loginData);
      const data = await axios.post(
        `${URL}/api/User/Login`,
        // url
        loginData
      );
      console.log("Data:", data);

      if (data.data.rc === 1000) {
        console.log(data);
        console.log("user data: " + data.data.data.firstName);
        console.log(data.data.data.token);
        sessionStorage.setItem("token", data.data.data.token);
        localStorage.setItem("token", data.data.data.token);
        localStorage.setItem("firstName", data.data.data.firstName);
        localStorage.setItem("activeItem", true);
        setLoading(true);
        // navigate("/home");

        window.location.href = "/home"; //if login successully then we will redirect to new page
        // window.location.href = 'POST /api/Store/GetStoreSummary'
        // window.location.href = "/getsummary"
        // window.location.href = '/POST%20/api/Store/GetStoreSummary'
      } else if (data.data.status === 524) {
        setErrormsg("Something went wrong, please try again later 001");
      } else if (data.data.status === 503) {
        setErrormsg("Something went wrong, please try again later 002");
      } else if (data.data.status === 400) {
        setErrormsg("Something went wrong, please try again later 003");
      } else if (data.data.status === "CORS") {
        setErrormsg("Something went wrong, please try again later 004");
      } else if (data.data.rc === 1004) {
        setErrormsg("Invalid Username or Password");
        setLoading(false);
      }
    } catch (err) {
      console.log("ERROR:", err);
      if (!err?.response) {
        setLoading(false);
      } else {
        setErrormsg(err.response);
      }
    }
  };

  // setTimeout(() => {
  //   localStorage.removeItem("message");
  // }, 3000);

  // const showPassword = (q) => {
  //   if (q === "password") {
  //     setpasswordState("text");
  //   } else {
  //     setpasswordState("password");
  //   }
  // };

  setTimeout(() => {
    localStorage.removeItem("message");
  }, 3000);

  const showPassword = (q) => {
    if (q === "password") {
      setpasswordState("text");
    } else {
      setpasswordState("password");
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("check"))) {
      setEmail(localStorage.getItem("userEmail"));
      setPassword(localStorage.getItem("userPassword"));
      setChecked(localStorage.getItem("check"));
      console.log("TRUE");
      // setEmail("");
      // setPassword("");
      // setChecked(false);
      // console.log('TRUE')
    } else {
      setEmail("");
      setPassword("");
      setChecked(localStorage.getItem("check"));
      console.log("FALSE");
      // setEmail(localStorage.getItem("userEmail"));
      // setPassword(localStorage.getItem("userPassword"));
      // setChecked(false);
      // console.log('FALSE')
    }
  }, []);
  return (
    <>
      {/* <div className='h-screen flex bg-gray-bg1'>   
      <div>
        <p ref={errRef} className={errMsg ? "errmsg" : 
        "offscreen"} aria-live="assertive">{errMsg}</p>
      </div>
   */}
      <div className="mt-20 w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        {localStorage.getItem("message") ? (
          <Alert severity="warning">{localStorage.getItem("message")}</Alert>
        ) : (
          // <h1>{localStorage.getItem("message")}</h1>
          ""
        )}
        <img src={Logo} alt="" className="w-48 m-5" />

        <form onSubmit={handleSubmit}>
          {/* <h2 className="text-center">Login Form</h2> */}
          <h5 className="d-flex justify-content-center">
            {/* {loading ? 
            "loading......" : <p></p>} */}
            {loading ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <CircularProgress />
                </Box>
              </>
            ) : (
              <></>
            )}
          </h5>
          {errormsg && (
            <p
              style={{ color: "red" }}
              className="d-flex justify-content-center"
            >
              <Alert severity="warning">{errormsg}</Alert>
            </p>
          )}
          <div className="flex justify-center items-center ">
            <label htmlFor="email"></label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              id="email"
              maxLength={"100"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // className="form-control"
              placeholder="Email"
              autoComplete="email"
              required
            />
            <FiMail className="mt-4 ml-2" />
          </div>
          <div className="flex justify-center items-center ">
            <label htmlFor="password"></label>
            <input
              maxLength={"16"}
              type={passwordState}
              className="w-full px-4 py-2 mt-5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Password"
              id="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mt-4 ml-2">
              {passwordState === "password" ? (
                <FiEyeOff onClick={() => showPassword(passwordState)} />
              ) : (
                <FiEye onClick={() => showPassword(passwordState)} />
              )}
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            {console.log("Check-value::", check)}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                // value={check}
                defaultChecked={check}
                // onChange={() => setChecked(!check)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                onClick={lsRememberMe}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            {/* <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div> */}
          </div>
          <button
            type="submit"
            className="mt-3 text-lg font-semibold 
            bg-blue-700 hover:bg-blue-800 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:text-white hover:bg-black "
          >
            Login
          </button>
        </form>
      </div>

      <footer class="p-4 flex items-center justify-center md:p-6">
        <p>2.0.1.20</p>
      </footer>
      {/* </div> */}
    </>
  );
}

export default Login;
