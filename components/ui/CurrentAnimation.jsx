import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { sketch } from '../../public/animation'; // Import your sketch function

const AnimationComponent = () => {
  const sketchRef = useRef(null); // Ref to store p5 instance

  useEffect(() => {
    const container = document.getElementById('p5-container');

    // Check if the sketch has not been created yet
    if (!sketchRef.current) {
      // Create a p5.js instance and attach it to the container element
      sketchRef.current = new p5(sketch, container);
    }
  }, []);

  return <div id="p5-container"></div>;
};

export default AnimationComponent;
