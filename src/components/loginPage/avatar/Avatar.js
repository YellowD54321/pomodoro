import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";

const Avatar = () => {
  const [imageFile, setImageFile] = useState(null);
  const storageRef = ref(storage, "images");

  useEffect(() => {
    getDownloadURL(storageRef).then((url) => {
      console.log(url);
      setImageFile(url);
    });
  }, []);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const url = URL.createObjectURL(image);
    console.log({ url });
    setImageFile(image);
  };

  const handleUpload = () => {
    uploadBytes(storageRef, imageFile).then((snapshot) => {
      console.log("Upload successfully");
      console.log(snapshot);
    });
  };

  return (
    <div className="avatar-main">
      {imageFile && (
        <img
          src={
            typeof imageFile === "string"
              ? imageFile
              : URL.createObjectURL(imageFile)
          }
          alt=""
          className="avatar-image"
        />
      )}
      <br />
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="avatar-file-select-button"
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
};

export default Avatar;
