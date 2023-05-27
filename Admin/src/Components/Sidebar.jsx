/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate()
  const Menus = [
    { title: "Dashboard", src: "Chart_fill",link:'/admin' },
    // { title: "Inbox", src: "Chat",link:'/message' },
    { title: "Users", src: "User", gap: true ,link:'/admin/users'},
    { title: "Schedule ", src: "Calendar", },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];
  return (
    <div className="flex bg-gray-700">
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
    >
      <img
        src="/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center ">
        <img
          src="/logo.png"
          className={`cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          } h-10 w-10`}
          alt="MalluWeds logo"
        />
        <h1
          className={`text-white origin-left font-medium text-2xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          MalayaliWeds
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            onClick={() => navigate(Menu.link)}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-pink text-black text-lg items-center gap-x-4 ${
              Menu.gap ? "mt-9" : "mt-2"
            } ${index === 0 && "bg-light-white"}`}
          >
            <img
              src={`/${Menu.src}.png`}
              className="w-5 h-5"
              alt={Menu.title}
            />
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-200 text-base`}
            >
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default Sidebar