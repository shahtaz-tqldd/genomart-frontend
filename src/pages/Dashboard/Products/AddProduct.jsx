import React, { useState } from "react";
import Greetings from "../../../utiles/Greetings";
import { TextField } from "@mui/material";
import ReactQuill from "react-quill";
import { quillModules } from "../../../utiles/constants/quill-modules";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import { dropdownbtnMd } from "../../../ui/tailwind/tailwind-classes";
import UploadImages from "../../../utiles/UploadImages";
import { HiOutlinePencil, HiXMark } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../ui/Buttons/SubmitButton";
import {
  useCreateProductMutation,
  useGetAllCategoriesQuery,
} from "../../../feature/products/productsApiSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ColorPickerComponent from "../../../utiles/ColorPicker";

const AddProduct = () => {
  const { token } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [quillContent, setQuillContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [addCat, setAddCat] = useState(false);
  const [wordLength, setWordLength] = useState(300);

  // Sizes add
  const [sizes, setSizes] = useState([]);
  const [currentSize, setCurrentSize] = useState("");

  const handleSizeChange = (e) => {
    setCurrentSize(e.target.value);
  };

  const handleAddSize = (e) => {
    e.preventDefault();
    if (currentSize.trim() !== "") {
      setSizes([...sizes, currentSize]);
      setCurrentSize("");
    }
  };

  const handleSizeUpdate = (index, updatedSize) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = updatedSize;
    setSizes(updatedSizes);
  };

  // Images add
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

  // colors add
  const [colors, setColors] = useState([]);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const handleAddColors = (color) => {
    if (color) setColors([...colors, color]);
  };

  const { register, handleSubmit } = useForm();

  // existing category
  const { data: category } = useGetAllCategoriesQuery({
    refetchOnReconnect: true,
  });

  // Add product through rtk api
  const [createProduct, { isLoading }] = useCreateProductMutation() || {};
  const handleProductSubmit = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    formData.append("specs", quillContent);

    const nonEmptyColors = colors.filter((color) => color.trim() !== "");

    if (nonEmptyColors.length > 0) {
      nonEmptyColors.forEach((color, index) => {
        formData.append(`colors[${index}]`, color);
      });
    }
    const nonEmptySizes = sizes.filter((size) => size.trim() !== "");

    if (nonEmptySizes.length > 0) {
      nonEmptySizes.forEach((size, index) => {
        formData.append(`sizes[${index}]`, size);
      });
    }

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
              <TextField
                label="Brand"
                type="text"
                variant="standard"
                {...register("brand", { required: true })}
              />
              <div></div>
              <Dropdown
                btnstyle={dropdownbtnMd}
                selectedOption={selectedCategory}
                setSelectedOption={setSelectedCategory}
                options={category?.data?.map((c) => c?.category)}
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

            {/* sizes */}
            <div>
              <h2 className="font-bold text-gray-800 mb-2">Sizes</h2>
              <div className="flex flex-wrap items-end gap-5">
                {sizes.map((size, i) => (
                  <TextField
                    key={i}
                    label={`Size ${i + 1}`}
                    type="text"
                    variant="standard"
                    className="w-[120px]"
                    defaultValue={size}
                    onChange={(e) => handleSizeUpdate(i, e.target.value)}
                  />
                ))}
                <TextField
                  label={`Size ${sizes.length > 0 ? sizes?.length + 1 : ""}`}
                  type="text"
                  variant="standard"
                  className="w-[120px]"
                  value={currentSize}
                  onChange={handleSizeChange}
                />
                <button
                  onClick={handleAddSize}
                  className="bg-gray-200 hover:bg-gray-300 tr py-2 text-sm px-3 rounded"
                >
                  + Add another
                </button>
              </div>
            </div>

            {/* colors */}
            <div>
              <h2 className="font-bold text-gray-800 mb-5">Colors</h2>
              <div className="flex items-center gap-10">
                <button
                  className="flex items-center gap-2 py-2 pl-2 pr-3 bg-gray-200 hover:bg-gray-300 tr rounded"
                  onClick={(event) => setColorPickerOpen(event.currentTarget)}
                >
                  <HiOutlinePencil className="text-xs" />
                  <span className="text-sm">
                    {colors.length === 0
                      ? "pick a color"
                      : "pick another color"}
                  </span>
                </button>
                <div className="flex items-center gap-4 ">
                  {colors?.map((color, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: color }}
                      className="h-6 w-6 rounded-full relative group"
                    >
                      <HiXMark
                        onClick={() =>
                          setColors(colors?.filter((c) => c !== color))
                        }
                        className="cursor-pointer group-hover:block hidden absolute -top-2 font-bold -right-2 bg-red-500 text-white p-0.5 rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {colorPickerOpen && (
                <ColorPickerComponent
                  openMenu={colorPickerOpen}
                  setOpenMenu={setColorPickerOpen}
                  onClick={handleAddColors}
                />
              )}
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
              inputProps={{ maxLength: 300 }}
              variant="standard"
              onChange={(e) => setWordLength(e.target.value)}
              {...register("description", { required: true })}
            />
            <div className="text-sm -mt-2 flex justify-end">{wordLength}</div>
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
