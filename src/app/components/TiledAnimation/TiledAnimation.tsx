'use client';
import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { GridRaster as Raster } from '@/app/assets';

type Props = { className?: string };

const TiledAnimation: React.FC<Props> = ({ className }) => {
  // Unique ids to avoid collisions if multiple instances mount
  const patternId = useId();
  const symbolId = useId();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const patternElRef = useRef<SVGPatternElement | null>(null);
  const lastScaleRef = useRef(0);
  const [ready, setReady] = useState(false);

  const tileWidth = 1440;
  const tileHeight = 588;

  useLayoutEffect(() => {
    if (!svgRef.current) return;
    const el = svgRef.current;
    const update = () => {
      const containerWidth = el.clientWidth || 1;
      const nextScale = containerWidth / tileWidth;
      const prevScale = lastScaleRef.current;

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

  return (
    <svg
      ref={svgRef}
      className={className ? `tiled-raster ${className}` : 'tiled-raster'}
      style={{ visibility: ready ? 'visible' : 'hidden' }}
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
          <Raster />
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
          <use href={`#${symbolId}`} />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

export default TiledAnimation;
