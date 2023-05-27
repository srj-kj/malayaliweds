import React, { useEffect, useState } from "react";
import axios from "../../Axios/axios";
import { useSelector } from "react-redux";
import { profileDetails } from "../../Redux/profileSlice";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [follow, setFollow] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state?.app?.user);

  useEffect(() => {
    axios
      .get(`/profile/${id}`)
      .then((response) => {
        console.log(response.data);
        setProfileData(response.data);
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }, []);

  useEffect(() => {
    if (profileData) {
      axios
        .post(`/follow`, { follower: profileData?._id, user: user.id })
        .then((response) => {
          if (response.data) {
            setFollow(true);
          } else {
            setFollow(false);
          }
        });
    }
  }, [profileData]);

  const handleFollow = (followingId, followerId) => {
    axios.post(`/connect/`, { followingId, user: user.id }).then((response) => {
      console.log(response.data);
      if (response.data.msg == "Follow successful") {
        setFollow(true);
      } else {
        setFollow(false);
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <img
              className="h-64 w-full object-cover"
              src={
                profileData?.gender == "male"
                  ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                  : "https://static.m4marry.com/ui/images/img.reg-upload-female.png"
              }
              alt="Profile Picture"
            />
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {profileData?.username}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {profileData?.bio}
              </p>
              <div className="mt-4">
                <button
                  onClick={() => handleFollow(profileData?._id)}
                  href="#"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  {follow
                    ? "Unfollow"
                    : profileData?.following.some(
                        (follower) => follower.followId === user.id
                      )
                    ? "Follow Back"
                    : "Follow"}
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Age</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.age}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Religion
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.religion}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Education
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Bachelor's Degree
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Height
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.height} cm
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Occupation
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.job}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Hobbies
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Reading, Playing Tennis
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Religious views
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">Moderate</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Marital Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.MaritalStatus}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Lifestyle
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.diet}, {profileData?.drink},{" "}
                        {profileData?.smoke}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Annual Income
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">$60,000</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
