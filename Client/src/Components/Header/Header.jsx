import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/Logo.png";
import avatar from "../../assets/01.jpg";
import chat from "../../assets/chat-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.app?.user);
   const [profileImages, setProfileImages] = useState(user.url);
  //const profileImage = user.url
  console.log(user);
  return (
    <div className="navbar bg-white">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">MalayaliWeds</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <Link to="/search">
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </Link>
          <Link to="/">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-error indicator-item">
                  0
                </span>
              </div>
            </button>
          </Link>

          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> */}
              <img src={chat} alt="chat" height="20px" width="20px" />
              <span className="badge badge-xs badge-error indicator-item">
                0
              </span>
            </div>
          </button>
        </ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  profileImages ||
                  (user.gender === "male"
                    ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                    : "https://static.m4marry.com/ui/images/img.reg-upload-female.png")
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-primary rounded-box w-52"
          >
            <li>
              <Link to="/myaccount">
                <button
                  className="justify-between"
                  onClick={(e) => handleProfile()}
                >
                  Profile
                </button>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
