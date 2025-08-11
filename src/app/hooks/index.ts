'use client';
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

/*
 * This hook manages the scaling of the SVG pattern animation, making sure
 * it scales correctly with the container size (ensuring responsiveness).
 * It uses a ResizeObserver to detect changes in the container size
 * and updates the pattern's scale accordingly.
 */
export const useTiledAnimation = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const patternElRef = useRef<SVGPatternElement | null>(null);

  /*
   *This is used to keep track of the last scale value
   */
  const lastScaleRef = useRef<number>(0);

  const [ready, setReady] = useState(false);

  /*
   * Defines the dimensions of the tile.
   */
  const tileWidth = 1440;
  const tileHeight = 588;

  /*
   * This layout effect is responsible for setting up the ResizeObserver
   * and updating the pattern scale based on the container's width.
   * I used useLayoutEffect here to ensure that the DOM is updated
   * before the browser paints, which is important for performance
   * and to avoid visual glitches during resizing.
   */
  useLayoutEffect(() => {
    if (!svgRef.current) return;
    const el = svgRef.current;

    /*
     * Function to update the pattern scale based on the container width.
     */
    const update = () => {
      const containerWidth = el.clientWidth || 1;
      const nextScale = containerWidth / tileWidth;
      const prevScale = lastScaleRef.current;

      /*
       * If the scale change is less than 1% of the previous scale,
       * This is to prevent excessive updates for minor size changes
       * which could lead to performance issues or visual glitches.
       */
      if (prevScale && Math.abs(nextScale - prevScale) / prevScale < 0.01) {
        setReady(true);
        return;
      }
      lastScaleRef.current = nextScale;

      requestAnimationFrame(() =>
        patternElRef.current?.setAttribute(
          'patternTransform',
          `scale(${nextScale})`
        )
      );
      setReady(true);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ready,
    tileHeight,
    patternElRef,
    tileWidth,
    svgRef,
  };
};

// Define the type for the options parameter
type Options<T extends Element = Element> = { root: RefObject<T | null> };

/*
 * This hook allows the SVG animation to adapt to the user's motion preferences.
 * Such that whenever a user has the prefers-reduced-motion enabled,
 * the animations are paused
 */

export const useAdaptiveMotion = <T extends Element = Element>({
  root,
}: Options<T>) => {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Function to get all SVG elements within the root element
    const getSvgs = () => {
      const nested = Array.from(el.querySelectorAll<SVGSVGElement>('svg'));
      return el instanceof SVGSVGElement ? [el, ...nested] : nested;
    };

    // Pause animations on all SVGs
    const pause = () => getSvgs().forEach(s => s.pauseAnimations?.());

    // Resume animations on all SVGs
    const resume = () => getSvgs().forEach(s => s.unpauseAnimations?.());

    const mediaQueryList = matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => (mediaQueryList.matches ? pause() : resume());

    apply();
    mediaQueryList.addEventListener('change', apply);
    return () => mediaQueryList.removeEventListener('change', apply);
  }, [root]);
};
