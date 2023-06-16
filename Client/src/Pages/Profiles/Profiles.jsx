import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "../../Axios/axios";
import Header from "../../Components/Header/Header";
import Search from "../../Components/Search/Search";
import Footer from "../../Components/Footer/Footer";
import BottomNav from "../../Components/Header/BottomNav";
import MobFooter from "../../Components/Footer/MobFooter";
import { io } from "socket.io-client";
import { Howl } from 'howler';
import sound from '../../assets/notification-sound.mp3'

const Profiles = () => {
  const socket = useRef();
  const user = useSelector((state) => state?.app?.user);
  const notificationSound = new Howl({
    src: [{sound}]
  });
  

  useEffect(() => {
   socket.current = io('http://localhost:3000');
   socket.current?.emit('adduser', user.id);

   socket.current?.on('matched', () => {
     alert('you have a new match')
     notificationSound.play();

   });
 }, []);
  return (
    <div>
      <Header />
      <Search socket={socket} />

      <MobFooter />

      <BottomNav />
    </div>
  );
};

export default Profiles;
