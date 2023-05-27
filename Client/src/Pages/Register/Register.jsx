import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import Logo from "../../assets/Logo.png";
import image from "../../assets/login.jpg";
import axios from "../../Axios/axios";
import googleAxios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/userSlice";
import { parseISO, differenceInYears } from "date-fns";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MIN_AGE = 21;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();
  const logins = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
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
            .then((response) => {
              console.log(response);
              dispatch(login(response.data));
              navigate("/");
            });
          console.log(tokens);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });
  const onSubmit = (data) => {
    const dateOfBirth = parseISO(data.dob);
    const age = differenceInYears(Date.now(), dateOfBirth);
    if (age < MIN_AGE) {
      setError("dob", {
        type: "manual",
        message: "You must be at least 21 years old",
      });
    } else {
      axios
        .post("/signup", data)
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          navigate("/login");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };


  const validateConfirmPassword = (value) => {
    const { password } = getValues();
    return value === password || "Passwords don't match.";
  };

  return (
    <div className="lg:grid grid-cols-2 max-h-screen lg:mx-24">
      <div className="lg:block hidden lg:mt-8">
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 absolute rounded p-5 flex -right-3 bottom-40 text-white hover:scale-110 transition-all duration-500 cursor-pointer ">
            <p className="text-xl">Already an user ? </p>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link
              to="/login"
              className="text-2xl -mt-1   cursor-pointer hover:text-yellow-400"
            >
              {" "}
              <span className="text-xl text-rose-300  hover:text-yellow-400">
                LOGIN
              </span>
            </Link>
          </div>
          <img src={image} alt="Background" className="w-full mt-5" />
        </div>
      </div>
      <div className="border  border-slate-400 rounded lg:m-12 p-8 m-5 md:m-20">
        <div className="flex justify-center lg:mt-2">
          <img src={Logo} alt="logo" className="w-20 h-20" />
        </div>
        <h1 className="text-sm font-bold text-slate-600 mt-5 text-center mb-5">
          Join Malayali Weds today and start finding your life partner
          effortlessly.
        </h1>
        <div className="text-center">
          <button
            onClick={() => logins()}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 "
          >
            <BsGoogle /> &nbsp; Sign in with Google
          </button>
        </div>
        <div className="flex mb-2">
          <hr className="w-96 h-px my-5  border-0 bg-gray-700" />
          <p className="mt-2 mx-5">OR</p>
          <hr className="w-96 h-px my-5 border-0 bg-gray-700" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <input
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
                message: "Minimum 3 letters required",
              })}
              placeholder="Enter your full name"
              className="  focus:ring-blue-400
             px-3 py-2 rounded-md focus:outline-none focus:ring-2 border-gray-300 border"
              // onChange={(e) => handleInput(e)}
            />
            {console.log(errors)}
            {errors?.name && (
              <p className="text-red-600 h-6">Minimum 3 letters required</p>
            )}

            <input
              type="email"
              placeholder="Email"
              className="  focus:ring-blue-400
             px-3 py-2 rounded-md focus:outline-none focus:ring-2 border-gray-300 border"
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
              })}
            />
            {errors?.email && (
              <p className="text-red-600 h-6">Enter Valid Email</p>
            )}

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              className="  focus:ring-blue-400
             px-3 py-2 rounded-md focus:outline-none focus:ring-2 border-gray-300 border"
              {...register("mobile", {
                required: true,
                pattern: /^[0-9]{10}$/,
              })}
            />
            {errors?.mobile && (
              <p className="text-red-600 h-6">Enter a Valid Mobile Number</p>
            )}
            <div className="flex gap-5">
              <select
                name="gender"
                id="gender-two"
                className="text-gray-400 w-1/2 focus:ring-blue-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 border-gray-300 border"
                {...register("gender", { required: true })}
                defaultValue=""
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors?.gender && (
                <div className="text-red-600 w-1/2 h-6">
                  Please select your gender
                </div>
              )}

              <div class="relative max-w-sm">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="date"
                  className={`${
                    errors.dob ? "border-red-500" : ""
                  } bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-48 pl-10 p-2.5  dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Date Of Birth"
                  {...register("dob", { required: true })}
                />

                {errors?.dob && (
                  <p className="text-red-600 h-6">{errors.dob.message||"Enter Your DOB"}</p>
                )}
              </div>
            </div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="  focus:ring-blue-400
             px-3 py-2 rounded-md focus:outline-none focus:ring-2 border-gray-300 border"
              {...register("password", { required: true, minLength: 5 })}
            />
            {errors?.password && (
              <p className="text-red-600 h-6">Minimum 5 letters required</p>
            )}
            <input
              name="confirmPword"
              type="password"
              placeholder="confirm password"
              className="  focus:ring-blue-400
             px-3 py-2 rounded-md focus:outline-none focus:ring-2 border-gray-300 border"
              {...register("confirmPword", {
                required: true,
                validate: validateConfirmPassword,
              })}
            />
            {errors?.confirmPword && (
              <p className="text-red-600 h-6">not match</p>
            )}
          </div>
          <div className="text-center mt-2 -mb-5">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-yellow-400 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0 text-sm text-bold w-32">
                Register
              </span>
            </button>
          </div>
        </form>
        <div className=" mx- mt-8  lg:hidden">
          <h1 className="text-sm">
            Already An User ?
            <Link to="/login" className="text-lg  text-rose-400 font-bold">
              <p> LOGIN</p>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
