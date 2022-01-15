import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import ContactsTable from "../components/ContactsTable";
import Heading from "../components/Heading";
import { getAllRequest } from "../redux/contacts/actions";

export default function Contacts() {
  const dispatch = useDispatch();
  const { isLoading, error, contacts } = useSelector((state) => state.contacts);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const parsedToken = JSON.parse(accessToken);
    dispatch(getAllRequest({ token: parsedToken }));
  }, []);

  useEffect(() => {
    console.log({ error, contacts });
  }, [error, contacts]);

  return (
    <main className="container m-auto h-screen flex flex-col items-center justify-center">
      <Heading level="3">Contacts</Heading>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className="relative w-full">
          <Button modifier="absolute right-0 -top-16 bg-green-500 text-white">
            Add new
          </Button>
          <ContactsTable
            headings={["Name", "Phone", "Actions"]}
            contacts={contacts}
          />
        </section>
      )}
    </main>
  );
}
