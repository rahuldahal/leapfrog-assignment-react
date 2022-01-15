import React from "react";
import { useDispatch } from "react-redux";
import { deleteContactRequest } from "../redux/contacts/actions";
import Button from "./Button";

export default function ContactsTable({ headings, contacts }) {
  const dispatch = useDispatch();
  function handleDelete(_id) {
    const accessToken = localStorage.getItem("accessToken");
    const parsedToken = JSON.parse(accessToken);
    dispatch(deleteContactRequest({ _id, token: parsedToken }));
  }

  function TableHeading({ label }) {
    return (
      <th className="px-5 py-3 border-b-2 border-green-500 bg-green-500 text-center text-xs font-semibold text-white uppercase tracking-wider">
        {label}
      </th>
    );
  }
  return (
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
                    <p className="text-gray-900 whitespace-no-wrap">{name}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{phone}</p>
              </td>
              <td className="flex justify-between px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Button modifier="bg-blue-400 text-white">Edit</Button>
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
  );
}
