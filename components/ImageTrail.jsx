import React, { useRef, useState, useEffect } from 'react';
import imageUrls from './imageData'; // Adjust the path accordingly

const ImageTrail = () => {
  const [trailIndex, setTrailIndex] = useState(0);
  const [imageTrail, setImageTrail] = useState([]);
  const containerRef = useRef(null);

  const handlePointerMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    setImageTrail((prevTrail) => [
      ...prevTrail,
      {
        top: mouseY - 25, // Adjust as needed
        left: mouseX - 25, // Adjust as needed
      },
    ]);

    // Increment the trail index to cycle through imageUrls
    setTrailIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  useEffect(() => {
    // Clear the trail after a short delay
    const timeoutId = setTimeout(() => {
      setImageTrail([]);
    }, 1000); // Adjust as needed

    return () => clearTimeout(timeoutId);
  }, []); // No dependency on imageTrail

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handlePointerMove}
    >
      {imageTrail.map((position, index) => (
        <div
          key={index}
          className="absolute w-50 h-50 transform transition-transform duration-300"
          style={{ top: position.top, left: position.left }}
        >
          <div className="aspect-w-1 aspect-h-1">
            {/* Use the trail index to cycle through imageUrls */}
            <img
              src={imageUrls[(trailIndex + index) % imageUrls.length]}
              alt={`Image ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageTrail;
