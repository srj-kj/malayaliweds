import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser, faCompass, faComment } from '@fortawesome/free-solid-svg-icons'

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed sm:block mb-0 py-2 md:hidden bottom-0 w-full bg-black">
      <div className="flex rounded justify-around">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          <FontAwesomeIcon icon={faUser} className="w-7 h-7 ml-2 text-white" /> 
          <p className="text-green-500">Profile</p>
        </Link>

        <Link to="/search" className={location.pathname === "/search" ? "active-link" : ""}>
          <FontAwesomeIcon icon={faCompass} className="w-7 h-7 ml-2 text-white" />
          <p className="text-green-500">Explore</p>
        </Link>

        <Link to="/like" className={location.pathname === "/likes" ? "active-link" : ""}>
          <FontAwesomeIcon icon={faHeart} className="w-7 h-7 ml-2 text-white" />
          <p className="text-green-500">Matches</p>
        </Link>

        <Link to="/comments" className={location.pathname === "/comments" ? "active-link" : ""}>
          <FontAwesomeIcon icon={faComment} className="w-7 ml-0 h-7 text-white" />
          <p className="text-green-500">chat</p>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
