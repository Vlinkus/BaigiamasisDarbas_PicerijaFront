import React from 'react';
import './Carousel.css';
import im1 from './carouselTest/img_girl.jpg';

function PizzaCarousel() {
  return (
    // <div className="container-carousel">
      <div className="carousel">
        <figure>
          <div className="image-container">
            <img src={im1} className="image-carousel" />
          </div>
          <div className="image-container">
            <img src={im1} className="image-carousel" />
          </div>
          <div className="image-container">
            <img src={im1} className="image-carousel" />
          </div>
          <div className="image-container">
            <img src={im1} className="image-carousel" />
          </div>
          <div className="image-container">
            <img src={im1} className="image-carousel" />
          </div>
          <div className="image-container">
            <img src={im1} className="image-carousel" />
          </div>
          <div className="image-container">
            <img src={im1} className="image-carousel" />
          </div>
          <div className="image-container">
            <img src={im1} className="image-carousel" />
          </div>
        </figure>
      </div>
//  </div>
  );
}

export default PizzaCarousel;
