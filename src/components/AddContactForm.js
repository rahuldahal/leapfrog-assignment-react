import React from "react";
import { useDispatch } from "react-redux";
import useField from "../hooks/useField";
import { newContactRequest } from "../redux/contacts/actions";
import Button from "./Button";

export default function AddContactForm() {
  const [nameRef, NameField] = useField("Full Name");
  const [phoneRef, PhoneField] = useField("Phone Number");
  const [photographRef, PhotographField] = useField("Photograph URL");
  const dispatch = useDispatch();

  function handleFormSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const photograph = photographRef.current.value;
    console.log({ name, phone, photograph });
    const accessToken = localStorage.getItem("accessToken");
    const parsedToken = JSON.parse(accessToken);
    dispatch(
      newContactRequest({ name, phone, photograph, token: parsedToken })
    );
  }
  return (
    <form
      className="w-3/5 m-auto bg-white p-4 rounded-md text-gray-700"
      onSubmit={handleFormSubmit}
    >
      <NameField type="text" placeholder="John Doe" />
      <PhoneField type="number" placeholder="10 digits phone number" />
      <PhotographField type="file" />
      <Button type="submit" modifier="bg-green-500 text-white">
        Add
      </Button>
    </form>
  );
}
