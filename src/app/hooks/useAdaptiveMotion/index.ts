'use client';
import { useEffect } from 'react';

const useAdaptiveMotion = ({
  selector = '.tiled-raster',
}: {
  selector?: string;
} = {}) => {
  useEffect(() => {
    const svgs = () =>
      Array.from(
        document.querySelectorAll<SVGSVGElement>(`${selector}, ${selector} svg`)
      );

    const pauseAll = () => {
      svgs().forEach(svg => svg.pauseAnimations?.());
    };

    const resumeAll = () => {
      svgs().forEach(svg => svg.unpauseAnimations?.());
    };

    const mediaQueryList = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const apply = () => {
      if (mediaQueryList.matches) {
        pauseAll();
        return;
      }
      resumeAll();
    };

    apply();
    mediaQueryList.addEventListener('change', apply);

    return () => {
      mediaQueryList.removeEventListener('change', apply);
    };
  }, [selector]);
};

export default useAdaptiveMotion;
