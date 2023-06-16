import React, { useEffect, useState } from "react";
import axios from "../../Axios/axios";
import { useSelector } from "react-redux";
import { profileDetails } from "../../Redux/profileSlice";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Swal from 'sweetalert2';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [follow, setFollow] = useState(false);
  const [block, setBlock] = useState(false);
  const navigate = useNavigate()
  const { id } = useParams();
  const user = useSelector((state) => state?.app?.user);
  const [profileImage, setProfileImage] = useState(user.url);
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  useEffect(() => {
    axios
      .get(`/profile/${id}?user=${user.id}`)
      .then((response) => {
        console.log(response.data);
        setProfileData(response.data);
        setProfileImage(response.data.url);
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/images/upload/${id}`);
        const urls = response.data.urls;
        setImages(urls);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (profileData) {
      axios
        .post(`/follow`, { follower: profileData?._id, user: user.id })
        .then((response) => {
          if (response.data) {
            setFollow(true);
          } else {
            setFollow(false);
          }
        });
    }
  }, [profileData]);
  useEffect(() => {
    if (profileData) {
      axios
        .post(`/checkblock`, { blockedUserId: profileData?._id, user: user.id })
        .then((response) => {
          if (response.data) {
            setBlock(true);
          } else {
            setBlock(false);
          }
        });
    }
  }, [profileData]);
  const openModal = (imageUrl, index) => {
    console.log(imageUrl);
    setSelectedImage(imageUrl);
    setSelectedImageIndex(index);

    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage("");
    setModalOpen(false);
  };
  const handleFollow = (followingId) => {
    axios.post(`/connect/`, { followingId, user: user.id }).then((response) => {
      console.log(response.data);
      if (response.data.msg == "Follow successful") {
        setFollow(true);
      } else {
        setFollow(false);
      }
    });
  };
  const handleBlock = (blockedUserId) => {
    const confirmText = block ? 'unblock' : 'Block';
    alert('hi')
    Swal.fire({
      title: `Are you sure you want to ${confirmText} this user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`/block/`, { blockedUserId, user: user.id }).then((response) => {
          console.log(response.data);
          if (response.data.msg === "Block successful") {
            setBlock(!block);
            Swal.fire({
              icon: 'success',
              text: `User has been ${confirmText}ed successfully.`,
            }).then(()=>{
              navigate('/search')
            });
          } else {
            setBlock(!block);
            Swal.fire({
              icon: 'success',
              text: 'User has been unblocked successfully..',
            });
          }
        });
      }
    });
  };
  if (!profileData) {
    return <div>Profile not found</div>;
  }
  const handleChat =(id)=>{
    const data ={
      senderId:user.id,
      receiverId:id
    }
    axios.post('/conversations',data).then(()=>{
      navigate('/messages')
    })
  }
  return (
    <div>
      <Header />

      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="relative">
              <Carousel >
                <div className="carousel carousel-center rounded-box">
                  {images &&
                    images?.map((image, index) => (
                      <div
                        className="carousel-item h-64 w-full object-cover"
                        key={index}
                      >
                        <div onClick={() => openModal(image, index)}>
                          <img
                            src={
                              image ||
                              (profileData.gender === "male"
                                ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                                : "https://static.m4marry.com/ui/images/img.reg-upload-female.png")
                            }
                            alt="cover pic"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </Carousel>
              {(!images || images.length === 0) && (
                <div className="">
                  <div onClick={() => openModal(null, -1)}>
                    <img
                      className="h-64 w-full object-cover"
                      src={
                        profileData.gender === "male"
                          ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                          : "https://static.m4marry.com/ui/images/img.reg-upload-female.png"
                      }
                      alt="default cover pic"
                    />
                  </div>
                </div>
              )}
  <div className="absolute bottom-0 left-10">
                <img
                  className="w-32 h-32 md:w-40 md:h-40 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-pink-600 p-1"
                  src={
                    profileImage ||
                    (profileData.gender === "male"
                      ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                      : "https://static.m4marry.com/ui/images/img.reg-upload-female.png")
                  }
                  alt="Profile Picture"
                />
              </div>
              {modalOpen && (
                <div className="fixed top-0 left-0 z-80 w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center">
                  <a
                    className="fixed z-90 top-6 right-8 text-white text-5xl font-bold"
                    href="javascript:void(0)"
                    onClick={closeModal}
                  >
                    &times;
                  </a>
                  <Carousel
                    showStatus={false}
                    showThumbs={false}
                    selectedItem={selectedImageIndex}
                    infiniteLoop={true}
                    onChange={setSelectedImageIndex}
                  >
                    {images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt="Modal Image"
                          className="max-w-[1680px] max-h-[1050px] object-cover"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              )}
              
            </div>

            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {profileData?.username}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {profileData?.bio}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleFollow(profileData?._id)}
                  href="#"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  {follow
                    ? "Unfollow"
                    : profileData?.following.some(
                        (follower) => follower.followId === user.id
                      )
                    ? "Follow Back"
                    : "Follow"}
                </button>
                {
                  profileData.match&&
                  <button className="btn btn-primary bg-slate-600" onClick={()=>handleChat(profileData._id)}>CHAT</button>
                }
                <button
                  onClick={() => handleBlock(profileData?._id)}
                  href="#"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  {block ? "unblock" : "Block"}
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Age</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.age}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Religion
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.religion}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Education
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Bachelor's Degree
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Height
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.height} cm
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Occupation
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.job}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Hobbies
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Reading, Playing Tennis
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Religious views
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">Moderate</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Marital Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.MaritalStatus}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Lifestyle
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profileData?.diet}, {profileData?.drink},{" "}
                        {profileData?.smoke}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Annual Income
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">$60,000</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
