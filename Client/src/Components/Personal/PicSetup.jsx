import React from "react";
import { useSelector } from "react-redux";

const PicSetup = () => {
  const user = useSelector((state) => state?.app?.user);

  return (
    <div className="col-xs-12 text-center bg-white md:w-1/4">
      <h5 className="mb-4">Photo Upload</h5>
      <div className="flex items-center justify-center mb-8">
        <a
          href="https://mysite.m4marry.com/profileImages"
          className="showProfielImage"
        >
          <span className="block w-48 h-48 rounded-full overflow-hidden">
            <img
              src={
                user.gender == "male"
                  ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                  : "https://static.m4marry.com/ui/images/img.reg-upload-female.png"
              }
              height="150px"
              width="150px"
              className="w-full h-full object-cover"
            />
          </span>
        </a>
      </div>
      <p className="mb-8 text-gray-700">
        Only JPG, PNG, BMP formats are allowed and maximum file size up to 8 MB.
      </p>
      {/* <div className="flex items-center justify-center space-x-2">
    <span className="text-gray-700">Upload Photos From</span>
    <a href="https://mysite.m4marry.com/profileImages" className="reg-uploads reg-uploads-com showProfielImage">Computer</a>
    <a href="https://mysite.m4marry.com/profileImages" className="reg-uploads reg-uploads-fb showProfielImage">Facebook</a>
    <a href="https://mysite.m4marry.com/profileImages" className="reg-uploads reg-uploads-insta showProfielImage show-insta">Instagram</a>
  </div> */}
    </div>
  );
};

export default PicSetup;
