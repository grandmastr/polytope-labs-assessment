'use client';
import React from 'react';

import { useAdaptiveMotion } from '@/app/hooks';

const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useAdaptiveMotion();

  return <>{children}</>;
};

export default AnimationProvider;
