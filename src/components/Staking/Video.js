import React from 'react';

const Video = ({ imageUrl, name, show = true }) => {
  return (
    <video
      alt={name}
      autoPlay
      loop
      playsInline
      muted
      width={'100%'}
      height={'100%'}
    >
      <source type='video/mp4' src={imageUrl} />
    </video>
  );
};

export default Video;
