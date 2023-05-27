import React from "react";
import Profile from "../../Components/Profile/Profile";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

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
      <Footer />
    </>
  );
};

export default MyDetails;
