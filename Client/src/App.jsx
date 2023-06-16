import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/Store";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Register/Register";

import "./App.css";
import UserAuth from "./Auth/userAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import OtpLoginPage from "./Components/OTP/OtpLoginPage";
import MyDetails from "./Pages/Profile/Profile";
import Profiles from "./Pages/Profiles/Profiles";
import Profile from "./Pages/ProfileDetails/ProfileDetails";
import Messenger from "./Pages/Messenger/Messenger";
import Subscription from "./Pages/Subscription/Subscription";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
console.log(CLIENT_ID);
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route element={<UserAuth />}>
              <Route
                path="/login"
                element={
                  <GoogleOAuthProvider clientId={CLIENT_ID}>
                    <Login />
                  </GoogleOAuthProvider>
                }
              />
              <Route
                path="/signup"
                element={
                  <GoogleOAuthProvider clientId={CLIENT_ID}>
                    <Signup />
                  </GoogleOAuthProvider>
                }
              />
            </Route>
            <Route path='/myaccount' element={<MyDetails/> } />
            <Route path="/" element={<Home />} />
            <Route path="/otp/login" element={<OtpLoginPage/>} />
            <Route path="/search" element={<Profiles/>} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="/messages" element={<Messenger/>} />
            <Route path="/payment" element={<Subscription/>} />


          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
