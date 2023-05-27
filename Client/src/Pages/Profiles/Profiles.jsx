import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from "../../Axios/axios";
import Header from '../../Components/Header/Header';
import Search from '../../Components/Search/Search';
import Footer from '../../Components/Footer/Footer';

const Profiles = () => {
  
  return (
    <div>
      <Header/>
      <Search/>
      <Footer/>
    </div>
  )
}

export default Profiles