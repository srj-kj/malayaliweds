import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../Axios/axios";
import { profileDetails } from "../../Redux/profileSlice";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const user = useSelector((state) => state?.app?.user);
    const profile = useSelector((state) => state?.app?.profile);
    console.log(profile);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`/search/${user.id}`).then((response) => {
      console.log(response.data);
      setUserProfiles(response.data);
    });
  }, [user.id]);
  const viewProfile = (profileId) => {
    axios.get(`/profile/${profileId}`).then((response) => {
      console.log(response.data.profile);
      dispatch(profileDetails(response.data.profile));
      navigate(`/profile/${profileId}`)
    });
  };

  return (
    <div className="grid gap-4 ml-60 mb-24 mr-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {userProfiles.map((profile) => (
        <div className="card bg-yellow-500 w-44  shadow-xl" key={profile._id}>
          <div className="card-header flex justify-end mr-3 mt-2">
            <button className="heart-button"><AiOutlineHeart/></button>
          </div>
          <figure>
            <img
              className="mt-3"
              src={
                user.gender === "female"
                  ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                  : "https://static.m4marry.com/ui/images/img.reg-upload-female.png"
              }
              alt="profilepic"
              height="80px"
              width="80px"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-sm">
              {profile.username}
              {/* <div className="badge badge-secondary text-sm">NEW</div> */}
            </h2>
            <p className="text-xs">{profile.age} years</p>
            <div className="flex gap-4">
              <span className="text-xs">{profile.religion}</span>
              <span className="text-xs">{profile.Caste}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-xs">{profile.country}</span>
              <span className="text-xs">{profile.state}</span>

              <span className="text-xs">{profile.city}</span>
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
  );
};

export default Search;
