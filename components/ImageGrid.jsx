import React from 'react';

const ImageGrid = () => {
  const handlePointerMove = (event, index) => {
    console.log(`Pointer moved over image ${index + 1}`);
  };

  const imageUrls = [
    '../seaImages/11.png','../seaImages/2.png', '../seaImages/3.png', '../seaImages/4.png', '../seaImages/14.png', '../seaImages/6.png','../seaImages/1.png', '../seaImages/17.png','../seaImages/18.png','../seaImages/10.png', '../seaImages/12.png', '../seaImages/20.png','../seaImages/8.png','../seaImages/7.png','../seaImages/9.png',
  ];

  return (
    <div className="grid grid-cols-5 grid-rows-3 gap-4 h-screen absolute inset-0 overflow-hidden">
      {imageUrls.map((imageUrl, index) => {
        const animationDuration = Math.random() * 2 + 1;
        const animationDelay = Math.random() * 2;

        return (
          <div
            key={index}
            className="relative overflow-hidden group animate-float brightness-100 saturation-200 opacity-50"
            style={{ animationDuration: `${animationDuration}s`, animationDelay: `${animationDelay}s` }}
            onMouseMove={(event) => handlePointerMove(event, index)}
          >
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={imageUrl}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
