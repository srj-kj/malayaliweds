import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import Loader from "../../Components/Loader/Loader";
import image from "../../assets/log2.jpg";
import axios from "../../Axios/axios";
import googleAxios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/userSlice";
import { googleAuth, invalidPassword } from "../../Components/Tostify/Tostify";
import { ToastContainer } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const logins = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("call coming");
      console.log(tokenResponse);
      // fetching userinfo can be done on the client or the server
      const userInfo = await googleAxios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(async ({ data }) => {
          const tokens = await axios
            .post("/auth/google", {
              data, // use the tokenResponse.code instead of the destructured {code}
            })
            .then(async (response) => {
              console.log(response);
              googleAuth();
              dispatch(login(response.data));
              setTimeout(() => {
                // redirect to home page
                navigate("/");
                // show toast container
                googleAuth();
              }, 3000);
            });
          console.log(tokens);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  const [form, setForm] = useState({});
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const OtpLoginPage = () => {
    navigate("/otp/login");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", form)
      .then((response) => {
        console.log(response);
        dispatch(login(response.data));
        navigate("/");
      })
      .catch((err) => {
        invalidPassword(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      <div className="lg:grid grid-cols-2  h-screen lg:mx-32  lg:my-0">
        <div className="lg:block hidden lg:mt-8">
          <div className="relative ">
            <img src={image} alt="Background" className="w-full h- m-12" />
          </div>
        </div>
        <div className="lg:border  border-slate-400 rounded lg:m-12 p-8 border m-14">
          <div className="flex justify-center mt-8">
            <img src={Logo} alt="Logo" className="h-20 w-20" />
          </div>
          <h1 className="text-sm font-bold text-slate-600 mt-5 text-center mb-5">
            Ready to take your search for the perfect partner to the next level?{" "}
            <span className="text-orange-600">Log in to MalayaliWeds </span> and
            explore our latest features
          </h1>
          <div className="text-center md:flex lg:ml-10  justify-center lg:mt-14">
            <button
              onClick={() => logins()}
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-xs px-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <BsGoogle /> <span className="pl-3">Sign in with Google</span>
            </button>
            <button
              onClick={OtpLoginPage}
              type="button"
              className="text-white  focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium  text-sm  py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2  bg-orange-300 rounded px-5 pt-2 lg:h-10  hover:bg-orange-600 h-10 w-11/12 md:w-48"
            >
              <FaPhoneAlt />
              &nbsp; Sign in using OTP
            </button>
          </div>
          <div className="flex">
            <hr className="w-96 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <p className="mt-5 mx-5">OR</p>
            <hr className="w-96 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
          <form>
            <div className="grid gap-5 lg:mt-5">
              <input
                type="email"
                id="default"
                name="email"
                className="  focus:ring-blue-400
            px-3 py-2 rounded-md focus:outline-none focus:ring-2 border-gray-300 border"
                placeholder="Email"
                onChange={(e) => handleInput(e)}
              />
              {/* <p className="text-red-600 h-6 ">{errors.credential}</p> */}
              <input
                type="password"
                id="default-input"
                name="password"
                className="  focus:ring-blue-400
           px-3 py-2 rounded-md focus:outline-none focus:ring-2 border-gray-300 border"
                placeholder="Password"
                onChange={(e) => handleInput(e)}
              />
              {/* <p className="text-red-600 h-6">{err.response.data.message}</p> */}
            </div>
            <div className="text-center mt-4 -mb-5">
              <button
                onClick={(e) => handleSubmit(e)}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-orange-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200"
              >
                <span className=" flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0 text-sm text-bold w-32">
                  {/* {<Loader />}                */}
                  LOGIN
                </span>
              </button>
            </div>
          </form>
          <div className="flex justify-end  lg:mt-12 mt-20 ">
            <h1 className="text-lg text-rose-400 lg:font-mono">
              NEW To MalluWeds ?
            </h1>
            <Link
              to="/signup"
              className="text-xl ml-2 text-blue-400 font-bold hover:text-orange-600"
            >
              REGISTER
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
