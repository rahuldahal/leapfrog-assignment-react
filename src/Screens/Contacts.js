import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddContactForm from "../components/AddContactForm";
import Button from "../components/Button";
import ContactsTable from "../components/ContactsTable";
import Heading from "../components/Heading";
import Modal from "../Modal";
import { getAllRequest } from "../redux/contacts/actions";

export default function Contacts() {
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error, contacts } = useSelector((state) => state.contacts);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const parsedToken = JSON.parse(accessToken);
    dispatch(getAllRequest({ token: parsedToken }));
  }, []);

  function hideModalOnEscapePress(e) {
    if (e.key === "Escape") {
      setShowAddNewModal(false);
    }
  }

  useEffect(() => {
    if (showAddNewModal) {
      window.addEventListener("keyup", hideModalOnEscapePress);
    } else {
      window.removeEventListener("keyup", hideModalOnEscapePress);
    }
  }, [showAddNewModal]);

  useEffect(() => {
    console.log({ error, contacts });
  }, [error, contacts]);

  return (
    <main className="container m-auto h-screen flex flex-col items-center justify-center">
      <Heading level="3">Contacts</Heading>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className="relative w-full lg:max-w-5xl">
          <Button
            modifier="absolute right-0 -top-16 bg-green-500 text-white"
            onClick={() => setShowAddNewModal(true)}
          >
            Add new
          </Button>
          <ContactsTable
            headings={["Name", "Phone", "Actions"]}
            contacts={contacts}
          />
        </section>
      )}
      {showAddNewModal ? (
        <Modal>
          <AddContactForm />
        </Modal>
      ) : null}
    </main>
  );
}
