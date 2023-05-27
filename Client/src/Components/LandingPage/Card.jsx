import React from 'react';
import img1 from '../../assets/01.jpg'
import img2 from '../../assets/02.jpg'
import img3 from '../../assets/03.jpg'
import img4 from '../../assets/04.jpg'
import img5 from '../../assets/05.jpg'
import img6 from '../../assets/06.jpg'

import './Card.css'

const members = [
  {
    name: 'Andrea Guido',
    imageUrl: img1,
    active: '1 Day'
  },
  {
    name: 'Gihan-Fernando',
    imageUrl: img2,
    active: '2 Day'
  },
  {
    name: 'Sweet Admin',
    imageUrl: img3,
    active: '3 Day'
  },
  {
    name: 'Gyan-Baffour',
    imageUrl: img4,
    active: '5 Day'
  },
  {
    name: 'Teszt Eleking',
    imageUrl: img5,
    active: '1 Day'
  },
  {
    name: 'Zeahra Guido',
    imageUrl: img6,
    active: '1 Day'
  }
];

const MemberItem = ({ name, imageUrl, active }) => (
  <div className="flex justify-between">
    <div className="member-item">
      <div className="member-image">
        <img src={imageUrl} alt="member-img" />
      </div>
      <div className="member-info">
        <h6>
          <a href="profile.html">{name}</a>
        </h6>
        <p>Active {active}</p>
      </div>
    </div>
  </div>
);

const MemberList = () => (
  <div className="row flex justify-around space-x-4 mt-4">
    {members.map(({ name, imageUrl, active }) => (
      <MemberItem key={name} name={name} imageUrl={imageUrl} active={active} />
    ))}
  </div>
);

const MembersSection = () => (
  <div className="section-wrapper flex justify-between">
    <MemberList />
  </div>
);

export default MembersSection;
