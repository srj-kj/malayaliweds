import React, { useEffect, useState } from "react";
import { indian_religion_caste } from "indian-religion-caste";
import axios from "../../Axios/axios";
import { useSelector } from "react-redux";
import { profileUpdate } from "../Tostify/Tostify";
import { ToastContainer } from "react-toastify";
const Religious = () => {
  const [religion, setReligion] = useState("Hindu");
  const [caste, setCaste] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [form, setForm] = useState({});
  const user = useSelector((state) => state?.app?.user);


  useEffect(() => {
    console.log(religion);
    getCaste(religion);
  }, [religion]);

  useEffect(() => {
    axios.get(`/profile/religion/${user.id}`).then((response) => {
      setUserInfo(response.data.data);
    });
  }, []);
  const getCaste = (religion) => {
    const caste = indian_religion_caste?.filter((obj) => obj.name == religion);
    setCaste(caste[0].castes);
  };

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
    axios.post(`/profile/religion/${user?.id}`, form).then(() => {
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
        onSubmit={handleSubmit }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Religion <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md w-full h-11 text-center items-center "
              id="religion"
              name="religion"
              value={userInfo.religion}
              onChange={(e) => {
                handleInput(e);
                setReligion(e.target.value);
              }}            >
              <option value="">Choose Your Religion</option>
              {indian_religion_caste.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="caste"
            >
              Caste <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md w-full h-11 text-center items-center "
              id="caste"
              name="Caste"
              value={userInfo.Caste}
              onChange={(e) => handleInput(e)}
            >
              {caste.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="mt-5 font-bold color-gray-600 h-2"></hr>
        <button type="submit" className="btn btn-warning w-24 mb-36">Save</button>
      </form>
      <ToastContainer />

    </div>
  );
};

export default Religious;
