import React, { useState } from "react";
import Greetings from "../../../utiles/Greetings";
import UploadImage from "../../../utiles/UploadImage";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import { dropdownbtnMd } from "../../../ui/tailwind/tailwind-classes";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import ProductDropdown from "./ProductDropdown";
import { useCreateBannerMutation } from "../../../feature/dashboard/dashboardApiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import AddButton from "../../../ui/Buttons/AddButton";
import LoadingButton from "../../../ui/Buttons/LoadingButton";

const CreateBanner = () => {
  const { token } = useSelector((state) => state?.auth);
  const [selectedFile1, setSelectedFile1] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [selectedFile3, setSelectedFile3] = useState();
  const [selectedProduct1, setSelectedProduct1] = useState();
  const [selectedProduct2, setSelectedProduct2] = useState();
  const [selectedProduct3, setSelectedProduct3] = useState();

  const { data: products } = useGetAllProductsQuery({
    refetchOnReconnect: true,
  });

  const [createBanner, { isLoading }] = useCreateBannerMutation(
    { token },
    { skip: !token }
  );

  const handleCreateBanner = async () => {
    const formData = new FormData();

    formData.append(`images`, selectedFile1);
    formData.append(`images`, selectedFile2);
    formData.append(`images`, selectedFile3);
    formData.append(
      `products`,
      JSON.stringify([
        selectedProduct1?._id,
        selectedProduct2?._id,
        selectedProduct3?._id,
      ])
    );

    let res;
    if (
      !selectedProduct1?._id ||
      !selectedProduct2?._id ||
      !selectedProduct3?._id
    ) {
      toast.error("Provide products for banner");
      return;
    } else {
      res = await createBanner({ bodyData: formData, token });
    }

    if (res?.data?.success) {
      toast.success(res?.data?.message);
      navigate("/dashboard/banner");
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div>
      <Greetings page={"Create Banner"} />
      <div className="grid grid-cols-3 gap-5 mt-12">
        <div>
          <UploadImage setSelectedFile={setSelectedFile1} id={"uploadImage1"} />
          <div className="flex mt-3 justify-between gap-8">
            <h2 className="text-md font-semibold uppercase text-gray-700 mt-1">
              Banner 1
            </h2>
            <div className="flex-1">
              <ProductDropdown
                btnstyle={dropdownbtnMd}
                selectedOption={selectedProduct1}
                setSelectedOption={setSelectedProduct1}
                data={products?.data || []}
                dropdownNull="Select Product"
              />
            </div>
          </div>
        </div>
        <div>
          <UploadImage setSelectedFile={setSelectedFile2} id={"uploadImage2"} />
          <div className="flex mt-3 justify-between gap-8">
            <h2 className="text-md font-semibold uppercase text-gray-700 mt-1">
              Banner 2
            </h2>
            <div className="flex-1">
              <ProductDropdown
                btnstyle={dropdownbtnMd}
                selectedOption={selectedProduct2}
                setSelectedOption={setSelectedProduct2}
                data={products?.data || []}
                dropdownNull="Select Product"
              />
            </div>
          </div>
        </div>
        <div>
          <UploadImage setSelectedFile={setSelectedFile3} id={"uploadImage3"} />
          <div className="flex mt-3 justify-between gap-8">
            <h2 className="text-md font-semibold uppercase text-gray-700 mt-1">
              Banner 3
            </h2>
            <div className="flex-1">
              <ProductDropdown
                btnstyle={dropdownbtnMd}
                selectedOption={selectedProduct3}
                setSelectedOption={setSelectedProduct3}
                data={products?.data || []}
                dropdownNull="Select Product"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 mr-4 flex justify-end">
        <LoadingButton
          onClick={handleCreateBanner}
          name={"Save Changes"}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateBanner;
