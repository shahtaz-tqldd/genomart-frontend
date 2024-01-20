import React, { useEffect, useState } from "react";
import Greetings from "../../../utiles/Greetings";
import UploadImage from "../../../utiles/UploadImage";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import { dropdownbtnMd } from "../../../ui/tailwind/tailwind-classes";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import ProductDropdown from "./ProductDropdown";
import {
  useCreateBannerMutation,
  useGetSettingsInfoQuery,
} from "../../../feature/dashboard/dashboardApiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingButton from "../../../ui/Buttons/LoadingButton";

const BannerList = () => {
  const { token } = useSelector((state) => state?.auth);

  const { data: info, isSuccess } = useGetSettingsInfoQuery(
    { token },
    { refetchOnReconnect: true, skip: !token }
  );

  const [selectedFile1, setSelectedFile1] = useState();
  const [selectedImage1, setSelectedImage1] = useState();
  const [selectedImage2, setSelectedImage2] = useState();
  const [selectedImage3, setSelectedImage3] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [selectedFile3, setSelectedFile3] = useState();
  const [selectedProduct1, setSelectedProduct1] = useState();
  const [selectedProduct2, setSelectedProduct2] = useState();
  const [selectedProduct3, setSelectedProduct3] = useState();

  const { data: products } = useGetAllProductsQuery({
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (info?.success) {
    setSelectedImage1(info?.data?.banners[0]?.url)
    setSelectedImage2(info?.data?.banners[1]?.url)
    setSelectedImage3(info?.data?.banners[2]?.url)
    }
  }, [info]);

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
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div>
      <Greetings page={"Hero Banner"} />
      <div className="grid grid-cols-1 gap-10 mt-12">
        <div className="flex gap-10">
          <div className="w-2/3">
            <UploadImage
              setSelectedFile={setSelectedFile1}
              maxSize={0.5}
              id={"uploadImage1"}
              selectedImage={selectedImage1}
              setSelectedImage={setSelectedImage1}
            />
          </div>
          <div className="w-1/3">
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
        <div className="flex gap-10">
          <div className="w-2/3">
            <UploadImage
              setSelectedFile={setSelectedFile2}
              id={"uploadImage2"}
              selectedImage={selectedImage2}
              setSelectedImage={setSelectedImage2}
            />
          </div>
          <div className="w-1/3">
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
        <div className="flex gap-10">
          <div className="w-2/3">
            <UploadImage
              setSelectedFile={setSelectedFile3}
              id={"uploadImage3"}
              selectedImage={selectedImage3}
              setSelectedImage={setSelectedImage3}
            />
          </div>
          <div className="w-1/3">
            <h2 className="text-md font-semibold uppercase text-gray-700 mt-1">
              Banner 1
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

export default BannerList;
