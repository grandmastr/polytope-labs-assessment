import React from 'react';

import { TiledAnimation } from '@/app/components/TiledAnimation';

const Grid: React.FC = () => {
  return (
    <div className="relative min-h-dvh">
      <TiledAnimation className="pointer-events-none absolute inset-0 will-change-transform" />
    </div>
  );
};

export default Grid;
