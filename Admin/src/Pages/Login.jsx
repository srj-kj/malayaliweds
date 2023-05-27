import { useState } from "react";
import axios from '../Axios/axios'
import { useDispatch } from "react-redux";
import { login } from "../Redux/adminSlice";
import {useNavigate } from "react-router-dom"


const Login = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/admin/login',{email,password}).then((response) => {
            dispatch(login(response.data))
            navigate('/admin')
        })
    }
    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-full max-w-sm">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image" />
        </div>
        <div className="md:w-full max-w-sm">
          <div className="text-center md:text-left">
          </div>
         <form onSubmit={handleSubmit}>
          <input name="email" onChange={(e)=>setEmail(e.target.value)} className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Email Address" />
          <input name="password" onChange={(e)=>setPassword(e.target.value)} className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password" />
          <div className="text-center md:text-left">
            <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
          </div>
          </form>
          
        </div>
      </section>

      
    );
  };
  
  export default Login;
  