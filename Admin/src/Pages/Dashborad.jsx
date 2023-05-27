/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import Modal from "../Components/Modal";

const Dashborad = () => {
  // let Links = [
  //   { name: "HOME", link: "/" },
  //   { name: "SERVICE", link: "/" },
  //   { name: "ABOUT", link: "/" },
  //   { name: "BLOG'S", link: "/" },
  //   { name: "CONTACT", link: "/" },
  // ];
  // eslint-disable-next-line no-unused-vars
  // let [open, setOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return(  <>
  
  {/* <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" role="tablist">
        <li className="mr-2" role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${
              activeTab === 'profile'
                ? 'border-black dark:border-dark'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            id="profile-tab"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected={activeTab === 'profile'}
            onClick={() => handleTabClick('profile')}
          >
            Profile
          </button>
        </li>
        <li className="mr-2" role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${
              activeTab === 'dashboard'
                ? 'border-black dark:border-dark'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            id="dashboard-tab"
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected={activeTab === 'dashboard'}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </button>
        </li>
      </ul>
      <div id="myTabContent">
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === 'profile' ? 'block' : 'hidden'
          }`}
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content for the{' '}
            <strong className="font-medium text-white dark:text-dark">Profile tab's associated content</strong>
            . Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps
            classes to control the content visibility and styling.
          </p>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === 'dashboard' ? 'block' : 'hidden'
          }`}
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content for the{' '}
            <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>
            . Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps
            classes to control the content visibility and styling.
          </p>
        </div>
      </div>
    </div> */}

{/* <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <img className="h-64 w-full object-cover" src="https://placehold.it/600x400" alt="Profile Picture" />
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">John Doe</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec justo vel sapien ultricies eleifend.</p>
            <div className="mt-4">
              <a href="#" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Chat</a>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Age</dt>
                    <dd className="mt-1 text-sm text-gray-900">30</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Religion</dt>
                    <dd className="mt-1 text-sm text-gray-900">Christian</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Education</dt>
                    <dd className="mt-1 text-sm text-gray-900">Bachelor's Degree</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Height</dt>
                    <dd className="mt-1 text-sm text-gray-900">6'0''</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                    <dd className="mt-1 text-sm text-gray-900">Full Stack Developer</dd>
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
                    <dt className="text-sm font-medium text-gray-500">Hobbies</dt>
                    <dd className="mt-1 text-sm text-gray-900">Reading, Playing Tennis</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Religious views</dt>
                    <dd className="mt-1 text-sm text-gray-900">Moderate</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Marital Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">Never Married</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Lifestyle</dt>
                    <dd className="mt-1 text-sm text-gray-900">Vegetarian, Non-Smoker</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Annual Income</dt>
                    <dd className="mt-1 text-sm text-gray-900">$60,000</dd>


                    </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}

<div className="container-fluid">
      <div className="container mx-auto px-4">
        <div className="border-b border-gray-200">
          <div className="-mb-px flex">
            <button
              className={`${
                activeTab === 'general'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => handleTabClick('general')}
            >
              <span className="hidden sm:inline">General Info</span>
            </button>
            <button
              className={`${
                activeTab === 'religious'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => handleTabClick('religious')}
            >
              <span className="hidden sm:inline">Religious Info</span>
            </button>
            <button
              className={`${
                activeTab === 'education'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => handleTabClick('education')}
            >
              <span className="hidden sm:inline">Education and Career</span>
            </button>
            <button
              className={`${
                activeTab === 'family'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => handleTabClick('family')}
            >
              <span className="hidden sm:inline">My Family</span>
            </button>
            <button
              className={`${
                activeTab === 'hobbies'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => handleTabClick('hobbies')}
            >
              <span className="hidden sm:inline">My Interests and Hobbies</span>
            </button>
            <button
              className={`${
                activeTab === 'partner'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => handleTabClick('partner')}
            >
              <span className="hidden sm:inline">My Preferred Partner</span>
            </button>
            </div>
            
            <div className="tab-content">
            <div
              className={activeTab === 'general' ? 'block' : 'hidden'}
              id="generalTab"
            >
              <p>General Info tab content goes here</p>
            </div>
            <div
              className={activeTab === 'religious' ? 'block' : 'hidden'}
              id="religiousTab"
            >
              <p>Religious Info tab content goes here</p>
            </div>
            <div
              className={activeTab === 'education' ? 'block' : 'hidden'}
              id="educationTab"
            >
              <p>Education and Career tab content goes here</p>
            </div>
            <div
              className={activeTab === 'family' ? 'block' : 'hidden'}
              id="familyTab"
            >
              <p>My Family tab content goes here</p>
            </div>
            <div
              className={activeTab === 'hobbies' ? 'block' : 'hidden'}
              id="hobbiesTab"
            >
              <p>My Interests and Hobbies tab content goes here</p>
            </div>
            <div
              className={activeTab === 'partner' ? 'block' : 'hidden'}
              id="partnerTab"
            >
              <p>My Preferred Partner tab content goes here</p>
            </div>
            <div
              className={activeTab === 'contact' ? 'block' : 'hidden'}
              id="contactTab"
            >
              <p>Contact Details tab content goes here</p>
            </div>
          </div>
        </div>
      </div>
    </div>






  </>
  )
};

export default Dashborad;
