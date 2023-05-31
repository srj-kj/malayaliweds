import React, { useState } from "react";
import Header from "../Header/Header";
import General from "../Personal/General";
import PicSetup from "../Personal/PicSetup";
import Footer from "../Footer/Footer";
import Religious from "../Personal/Religious";
import Education from "../Personal/Education";
import Preferences from "../Personal/Preferences";
import { useSelector } from "react-redux";

const ProfileTop = () => {
  const [activeTab, setActiveTab] = useState("general");
  const user = useSelector((state) => state?.app?.user);
  const [profileImage, setProfileImage] = useState(user.url);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <>
      <div className="col-span-12 ml-16 sm:col-span-9 md:col-span-9 lg:col-span-10 p-0 profile-heading">
        <div className="col-span-12 mr-12 ml-16 sm:col-span-12 w-full md:col-span-10 bg-gray-200 p-0 flex">
          <img
            src={
              profileImage ||
              (user.gender === "male"
                ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                : "https://static.m4marry.com/ui/images/img.reg-upload-female.png")
            }
            alt=""
            height="140px"
            width="140px"
          />
          <div>
            <h6 className="text-sm mt-5 ml-4 font-small ">
              {user.username} ({user.profileId})
            </h6>
            <div>
              <div className="flex flex-wrap items-center col-span-12 text-sm sm:col-span-8 md:col-span-6 lg:col-span-6 py-0 px-4">
                <span className="mr-2">Your Email ID:</span>
                <span className="font-md mr-2">{user.email}</span>
                <span className="bg-gray-400 ml-2 px-2 font-sm py-1 rounded cursor-pointer">
                  &#9998;
                </span>
              </div>
              <div className="col-span-12 font-md sm:col-span-8 md:col-span-6 lg:col-span-6 py-0 px-4 mt-2">
                <span className="mr-2 font-md text-sm">
                  Your Recommendations are Enabled
                </span>
                <span
                  className="bg-gray-400 px-2 ml-1 font-sm py-1 rounded cursor-pointer"
                  title="To manage recommendation"
                >
                  &#9998;
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-4  py-2 px-4 mt-8">
            <span className="font-md mr-2">
              Your Profile Status Is: <b>Active</b>
            </span>
            <a href="https://mysite.m4marry.com/changeProfileStatus">
              <span
                className="ml-2 bg-gray-400 px-2 py-1 rounded cursor-pointer"
                data-toggle="tooltip"
                data-placement="top"
                title="To communicate with malayali weds members, change your status to Active"
              >
                &#9998;
              </span>
            </a>
          </div>
          <div className="col-span-12 sm:col-span-8 md:col-span-3 lg:col-span-2  py-2 px-4 mt-8   ">
            <span href="" className=" font-sm">
              Delete Your Profile
            </span>{" "}
            <b className="text-red-500">
              <i class="fa-solid fa-trash"></i>
            </b>
          </div>
          {/* <span class="text-green-500 material-symbols-outlined">
          phonelink_erase
        </span> */}
          <div className="mt-8 ml-9">
            <div>
              <span class="text-green-700 material-symbols-outlined">
                mobile_friendly
              </span>
              <label>Mobile Verified</label>
            </div>
            <div className="mt-5">
              <span class="text-green-700 material-symbols-outlined">
                mark_email_read
              </span>
              <label>Email Verified</label>
            </div>
          </div>
        </div>

        {/* <div class="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-2 gap-4">
        <input type="hidden" id="fromPage" value="editProfile" />
        <div class="flex flex-col justify-between">
          <div class="pb-4">
            <p class="text-sm font-medium">
              We just need you to verify your email address so that you will
              receive your daily and weekly matches and recommendations as
              email.
            </p>
            <span id="resendEmailSuccess"></span>
            <a href="#" class="text-blue-600 hover:text-blue-800">
              Resend Verification Email
            </a>
            <span class="mx-2">|</span>
            <a
              href="https://mysite.m4marry.com/editEmail"
              class="text-blue-600 hover:text-blue-800"
            >
              Edit Email
            </a>
          </div>
          <span class="text-green-500 font-medium">v</span>
        </div>
      </div> */}
        <div className="container mx-auto ml-16">
          <div className="border-b border-gray-200">
            <div className="-mb-px flex mt-3 bg-gray-300 justify-between">
              <button
                className={`${
                  activeTab === "general"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("general")}
              >
                <span className="hidden sm:inline ">General Info</span>
              </button>
              <button
                className={`${
                  activeTab === "religious"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("religious")}
              >
                <span className="hidden sm:inline">Religious Info</span>
              </button>
              <button
                className={`${
                  activeTab === "education"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("education")}
              >
                <span className="hidden sm:inline">Education and Career</span>
              </button>
              <button
                className={`${
                  activeTab === "family"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("family")}
              >
                <span className="hidden sm:inline">My Family</span>
              </button>
              <button
                className={`${
                  activeTab === "hobbies"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("hobbies")}
              >
                <span className="hidden sm:inline">
                  My Interests and Hobbies
                </span>
              </button>
              <button
                className={`${
                  activeTab === "partner"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("partner")}
              >
                <span className="hidden sm:inline">My Preferred Partner</span>
              </button>
            </div>

            <div className="tab-content mt-5  flex flex-row-reverse">
              <PicSetup />
              <div className="mr-32">
                <div
                  className={activeTab === "general" ? "block" : "hidden"}
                  id="generalTab"
                >
                  <General />
                </div>
                <div
                  className={activeTab === "religious" ? "block" : "hidden"}
                  id="religiousTab"
                >
                  <Religious />
                </div>
                <div
                  className={activeTab === "education" ? "block" : "hidden"}
                  id="educationTab"
                >
                  <Education />
                </div>
                <div
                  className={activeTab === "family" ? "block" : "hidden"}
                  id="familyTab"
                >
                  <p>My Family tab content goes here</p>
                </div>
                <div
                  className={activeTab === "hobbies" ? "block" : "hidden"}
                  id="hobbiesTab"
                >
                  <p>My Interests and Hobbies tab content goes here</p>
                </div>
                <div
                  className={activeTab === "partner" ? "block" : "hidden"}
                  id="partnerTab"
                >
                  <Preferences />
                </div>
                <div
                  className={activeTab === "contact" ? "block" : "hidden"}
                  id="contactTab"
                >
                  <p>Contact Details tab content goes here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTop;
