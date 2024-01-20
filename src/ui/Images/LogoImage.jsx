import { useState } from "react";
import placeholder from "../../assets/images/placeholder.png";
import { HiXMark } from "react-icons/hi2";

const LogoImage = ({
  setSelectedFile,
  imgHeight,
  imgWidth,
  accept,
  id,
  maxSize,
  selectedImage,
  setSelectedImage,
}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setSelectedImage(reader.result);
        setSelectedFile(file);
      };
    }
  };
  return (
    <div>
      <div className="w-full h-full flex items-center justify-between">
        <label
          htmlFor={id}
          id="image-preview"
          className="bg-[#F7F7F7] rounded-xl w-full h-[240px] border-gray-400 items-center mx-auto text-center cursor-pointer justify-center flex"
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
              src={selectedImage ? selectedImage : placeholder}
              alt="Upload image"
              className="h-[100px] w-[300px] object-contain mb-2"
            />
            <h2 className="text-md font-bold text-[#434343]">Upload Logo</h2>

            <div className="text-gray-600 flex flex-col justify-center items-center text-xs mt-2">
              <p>
                Allowed formats <strong>png, jpg, jpeg, webp</strong>{" "}
              </p>
              <p>
                Max size of <strong>{maxSize} MB</strong>
              </p>
              {imgWidth ? (
                <p>
                  <span className="text-red-400 text-[16px]">*</span> Must
                  wight-height {imgWidth} x {imgHeight} px
                </p>
              ) : null}
            </div>
            <span id="filename" className="text-gray-500 bg-gray-200 z-50" />
          </label>
        </label>
      </div>
    </div>
  );
};

export default LogoImage;
