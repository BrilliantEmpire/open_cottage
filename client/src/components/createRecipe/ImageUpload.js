import { X } from "@phosphor-icons/react";
import React, { useState } from "react";

const UploadImage = ({ images, setImages }) => {
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);

    // Update the state with the selected files
    setImages([...images, ...files]);
  };

  const handleDelete = (index, e) => {
    e.preventDefault(); // Prevent default button behavior
    e.stopPropagation(); // Prevent file explorer from opening
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="flex flex-wrap justify-between gap-1 mt-2">
      {[...Array(10)].map((_, index) => (
        <div key={index} className={`w-[18.2%] ${index >= 5 ? "mt-3" : ""}`}>
          <label
            htmlFor={`file-upload-${index}`}
            className="relative block w-full h-32 overflow-hidden border-2 border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
          >
            {images[index] ? (
              <>
                <img
                  src={URL.createObjectURL(images[index])}
                  alt={images[index].name}
                  className="object-cover w-full h-full"
                />
                <button
                  className="absolute flex top-[5%] right-[5%] bg-white text-[#D0001E] rounded-4 border-none p-1"
                  onClick={(e) => handleDelete(index, e)}
                >
                  <X size={12} />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <img src="/uploadimage.png" alt="Upload Placeholder" />
              </div>
            )}
          </label>
          <div className="hidden">
            <input
              id={`file-upload-${index}`}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadImage;
