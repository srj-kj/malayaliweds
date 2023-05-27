import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileUpdate } from "../Tostify/Tostify";
import axios from "../../Axios/axios";
import { ToastContainer } from "react-toastify";

const Education = () => {
  const [form, setForm] = useState({});
  const [userInfo, setUserInfo] = useState("");
  const user = useSelector((state) => state?.app?.user);
  useEffect(() => {
    axios.get(`/profile/education/${user.id}`).then((response) => {
      setUserInfo(response.data.data);
    });
  }, []);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/profile/education/${user?.id}`, form).then(() => {
      profileUpdate();
    });
  };
  return (
    <div className="col-span-12 bg-white sm:col-span-12 md:col-span-12 sm:p-0">
      <form
        className="edit-form validate"
        title="MalayaliWeds.editProfile.checkGeneralInfo"
        id="updateGeneralInfo"
        name="updateGeneralInfo"
        onSubmit={(e)=>handleSubmit(e)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-3 gap-4 justify-evenly">
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Education"
            >
              Education <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              defaultValue={userInfo?.Education}
              onChange={(e) => handleInput(e)}
              placeholder="Enter Your Education"
              name="Education"
            />
          </div>
          <div className="col-span-12 sm:col-span-1 ml-9">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Educational In Detail <b className="text-red-600">*</b>
            </label>
            <textarea
              className="textarea textarea-bordered border-gray-500 w-56 bg-white"
              placeholder="Enter the Course"
              name="eduDetails"
              defaultValue={userInfo?.eduDetails}
              onChange={(e) => handleInput(e)}
            ></textarea>
          </div>
        </div>
        <hr className="mt-5 font-bold color-gray-600 h-2"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-3 gap-4 justify-between">
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              School Name <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              defaultValue={userInfo?.school}
              name="school"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Place <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              defaultValue={userInfo?.schoolPlace}
              name="schoolPlace"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Year of Studay <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md  w-full h-11 text-center "
              id="SchoolYear"
              name="Schoolyear"
              value={userInfo?.Schoolyear}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Year</option>
              <option value="2000">2000</option>
              <option value="2001">2001</option>
              <option value="2002">2002</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
              <option value="2007">2007</option>
              <option value="2008">2008</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
        <hr className="mt-5 font-bold color-gray-600 h-2"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-3 gap-4 justify-between">
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              College Name <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              defaultValue={userInfo?.clgName}
              name="clgName"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Place <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              defaultValue={userInfo?.clgPlace}
              name="clgPlace"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Year of Studay <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md  w-full h-11 text-center "
              id="clgYear"
              name="clgyear"
              value={userInfo?.clgyear}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Year</option>
              <option value="2000">2000</option>
              <option value="2001">2001</option>
              <option value="2002">2002</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
              <option value="2007">2007</option>
              <option value="2008">2008</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
        <hr className="mt-5 font-bold color-gray-600 h-2"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-3 gap-4 justify-between">
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Job Title <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              defaultValue={userInfo?.Job}
              name="Job"
              onChange={(e) => handleInput(e)}
            />
          </div>

          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Company"
            >
              Company Name <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              defaultValue={userInfo?.CompanyName}
              name="CompanyName"
              onChange={(e) => handleInput(e)}
            />
          </div>

          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Location"
            >
              Location <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              defaultValue={userInfo?.jobLocation}
              name="jobLocation"
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>
        <hr className="mt-5 font-bold color-gray-600 h-2"></hr>
        <button className="btn btn-warning w-24 mb-36">Save</button>
      </form>
      <div>
        
      <ToastContainer/>
      </div>

    </div>
  );
};

export default Education;
