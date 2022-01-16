import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useField from "../hooks/useField";
import {
  newContactRequest,
  updateContactRequest,
} from "../redux/contacts/actions";
import Button from "./Button";

export default function AddContactForm({ data = {}, setFlashMessage }) {
  const { _id, name: initialName, phone: initialPhone } = data;
  const [nameRef, NameField] = useField("Full Name");
  const [phoneRef, PhoneField] = useField("Phone Number");
  const [photographRef, PhotographField] = useField("Photograph URL");
  const { isLoading, error, contacts } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [isDataProvided] = useState(Object.keys(data).length > 0);

  useEffect(() => {
    if (!isLoading && !error && !isDataProvided) {
      setFlashMessage({
        type: "success",
        message: "The conatct has been added!",
      });
    }
    if (!isLoading && !error && isDataProvided) {
      setFlashMessage({
        type: "success",
        message: "The conatct has been updated!",
      });
    }
    if (!isLoading && error) {
      setFlashMessage({
        type: "error",
        message: error,
      });
    }
  }, [isLoading, isDataProvided, error, setFlashMessage]);

  function handleFormSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const photograph = photographRef.current.value;
    console.log({ name, phone, photograph });
    const accessToken = localStorage.getItem("accessToken");
    const parsedToken = JSON.parse(accessToken);

    if (isDataProvided) {
      dispatch(
        updateContactRequest({
          _id,
          name,
          phone,
          photograph,
          token: parsedToken,
        })
      );
    } else {
      dispatch(
        newContactRequest({ name, phone, photograph, token: parsedToken })
      );
    }
  }
  return (
    <form
      className="w-3/5 m-auto bg-white p-4 rounded-md text-gray-700"
      onSubmit={handleFormSubmit}
    >
      <NameField type="text" placeholder="John Doe" value={initialName} />
      <PhoneField
        type="number"
        placeholder="10 digits phone number"
        value={initialPhone}
      />
      <PhotographField type="file" value="" />
      <Button type="submit" modifier="bg-green-500 text-white">
        {isDataProvided ? "Update" : "Add"}
      </Button>
    </form>
  );
}
