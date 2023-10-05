import React from 'react';

const ImageGrid = () => {
  const handlePointerMove = (event, index) => {
    // Your custom interaction logic here
    console.log(`Pointer moved over image ${index + 1}`);
  };

  const imageUrls = [
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
    'https://img.freepik.com/free-vector/precious-pearl-opened-shell_1441-2699.jpg?w=1060&t=st=1696504840~exp=1696505440~hmac=83d7d6991a71efa6919eafca674f3fa27565f11d0ad8ef90bc2859729fb3dac3',
  ];

  return (
    <div className="grid grid-cols-5 grid-rows-3 gap-4 h-screen absolute inset-0 overflow-hidden">
      {imageUrls.map((imageUrl, index) => (
        <div
          key={index}
          className="relative overflow-hidden group transition-opacity duration-300 ease-in-out"
          onMouseMove={(event) => handlePointerMove(event, index)}
        >
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity" />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
