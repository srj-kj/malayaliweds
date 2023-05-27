import React, { useEffect, useState } from "react";
import { indian_religion_caste } from "indian-religion-caste";
import axios from "../../Axios/axios";
import { useSelector } from "react-redux";
import { profileUpdate } from "../Tostify/Tostify";
import { ToastContainer } from "react-toastify";

const Preferences = () => {
  const [form, setForm] = useState({ prefCaste: [] });
  const [userInfo, setUserInfo] = useState("");
  const [religion, setReligion] = useState("Hindu");
  const [caste, setCaste] = useState([]);
  const [ageFrom, setAgeFrom] = useState(21);
  const [ageTo, setAgeTo] = useState(21);

  const user = useSelector((state) => state?.app?.user);

  const ageOptions = [];
  useEffect(() => {
    axios.get(`/profile/preferences/${user.id}`).then((response) => {
      const { prefCaste } = response?.data?.data;
      setForm((prevForm) => ({ ...prevForm, prefCaste }));
      console.log(prefCaste);
      setUserInfo(response.data.data);
      console.log(userInfo);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/profile/preferences/${user?.id}`, form).then(() => {
      profileUpdate();
    });
  };

  useEffect(() => {
    console.log(religion);
    getCaste(religion);
  }, [religion]);
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
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    console.log(form);
  };
  for (let i = 21; i <= 60; i++) {
    ageOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return (
    <>
      <div className="col-span-12 bg-white sm:col-span-12 md:col-span-12 sm:p-0">
        <form
          className="edit-form validate"
          title="MalayaliWeds.editProfile.checkGeneralInfo"
          id="updateGeneralInfo"
          name="updateGeneralInfo"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 justify-between">
            <div className="col-span-12 sm:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Age"
              >
                Age <b className="text-red-600">*</b>
              </label>
              <select
                className="form-control mandatory rounded-md  border-gray-500 w-full h-11 text-center "
                id="ageFrom"
                name="ageFrom"
                value={userInfo.ageFrom}
                onChange={(e) => {
                  handleInput(e);
                  setAgeFrom(e.target.value);
                }}
              >
                {ageOptions}
              </select>
            </div>
            <div className="col-span-12 sm:col-span-1">
              <select
                className="form-control mandatory rounded-md  mt-7 border-gray-500 w-full h-11 text-center "
                id="ageTo"
                name="ageTo"
                value={userInfo.ageTo}
                onChange={(e) => {
                  handleInput(e);
                  setAgeTo(e.target.value);
                }}
              >
                {ageOptions}
              </select>
            </div>
            <div className="col-span-12 sm:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Location"
              >
                Height <b className="text-red-600">*</b>
              </label>
              <select
                className="form-control mandatory rounded-md  border-gray-500 w-full h-11 text-center "
                id="heightFrom"
                name="heightFrom"
                value={userInfo.heightFrom}
                onChange={(e) => handleInput(e)}
              >
                <option value="">From</option>
                <option value="121">4 ft - 121 cm</option>
                <option value="124">4 ft 1 in - 124 cm</option>
                <option value="127">4 ft 2 in - 127 cm</option>
                <option value="129">4 ft 3 in - 129 cm</option>
                <option value="132">4 ft 4 in - 132 cm</option>
                <option value="134">4 ft 5 in - 134 cm</option>
                <option value="137">4 ft 6 in - 137 cm</option>
                <option value="139">4 ft 7 in - 139 cm</option>
                <option value="142">4 ft 8 in - 142 cm</option>
                <option value="144">4 ft 9 in - 144 cm</option>
                <option value="147">4 ft 10 in - 147 cm</option>
                <option value="149">4 ft 11 in - 149 cm</option>
                <option value="152">5 ft - 152 cm</option>
                <option value="154">5 ft 1 in - 154 cm</option>
                <option value="157">5 ft 2 in - 157 cm</option>
                <option value="160">5 ft 3 in - 160 cm</option>
                <option value="162">5 ft 4 in - 162 cm</option>
                <option value="165">5 ft 5 in - 165 cm</option>
                <option value="167">5 ft 6 in - 167 cm</option>
                <option value="170">5 ft 7 in - 170 cm</option>
                <option value="172">5 ft 8 in - 172 cm</option>
                <option value="175">5 ft 9 in - 175 cm</option>
                <option value="177">5 ft 10 in - 177 cm</option>
                <option value="180">5 ft 11 in - 180 cm</option>
                <option value="182">6 ft - 182 cm</option>
                <option value="185">6 ft 1 in - 185 cm</option>
                <option value="187">6 ft 2 in - 187 cm</option>
                <option value="190">6 ft 3 in - 190 cm</option>
                <option value="193">6 ft 4 in - 193 cm</option>
                <option value="195">6 ft 5 in - 195 cm</option>
                <option value="198">6 ft 6 in - 198 cm</option>
                <option value="200">6 ft 7 in - 200 cm</option>
                <option value="203">6 ft 8 in - 203 cm</option>
                <option value="205">6 ft 9 in - 205 cm</option>
                <option value="208">6 ft 10 in - 208 cm</option>
                <option value="210">6 ft 11 in - 210 cm</option>
                <option value="213">7 ft - 213 cm</option>
              </select>
            </div>
            <div className="col-span-12 sm:col-span-1">
              <select
                className="form-control mandatory rounded-md mt-7 border-gray-500 w-full h-11 text-center "
                id="heightTo"
                name="heightTo"
                value={userInfo.heightTo}
                onChange={(e) => handleInput(e)}
              >
                <option value="">To</option>
                <option value="121">4 ft - 121 cm</option>
                <option value="124">4 ft 1 in - 124 cm</option>
                <option value="127">4 ft 2 in - 127 cm</option>
                <option value="129">4 ft 3 in - 129 cm</option>
                <option value="132">4 ft 4 in - 132 cm</option>
                <option value="134">4 ft 5 in - 134 cm</option>
                <option value="137">4 ft 6 in - 137 cm</option>
                <option value="139">4 ft 7 in - 139 cm</option>
                <option value="142">4 ft 8 in - 142 cm</option>
                <option value="144">4 ft 9 in - 144 cm</option>
                <option value="147">4 ft 10 in - 147 cm</option>
                <option value="149">4 ft 11 in - 149 cm</option>
                <option value="152">5 ft - 152 cm</option>
                <option value="154">5 ft 1 in - 154 cm</option>
                <option value="157">5 ft 2 in - 157 cm</option>
                <option value="160">5 ft 3 in - 160 cm</option>
                <option value="162">5 ft 4 in - 162 cm</option>
                <option value="165">5 ft 5 in - 165 cm</option>
                <option value="167">5 ft 6 in - 167 cm</option>
                <option value="170">5 ft 7 in - 170 cm</option>
                <option value="172">5 ft 8 in - 172 cm</option>
                <option value="175">5 ft 9 in - 175 cm</option>
                <option value="177">5 ft 10 in - 177 cm</option>
                <option value="180">5 ft 11 in - 180 cm</option>
                <option value="182">6 ft - 182 cm</option>
                <option value="185">6 ft 1 in - 185 cm</option>
                <option value="187">6 ft 2 in - 187 cm</option>
                <option value="190">6 ft 3 in - 190 cm</option>
                <option value="193">6 ft 4 in - 193 cm</option>
                <option value="195">6 ft 5 in - 195 cm</option>
                <option value="198">6 ft 6 in - 198 cm</option>
                <option value="200">6 ft 7 in - 200 cm</option>
                <option value="203">6 ft 8 in - 203 cm</option>
                <option value="205">6 ft 9 in - 205 cm</option>
                <option value="208">6 ft 10 in - 208 cm</option>
                <option value="210">6 ft 11 in - 210 cm</option>
                <option value="213">7 ft - 213 cm</option>
              </select>
            </div>
          </div>
          <hr className="mt-5 font-bold color-gray-600 h-2"></hr>
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
                id="prefReligion"
                name="prefReligion"
                value={userInfo.prefReligion}
                onChange={(e) => {
                  handleInput(e);
                  setReligion(e.target.value);
                }}
              >
                {indian_religion_caste.map((e) => (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 sm:col-span-1 border-gray-500    ">
              <div className="overflow-y-scroll h-24">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="caste"
                >
                  Caste <b className="text-red-600">*</b>
                </label>
                <ul class="multi-select-box border   border-gray-500 px-4">
                  {caste.map((e, i) => (
                    <li key={i}>
                    <input
                      type="checkbox"
                      value={e.name}
                      name="prefCaste"
                      checked={form.prefCaste.includes(e.name)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const value = e.target.value;
                        if (isChecked) {
                          setForm((prevForm) => ({
                            ...prevForm,
                            prefCaste: [...prevForm.prefCaste, value],
                          }));
                        } else {
                          setForm((prevForm) => ({
                            ...prevForm,
                            prefCaste: prevForm.prefCaste.filter((caste) => caste !== value),
                          }));
                        }
                      }}
                    />
                    <label className="px-5">{e.name}</label>
                  </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <hr className="mt-5 font-bold color-gray-600 h-2"></hr>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 md:grid-cols-3 gap-4">
            <div className="col-span-12 sm:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Choose Your Country <b className="text-red-600">*</b>
              </label>
              <select
                className="form-control mandatory rounded-md w-full h-11 text-center items-center "
                id="country"
                name="country"
                // onChange={(e) => setReligion(e.target.value)}
              >
                <option value="">Choose Your Country</option>
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
                htmlFor="state"
              >
                Choose Your State <b className="text-red-600">*</b>
              </label>
              <select
                className="form-control mandatory rounded-md w-full h-11 text-center items-center "
                id="state"
                name="state"
                onChange={(e) => setReligion(e.target.value)}
              >
                <option value="">Choose Your State</option>
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
                htmlFor="city"
              >
                Choose Your City <b className="text-red-600">*</b>
              </label>
              <select
                className="form-control mandatory rounded-md w-full h-11 text-center items-center "
                id="city"
                name="city"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 md:grid-cols-3 gap-4">
            <div className="col-span-12 sm:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Diet <b className="text-red-600">*</b>
              </label>
              <select
                className="form-control mandatory rounded-md w-full h-11 text-center items-center "
                id="prefDiet"
                name="prefDiet"
                value={userInfo.prefDiet}
                onChange={(e) => handleInput(e)}
              >
                <option value="">Please Select</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Eggetarian">Eggetarian</option>
                <option value="Non Vegetarian">Non Vegetarian</option>
              </select>
            </div>
            <div className="col-span-12 sm:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="state"
              >
                Smoke <b className="text-red-600">*</b>
              </label>
              <select
                className="form-control mandatory rounded-md w-full h-11 text-center items-center "
                id="prefSmoke"
                name="prefSmoke"
                value={userInfo.prefSmoke}
                onChange={(e) => handleInput(e)}
              >
                <option value="">Please Select</option>
                <option value="Don't Smoke">Don't Smoke</option>
                <option value="Smokes in Company">Smokes in Company</option>
                <option value="Light Smoker">Light Smoker</option>
                <option value="Heavy Smoker">Heavy Smoker</option>
              </select>
            </div>
            <div className="col-span-12 sm:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                Drink <b className="text-red-600">*</b>
              </label>
              <select
                className="form-control mandatory rounded-md w-full h-11 text-center items-center "
                id="prefDrink"
                name="prefDrink"
                value={userInfo.prefDrink}
                onChange={(e) => handleInput(e)}
              >
                <option value="">Please Select</option>
                <option value="Don't Drink">Don't Drink</option>
                <option value="Drinks in Company">Drinks in Company</option>
                <option value="Light Drinker">Light Drinker</option>
                <option value="Heavy Drinker">Heavy Drinker</option>
              </select>
            </div>
          </div>
          <hr className="mt-5 font-bold color-gray-600 h-2"></hr>

          <button className="btn btn-warning w-24 mb-36">Save</button>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Preferences;
