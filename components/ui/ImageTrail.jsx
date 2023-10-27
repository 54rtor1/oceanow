import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import imageUrls from './imageData';

const ImageTrail = () => {
  const [imageTrail, setImageTrail] = useState([]);

  useEffect(() => {
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
    };

    const clearImageTrail = () => {
      setImageTrail([]);
    };

    document.addEventListener('mousemove', handlePointerMove);

    return () => {
      document.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <motion.div>
      {imageTrail.map((position, index) => (
        <motion.div
          key={index}
          className="absolute w-50 h-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0, opacity: 0, transition: { duration: 0.5 } }}
          style={{ top: position.top, left: position.left }}
        >
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={imageUrls[index % imageUrls.length]}
              alt={`Image ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageTrail;
