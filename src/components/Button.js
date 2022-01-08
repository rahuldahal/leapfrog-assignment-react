import React from "react";

export default function Button({
  type = "button",
  onClick = () => {},
  children,
  modifier,
}) {
  return (
    <button
      type={type}
      className={`uppercase transition-colors duration-300 text-sm font-semibold px-14 py-3 rounded ${modifier}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
