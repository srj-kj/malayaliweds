import React, { useEffect, useRef, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import axios from "../../Axios/axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Conversation from "../../Components/Conversation/Conversation";
import Message from "../../Components/Message/Message";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const user = useSelector((state) => state?.app?.user);
  const scrollRef = useRef()
  const socket = useRef()
  const handleNewChat = () => {
    // Logic to open a new chat
  };
  useEffect(()=>{
    socket.current = io('http://localhost:3000');
   socket.current?.emit('adduser', user.id);
   socket.current.on("getMessage", (data) => {
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
  },[])


  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user.id);
        console.log(res);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
        sender: user.id,
        text: newMessage,
        conversationId: currentChat._id,
      };
      const receiverId = currentChat.members.find(
        (member) => member !== user.id
      );
      socket.current.emit("sendMessage", {
        senderId: user.id,
        receiverId,
        text: newMessage,
      });
    try{
        const res = await axios.post('/messages',message);
        setMessages([...messages,res.data])
        setNewMessage('')
        
    }catch(err){
        console.log(err);
    }
};


  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
          <div className="border-r border-gray-300 lg:col-span-1">
            <div className="mx-3 my-3">
              <div className="relative text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-gray-300"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input
                  type="search"
                  className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                  name="search"
                  placeholder="Search"
                  required
                />
              </div>
            </div>

            <ul className="overflow-auto h-[28rem]">
              <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
              <li>
                {conversations.length > 0 ? (
                  conversations.map((conversation, index) => (
                    <div key={index} onClick={() =>setCurrentChat(conversation)}>
                        <Conversation
                      key={index}
                      conversation={conversation}
                      currentUser={user.id}
                      newMessage={newMessage}
                    />
                    </div>
                    
                  ))
                ) : (
                  <div className="ml-24 mt-36">
                    <p className="">No conversations</p>
                    <button onClick={handleNewChat}>Open a new chat</button>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="hidden lg:col-span-2 lg:block">
          {currentChat ? (
            <div className="w-full h-full flex flex-col">
              {/* <div className="relative flex items-center p-3 border-b border-gray-300">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  alt="username"
                />
                <span className="block ml-2 font-bold text-gray-600">Emma</span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
              </div> */}
              <div className="relative flex-1 p-6 overflow-y-auto">
                <ul className="space-y-2 flex flex-col">
                  {messages.map((message) => (
                    <Message
                      message={message}
                      own={message.sender === user.id}
                    />
                  ))}
                 
                </ul>
              </div>

              <div className="sticky bottom-0 bg-white flex items-center justify-between p-3 border-t border-gray-300">
                
                

                <input
                  type="text"
                  placeholder="Message"
                  className="flex-grow py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  onChange={(e)=>setNewMessage(e.target.value)}
                  value = {newMessage}
                  required
                />
                
                <button type="submit" onClick={handleSubmit}>
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
            ) : (<div className="flex justify-center mt-48 ">
                      <span className="text-gray-400 text-2xl" >
                  Open a conversation to start a chat.
                </span>
            </div>
                
              )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Messenger;
