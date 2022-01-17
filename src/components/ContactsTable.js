import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import { deleteContactRequest } from "../redux/contacts/actions";
import AddContactForm from "./AddContactForm";
import Button from "./Button";

export default function ContactsTable({ headings, contacts, setFlashMessage }) {
  const dispatch = useDispatch();
  const [updateContactModalData, setUpdateContactModalData] = useState(null);

  function hideModalOnEscapePress(e) {
    if (e.key === "Escape") {
      setUpdateContactModalData(null);
    }
  }

  useEffect(() => {
    if (updateContactModalData) {
      window.addEventListener("keyup", hideModalOnEscapePress);
    } else {
      window.removeEventListener("keyup", hideModalOnEscapePress);
    }
  }, [updateContactModalData]);

  async function handleDelete(_id) {
    const accessToken = localStorage.getItem("accessToken");
    const parsedToken = JSON.parse(accessToken);
    await dispatch(deleteContactRequest({ _id, token: parsedToken }));
    setFlashMessage({
      type: "success",
      message: "The contact has been deleted successfully",
    });
  }

  function TableHeading({ label }) {
    return (
      <th className="px-5 py-3 border-b-2 border-green-500 bg-green-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
        {label}
      </th>
    );
  }
  return (
    <>
      {contacts.length === 0 ? (
        <p className="text-center mt-14">No contacts have been added, yet!</p>
      ) : (
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {headings.map((heading, index) => (
                <TableHeading key={index} label={heading} />
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => {
              const { _id, name, phone, photograph } = contact;
              return (
                <tr key={_id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={photograph}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{phone}</p>
                  </td>
                  <td className="flex justify-between px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Button
                      modifier="bg-blue-400 text-white"
                      onClick={() =>
                        setUpdateContactModalData({
                          _id,
                          name,
                          phone,
                          photograph,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      modifier="bg-red-400 text-white"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {updateContactModalData ? (
        <Modal>
          <AddContactForm
            data={updateContactModalData}
            setFlashMessage={setFlashMessage}
          />
        </Modal>
      ) : null}
    </>
  );
}
