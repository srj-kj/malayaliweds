import React from "react";
import Profile from "../../Components/Profile/Profile";
import Header from "../../Components/Header/Header";
import BottomNav from "../../Components/Header/BottomNav";
import MobFooter from "../../Components/Footer/MobFooter";

const MyDetails = () => {
  return (
    <>
    <Header/>
      <div className="container-fluid p-0">
      
        <div className="container-fluid">
          <div className="container my-account-profile">
            
            <Profile />
            

          </div>
        </div>
      </div>
      <MobFooter />
      <BottomNav/>
    </>
  );
};

export default MyDetails;
