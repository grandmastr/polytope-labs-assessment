import React from 'react';

export default function BackgroundImagePage() {
  return (
    <div
      style={{ backgroundImage: `url('/grid-raster.svg')` }}
      className={'min-h-screen bg-repeat bg-contain'}
    />
  );
}
