import React, { useRef } from "react";

export default function useField(name) {
  const trimmedName = name.trim().toLowerCase().replace(" ", "-"); // First Name => first-name
  const inputRef = useRef(null);
  function FieldJSX({ type, placeholder }) {
    return (
      <>
        <label htmlFor={trimmedName} className="block">
          {name}
        </label>
        <input
          ref={inputRef}
          id={trimmedName}
          type={type}
          placeholder={placeholder}
          className="border focus:outline-green-500 w-full h-10 px-3 mb-5 rounded-md"
        />
      </>
    );
  }

  return [inputRef, FieldJSX];
}
