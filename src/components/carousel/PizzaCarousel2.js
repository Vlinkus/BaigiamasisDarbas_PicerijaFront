import React, { useState } from 'react';
import './carousel2.css';
import im1 from './carouselTest/img_girl.jpg';

function PizzaCarousel2() {
  const [angle, setAngle] = useState(0);

  function galleryspin(sign) {
    let newAngle;
    if (!sign) {
      newAngle = angle + 45;
    } else {
      newAngle = angle - 45;
    }
    setAngle(newAngle);
  }

  return (
    <>
      <div id="carousel-spin">
        <figure id="spinner" style={{ transform: `rotateY(${angle}deg)` }}>
          <img src={im1} alt="" />
          <img src={im1} alt="" />
          <img src={im1} alt="" />
          <img src={im1} alt="" />
          <img src={im1} alt="" />
          <img src={im1} alt="" />
          <img src={im1} alt="" />
          <img src={im1} alt="" />
        </figure>
      </div>
      <span
        style={{ float: 'left' }}
        className="ss-icon"
        onClick={() => galleryspin('-')}
      >
        &lt;
      </span>
      <span
        style={{ float: 'right' }}
        className="ss-icon"
        onClick={() => galleryspin('')}
      >
        &gt;
      </span>
    </>
  );
}

export default PizzaCarousel2;
