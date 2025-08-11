'use client';
import React from 'react';

import './AnimatedText.css';

type AnimatedTextProps = {
  text: string;
};

/*
 * This renders the text with a staggered animation effect.
 * Each letter will animate in a sequence based on its index.
 */
const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  return (
    <div>
      <h1>
        {[...text].map((letter, index) => (
          <span key={index} style={{ '--index': index } as React.CSSProperties}>
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default AnimatedText;
