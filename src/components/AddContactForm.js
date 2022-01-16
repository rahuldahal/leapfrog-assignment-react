import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useField from "../hooks/useField";
import {
  newContactRequest,
  updateContactRequest,
} from "../redux/contacts/actions";
import Button from "./Button";
import PhotoUpload from "./PhotoUpload";

export default function AddContactForm({ data = {} }) {
  const [initialName] = useState(data.name);
  const [initialPhone] = useState(data.phone);
  const [_id] = useState(data._id);
  const [nameRef, NameField] = useField("Full Name");
  const [phoneRef, PhoneField] = useField("Phone Number");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [base64EncodedImage, setBase64EncodedImage] = useState("");
  const dispatch = useDispatch();
  const [isDataProvided] = useState(Object.keys(data).length > 0);

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileInputState(e.target.value);
  }

  async function uploadImage(base64EncodedImage) {
    try {
      console.log(base64EncodedImage);
      setBase64EncodedImage(base64EncodedImage);
      setFileInputState("");
      setPreviewSource("");
    } catch (err) {
      console.error(err);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;

    // image handler
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
    const accessToken = localStorage.getItem("accessToken");
    const parsedToken = JSON.parse(accessToken);

    if (isDataProvided) {
      return dispatch(
        updateContactRequest({
          _id,
          name,
          phone,
          photograph: base64EncodedImage,
          token: parsedToken,
        })
      );
    }
    return dispatch(
      newContactRequest({
        name,
        phone,
        photograph: base64EncodedImage,
        token: parsedToken,
      })
    );
  }
  return (
    <form
      className="w-3/5 m-auto bg-white p-4 rounded-md text-gray-700"
      onSubmit={handleFormSubmit}
    >
      <NameField
        type="text"
        placeholder="John Doe"
        value={initialName || nameRef?.current?.value}
      />
      <PhoneField
        type="number"
        placeholder="10 digits phone number"
        value={initialPhone || phoneRef?.current?.value}
      />
      <PhotoUpload
        fileInputState={fileInputState}
        handleFileInputChange={handleFileInputChange}
        previewSource={previewSource}
      />
      <Button type="submit" modifier="bg-green-500 text-white">
        {isDataProvided ? "Update" : "Add"}
      </Button>
    </form>
  );
}
