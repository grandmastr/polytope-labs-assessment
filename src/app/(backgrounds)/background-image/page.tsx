import React from 'react';

export default function BackgroundImage() {
  return (
    <div
      style={{ backgroundImage: `url('/grid-raster.svg')` }}
      className={'min-h-screen bg-repeat bg-contain'}
    />
  );
}
