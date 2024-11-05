import React, { useEffect, useState } from "react";
import Greetings from "../../../utiles/Greetings";
import UploadImage from "../../../utiles/UploadImage";
import {
  useCreateBannerMutation,
  useGetSettingsInfoQuery,
} from "../../../feature/dashboard/dashboardApiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingButton from "../../../ui/Buttons/LoadingButton";
import useTitle from "../../../hooks/useTitle";
import Heading from "../../../ui/Heading/Heading";

const BannerList = () => {
  useTitle("Hero Banner")
  const { token } = useSelector((state) => state?.auth);

  const { data: info } = useGetSettingsInfoQuery(
    { token },
    { refetchOnReconnect: true, skip: !token }
  );

  const [selectedFile1, setSelectedFile1] = useState();
  const [selectedImage1, setSelectedImage1] = useState();
  const [selectedImage2, setSelectedImage2] = useState();
  const [selectedImage3, setSelectedImage3] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [selectedFile3, setSelectedFile3] = useState();

  useEffect(() => {
    if (info?.success) {
      setSelectedImage1(info?.data?.banners[0]?.url);
      setSelectedImage2(info?.data?.banners[1]?.url);
      setSelectedImage3(info?.data?.banners[2]?.url);
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

    const res = await createBanner({ bodyData: formData, token });

    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div>
      <Heading title={"Promotinal Banner"} />
      <div className="grid grid-cols-2 gap-5 mt-4">
        <UploadImage
          setSelectedFile={setSelectedFile1}
          maxSize={0.5}
          id={"uploadImage1"}
          selectedImage={selectedImage1}
          setSelectedImage={setSelectedImage1}
        />
        <UploadImage
          setSelectedFile={setSelectedFile2}
          id={"uploadImage2"}
          maxSize={0.5}
          selectedImage={selectedImage2}
          setSelectedImage={setSelectedImage2}
        />
        <UploadImage
          setSelectedFile={setSelectedFile3}
          id={"uploadImage3"}
          maxSize={0.5}
          selectedImage={selectedImage3}
          setSelectedImage={setSelectedImage3}
        />
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
