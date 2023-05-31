import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../Axios/axios";
import { profileDetails } from "../../Redux/profileSlice";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { notFound } from "../Tostify/Tostify";
import { ToastContainer } from "react-toastify";

const Search = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state?.app?.user);
  const profile = useSelector((state) => state?.app?.profile);
  console.log(profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/search/${user.id}`).then((response) => {
      console.log(response.data);
      setUserProfiles(response.data);
    });
  }, [user.id]);
  const viewProfile = (profileId) => {
    alert('hi')
    axios.get(`/profile/${profileId}`).then((response) => {
      if(response.data){
        dispatch(profileDetails(response.data));
        navigate(`/profile/${profileId}`);
      }
    });
  };

  const handleSearch = () => {
    axios
      .post("/searchById", { search })
      .then((response) => {
        const id = response.data[0]._id;
        navigate(`/profile/${id}`);
      })
      .catch((err) => {
        notFound(err?.response?.data?.error);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative text-gray-600">
          <div className="flex">
            <input
              type="search"
              name="search"
              placeholder="Search By Profile Id or email or Phone"
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white h-10 px-5 pr-1 rounded-l-full w-72 text-sm focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r-full py-2 px-4"
            >
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 mt-3 ml-60 mb-24 mr-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {userProfiles&&userProfiles?.map((profile) => (
          <div className="card bg-yellow-500 w-44  shadow-xl" key={profile?._id}>
            <div className="card-header flex justify-end mr-3 mt-2">
              <button className="heart-button">
                <AiOutlineHeart />
              </button>
            </div>
            <figure>
              <img
                className="mt-3 rounded-full"
                src={
                  profile?.url ||
                  (profile?.gender === "female"
                    ? "https://static.m4marry.com/ui/images/img.reg-upload-female.png"
                    : "https://static.m4marry.com/ui/images/img.reg-upload-male.png")
                }
                alt="profilepic"
                height="100px"
                width="100px"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-sm">
                {profile?.username}
                {/* <div className="badge badge-secondary text-sm">NEW</div> */}
              </h2>
              <p className="text-xs">{profile?.age} years</p>
              <div className="flex gap-4">
                <span className="text-xs">{profile?.religion}</span>
                <span className="text-xs">{profile?.Caste}</span>
              </div>
              <div className="flex gap-1">
                <span className="text-xs">{profile?.country}</span>
                <span className="text-xs">{profile?.state}</span>

                <span className="text-xs">{profile?.city}</span>
              </div>
              <div className="card-actions mt-3 justify-center">
                <button
                  className="badge badge-outline hover:text-red-800"
                  onClick={() => viewProfile(profile._id)}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Search;
