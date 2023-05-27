import React from "react";
import img1 from '../../assets/s1.jpg';
import img2 from '../../assets/s2.jpg';
import img3 from '../../assets/s3.jpg';
import img4 from '../../assets/s4.jpg';


function GroupSection() {
  return (
    <section className="group-section padding-tb bg-img ">
      <div className="container ml-24 ">
        <div className="section-header ">
          <h4 className="font-bold  font-mono text-3xl">Recently Married Couples</h4>
          <h2 className="pt-4 font-serif font-bold text-lg">Malayali Weds have Best Couple Stories</h2>
        </div>
        <div className="section-wrapper ">
          <div className="grid grid-cols-1 ml- sm:grid-cols-2 gap-4">
            <div className="group-item lab-item">
              <div className="lab-inner flex flex-wrap items-center p-4">
                <div className="lab-thumb me-sm-4 mb-4 mb-sm-0">
                  <img src={img1} alt="img" />
                </div>
                <div className="lab-content">
                  <h4>Active Group A1</h4>
                  <p>
                    Colabors atively fabcate best breed and apcations through
                    visionary value
                  </p>

                  <div className="test">
                    <a href="active-group.html" className="lab-btn">
                      <i className="icofont-users-alt-5"></i>Read Story
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="group-item lab-item">
              <div className="lab-inner flex flex-wrap items-center p-4">
                <div className="lab-thumb me-sm-4 mb-4 mb-sm-0">
                  <img src={img2} alt="img" />
                </div>
                <div className="lab-content">
                  <h4>Active Group A1</h4>
                  <p>
                    Colabors atively fabcate best breed and apcations through
                    visionary value
                  </p>

                  <div className="test">
                    <a href="active-group.html" className="lab-btn">
                      <i className="icofont-users-alt-5"></i>Read Story
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="group-item lab-item">
              <div className="lab-inner flex flex-wrap items-center p-4">
                <div className="lab-thumb me-sm-4 mb-4 mb-sm-0">
                  <img src={img3} alt="img" />
                </div>
                <div className="lab-content">
                  <h4>Active Group A1</h4>
                  <p>
                    Colabors atively fabcate best breed and apcations through
                    visionary value
                  </p>

                  <div className="test">
                    <a href="active-group.html" className="lab-btn">
                      <i className="icofont-users-alt-5"></i>Read Story
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="group-item lab-item">
              <div className="lab-inner flex flex-wrap items-center p-4">
                <div className="lab-thumb me-sm-4 mb-4 mb-sm-0">
                  <img src={img4} alt="img" />
                </div>
                <div className="lab-content">
                  <h4>Active Group A4</h4>
                  <p>
                    Colabors atively fabcate best breed and apcations through
                    visionary value
                  </p>
                  <div className="test">
                    <a href="active-group.html" className="lab-btn">
                      <i className="icofont-users-alt-5"></i>Read Story
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GroupSection;
