import React, { useState } from "react";
import Greetings from "../../../utiles/Greetings";
import { TextField } from "@mui/material";
import ReactQuill from "react-quill";
import { quillModules } from "../../../utiles/constants/quill-modules";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import { dropdownbtnMd } from "../../../ui/tailwind/tailwind-classes";
import { categories } from "../../../assets/data/mock/categories";
import UploadImages from "../../../utiles/UploadImages";
import { HiXMark } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../ui/Buttons/SubmitButton";
import { useCreateProductMutation } from "../../../feature/products/productsApiSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { token } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [quillContent, setQuillContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [addCat, setAddCat] = useState(false);

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });

    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const { register, handleSubmit } = useForm();

  const [createProduct, { isLoading }] = useCreateProductMutation() || {};

  const handleProductSubmit = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    formData.append("specs", quillContent);

    selectedFiles.forEach((photo) => {
      formData.append(`images`, photo);
    });

    if (!data?.category) {
      formData.append("category", selectedCategory);
    }

    const res = await createProduct({ bodyData: formData, token });

    if (res?.data?.success) {
      toast.success(res?.data?.message);
      navigate("/dashboard/products");
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div>
      <Greetings page={"Add Product"} />
      <div className="flex gap-8 mt-10 items-start relative">
        <div className="w-[40%] sticky top-10">
          <UploadImages
            imgNumber={selectedFiles?.length}
            setSelectedImages={setSelectedImages}
            setSelectedFiles={setSelectedFiles}
            maxSize={1}
            id={"uploadFile"}
          />
          <div className="grid grid-cols-4 mt-6 gap-4">
            {selectedImages?.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt=""
                  className="h-24 bg-gray-100 object-contain w-full rounded-lg p-2"
                />
                <HiXMark
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 tr text-white rounded-full text-xl p-0.5 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[60%] bg-gray-100 py-5 px-10 rounded-xl">
          <form
            onSubmit={handleSubmit(handleProductSubmit)}
            className="flex flex-col gap-5"
          >
            <TextField
              size="sm"
              label="Product Name"
              type="text"
              variant="standard"
              {...register("name", { required: true })}
            />
            <div className="grid grid-cols-2 gap-5">
              <TextField
                label="Price"
                type="text"
                variant="standard"
                {...register("price", { required: true })}
              />
              <TextField
                label="Discount"
                type="text"
                variant="standard"
                {...register("discount", { required: false })}
              />
            </div>
            <div className="grid grid-cols-2 items-end gap-5">
              <TextField
                label="Stock"
                type="text"
                variant="standard"
                {...register("stock", { required: true })}
              />
              <Dropdown
                btnstyle={dropdownbtnMd}
                selectedOption={selectedCategory}
                setSelectedOption={setSelectedCategory}
                options={categories?.map((c) => c?.name)}
                dropdownNull="Select Category"
              />
              <div></div>

              <div className="text-sm">
                Category not present?{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setAddCat(true);
                  }}
                  className="font-bold text-slate-800"
                >
                  Create New
                </button>
                {addCat && (
                  <div className="mt-2">
                    <TextField
                      className="w-full"
                      label="Category Name"
                      type="text"
                      variant="standard"
                      {...register("category", { required: false })}
                    />
                  </div>
                )}
              </div>
            </div>

            <TextField
              label="Special Offer"
              type="text"
              variant="standard"
              {...register("specialOffer", { required: false })}
            />
            <TextField
              label="Product Description"
              type="text"
              multiline
              maxRows={4}
              variant="standard"
              {...register("description", { required: true })}
            />
            <h2 className="text-lg font-medium mt-5 -mb-2">Product Details</h2>
            <ReactQuill
              modules={quillModules}
              placeholder="Write Product Specefication"
              theme="snow"
              className="custom-quill-editor"
              value={quillContent}
              onChange={(val) => setQuillContent(val)}
            />
            <div className="flex justify-end">
              <SubmitButton loading={isLoading} name={"Submit"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
