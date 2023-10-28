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
          id: Date.now(),
          top: mouseY - 25,
          left: mouseX - 25,
        },
      ]);
    };

    document.addEventListener('mousemove', handlePointerMove);

    return () => {
      document.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const removeImage = (id) => {
      setImageTrail((prevTrail) => prevTrail.filter((image) => image.id !== id));
    };

    // Create a delay for each image to disappear (slower animation)
    imageTrail.forEach((image) => {
      const timeoutId = setTimeout(() => {
        removeImage(image.id);
      }, 1500); // Set the duration for each image to disappear (1.5 seconds)

      return () => clearTimeout(timeoutId);
    });
  }, [imageTrail]);

  return (
    <motion.div>
      {imageTrail.map((position) => (
        <motion.div
          key={position.id}
          className="absolute w-16 h-16"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 0.7, opacity: 0.7 }}
          exit={{
            scale: 0,
            opacity: 0,
            transition: {
              duration: 1.5, // Duration of the exit animation
              ease: 'easeInOut',
            },
          }}
          style={{ top: position.top, left: position.left }}
        >
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={imageUrls[Math.floor(Math.random() * imageUrls.length)]}
              alt={`Image ${position.id}`}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageTrail;
