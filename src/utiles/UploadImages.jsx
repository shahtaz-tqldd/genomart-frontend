import React from "react";
import placeholder from "../assets/images/placeholder.png";
import toast from "react-hot-toast";

const UploadImages = ({
  setSelectedImages,
  setSelectedFiles,
  maxSize,
  imageWidth,
  imageHeight,
  imgNumber,
  id,
  accept,
}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && imgNumber <= 3) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setSelectedImages((prevImages) => [...prevImages, reader.result]);
        setSelectedFiles((prevFiles) => [...prevFiles, file]);
      };
    } else {
      toast.error("Can not upload more than 4");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-between">
      <label
        htmlFor={id}
        id="image-preview"
        className="bg-[#F7F7F7] rounded-xl w-full h-[300px] border-gray-400 items-center mx-auto text-center cursor-pointer justify-center flex"
      >
        <input
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleImageUpload(e)}
        />
        <label
          htmlFor={id}
          className="cursor-pointer flex flex-col items-center font-outfit"
        >
          <img
            src={placeholder}
            alt="Upload image"
            className="h-[160px] mb-6"
          />
          <h2 className="text-xl font-bold text-[#434343]">
            + Upload product images
          </h2>

          <div className="text-gray-600 flex flex-col justify-center items-center text-xs mt-2">
            <p>
              Allowed formats <strong>png, jpg, jpeg, webp</strong>{" "}
            </p>
            <p>
              Max size of <strong>{maxSize} MB</strong>
            </p>
            {imageWidth ? (
              <p>
                <span className="text-red-400 text-[16px]">*</span> Must
                wight-height {imageWidth} x {imageHeight} px
              </p>
            ) : null}
          </div>
          <span id="filename" className="text-gray-500 bg-gray-200 z-50" />
        </label>
      </label>
    </div>
  );
};

export default UploadImages;
