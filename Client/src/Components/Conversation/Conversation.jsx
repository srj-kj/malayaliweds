import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import axios from "../../Axios/axios";


const Conversation = ({ conversation, currentUser , newMessage}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (user) => user !== currentUser
    );
    const getUser = async () => {
      try {
        const res = await axios.get("/profile/" + friendId);
        setUser(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser()
  }, [currentUser,conversation]);

  return (
    <div className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={user?.url ? user?.url :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        alt="username"
      />
      <div className="w-full pb-2">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600">
            {user?.username}
          </span>
          <span className="block ml-2 text-sm text-gray-600">{format(conversation.createdAt)}</span>
        </div>
        {/* <span className="block ml-2 text-sm text-gray-600">{newMessage?newMessage:'hiii'}</span> */}
      </div>
    </div>
  );
};

export default Conversation;
