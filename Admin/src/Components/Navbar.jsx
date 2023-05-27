/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { useEffect } from "react";
import {BiMessageSquareAdd} from 'react-icons/bi'
import { logout } from "../Redux/adminSlice";
import { useDispatch } from "react-redux";


function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hamBurger,setHamBurger] = useState({
    mainMenu : false
  })



  const handleThemeButton = async()=>{
    // dispatch(toggleTheme())
  }

  return (
    <div className='w-full'>
      <nav className=" bg-white sm:px-4 py-2.5 dark:bg-gray-900  w-full z-20 top-0 left-0 ">
        <div className=" flex items-center justify-between">
          <Link className="flex items-center">
            {/* <img
              src="./Images/LOGO.png"
              className="h-6 mr-3 sm:h-9"
              alt="Logo"
            /> */}
            <span className="self-center text-xl font0-semibold whitespace-nowrap dark:text-white">
              MalayaliWeds
            </span>
          </Link>
          <div className="flex md:order-2 gap-4">
            {/* <div className="bg-gray-700 rounded-lg mt-0.5 hover:cursor-pointer h-9 w-9 flex justify-center items-center" onClick={handleThemeButton}>
             
            </div> */}
            <div>
              <button className="bg-red-900  text-white" onClick={()=>{
                localStorage.clear()
                dispatch(logout())
                navigate('/admin/login')
              }}>Logout</button>
            </div>
            {/* <Link
              type="button"
              className="hidden md:flex text-white gap-1 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-700 dark:hover:bg-green-900 dark:focus:ring-green-800"
              to={'/project/create'}
            >
              <BiMessageSquareAdd className="text-xl"/>
              Create
            </Link> */}
            <button
            onClick={()=>setHamBurger({mainMenu: !hamBurger.mainMenu})}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {/* <div
            className={ `items-center justify-between  w-11/12 md:flex md:w-auto md:order-1 z-10 fixed md:static top-14  ${hamBurger.mainMenu ? 'block' :'hidden'}`} 
            id="navbar-sticky">
            <ul className="flex flex-col p-4 mt-4 border border-white rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              
              <li>
                <Link
                  className="block py-2 pl-3 pr-4 text-black-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
              </li>
              <li >
                <Link className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  About
                </Link>
              </li>
              <li >
                <Link className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Services
                </Link>
              </li>
              <li >
                <linLink className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Contact
                </linLink>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;