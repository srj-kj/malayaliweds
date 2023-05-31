import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../Axios/axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PicSetup = () => {
  const user = useSelector((state) => state?.app?.user);
  const id = user.id;
  const [profileImage, setProfileImage] = useState(user.url);
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/images/upload/${user.id}`);
        const urls = response.data.urls;
        setImages(urls);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const openModal = (imageUrl,index) => {
    console.log(imageUrl);
    setSelectedImage(imageUrl);
    setSelectedImageIndex(index);
    
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage("");
    setModalOpen(false);
  };

  const inputRef = useRef(null);

  const handleCameraIconClick = () => {
    inputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setProfileImage(URL.createObjectURL(file));
  };
  const handleImagesUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setFile(fileArray);
    setImages(URL.createObjectURL(file));
  };

  const submit = async (event) => {
   
    event.preventDefault();

    const formData = new FormData();
    formData.append("profileImage", file);
    // formData.append("caption", caption);
    await axios
      .post(`/api/profilepic/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data.url);
        setProfileImage(response.data.url);
      });

    //navigate("/");
  };
  const submitImages = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    file.map((fileItem) => {
      formData.append("images", fileItem);
    });

    await axios
      .post(`/api/images/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data.urls);
        setImages(response.data.urls);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="col-xs-12 text-center bg-white md:w-1/4">
      <h5 className="mb-4">Photo Upload</h5>
      <div className="flex items-center justify-center mb-8">
        <a
          href="#"
          className="showProfileImage relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="block w-48 h-48 rounded-full overflow-hidden">
            <img
              src={
                profileImage ||
                (user.gender === "male"
                  ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                  : "https://static.m4marry.com/ui/images/img.reg-upload-female.png")
              }
              height="150px"
              width="150px"
              className="w-full h-full object-cover"
              alt="profile"
            />
          </span>
          {isHovered && (
            <span className="absolute top-0 flex flex-col right-0 transform translate-x-2 translate-y-2">
              <i
                onClick={handleCameraIconClick}
                className="fas fa-camera text-gray-600 hover:text-gray-900"
              ></i>
              <button onClick={submit} className="btn btn-circle btn-xs mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>

              <button className="btn btn-circle btn-xs mt-3 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          )}
        </a>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          name="profileImage"
          accept="image/jpeg, image/png, image/bmp"
          onChange={handleImageUpload}
        />
      </div>
      <Carousel>
        <div className="carousel carousel-center rounded-box">
          {images &&
            images?.map((image, index) => (
              <div  className="carousel-item" key={index}>
                <div onClick={() => openModal(image,index)}  >
                  <img
                    src={
                      image ||
                      (user.gender === "male"
                        ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                        : "https://static.m4marry.com/ui/images/img.reg-upload-female.png")
                    }
                    alt="images"
                    height="1000"
                    width="1000"
                    
                  />
                </div>
              </div>
            ))}
        </div>
        
      </Carousel>

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
                <img src={image} alt="Modal Image" className="max-w-[800px] max-h-[600px] object-cover" />
              </div>
            ))}
          </Carousel>
          </div>
        )}

      <span className="text-gray-700">Upload Photos From </span>
      <div className="flex items-center justify-center space-x-2">
        <label
          htmlFor="uploadInput"
          className="reg-uploads reg-uploads-com showProfielImage"
        >
          Computer
        </label>

        <input
          id="uploadInput"
          type="file"
          className="hidden"
          name="images"
          accept="image/jpeg, image/png, image/bmp"
          multiple
          onChange={handleImagesUpload}
        />
        <button onClick={submitImages} className="btn btn-xs">
          Upload Now
        </button>
      </div>
    </div>
  );
};

export default PicSetup;
