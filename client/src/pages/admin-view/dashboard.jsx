import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrls.length) return;
    Promise.all(
      uploadedImageUrls.map((url) => dispatch(addFeatureImage(url)))
    ).then(() => {
      dispatch(getFeatureImages());
      setImageFiles([]);
      setUploadedImageUrls([]);
    });
  }

  function handleDeleteFeatureImage(id) {
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        uploadedImageUrls={uploadedImageUrls}
        setUploadedImageUrls={setUploadedImageUrls}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div
                className="relative"
                key={featureImgItem._id || featureImgItem.id}
              >
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <button
                  onClick={() =>
                    handleDeleteFeatureImage(featureImgItem._id || featureImgItem.id)
                  }
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                  title="Delete Image"
                >
                  &#10005;
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
