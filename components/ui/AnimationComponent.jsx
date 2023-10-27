import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import p5 from 'p5';
import AnimationSketch from './AnimationSketch';

const AnimationComponent = () => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('p5-container');

    if (!sketchRef.current) {
      sketchRef.current = new p5((p) => AnimationSketch(p), container);
    }
  }, []);

  return <div id="p5-container"></div>;
};

export default AnimationComponent;
