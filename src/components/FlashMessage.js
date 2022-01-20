import React from "react";

export default function FlashMessage({ type, message }) {
  const typeColorMap = {
    success: ["bg-green-500", "text-white"],
    warning: ["bg-yellow-500", "text-gray-700"],
    error: ["bg-red-500", "text-white"],
  };
  return (
    <div
      className={`${typeColorMap[type].join(
        " "
      )} p-4 rounded-lg absolute bottom-8 left-4 animate-bounce`}
    >
      <p>{message}</p>
    </div>
  );
}
