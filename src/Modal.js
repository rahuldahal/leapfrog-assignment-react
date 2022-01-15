import { createPortal } from "react-dom";

export default function Modal({ children }) {
  return createPortal(
    <aside className="flex justify-center items-center w-screen h-screen overflow-hidden fixed top-0 left-0 after:absolute after:-z-10 after:top-0 after:left-0 after:block after:w-full after:h-full after:bg-green-700 after:opacity-80">
      {children}
    </aside>,
    document.getElementById("modal")
  );
}
