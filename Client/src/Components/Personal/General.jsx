import React, { useEffect, useState } from "react";
import indianCities from "indian-cities-json";
import axios from "../../Axios/axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { profileUpdate } from "../Tostify/Tostify";
import { ToastContainer } from "react-toastify";
import { Country, State, City } from "country-state-city";
const General = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState('');
  const [form, setForm] = useState({});
  const [age, setAge] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const user = useSelector((state) => state?.app?.user);
  // console.log(Country?.getAllCountries());
  const states = State.getStatesOfCountry(country);
  const cities = indianCities.cities.filter((city) => city.state === state);
 
  useEffect(() => {
   const result= State.getStatesOfCountry(country);
   console.log(result);
   setState(result)
     indianCities.cities.filter((city) => city.state === state);

  }, []);

  useEffect(() => {
    axios.get(`/profile/general/${user.id}`).then((response) => {
      console.log(response.data);
      const { spokenLanguages } = response?.data?.data;
      setForm({ ...form, spokenLanguages });
      console.log(spokenLanguages);
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
    axios.post(`/profile/general/${user?.id}`, form).then(() => {
      profileUpdate();
    });
  };
  useEffect(() => {
    const dob = moment(user?.dob);
    console.log(dob);
    const today = moment();
    const ageInYears = today.diff(dob, "years");
    console.log(ageInYears);
    setAge(ageInYears);
  }, []);
  return (
    <div className="col-span-12 bg-white sm:col-span-12 md:col-span-12 sm:p-0">
      <form
        className="edit-form validate"
        title="MalayaliWds.editProfile.checkGeneralInfo"
        id="updateGeneralInfo"
        name="updateGeneralInfo"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="name"
              name="username"
              type="text"
              maxLength="100"
              defaultValue={user?.username}
              autoComplete="off"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              value={user.gender}
              disabled
            />
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateOfBirth"
            >
              Date of Birth<b className="text-red-600">*</b>{" "}
              <a className="boot-tooltip icon-form-help">&nbsp;</a>
            </label>
            <input
              className="form-input w-full border-gray-500 rounded-md shadow-sm"
              type="text"
              name="dob"
              value={user.dob}
              disabled
            />
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age <b className="text-red-600">*</b>
            </label>
            <input
              className="form-input w-full border-gray-300 rounded-md shadow-sm"
              type="text"
              name="age"
              value={age}
              disabled
            />
          </div>

          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Height <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md  w-full h-11 text-center "
              id="height"
              name="height"
              value={userInfo.height}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Choose Your Height</option>
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Weight <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md w-full h-11 text-center items-center "
              id="weight"
              name="weight"
              value={userInfo.weight}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Choose Your Weight</option>
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
              <option value="46">46</option>
              <option value="47">47</option>
              <option value="48">48</option>
              <option value="49">49</option>
              <option value="50">50</option>
              <option value="51">51</option>
              <option value="52">52</option>
              <option value="53">53</option>
              <option value="54">54</option>
              <option value="55">55</option>
              <option value="56">56</option>
              <option value="57">57</option>
              <option value="58">58</option>
              <option value="59">59</option>
              <option value="60">60</option>
              <option value="61">61</option>
              <option value="62">62</option>
              <option value="63">63</option>
              <option value="64">64</option>
              <option value="65">65</option>
              <option value="66">66</option>
              <option value="67">67</option>
              <option value="68">68</option>
              <option value="69">69</option>
              <option value="70">70</option>
              <option value="71">71</option>
              <option value="72">72</option>
              <option value="73">73</option>
              <option value="74">74</option>
              <option value="75">75</option>
              <option value="76">76</option>
              <option value="77">77</option>
              <option value="78">78</option>
              <option value="79">79</option>
              <option value="80">80</option>
              <option value="81">81</option>
              <option value="82">82</option>
              <option value="83">83</option>
              <option value="84">84</option>
              <option value="85">85</option>
              <option value="86">86</option>
              <option value="87">87</option>
              <option value="88">88</option>
              <option value="89">89</option>
              <option value="90">90</option>
              <option value="91">91</option>
              <option value="92">92</option>
              <option value="93">93</option>
              <option value="94">94</option>
              <option value="95">95</option>
              <option value="96">96</option>
              <option value="97">97</option>
              <option value="98">98</option>
              <option value="99">99</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Marital Status <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md  w-full h-11 text-center "
              id="MaritalStatus"
              name="MaritalStatus"
              value={userInfo.MaritalStatus}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Please Select</option>
              <option value="unmarried">Unmarried</option>
              <option value="Divorced">Divorced</option>
              <option value="Separated">Separated</option>
              <option value="Widow/Widower">Widow/Widower</option>
            </select>
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Mother Tongue <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md  w-full h-11 text-center "
              id="MotherTongue"
              name="MotherTongue"
              value={userInfo.MotherTongue}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Please Select</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Kannada">Kannada</option>
              <option value="Telungu">Telungu</option>
            </select>
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Complexion <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md  w-full h-11 text-center "
              id="Complexion"
              name="Complexion"
              value={userInfo.Complexion}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Please Select</option>
              <option value="Very fair">Very fair</option>
              <option value="Fair">Fair</option>
              <option value="Wheatish">Wheatish</option>
              <option value="Medium">Medium</option>
              <option value="Dark">Dark</option>
            </select>
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Body Type <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md  w-full h-11 text-center "
              id="Bodytype"
              name="Bodytype"
              value={userInfo.Bodytype}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Please Select</option>
              <option value="Athletic">Athletic</option>
              <option value="Average">Average</option>
              <option value="Heavy">Heavy</option>
              <option value="Slim">Slim</option>
            </select>
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Blood Group <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md  w-full h-11 text-center "
              id="Bloodgroup"
              name="bloodgroup"
              value={userInfo.bloodgroup}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Select One</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Physical Status <b className="text-red-600">*</b>
            </label>
            <select
              className="form-control mandatory rounded-md  w-full h-11 text-center "
              id="PhysicalStatus"
              name="PhysicalStatus"
              value={userInfo.PhysicalStatus}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Select One</option>
              <option value="Normal">Normal</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>

        <hr className="mt-3 font-bold color-gray-600 h-2"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-3 gap-4 justify-between">
          <div className="col-span-12 sm:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Add Bio <b className="text-red-600">*</b>
            </label>
            <textarea
              className="textarea textarea-bordered border-gray-500 w-56 bg-white"
              placeholder="Bio"
              name="bio"
              defaultValue={userInfo.bio}
              onChange={(e) => handleInput(e)}
            ></textarea>
          </div>
          <div className="col-span-12 sm:col-span-1 ml-16">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="SpokenLanguage(s)"
            >
              Spoken Language(s) <b className="text-red-600">*</b>
            </label>
            <ul class="multi-select-box border border-gray-500 px-4">
              <li>
                <input
                  type="checkbox"
                  value="Malayalam"
                  name="spokenLanguages"
                  checked={form?.spokenLanguages?.includes("Malayalam")}
                  onChange={(e) => {
                    const isChecked = e.target.checked;

                    const value = e.target.value;

                    if (isChecked) {
                      setForm({
                        ...form,
                        spokenLanguages: [
                          ...(form?.spokenLanguages || []),
                          value,
                        ],
                      });
                    } else {
                      setForm({
                        ...form,
                        spokenLanguages: form?.spokenLanguages.filter(
                          (lang) => lang !== value
                        ),
                      });
                    }
                  }}
                />

                <label className="px-5">Malayalam</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="English"
                  name="spokenLanguages"
                  checked={form?.spokenLanguages?.includes("English")}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;
                    if (isChecked) {
                      setForm({
                        ...form,
                        spokenLanguages: [
                          ...(form?.spokenLanguages || []),
                          value,
                        ],
                      });
                    } else {
                      setForm({
                        ...form,
                        spokenLanguages: form?.spokenLanguages.filter(
                          (lang) => lang !== value
                        ),
                      });
                    }
                  }}
                />
                <label className="px-5">English</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Hindi"
                  name="spokenLanguages"
                  checked={form?.spokenLanguages?.includes("Hindi")}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;
                    if (isChecked) {
                      setForm({
                        ...form,
                        spokenLanguages: [
                          ...(form?.spokenLanguages || []),
                          value,
                        ],
                      });
                    } else {
                      setForm({
                        ...form,
                        spokenLanguages: form?.spokenLanguages.filter(
                          (lang) => lang !== value
                        ),
                      });
                    }
                  }}
                />
                <label className="px-5">Hindi</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Tamil"
                  name="spokenLanguages"
                  checked={form?.spokenLanguages?.includes("Tamil")}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;
                    if (isChecked) {
                      setForm({
                        ...form,
                        spokenLanguages: [
                          ...(form?.spokenLanguages || []),
                          value,
                        ],
                      });
                    } else {
                      setForm({
                        ...form,
                        spokenLanguages: form?.spokenLanguages.filter(
                          (lang) => lang !== value
                        ),
                      });
                    }
                  }}
                />
                <label className="px-5">Tamil</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Kannada"
                  name="spokenLanguages"
                  checked={form?.spokenLanguages?.includes("Kannada")}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;
                    if (isChecked) {
                      setForm({
                        ...form,
                        spokenLanguages: [
                          ...(form?.spokenLanguages || []),
                          value,
                        ],
                      });
                    } else {
                      setForm({
                        ...form,
                        spokenLanguages: form?.spokenLanguages.filter(
                          (lang) => lang !== value
                        ),
                      });
                    }
                  }}
                />
                <label className="px-5">Kannada</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Telugu"
                  checked={form?.spokenLanguages?.includes("Telugu")}
                  name="spokenLanguages"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;
                    if (isChecked) {
                      setForm({
                        ...form,
                        spokenLanguages: [
                          ...(form?.spokenLanguages || []),
                          value,
                        ],
                      });
                    } else {
                      setForm({
                        ...form,
                        spokenLanguages: form?.spokenLanguages.filter(
                          (lang) => lang !== value
                        ),
                      });
                    }
                  }}
                />
                <label className="px-5">Telugu</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Other"
                  name="spokenLanguages"
                  checked={form?.spokenLanguages?.includes("Other")}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;
                    if (isChecked) {
                      setForm({
                        ...form,
                        spokenLanguages: [
                          ...(form?.spokenLanguages || []),
                          value,
                        ],
                      });
                    } else {
                      setForm({
                        ...form,
                        spokenLanguages: form?.spokenLanguages.filter(
                          (lang) => lang !== value
                        ),
                      });
                    }
                  }}
                />
                <label className="px-5">Other</label>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-3 font-bold color-gray-600 h-2"></hr>
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
              value={userInfo.country}
              onChange={(e) => {
                handleInput(e);
                setCountry(e.target.value);
              }}
            >
              <option value="">Choose Your Country</option>
              {Country?.getAllCountries().map((e) => (
                <option value={e.isoCode} key={e.isoCode}>
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
              value={userInfo.state}
              onChange={(e) => {
                handleInput(e);
                setState(e.target.value);
              }}
            >
             
              {states.map((e,i) => (
                <option value={e.name} key={i}>
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
              value={userInfo.city}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Choose Your City</option>
              
              {cities.map((e, i) => (
                <option value={e.name} key={i}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="mt-3 font-bold color-gray-600 h-2"></hr>
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
              id="country"
              name="diet"
              value={userInfo.diet}
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
              id="smoke"
              name="smoke"
              value={userInfo.smoke}
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
              id="drink"
              name="drink"
              value={userInfo.drink}
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
        <button type="submit" className="btn btn-warning w-24 mb-36">
          Save
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default General;
