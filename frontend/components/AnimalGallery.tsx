"use client";

import Image from "next/image";
import { useState } from "react";

const AnimalGallery = ({ animal_info }: AnimalGalleryProps) => {
  const { name, images } = animal_info;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-full grid grid-cols-1 space-y-5 gap-x-11 sm:grid-cols-2">
      <div className="w-full h-80 relative shadow-lg max-w-lg lg:h-96">
        <Image
          className="rounded-lg object-cover w-full h-full"
          src={selectedImage}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-3 md:grid-flow-col md:min-w-72 items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-24 h-24 cursor-pointer border relative rounded-full overflow-hidden shadow-lg lg:w-28 lg:h-28 xl:w-36 xl:h-36"
            onClick={() => setSelectedImage(image)}
          >
            <Image src={image} alt={name} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalGallery;
