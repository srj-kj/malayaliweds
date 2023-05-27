import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Logo from "../../assets/Logo.png";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";


import MembersSection from "../../Components/LandingPage/Card";
import GroupSection from "../../Components/LandingPage/Story";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.app);

  console.log(user);
  const [age, setAge] = useState("");
  const ageOptions = [];

  for (let i = 18; i <= 60; i++) {
    ageOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return (
    <>
      {/* <Header/> */}
      <div className="">
        <div className="sticky top-0 z-10 bg-rose-100">
          <nav
            className="px-4 py-3  md:mt-0 sticky top-0 z-10 bg-rose-100 md:w-4/5 ml-32"
            id="navBar"
          >
            <div className="md:flex items-center justify-between">
              <img className="" src={Logo} alt="logo" height="50" width="100" />
              <div className="mt-5 md:mt-0 flex -ml-24">
                {user.isLogged ? (
                  <Link
                    to="/myaccount"
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg px-2 py-2.5 text-center   w-32 mr-5  text-lg h-11"
                  >
                    <span className="font-bold text-xl text-red-500">
                      Account
                    </span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg px-2 py-2.5 text-center   w-32 mr-5  text-lg h-11"
                  >
                    <span className="font-bold text-xl text-red-500">
                      Login
                    </span>
                  </Link>
                )}

                {user.isLogged ? (
                  <div
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                    className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                  >
                    <span className="w-full h-full ] bg-red-600 group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                    <span className="relative px-6 py-3 transition-all ease-out bg-red-600 rounded-md group-hover:bg-opacity-0 duration-400 h-11">
                      <span className="relative text-white">Logout </span>
                    </span>
                  </div>
                ) : (
                  <Link
                    to="/signup"
                    className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                  >
                    <span className="w-full h-full ] bg-red-600 group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                    <span className="relative px-6 py-3 transition-all ease-out bg-red-600 rounded-md group-hover:bg-opacity-0 duration-400 h-11">
                      <span className="relative text-white">
                        Resgister Now{" "}
                      </span>
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>

        <div className="sm:flex md:flex md:flex-wrap  md:mx-32 mt-8 mx-8">
          <section className="w-full md:w-1/2 md:px-4 ">
            <div className="content1">
              <div className="intro-form">
                <div className="intro-form-inner">
                  <h3 className="mb-4 text-sm font-extrabold text-gray-900 md:text-5xl lg:text-7xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-rose-200">
                      Find your Perfect Partner!!
                    </span>
                  </h3>
                  <div className="border-red-400 border border-dotted h-100 w-50 ">
                    <p className="font-bold">
                      Marry With{" "}
                      <strong className="text-red-600">Malayali Weds </strong>{" "}
                      Your Perfect Match is Just a Click Away.
                    </p>
                    <form action="/" className="banner-form">
                      <div className="gender">
                        <label htmlFor="gender-two" className="left">
                          Select Your Gender
                        </label>

                        <div className="custom-select right">
                          <select name="gender" id="gender" className="">
                            {user ? (
                              <option value="0">{user?.user?.gender}</option>
                            ) : (
                              <option value="0">Select Gender</option>
                            )}
                            <option value="1">Male</option>
                          </select>
                        </div>
                      </div>
                      <div className="person">
                        <label htmlFor="gender-two" className="left">
                          Looking for
                        </label>
                        <div className="custom-select right">
                          <select name="gender" id="gender-two" className="">
                            <option value="0">Select Gender</option>
                            <option value="1">Male</option>
                          </select>
                        </div>
                      </div>
                      <div className="age">
                        <label htmlFor="age" className="left">
                          Age
                        </label>
                        <div className="right d-flex justify-content-between">
                          <div className="custom-select ">
                            <select
                              className=""
                              name="age-start"
                              id="age"
                              value={age}
                            >
                              {ageOptions}
                            </select>
                          </div>

                          <div className="custom-select">
                            <select name="age-end" id="age-two" value={age}>
                              {ageOptions}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="city">
                        <label htmlFor="city" className="left">
                          City
                        </label>
                        <input
                          className="right"
                          type="text"
                          id="city"
                          placeholder="Your City Name.."
                        />
                      </div>
                      <button className="">Find Your Partner</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="w-full md:w-1/2 md:px-4">
            <img
              src="https://images.wedmegood.com/wp-content/uploads/2020/10/IMG_0023.jpg"
              alt="Img"
              className="rounded mt-8 md:mt-0"
              id="image"
            />
          </div>
        </div>
        <div className="md:mx-3 text-center mt-24">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-rose-500 md:text-5xl lg:text-5xl">
            Find Your Perfect Match
          </h1>
          <h1 className="mb-4 text-xl font-bold  tracking-tight text--400 md:text-3xl lg:text-3xl ">
            Let Us Help You Find Your Dream Partner Today
          </h1>
        </div>

        <div className="bg-gradient-to-r from-white via-rose-200 to-red-100 mt-8 py-16">
          <div className="md:flex md:flex-wrap  md:mx-32 m-5">
            <div className="w-full md:w-1/2 md:px-4 mt-8">
              <div className="relative">
                <img
                  src={img4}
                  alt="Overlay "
                  className="absolute md:-bottom-28 md:-right-4 md:w-14 h-60 w-fit rounded  hidden"
                />
                <img
                  src={img5}
                  alt="Overlay "
                  className="absolute xs:w-24 md:-top-8 md:-left-12 h-72  w rounded-md  -bottom-24 mb-8 -right-2"
                />
                <img src={img4} alt="Background" className="w-full" />
              </div>
            </div>
            <section className="w-full md:w-1/2 md:px-4 my-18">
              <h1 className="md:text-6xl  text-4xl font-bold text-blue-900 bg-clip-text mt-20 md:mt-0">
                Malalayali Weds
              </h1>
              <h2 className="mb-3   text-2xl  font-bold mt-3 text-indigo-800 underline">
                The Best Matrimonial Site for Your Happily Ever After
              </h2>
              <p className="mb-4 text-lg font-semibold  mt-5 text-justify">
                Malayali Weds is the premier matrimonial website designed
                exclusively for the Malayali community. We understand the
                cultural nuances and unique preferences of our community, and
                strive to provide a safe and trusted platform to help our
                members find their life partners. With our extensive database of
                verified profiles, personalized matchmaking services, and
                advanced search options, we make it easy for Malayali singles to
                connect with each other and take the first step towards a happy
                and fulfilling married life. Join us today and discover your
                perfect match!
              </p>
            </section>
          </div>
        </div>

        <div className="  md:mx-32 mx-8 text-center">
          <section className="w-full  md:px-4 my-20 ">
            <h2 className="md:text-4xl  text-3xl font-bold text-orange-600 ">
              Meet New People Today!
            </h2>
            <h2 className="text-2xl   font-bold text-red-600 mt-3">
              New Members in Malayali Weds
            </h2>
            <div className="flex justify-between">
              <MembersSection />
            </div>
          </section>
        </div>

        <div className="bg-gradient-to-r from-rose-300 via-red-200 to-white mt-0 pt-0 text-center">
          <div className=" text-center">
            <GroupSection />
          </div>
        </div>

        <div className="footer-top flex flex-wrap justify-center md:mx-32 mt-8 mx-8 space-x-3 mb-12 text-xl">
          <div className="footer-top-item lab-item">
            <div className="lab-inner">
              <div className="lab-thumb"></div>
              <div className="lab-content font-mono font-bold">
                <i className="fa-solid fa-phone"></i>
                <span>Phone Number : +880123 456 789</span>
              </div>
            </div>
          </div>
          <div className="footer-top-item lab-item">
            <div className="lab-inner">
              <div className="lab-content font-mono font-bold">
                <i class="fa-regular fa-envelope"></i>
                <span>Email : admin@malayaliweds.com</span>
              </div>
            </div>
          </div>
          <div className="footer-top-item lab-item">
            <div className="lab-inner">
              <div className="lab-content font-mono font-bold">
                <i class="fa-solid fa-location-dot"></i>
                <span>Address : 30 North West New York 240</span>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
      <style>{`
        #age  option {
          color: #8B5CF6;
        }
      `}</style>
      <style>{`
        #age-two  option {
          color: #8B5CF6;
        }
      `}</style>
    </>
  );
};

export default Home;
