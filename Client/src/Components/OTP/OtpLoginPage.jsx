import React, { useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OTPInput, { ResendOTP } from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
// import authAPI from '../../API/authAPI';
import axios from "../../Axios/axios";

import { otpLoginError } from "../Tostify/Tostify";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/userSlice";

function OtpLoginPage() {
  const [otp, setOtp] = useState("");
  const [user,setUser]=useState({})
  const [ph, setPh] = useState("");
  const [loading, setLoding] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const otpLoginApi = async (phoneNumber) => {
    try {
      console.log(phoneNumber);
      const response = await axios.post("/otp/login", phoneNumber);
      console.log(response,"res");
      return response.data;
    } catch (err) {}
  };
  function onCaptchVerify(){
    if(!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size:'invisible',
        callback : (response)=>{
          console.log(response, 'recaptcha');
          onSignup()
        },
        'expired-callback' : () => {
        }
      }, auth)
      // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
    }
  }
  function onSignup() {
    alert('signup')
    setLoding(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then(async (confirmationResult) => {
        const otpVerification = await otpLoginApi({ phone: formatPh });
        console.log(otpVerification,"ggg")
        setUser(otpVerification)
        // alert(otpVerification)
        // const { userId, email, accesstoken } = otpVerification;
        // setUser({ userId, email, accesstoken})
        window.confirmationResult = confirmationResult;
        setLoding(false);
        setShowOTP(true);
        alert("success");
      })
      .catch((error) => {
        alert('err')
        console.log(error);
        otpLoginError();
        setLoding(false);
      });
  }

  function onOtpVerify() {
    console.log("onotpverify");
    setLoding(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        dispatch(login(user))
        setLoding(false);
        navigate("/");
        alert("success");
      })
      .className((err) => {
        console.log(err);
        setLoding(false);
      });
  }
  return (
    <>
      {/* <div id="recaptcha-container"></div> */}
      <section className="flex items-center justify-center h-screen bg-white">
        <div>
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4 ">
            <img src="\public\images\lo1.png" alt="" />
            {showOTP ? (
              <>
                <div className="bg-blue-400 text-blue-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-black text-center"
                >
                  Enter Your OTP
                </label>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                 
                  autoFocus
                  className="otp-container"
                />
                <button
                  onClick={onOtpVerify}
                  className="bg-blue-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-blue-400 text-gray-600 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-black text-center"
                >
                  Verify your phone number
                </label>
                <input
                  name="phone"
                  type="string"
                  placeholder="phoneNumber"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                />

                <button
                  onClick={onSignup}
                  className="bg-blue-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
      <div id="recaptcha-container" className="flex justify-center"></div>

              </>
            )}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default OtpLoginPage;
