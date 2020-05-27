import React from 'react';

import './MainContent.scss';
import Slideshow from '../../content/slide-show/Slideshow';

const MainContent = () => {
  const images = [
    {
      url: 'https://images.pexels.com/photos/586744/pexels-photo-586744.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      url: 'https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      url: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }
  ];

  return (
    <div className="main-content">
      <Slideshow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movie-type">Now Playing</div>
        <div className="paginate">Paginate</div>
      </div>
    </div>
  );
};

export default MainContent;
