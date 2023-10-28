import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import imageUrls from './imageData';

const ImageTrail = () => {
  const [imageTrail, setImageTrail] = useState([]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const xOffset = 20; // Adjust X offset as needed
      const yOffset = 20; // Adjust Y offset as needed

      setImageTrail((prevTrail) => [
        ...prevTrail,
        {
          top: mouseY - 50 - yOffset, // Adjust as needed
          left: mouseX - 50 - xOffset, // Adjust as needed
          zIndex: new Date().getTime(), // Unique z-index for each image
          id: new Date().getTime(), // Unique identifier for each image
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

  useEffect(() => {
    if (imageTrail.length > 0) {
      const intervalId = setInterval(() => {
        setImageTrail((prevTrail) => {
          const currentTime = new Date().getTime();
          const updatedTrail = prevTrail.filter((image) => currentTime - image.id < 10000); // Adjust the duration (in milliseconds) as needed
          return updatedTrail;
        });
      }, 1500); // Adjust the interval as needed (aim for 30 frames per second)

      return () => clearInterval(intervalId);
    }
  }, [imageTrail]);

  return (
    <motion.div>
      {imageTrail.map((position, index) => (
        <motion.div
          key={position.id}
          className="absolute w-80 h-80" // Adjust the size as needed
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0, opacity: 0, transition: { duration: 6 } }} // Adjust the exit duration as needed
          style={{ top: position.top, left: position.left, zIndex: position.zIndex }}
        >
          <motion.div
            className="aspect-w-1 aspect-h-1"
            initial={{ scale: 1 }}
            animate={{ scale: 0 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 4 } }} // Adjust the exit duration as needed
          >
            <img
              src={imageUrls[index % imageUrls.length]}
              alt={`Image ${position.id}`}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageTrail;
