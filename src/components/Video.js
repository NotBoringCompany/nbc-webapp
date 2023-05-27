import React from 'react';

const Video = ({ imageUrl, name }) => {
  return (
    <video
      alt={name}
      autoPlay
      loop
      playsInline
      muted
      style={{ objectFit: 'cover' }}
      width={'100%'}
      height={'100%'}
    >
      <source type='video/mp4' src={imageUrl} />
    </video>
  );
};

export default Video;
