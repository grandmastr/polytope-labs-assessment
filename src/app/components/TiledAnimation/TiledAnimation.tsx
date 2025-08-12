'use client';
import React, { useId } from 'react';
import { clsx } from 'clsx';

import { GridRaster } from '@/app/assets';
import { useAdaptiveMotion, useTiledAnimation } from '@/app/hooks';

/*
 * Props for the TiledAnimation component.
 */
type Props = { className?: string };

/*
 * This component renders a tiled SVG animation that fills its container.
 * To achieve the effect of repeated animation that scales with container size,
 * it tiles the grid and scales it to the container
 */
const TiledAnimation: React.FC<Props> = ({ className }) => {
  /*
   * Generate unique IDs for both the pattern and symbol elements.
   * This is necessary to ensure that the pattern can be referenced correctly,
   * and also avoid DOM conflicts
   */
  const patternId = useId();
  const symbolId = useId();

  const { ready, tileHeight, patternElRef, tileWidth, svgRef } =
    useTiledAnimation();

  useAdaptiveMotion<SVGSVGElement>({ root: svgRef });

  return (
    <svg
      ref={svgRef}
      className={clsx(
        'tiled-raster -z-10 transition-opacity duration-150 ease-in',
        ready ? 'visible opacity-100' : 'invisible opacity-0',
        className
      )}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <symbol
          id={symbolId}
          width={tileWidth}
          height={tileHeight}
          viewBox={`0 0 ${tileWidth} ${tileHeight}`}
          overflow="visible"
        >
          <GridRaster />
        </symbol>

        <pattern
          ref={patternElRef}
          id={patternId}
          width={tileWidth}
          height={tileHeight}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          patternTransform={'scale(1)'}
        >
          <use href={`#${symbolId}`} xlinkHref={`#${symbolId}`} />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

export default TiledAnimation;
